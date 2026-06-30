import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents, addDonationToEventAsync } from '../store/slices/eventSlice';
import { fetchWalletData, depositMoneyAsync, makeDonationAsync } from '../store/slices/walletSlice';
import CreditCardVisual from '../components/Wallet/CreditCardVisual';
import GlassCard from '../components/GlassCard';

export default function PaymentSimulation() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const balance = useSelector((state) => state.wallet.balance);
  const events = useSelector((state) => state.events.list);

  const [step, setStep] = useState('form'); 
  const [mode, setMode] = useState('card');
  const [amount, setAmount] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(167);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [toast, setToast] = useState({ msg: '', visible: false });

  const [card, setCard] = useState({ number: '', holder: '', expiry: '', cvv: '' });
  const [tx, setTx] = useState({ amount: 0, balance: 0 });

  const showToast = useCallback((msg) => {
    setToast({ msg, visible: true });
    setTimeout(() => setToast({ msg: '', visible: false }), 3000);
  }, []);

  const currentUser = useMemo(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  }, []);

  useEffect(() => {
    setMode(!currentUser ? 'card' : (location.state?.eventTitle ? 'card' : 'topup'));
  }, [location.state, currentUser]);

  const isDonation = mode === 'card' || mode === 'wallet';
  const needsCard = mode === 'card' || mode === 'topup';

  const currentEventTitle = useMemo(() => {
    if (mode === 'topup') return 'Cüzdan Bakiye Yükleme';
    return location.state?.eventTitle || 'Genel Bağış';
  }, [mode, location.state]);

  useEffect(() => {
    if (currentUser) dispatch(fetchWalletData(currentUser.email));
    if (events.length === 0) dispatch(fetchEvents());
  }, [currentUser, events.length, dispatch]);

  useEffect(() => {
    let timer;
    if (step === 'otp') {
      setSecondsLeft(167);
      timer = setInterval(() => {
        setSecondsLeft((prev) => (prev <= 1 ? (clearInterval(timer), 0) : prev - 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step]);

  const formattedTime = `${String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:${String(secondsLeft % 60).padStart(2, '0')}`;

  const handleCardNumberChange = (e) => {
    const clean = e.target.value.replace(/[^\d]/g, '');
    let formatted = '';
    for (let i = 0; i < Math.min(clean.length, 16); i++) {
      if (i > 0 && i % 4 === 0) formatted += ' ';
      formatted += clean[i];
    }
    setCard(prev => ({ ...prev, number: formatted }));
    setErrorMessage('');
  };

  const processDonation = (safeAmount, fromWallet) => {
    const nextBalance = fromWallet ? (currentUser ? balance - safeAmount : 0) : balance;
    const eventId = location.state?.eventId;
    const donorName = currentUser?.name || 'Anonim Bağışçı';

    if (currentUser && fromWallet) {
      const currentEvent = events.find((e) => e.id === eventId);
      dispatch(makeDonationAsync({
        amount: safeAmount,
        eventId,
        eventTitle: currentEventTitle,
        category: currentEvent ? currentEvent.category : (location.state?.category || 'Genel'),
        userEmail: currentUser.email
      }));
    }

    if (eventId) {
      dispatch(addDonationToEventAsync({ eventId, donationAmount: safeAmount, donorName }))
        .then(() => window.dispatchEvent(new Event('dashboard-data-updated')));
    }

    try {
      const storedAll = localStorage.getItem('all_donations');
      const allList = storedAll ? JSON.parse(storedAll) : [];
      allList.unshift({
        id: 'd_' + Date.now(),
        donorName,
        donorEmail: currentUser?.email || 'Anonim',
        campaignTitle: currentEventTitle,
        category: location.state?.category || 'Genel',
        amount: safeAmount,
        timeAgo: 'Az önce',
        date: new Date().toISOString().split('T')[0]
      });
      localStorage.setItem('all_donations', JSON.stringify(allList));
      window.dispatchEvent(new Event('donation-list-updated'));
    } catch (e) {
      console.error(e);
    }

    setTx({ amount: safeAmount, balance: nextBalance });
    setStep('success');
    setErrorMessage('');
  };

  const handleSubmitPayment = () => {
    const safeAmount = Number(amount) || 0;

    if (!amount || safeAmount <= 0) {
      setErrorMessage('Lütfen geçerli bir tutar girin.');
      showToast('Lütfen geçerli bir tutar girin.');
      return;
    }

    if (mode === 'wallet') {
      if (currentUser && safeAmount > balance) {
        setTx({ amount: safeAmount, balance });
        setErrorMessage('Yetersiz Bakiye');
        showToast('Yetersiz bakiye — cüzdanınızda yeterli tutar bulunmuyor.');
        return;
      }
      processDonation(safeAmount, true);
      return;
    }

    const cleanCard = card.number.replace(/\s/g, '');
    if (cleanCard.length !== 16 || !card.holder.trim() || card.expiry.length !== 5 || card.cvv.length !== 3) {
      const missingFields = [];
      if (cleanCard.length !== 16) missingFields.push('Kart Numarası');
      if (!card.holder.trim()) missingFields.push('Kart Üzerindeki İsim');
      if (card.expiry.length !== 5) missingFields.push('Son Kullanma Tarihi');
      if (card.cvv.length !== 3) missingFields.push('CVV');
      setErrorMessage('Lütfen tüm kart bilgilerini eksiksiz doldurun.');
      showToast(`Eksik alanlar: ${missingFields.join(', ')}`);
      return;
    }

    setStep('otp');
    setErrorMessage('');
  };

  const handleOtpConfirm = () => {
    if (otpCode.length !== 4) {
      setErrorMessage('Lütfen 4 haneli SMS şifrenizi girin.');
      return;
    }
    const safeAmount = Number(amount) || 0;

    if (mode === 'card') {
      processDonation(safeAmount, false);
      return;
    }

    dispatch(depositMoneyAsync({ amount: safeAmount, userEmail: currentUser?.email }))
      .then(() => window.dispatchEvent(new Event('auth-state-changed')));

    setTx({ amount: safeAmount, balance: balance + safeAmount });
    setStep('success');
  };

  const resetFlow = () => {
    setStep('form');
    setOtpCode('');
    setErrorMessage('');
    setTx({ amount: 0, balance: 0 });
  };

  const renderForm = () => (
    <div className="card-base md:p-8 space-y-5 shadow-xl shadow-slate-200/20 text-left">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <h3 className="text-xs font-black text-inst-navy uppercase tracking-wider">
          {mode === 'wallet' ? 'CÜZDANLA BAĞIŞ' : mode === 'card' ? 'KARTLA BAĞIŞ' : 'KART BİLGİLERİ'}
        </h3>
        {currentUser && (
          <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1 gap-1">
            {['card', 'wallet', 'topup'].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => { setMode(m); setStep('form'); setErrorMessage(''); setAmount(''); }}
                className={`rounded-lg px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all ${mode === m ? 'bg-white text-pine-teal shadow-sm' : 'text-slate-500'}`}
              >
                {m === 'card' ? 'Kartla Öde' : m === 'wallet' ? 'Cüzdanla Öde' : 'Cüzdana Para Yükle'}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="bg-pine-teal/5 border border-pine-teal/10 rounded-xl p-3 text-xs flex justify-between items-center text-slate-700 font-bold mb-2">
        <span className="text-slate-500 font-medium">Hedef Etkinlik</span>
        <span className="text-pine-teal truncate max-w-[200px]">{currentEventTitle}</span>
      </div>

      {errorMessage && (
        <div className="bg-red-50 border border-red-200/60 text-red-700 text-xs rounded-xl p-3.5 font-bold flex items-start gap-2 shadow-sm animate-pulse">
          <svg className="w-4.5 h-4.5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      {mode === 'wallet' && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex justify-between items-center">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Kullanılabilir Bakiye</span>
          <span className="text-sm font-black text-pine-teal">{balance.toLocaleString('tr-TR')} ₺</span>
        </div>
      )}

      {needsCard && (
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kart Numarası</label>
            <input type="text" placeholder="1234 5678 9012 3456" maxLength={19} value={card.number} onChange={handleCardNumberChange} className="form-input w-full font-mono font-bold" />
          </div>
          <div className="col-span-2">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kart Üzerindeki İsim</label>
            <input type="text" placeholder="AD SOYAD" value={card.holder} onChange={(e) => setCard(p => ({ ...p, holder: e.target.value.replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ\s]/g, '') }))} className="form-input w-full font-semibold uppercase" />
          </div>
          <div className="col-span-1">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Son Kullanma</label>
            <input type="text" placeholder="AA/YY" maxLength={5} value={card.expiry} onChange={(e) => {
              const clean = e.target.value.replace(/\D/g, '');
              setCard(p => ({ ...p, expiry: clean.length > 2 ? `${clean.substring(0, 2)}/${clean.substring(2, 4)}` : clean }));
            }} className="form-input w-full font-mono font-bold" />
          </div>
          <div className="col-span-1">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">CVV</label>
            <input type="text" placeholder="•••" maxLength={3} value={card.cvv} onChange={(e) => setCard(p => ({ ...p, cvv: e.target.value.replace(/\D/g, '') }))} onFocus={() => setIsCardFlipped(true)} onBlur={() => setIsCardFlipped(false)} className="form-input w-full font-mono font-bold" />
          </div>
        </div>
      )}

      <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">{mode === 'topup' ? 'Yükleme Tutarı' : 'Bağış Tutarı'} *</label>
        <div className="relative">
          <input type="text" inputMode="decimal" placeholder="500" value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^\d]/g, ''))} className="form-input font-bold text-right pr-16 w-full block" />
          <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 select-none pointer-events-none">₺</span>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {[100, 200, 500, 1000].map((val) => (
          <button key={val} type="button" onClick={() => setAmount(String(val))} className="px-3 py-1.5 bg-slate-50 hover:bg-pine-teal/5 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:text-pine-teal transition-all cursor-pointer">
            {val.toLocaleString('tr-TR')} ₺
          </button>
        ))}
        {mode === 'wallet' && balance > 0 && (
          <button type="button" onClick={() => setAmount(String(Math.floor(balance)))} className="px-3 py-1.5 bg-pine-teal/5 hover:bg-pine-teal/10 border border-pine-teal/20 rounded-lg text-[10px] font-bold text-pine-teal transition-all cursor-pointer">
            Tüm Bakiye
          </button>
        )}
      </div>

      <button type="button" onClick={handleSubmitPayment} className="btn btn-primary w-full py-4 mt-2 flex items-center justify-center gap-2">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {mode === 'wallet' ? 'Cüzdanımdan Bağışla' : mode === 'card' ? 'Kartla Bağış Yap' : 'Güvenli Ödeme Yap'}
      </button>
    </div>
  );

  const renderOtp = () => (
    <div className="max-w-md mx-auto w-full">
      <div className="card-base md:p-8 shadow-2xl text-slate-800 text-left">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white font-black text-[10px] px-2 py-1 rounded">VISA</div>
            <span className="text-[10px] font-bold text-blue-700">Verified by Visa</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-red-600 text-white font-black text-[10px] px-2 py-1 rounded">MC</div>
            <span className="text-[10px] font-bold text-red-700">SecureCode</span>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-5 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">İşlem Tutarı</span>
            <span className="font-mono font-black text-slate-800">{Number(amount || 0).toLocaleString('tr-TR')} ₺</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Kart</span>
            <span className="font-mono font-bold text-slate-700">{card.number ? `**** **** **** ${card.number.replace(/\s/g, '').slice(-4)}` : '**** **** **** ****'}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Alıcı</span>
            <span className="font-bold text-pine-teal truncate max-w-[160px]">İyilik Ağı Vakfı</span>
          </div>
        </div>

        {errorMessage && (
          <div className="bg-red-50 border border-red-200/60 text-red-700 text-xs rounded-xl p-3.5 font-bold flex items-start gap-2 shadow-sm mb-4">
            <svg className="w-4.5 h-4.5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Onay Şifresi (4 Haneli SMS Şifresi) *</label>
          <input type="text" placeholder="_ _ _ _" value={otpCode} onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').substring(0, 4))} className="form-input text-center text-xl font-mono font-black tracking-[0.5em] w-full" maxLength={4} />
          <div className="flex justify-between items-center mt-2 text-[10px] font-semibold text-slate-400">
            <span>Kalan Süre: <strong className="font-mono text-slate-600">{formattedTime}</strong></span>
            <button type="button" onClick={() => setSecondsLeft(167)} className="text-pine-teal hover:underline cursor-pointer font-bold">Yeniden Gönder</button>
          </div>
        </div>

        <button type="button" onClick={handleOtpConfirm} className="btn btn-primary w-full py-3.5 mt-5">
          Onayla ve Ödemeyi Bitir
        </button>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="flex justify-center w-full">
      <GlassCard variant="solid" className="w-full max-w-md p-8 text-center shadow-2xl border-emerald-200 ring-2 ring-emerald-100/50 rounded-3xl">
        <div className="flex justify-center mb-5">
          <svg className="success-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark-circle checkmark-circle-fill" cx="26" cy="26" r="25" fill="none" />
            <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>

        <h2 className="text-xl font-black text-emerald-700 mb-2">
          {mode === 'topup' ? 'Para Yükleme Başarılı!' : 'Bağışınız Tamamlandı!'}
        </h2>
        <p className="text-xs text-slate-500 mb-5 leading-relaxed font-medium">
          {mode === 'wallet' ? 'Bağışınız cüzdan bakiyenizden karşılandı ve etkinliğe iletildi.' : mode === 'card' ? 'Bağışınız kartınızdan güvenli şekilde tahsil edildi ve etkinliğe iletildi.' : 'İşlem başarıyla tamamlandı ve bakiyenize eklendi.'}
        </p>

        <div className="bg-emerald-50 border border-emerald-200/50 rounded-2xl p-4 mb-6 text-left space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-500 font-medium">İşlenen Tutar</span>
            <span className="font-mono font-black text-emerald-700">{mode === 'topup' ? '+' : '-'}{tx.amount.toLocaleString('tr-TR')} ₺</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500 font-medium">{mode === 'card' ? 'Cüzdan Bakiyesi' : 'Yeni Bakiye'}</span>
            <span className="font-black text-slate-800">{tx.balance.toLocaleString('tr-TR')} ₺</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500 font-medium">İşlem Tarihi</span>
            <span className="font-mono text-slate-600">{new Date().toLocaleString('tr-TR')}</span>
          </div>
        </div>

        <div className="space-y-3">
          <button type="button" onClick={resetFlow} className="btn btn-primary w-full py-2.5 px-4 text-xs">Ödeme Ekranına Geri Dön</button>
          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={() => navigate('/')} className="btn btn-secondary py-2.5 px-4 text-xs">Ana Sayfaya Dön</button>
            <button type="button" onClick={() => navigate('/events')} className="btn btn-secondary py-2.5 px-4 text-xs">Etkinliklere Git</button>
          </div>
        </div>
      </GlassCard>
    </div>
  );

  const renderError = () => (
    <div className="flex justify-center w-full">
      <GlassCard variant="solid" className="w-full max-w-md p-8 text-center shadow-2xl border-red-200 ring-2 ring-red-100/50 rounded-3xl">
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>

        <h2 className="text-xl font-black text-red-700 mb-2">İşlem Başarısız Oldu!</h2>
        <p className="text-xs text-slate-500 mb-5 leading-relaxed font-medium">
          {errorMessage === 'Yetersiz Bakiye' ? 'Bu işlem için yeterli bakiye bulunmuyor. Cüzdana para yükleyip tekrar deneyin.' : (errorMessage || 'İşlem tamamlanamadı. Lütfen bilgilerinizi kontrol edip tekrar deneyin.')}
        </p>

        <div className="bg-red-50 border border-red-200/50 rounded-2xl p-4 mb-6 text-left space-y-2">
          <div className="flex justify-between text-xs text-red-800">
            <span className="text-slate-500 font-medium">Hata</span>
            <span className="font-mono font-bold">{errorMessage || 'İşlem Başarısız'}</span>
          </div>
          <div className="flex justify-between text-xs text-red-800">
            <span className="text-slate-500 font-medium">Mevcut Bakiye</span>
            <span className="text-slate-600">{balance.toLocaleString('tr-TR')} ₺</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button type="button" onClick={resetFlow} className="btn btn-secondary py-2.5 px-4 text-xs">Vazgeç</button>
          <button type="button" onClick={() => setStep('form')} className="btn btn-danger py-2.5 px-4 text-xs bg-red-600 text-white border-transparent">Tekrar Dene</button>
        </div>
      </GlassCard>
    </div>
  );

  return (
    <div className="page-container">
      {toast.visible && (
        <div className="fixed top-24 right-6 z-50 max-w-sm w-full bg-white border border-red-200 shadow-2xl rounded-2xl p-4 flex items-start gap-3" style={{ animation: 'slideInRight 0.25s ease-out' }}>
          <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-800">Eksik veya Hatalı Alan</p>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{toast.msg}</p>
          </div>
          <button onClick={() => setToast({ msg: '', visible: false })} className="text-slate-300 hover:text-slate-500 shrink-0 transition-colors cursor-pointer">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      <div className="header-wrapper max-w-xl mx-auto text-center">
        <span className="header-badge">Güvenli Ödeme</span>
        <h1 className="header-title">Bağış Ödeme</h1>
        <p className="header-desc">
          {mode === 'topup' ? 'Hesap cüzdanınıza para yüklemek için kredi kartı bilgilerinizi girin.' : mode === 'card' ? `“${currentEventTitle}” etkinliğine kredi kartınızla bağış yapın.` : `“${currentEventTitle}” etkinliğine cüzdan bakiyenizden bağış yapın.`}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto mb-16">
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-center">
          {currentUser && mode !== 'card' && (
            <div className="card-base text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Cüzdan Güncel Bakiyeniz</span>
              <span className="text-3xl font-black text-pine-teal">{balance.toLocaleString('tr-TR')} ₺</span>
              <p className="text-[10px] text-slate-400 mt-1 font-medium">
                {mode === 'wallet' ? 'Bağış yaptığınızda bakiye düşer.' : mode === 'card' ? 'Kartla ödemede bakiye değişmez.' : 'Para yüklediğinizde bakiye artar.'}
              </p>
            </div>
          )}

          {needsCard && (
            <CreditCardVisual
              cardNumber={card.number}
              cardHolder={card.holder ? card.holder.toUpperCase() : ''}
              expiry={card.expiry}
              cvv={card.cvv}
              isFlipped={isCardFlipped}
            />
          )}
        </div>

        <div className="lg:col-span-7">
          {step === 'form' && renderForm()}
          {step === 'otp' && renderOtp()}
          {step === 'success' && renderSuccess()}
          {step === 'error' && renderError()}
        </div>
      </div>
    </div>
  );
}