import React from 'react';
import WalletCard from '../components/Wallet/WalletCard';
import TransactionTable from '../components/Wallet/TransactionTable';

// Sabit kullanıcı
const STATIC_USER = { name: 'Onur Baha Koç', email: 'koconurbaha@gmail.com', role: 'gönüllü' };
const STATIC_WALLET = 15000;

// Sabit bağış işlemleri
const STATIC_DONATIONS = [
  { id: 'd1', donorName: 'Onur Baha Koç', campaignTitle: 'Geleceğe Nefes: Orman Yangını', category: 'Çevre', amount: 500, date: '2026-06-26T22:14:00Z' },
  { id: 'd2', donorName: 'Onur Baha Koç', campaignTitle: 'Köy Okullarına Bilgisayar Laboratuvarı', category: 'Eğitim', amount: 250, date: '2026-06-15T14:30:00Z' },
  { id: 'd3', donorName: 'Onur Baha Koç', campaignTitle: 'Kırsal Bölgelere Temiz Su Kuyusu', category: 'Su', amount: 2000, date: '2026-06-01T09:45:00Z' },
];

// Sabit katılınan etkinlikler
const STATIC_PARTICIPATED = [
  {
    id: 'evt-1',
    title: 'Geleceğe Nefes: Orman Yangını Sonrası Rehabilitasyon',
    category: 'Çevre',
    daysLeft: 45,
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=200&q=80',
    contributed: 500,
  },
  {
    id: 'evt-2',
    title: 'Köy Okullarına Bilgisayar Laboratuvarı',
    category: 'Eğitim',
    daysLeft: 22,
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=200&q=80',
    contributed: 250,
  },
];

const CATEGORIES = ['Tümü', 'Çevre', 'Eğitim', 'Hayvanlar', 'Su', 'Afet'];

function formatMoney(val) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(val);
}

export default function UserProfile() {
  return (
    <div className="page-container">

      {/* Header */}
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

      {/* Profil Kartları */}
      <div className="grid-cols-responsive-3 mb-10">

        {/* Kullanıcı Kartı */}
        <div className="card-base flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-pine-teal flex items-center justify-center text-white text-xl font-black shadow-md shadow-pine-teal/15 border border-white/10 shrink-0">
            OB
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-inst-navy truncate">{STATIC_USER.name}</h3>
            <p className="text-xs text-slate-400 truncate">{STATIC_USER.email}</p>
            <span className="inline-block text-[9px] font-bold px-2 py-0.5 rounded-md mt-1 border text-emerald-600 bg-emerald-50 border-emerald-100/50">
              Aktif Gönüllü
            </span>
          </div>
        </div>

        {/* Cüzdan Kartı */}
        <WalletCard walletBalance={STATIC_WALLET} />

        {/* Katkı Kartı */}
        <div className="card-base flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Toplam İyilik Katkınız</span>
            <div className="text-xl font-black font-mono text-slate-700">{formatMoney(2750)}</div>
            <p className="text-[9px] text-slate-400 mt-0.5 font-semibold">
              Toplam <strong>3</strong> adet bağışta bulundunuz.
            </p>
          </div>
        </div>
      </div>

      {/* Ana Tab Bölümü */}
      <div className="card-base space-y-6">

        {/* Tab Bar + Export Butonları */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-slate-100 pb-4">
          {/* Tab Switcher — "Bağış Geçmişim" sabit aktif */}
          <div className="flex gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200/60 w-full lg:w-auto">
            <button className="flex-1 lg:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer bg-white text-pine-teal shadow-sm">
              Bağış Geçmişim
            </button>
            <button className="flex-1 lg:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer text-slate-500 hover:text-slate-700">
              Katıldığım Etkinlikler (2)
            </button>
          </div>

          {/* Export Butonları — görünür, işlevsiz */}
          <div className="flex gap-2 w-full lg:w-auto">
            <button type="button" className="btn btn-primary flex-1 lg:flex-none gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Excel (CSV) Kaydet
            </button>
            <button type="button" className="btn btn-accent flex-1 lg:flex-none gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              PDF Raporu İndir
            </button>
          </div>
        </div>

        {/* TAB 1: Bağış Geçmişi — aktif gösterilen */}
        <div className="space-y-4">
          {/* Filtreler */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <div className="flex flex-wrap gap-1 bg-slate-50 border border-slate-200/60 p-1 rounded-xl">
              <button className="px-3 py-1 text-[9px] font-bold rounded-lg transition-all cursor-pointer bg-white text-pine-teal shadow-sm">Tümü</button>
              <button className="px-3 py-1 text-[9px] font-bold rounded-lg transition-all cursor-pointer text-slate-500 hover:text-slate-700">Çevre</button>
              <button className="px-3 py-1 text-[9px] font-bold rounded-lg transition-all cursor-pointer text-slate-500 hover:text-slate-700">Eğitim</button>
              <button className="px-3 py-1 text-[9px] font-bold rounded-lg transition-all cursor-pointer text-slate-500 hover:text-slate-700">Hayvanlar</button>
              <button className="px-3 py-1 text-[9px] font-bold rounded-lg transition-all cursor-pointer text-slate-500 hover:text-slate-700">Su</button>
              <button className="px-3 py-1 text-[9px] font-bold rounded-lg transition-all cursor-pointer text-slate-500 hover:text-slate-700">Afet</button>
            </div>
            <input
              type="text"
              placeholder="Etkinlik başlığı ara..."
              className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 focus:border-pine-teal rounded-xl text-xs font-semibold text-slate-700 outline-none transition-all w-full sm:w-48"
            />
          </div>

          {/* Tablo */}
          <TransactionTable />
        </div>

        {/* TAB 2: Katılınan Etkinlikler — altında statik göster */}
        <div className="border-t border-slate-100 pt-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Katıldığım Etkinlikler</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Katılınan Etkinlik 1 */}
            <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=200&q=80" alt="Orman" className="w-16 h-12 rounded-lg object-cover bg-slate-200 shrink-0" />
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-850 text-xs truncate">Geleceğe Nefes: Orman Yangını Sonrası Rehabilitasyon</h4>
                  <span className="text-[9px] text-slate-400 block font-semibold mt-0.5">Çevre • 45 gün kaldı</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[8px] text-slate-400 uppercase font-bold block">Katkınız</span>
                <span className="font-mono font-bold text-emerald-600 text-xs">₺500</span>
              </div>
            </div>
            {/* Katılınan Etkinlik 2 */}
            <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <img src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=200&q=80" alt="Okul" className="w-16 h-12 rounded-lg object-cover bg-slate-200 shrink-0" />
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-850 text-xs truncate">Köy Okullarına Bilgisayar Laboratuvarı</h4>
                  <span className="text-[9px] text-slate-400 block font-semibold mt-0.5">Eğitim • 22 gün kaldı</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[8px] text-slate-400 uppercase font-bold block">Katkınız</span>
                <span className="font-mono font-bold text-emerald-600 text-xs">₺250</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
