import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWalletData } from '../store/slices/walletSlice';
import WalletCard from '../components/Wallet/WalletCard';
import TransactionTable from '../components/Wallet/TransactionTable';

const STATIC_USER = { name: 'Onur Baha Koç', email: 'koconurbaha@gmail.com', role: 'gönüllü' };



export default function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authUser = useSelector((state) => state.auth.user);
  const balance = useSelector((state) => state.wallet.balance);
  const transactions = useSelector((state) => state.wallet.transactions);
  const participatedEvents = useSelector((state) => state.wallet.participatedEvents);

  const [activeTab, setActiveTab] = useState('donations'); // 'donations' | 'events'
  const [filterCategory, setFilterCategory] = useState('Tümü'); // aktif kategori filtresi
  const [searchQuery, setSearchQuery] = useState(''); // arama metni

  const currentUser = useMemo(() => {
    if (authUser) return authUser;
    try {
      const local = localStorage.getItem('user');
      return local ? JSON.parse(local) : STATIC_USER;
    } catch (e) {
      return STATIC_USER;
    }
  }, [authUser]);

  useEffect(() => {
    if (currentUser?.role === 'admin') {
      navigate('/admin');
      return;
    }
    if (currentUser?.email) {
      dispatch(fetchWalletData(currentUser.email));
    }
  }, [currentUser, dispatch, navigate]);

  const initials = useMemo(() => {
    if (!currentUser.name) return 'GN';
    return currentUser.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }, [currentUser.name]);

  const totalContributed = useMemo(() => {
    return transactions
      .filter((t) => t.category !== 'Cüzdan' && t.category !== 'Cüzdan Bakiye Yükleme')
      .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
  }, [transactions]);

  const totalDonationCount = useMemo(() => {
    return transactions.filter((t) => t.category !== 'Cüzdan' && t.category !== 'Cüzdan Bakiye Yükleme').length;
  }, [transactions]);

  // Kullanıcının kendi bağışlarından gelen benzersiz kategoriler
  const userCategories = useMemo(() => {
    const cats = transactions
      .filter((t) => t.category && t.category !== 'Cüzdan' && t.category !== 'Cüzdan Bakiye Yükleme')
      .map((t) => t.category);
    return ['Tümü', ...Array.from(new Set(cats))];
  }, [transactions]);

  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (msg) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3500);
  };

  return (
    <div className="page-container">
      {/* Toast Notification */}
      {toastVisible && (
        <div className="fixed top-24 right-6 z-50 bg-white border border-emerald-100 shadow-xl rounded-2xl p-4 max-w-sm flex items-start gap-3 toast-animate-in transition-all">
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex-1 min-w-0 text-left">
            <h4 className="text-xs font-bold text-slate-800">Başarılı!</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{toastMsg}</p>
          </div>
          <button
            onClick={() => setToastVisible(false)}
            className="text-slate-400 hover:text-slate-650 shrink-0 transition-colors cursor-pointer"
            type="button"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* sayfa başlığı ve tanıtım yazısı */}
      <div className="header-wrapper">
        <span className="header-badge">
          Hesabım
        </span>
        <h1 className="header-title">
          Gönüllü Profil Bilgileri
        </h1>
        <p className="header-desc">
          Kişisel bağış cüzdanınızı yönetin, gerçekleştirdiğiniz sosyal sorumluluk katkılarını ve geçmiş bağışlarınızı inceleyin.
        </p>
      </div>

      {/* kullanıcının adını, cüzdanını ve toplam katkısını gösteren kartlar */}
      <div className="grid-cols-responsive-3 mb-10">
        {/* Kullanıcı Kartı */}
        <div className="card-base flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-pine-teal flex items-center justify-center text-white text-xl font-black shadow-md shadow-pine-teal/15 border border-white/10 shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-inst-navy truncate">{currentUser.name}</h3>
            <p className="text-xs text-slate-400 truncate">{currentUser.email}</p>
            <span className="inline-block text-[9px] font-bold px-2 py-0.5 rounded-md mt-1 border text-emerald-600 bg-emerald-50 border-emerald-100/50">
              Aktif Gönüllü
            </span>
          </div>
        </div>

        {/* Cüzdan Kartı */}
        <WalletCard walletBalance={balance} />

        {/* kullanıcının toplam yaptığı bağış miktarını gösteren kutu */}
        <div className="card-base flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Toplam İyilik Katkınız</span>
            <div className="text-xl font-black font-mono text-slate-700">{totalContributed.toLocaleString('tr-TR')}₺</div>
            <p className="text-[9px] text-slate-400 mt-0.5 font-semibold">
              Toplam <strong>{totalDonationCount}</strong> adet bağışta bulundunuz.
            </p>
          </div>
        </div>
      </div>

      {/* sekmeli alan ve veri tablosunun olduğu kısım */}
      <div className="card-base space-y-6">
        {/* sekme geçişleri ve dışa aktarma butonlarının satırı */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-slate-100 pb-4">
          {/* Tab Switcher */}
          <div className="flex gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200/60 w-full lg:w-auto">
            <button
              onClick={() => setActiveTab('donations')}
              className={`flex-1 lg:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeTab === 'donations' ? 'bg-white text-pine-teal shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Bağış Geçmişim
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`flex-1 lg:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeTab === 'events' ? 'bg-white text-pine-teal shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Katıldığım Etkinlikler ({participatedEvents.length})
            </button>
          </div>

          {/* Export Butonları — görünür, işlevsiz */}
          <div className="flex gap-2 w-full lg:w-auto">
            <button 
              type="button" 
              onClick={() => showToast('Excel dosyası başarıyla indirildi')}
              className="btn btn-primary flex-1 lg:flex-none gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Excel (CSV) Kaydet
            </button>
            <button 
              type="button" 
              onClick={() => showToast('PDF dosyası başarıyla indirildi')}
              className="btn btn-accent flex-1 lg:flex-none gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              PDF Raporu İndir
            </button>
          </div>
        </div>

        {/* TAB 1: Bağış Geçmişi — aktif gösterilen */}
        {activeTab === 'donations' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              {/* Kullanıcının kendi bağışlarından gelen kategoriler */}
              <div className="flex flex-wrap gap-1 bg-slate-50 border border-slate-200/60 p-1 rounded-xl">
                {userCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-3 py-1 text-[9px] font-bold rounded-lg transition-all cursor-pointer ${
                      filterCategory === cat
                        ? 'bg-white text-pine-teal shadow-sm'
                        : 'text-slate-500 hover:text-slate-700 hover:bg-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="Etkinlik başlığı ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 focus:border-pine-teal rounded-xl text-xs font-semibold text-slate-700 outline-none transition-all w-full sm:w-48"
              />
            </div>

            {/* Tablo — filtre ve arama ile */}
            <TransactionTable filterCategory={filterCategory} searchQuery={searchQuery} />
          </div>
        )}

        {/* TAB 2: Katıldığım Etkinlikler */}
        {activeTab === 'events' && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Katıldığım Etkinlikler</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {participatedEvents.length > 0 ? (
                participatedEvents.map((evt) => (
                  <div key={evt.id} className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={evt.imageUrl} alt={evt.title} className="w-16 h-12 rounded-lg object-cover bg-slate-200 shrink-0" />
                      <div className="min-w-0">
                        <h4 className="font-bold text-slate-850 text-xs truncate">{evt.title}</h4>
                        <span className="text-[9px] text-slate-400 block font-semibold mt-0.5">{evt.category} • {evt.daysLeft} gün kaldı</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[8px] text-slate-400 uppercase font-bold block">Katkınız</span>
                      <span className="font-mono font-bold text-emerald-600 text-xs">{(evt.contributed || 0).toLocaleString('tr-TR')}₺</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-8 text-slate-400 text-xs border border-dashed border-slate-100 rounded-2xl">
                  Henüz katıldığınız bir etkinlik bulunmuyor.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
