import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents, addDonationToEventAsync } from '../store/slices/eventSlice';
import { fetchWalletData, depositMoneyAsync, makeDonationAsync } from '../store/slices/walletSlice';
import CreditCardVisual from '../components/Wallet/CreditCardVisual';
import GlassCard from '../components/GlassCard';

const formatCurrency = (value) => `₺${Number(value).toLocaleString('tr-TR')}`;

export default function PaymentSimulation() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const balance = useSelector((state) => state.wallet.balance);
  const events = useSelector((state) => state.events.list);

  const [step, setStep] = useState('form');
  const [mode, setMode] = useState(() => {
    return location.state?.eventTitle ? 'donate' : 'topup';
  });
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [resultBalance, setResultBalance] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(167);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  useEffect(() => { localStorage.setItem('pay_amount', amount); }, [amount]);

  // Giriş yapan aktif kullanıcı bilgisini okur
  const currentUser = useMemo(() => {
    try {
      const rawUser = localStorage.getItem('user');
      return rawUser ? JSON.parse(rawUser) : null;
    } catch (e) {
      return null;
    }
  }, []);

  const walletKey = useMemo(() => `wallet_${currentUser?.email || 'guest'}`, [currentUser]);

  // Yönlendirme tipine göre mod tespiti yapar
  useEffect(() => {
    setMode(location.state?.eventTitle ? 'donate' : 'topup');
  }, [location.state]);

  const currentEventTitle = useMemo(() => {
    if (mode === 'topup') return 'Cüzdan Bakiye Yükleme';
    return location.state?.eventTitle || 'Genel Bağış';
  }, [mode, location.state]);

  // Cüzdan bakiyesini getirir
  useEffect(() => {
    if (currentUser) {
      dispatch(fetchWalletData(currentUser.email));
    }
    if (events.length === 0) {
      dispatch(fetchEvents());
    }
  }, [currentUser, events.length, dispatch]);

  // 3D Secure SMS kodu geri sayım sayacı
  useEffect(() => {
    let timer;
    if (step === 'otp') {
      setSecondsLeft(167);
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (timer) clearInterval(timer); };
  }, [step]);

  const formattedTime = `${String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:${String(secondsLeft % 60).padStart(2, '0')}`;


  // Kart numarası girdisini formatlar
  const handleCardNumberChange = (e) => {
    const cleanValue = e.target.value.replace(/[^\d\s]/g, '').replace(/\s/g, '');
    let formatted = '';
    for (let i = 0; i < Math.min(cleanValue.length, 16); i++) {
      if (i > 0 && i % 4 === 0) formatted += ' ';
      formatted += cleanValue[i];
    }
    setCardNumber(formatted);
  };

  // Kart sahibinin ismini harf kısıtlamasıyla günceller
  const handleCardHolderChange = (e) => {
    setCardHolder(e.target.value.replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ\s]/g, ''));
  };

  // Son kullanma tarihini AA/YY formatına getirir
  const handleExpiryChange = (e) => {
    const cleanValue = e.target.value.replace(/\D/g, '');
    let formatted = '';
    if (cleanValue.length > 0) formatted += cleanValue.substring(0, 2);
    if (cleanValue.length > 2) formatted += '/' + cleanValue.substring(2, 4);
    setExpiryDate(formatted);
  };

  // Güvenlik kodunu günceller
  const handleCvvChange = (e) => {
    setCvv(e.target.value.replace(/\D/g, '').substring(0, 3));
  };

  // SMS onay şifresini günceller
  const handleOtpChange = (e) => {
    setOtpCode(e.target.value.replace(/\D/g, '').substring(0, 4));
  };

  // Hızlı tutar seçme butonlarının atamasını yapar
  const handleAmountQuickPick = (value) => {
    setAmount(String(value));
  };

  // Ödeme tutarını kontrol eder ve SMS onay ekranına geçer
  const handleSubmitPayment = () => {
    if (!amount || Number(amount) <= 0) {
      setErrorMessage('Lütfen geçerli bir tutar girin.');
      setStep('error');
      return;
    }
    setStep('otp');
    setErrorMessage('');
  };

  // SMS onay kodunu kontrol eder ve işlemi gerçekleştirir
  const handleOtpConfirm = () => {
    if (otpCode.length !== 4) {
      setErrorMessage('Lütfen 4 haneli SMS şifrenizi girin.');
      setStep('error');
      return;
    }
    const safeAmount = Number(amount) || 0;

    if (mode === 'donate') {
      if (currentUser && safeAmount > balance) {
        setTransactionAmount(safeAmount);
        setResultBalance(balance);
        setErrorMessage('Yetersiz Bakiye');
        setStep('error');
        return;
      }
      const nextBalance = currentUser ? balance - safeAmount : 0;

      // İlgili etkinliğin bütçe ve bağış listesini günceller
      const eventId = location.state?.eventId;
      const currentEvent = events.find((e) => e.id === eventId);
      const currentEventCategory = currentEvent ? currentEvent.category : 'Genel';

      if (currentUser) {
        dispatch(makeDonationAsync({
          amount: safeAmount,
          eventId,
          eventTitle: currentEventTitle,
          category: currentEventCategory,
          userEmail: currentUser?.email
        }));
      }

      if (eventId) {
        dispatch(addDonationToEventAsync({
          eventId,
          donationAmount: safeAmount,
          donorName: currentUser?.name || 'Gönüllü Bağışçı'
        })).then(() => {
          window.dispatchEvent(new Event('dashboard-data-updated'));
        });
      }

      setTransactionAmount(safeAmount);
      setResultBalance(nextBalance);
      setStep('success');
      return;
    }

    const nextBalance = balance + safeAmount;
    dispatch(depositMoneyAsync({
      amount: safeAmount,
      userEmail: currentUser?.email
    })).then(() => {
      window.dispatchEvent(new Event('auth-state-changed'));
    });
    setTransactionAmount(safeAmount);
    setResultBalance(nextBalance);
    setStep('success');
  };

  // İşlem akışını başa döndürür
  const resetFlow = () => {
    setStep('form');
    setOtpCode('');
    setErrorMessage('');
    setTransactionAmount(0);
    setResultBalance(0);
  };

  // Kart form alanları şablonu
  const formFields = [
    { id: 'cardNumber', label: 'Kart Numarası', placeholder: '1234 5678 9012 3456', maxLength: 19, value: cardNumber, onChange: handleCardNumberChange, className: 'col-span-2' },
    { id: 'cardHolder', label: 'Kart Üzerindeki İsim', placeholder: 'AD SOYAD', value: cardHolder, onChange: handleCardHolderChange, className: 'col-span-2' },
    { id: 'expiryDate', label: 'Son Kullanma', placeholder: 'AA/YY', maxLength: 5, value: expiryDate, onChange: handleExpiryChange, className: 'col-span-1' },
    { id: 'cvv', label: 'CVV', placeholder: '•••', maxLength: 3, value: cvv, onChange: handleCvvChange, className: 'col-span-1', onFocus: () => setIsCardFlipped(true), onBlur: () => setIsCardFlipped(false) }
  ];

  // Ana ödeme formu ekranını çizer
  const renderForm = () => (
    <div className="card-base md:p-8 space-y-5 shadow-xl shadow-slate-200/20 text-left">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <h3 className="text-xs font-black text-inst-navy uppercase tracking-wider">KART BİLGİLERİ</h3>
        <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1">
          <button
            type="button"
            onClick={() => { setMode('topup'); setStep('form'); setErrorMessage(''); }}
            className={`rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all ${mode === 'topup' ? 'bg-white text-pine-teal shadow-sm' : 'text-slate-500'}`}
          >
            Cüzdana Para Yükle
          </button>
          <button
            type="button"
            onClick={() => { setMode('donate'); setStep('form'); setErrorMessage(''); }}
            className={`rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all ${mode === 'donate' ? 'bg-white text-pine-teal shadow-sm' : 'text-slate-500'}`}
          >
            Bağış Yap
          </button>
        </div>
      </div>

      <div className="bg-pine-teal/5 border border-pine-teal/10 rounded-xl p-3 text-xs flex justify-between items-center text-slate-700 font-bold mb-2">
        <span className="text-slate-500 font-medium">Hedef Etkinlik</span>
        <span className="text-pine-teal truncate max-w-[200px]">{currentEventTitle}</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {formFields.map((field) => (
          <div key={field.id} className={field.className}>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">{field.label}</label>
            <input
              type="text"
              placeholder={field.placeholder}
              value={field.value}
              onChange={field.onChange}
              maxLength={field.maxLength}
              onFocus={field.onFocus}
              onBlur={field.onBlur}
              className={`form-input w-full ${field.id === 'cardHolder' ? 'font-semibold uppercase' : 'font-mono font-bold'}`}
            />
          </div>
        ))}
      </div>

      <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">{mode === 'donate' ? 'Bağış Tutarı' : 'Yükleme Tutarı'} *</label>
        <div className="relative">
          <input
            type="text"
            inputMode="decimal"
            placeholder="500"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^\d]/g, ''))}
            className="form-input font-bold text-right pr-16 w-full block"
          />
          <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 select-none pointer-events-none">₺</span>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {[100, 200, 500, 1000].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => handleAmountQuickPick(value)}
            className="px-3 py-1.5 bg-slate-50 hover:bg-pine-teal/5 border border-slate-200 hover:border-pine-teal/20 rounded-lg text-[10px] font-bold text-slate-600 hover:text-pine-teal transition-all cursor-pointer"
          >
            {formatCurrency(value)}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={handleSubmitPayment}
        className="btn btn-primary w-full py-4 mt-2 flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Güvenli Ödeme Yap
      </button>
    </div>
  );

  // 3D Secure onay ekranını çizer
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
            <span className="font-mono font-black text-slate-800">{formatCurrency(Number(amount || 0))}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Kart</span>
            <span className="font-mono font-bold text-slate-700">{cardNumber ? `**** **** **** ${cardNumber.replace(/\s/g, '').slice(-4)}` : '**** **** **** ****'}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Alıcı</span>
            <span className="font-bold text-pine-teal truncate max-w-[160px]">İyilik Ağı Vakfı</span>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Onay Şifresi (4 Haneli SMS Şifresi) *</label>
          <input
            type="text"
            placeholder="_ _ _ _"
            value={otpCode}
            onChange={handleOtpChange}
            className="form-input text-center text-xl font-mono font-black tracking-[0.5em] w-full"
            maxLength={4}
          />
          <div className="flex justify-between items-center mt-2 text-[10px] font-semibold text-slate-400">
            <span>Kalan Süre: <strong className="font-mono text-slate-600">{formattedTime}</strong></span>
            <button type="button" onClick={() => setSecondsLeft(167)} className="text-pine-teal hover:underline cursor-pointer font-bold">Yeniden Gönder</button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOtpConfirm}
          className="btn btn-primary w-full py-3.5 mt-5"
        >
          Onayla ve Ödemeyi Bitir
        </button>
      </div>
    </div>
  );

  // Başarılı ödeme bildirim ekranını çizer
  const renderSuccess = () => (
    <div className="flex justify-center w-full">
      <GlassCard
        variant="solid"
        className="w-full max-w-md p-8 text-center shadow-2xl border-emerald-200 ring-2 ring-emerald-100/50 rounded-3xl"
      >
        <div className="flex justify-center mb-5">
          <svg className="success-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark-circle checkmark-circle-fill" cx="26" cy="26" r="25" fill="none" />
            <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>

        <h2 className="text-xl font-black text-emerald-700 mb-2">
          {mode === 'donate' ? 'Ödeme başarılı!' : 'Para yükleme başarılı!'}
        </h2>
        <p className="text-xs text-slate-500 mb-5 leading-relaxed font-medium">
          {mode === 'donate'
            ? 'Bağışınız güvenli şekilde işlendi ve cüzdan bakiyeniz güncellendi.'
            : 'İşlem başarıyla tamamlandı ve bakiyenize eklendi.'}
        </p>

        <div className="bg-emerald-50 border border-emerald-200/50 rounded-2xl p-4 mb-6 text-left space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-500 font-medium">İşlenen Tutar</span>
            <span className="font-mono font-black text-emerald-700">{mode === 'donate' ? '-' : '+'}{formatCurrency(transactionAmount)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500 font-medium">Yeni Bakiye</span>
            <span className="font-black text-slate-800">{formatCurrency(resultBalance)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500 font-medium">İşlem Tarihi</span>
            <span className="font-mono text-slate-600">{new Date().toLocaleString('tr-TR')}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button type="button" onClick={() => navigate('/')} className="btn btn-secondary py-2.5 px-4 text-xs">
            Ana Sayfaya Dön
          </button>
          <button type="button" onClick={() => navigate('/events')} className="btn btn-primary py-2.5 px-4 text-xs">
            Etkinliklere Git
          </button>
        </div>
      </GlassCard>
    </div>
  );

  // Hata bildirim ekranını çizer
  const renderError = () => (
    <div className="flex justify-center w-full">
      <GlassCard
        variant="solid"
        className="w-full max-w-md p-8 text-center shadow-2xl border-red-200 ring-2 ring-red-100/50 rounded-3xl"
      >
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>

        <h2 className="text-xl font-black text-red-700 mb-2">İşlem Başarısız Oldu!</h2>
        <p className="text-xs text-slate-500 mb-5 leading-relaxed font-medium">
          {errorMessage === 'Yetersiz Bakiye'
            ? 'Bu işlem için yeterli bakiye bulunmuyor. Bakiyenizi artırıp tekrar deneyin.'
            : 'Ödeme bankanız tarafından onaylanmadı. Lütfen bilgilerinizi kontrol edip tekrar deneyin.'}
        </p>

        <div className="bg-red-50 border border-red-200/50 rounded-2xl p-4 mb-6 text-left space-y-2">
          <div className="flex justify-between text-xs text-red-800">
            <span className="text-slate-500 font-medium">Hata</span>
            <span className="font-mono font-bold">{errorMessage || 'İşlem Başarısız'}</span>
          </div>
          <div className="flex justify-between text-xs text-red-800">
            <span className="text-slate-500 font-medium">Mevcut Bakiye</span>
            <span className="text-slate-600">{formatCurrency(balance)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button type="button" onClick={resetFlow} className="btn btn-secondary py-2.5 px-4 text-xs">
            Vazgeç
          </button>
          <button type="button" onClick={() => setStep('form')} className="btn btn-danger py-2.5 px-4 text-xs bg-red-600 text-white border-transparent">
            Tekrar Dene
          </button>
        </div>
      </GlassCard>
    </div>
  );

  return (
    <div className="page-container">
      <div className="header-wrapper max-w-xl mx-auto text-center">
        <span className="header-badge">Güvenli Ödeme</span>
        <h1 className="header-title">Bağış Ödeme</h1>
        <p className="header-desc">
          {mode === 'topup'
            ? 'Hesap cüzdanınıza para yüklemek için kredi kartı bilgilerinizi girin.'
            : `“${currentEventTitle}” etkinliğine destek vermek için kredi kartı bilgilerini girin.`}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto mb-16">
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-center">
          <div className="card-base text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Cüzdan Güncel Bakiyeniz</span>
            <span className="text-3xl font-black text-pine-teal">{formatCurrency(balance)}</span>
            <p className="text-[10px] text-slate-400 mt-1 font-medium">
              {mode === 'donate' ? 'Bağış yaptığınızda bakiye düşer.' : 'Para yüklediğinizde bakiye artar.'}
            </p>
          </div>

          <CreditCardVisual
            cardNumber={cardNumber}
            cardHolder={cardHolder ? cardHolder.toUpperCase() : ''}
            expiry={expiryDate}
            cvv={cvv}
            isFlipped={isCardFlipped}
          />
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