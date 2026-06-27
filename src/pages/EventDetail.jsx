import React from 'react';
import { Link } from 'react-router-dom';

// Sabit etkinlik içeriği
const STATIC_EVENT = {
  id: 'evt-1',
  title: 'Geleceğe Nefes: Orman Yangını Sonrası Rehabilitasyon',
  description: 'Akdeniz bölgesinde yaşanan büyük orman yangınları sonrasında 50.000 fidan dikimi hedefiyle başlatılan kapsamlı doğa rehabilitasyon projesi. Proje kapsamında yöreye özgü ağaç türleri kullanılarak doğal denge korunacak, yangından zarar gören sulak alanlar ve vahşi yaşam habitatları yeniden tesis edilecektir.',
  category: 'Çevre',
  targetAmount: 10000000,
  raisedAmount: 7450000,
  daysLeft: 45,
  donorCount: 1284,
  imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
};

const PERCENTAGE = Math.min(Math.round((STATIC_EVENT.raisedAmount / STATIC_EVENT.targetAmount) * 100), 100);

// Sabit son bağışlar
const STATIC_DONATIONS = [
  { id: 'd1', donorName: 'Mehmet Yılmaz', amount: 500, date: '26 Haz 2026 • 22:14' },
  { id: 'd2', donorName: 'Ayşe Kaya', amount: 250, date: '26 Haz 2026 • 21:50' },
  { id: 'd3', donorName: 'Onur Baha Koç', amount: 1000, date: '26 Haz 2026 • 20:30' },
  { id: 'd4', donorName: 'Fatma Demir', amount: 150, date: '25 Haz 2026 • 18:45' },
  { id: 'd5', donorName: 'Ali Çelik', amount: 750, date: '25 Haz 2026 • 15:20' },
  { id: 'd6', donorName: 'Zeynep Arslan', amount: 300, date: '24 Haz 2026 • 11:05' },
];

function formatMoney(val) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(val);
}

export default function EventDetail() {
  return (
    <div className="page-container py-8">

      {/* Back button */}
      <Link
        to="/events"
        className="btn btn-secondary mb-6 inline-flex items-center gap-1.5"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
        Etkinliklere Geri Dön
      </Link>

      {/* Main Grid */}
      <div className="bento-grid items-start">

        {/* Left Column: Details */}
        <div className="md:col-span-8 space-y-6">

          {/* Banner */}
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-md border border-slate-100 bg-white">
            <img src={STATIC_EVENT.imageUrl} alt={STATIC_EVENT.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>

            {/* Category badge */}
            <span className="absolute top-6 left-6 text-xs font-bold px-3.5 py-2 rounded-xl border shadow-sm backdrop-blur-md bg-emerald-50 text-emerald-700 border-emerald-200/50">
              {STATIC_EVENT.category}
            </span>

            {/* Urgency badge */}
            <span className="absolute top-6 right-6 text-xs font-extrabold px-3 py-2 rounded-xl border shadow-sm backdrop-blur-md flex items-center gap-1.5 bg-white text-amber-600 border-amber-200">
              Son 45 Gün
            </span>
          </div>

          {/* Description */}
          <div className="card-base md:p-8 space-y-6 text-slate-800">
            <h1 className="text-xl md:text-3xl font-extrabold text-inst-navy tracking-tight leading-tight">
              {STATIC_EVENT.title}
            </h1>
            <div className="border-t border-slate-100 my-4"></div>
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Etkinlik Hakkında</h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                {STATIC_EVENT.description}
              </p>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                Bu sosyal sorumluluk etkinliği, İyilik Ağı platformu çatısı altında tamamen şeffaf ve denetlenebilir bütçeler ile yönetilmektedir. Etkinlik hedefine ulaştığında, toplanan tüm bağışlar doğrudan sahadaki lojistik ve operasyonel ekiplere aktarılarak ilgili çalışmalar başlatılacaktır.
              </p>
            </div>
          </div>

          {/* Social Share */}
          <div className="card-base space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Bu Etkinliği Paylaş</h3>
            <p className="text-xs text-slate-500">Daha fazla insana ulaşarak iyilik zincirini büyütmemize yardımcı olabilirsiniz.</p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-center">
                {/* Instagram */}
                <button className="share-btn bg-pink-50 border border-pink-200/50 hover:bg-pink-100/60 text-pink-700">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                  Instagram
                </button>
                {/* WhatsApp */}
                <a href="https://api.whatsapp.com/send?text=İyilik%20Ağı" target="_blank" rel="noopener noreferrer" className="share-btn bg-emerald-50 border border-emerald-200/50 hover:bg-emerald-100/60 text-emerald-700">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.389 9.805-9.801.002-2.623-1.023-5.086-2.88-6.946C16.32 1.999 13.861.979 11.23.979 5.827.979 1.425 5.378 1.422 10.791c-.001 1.516.4 3.003 1.161 4.33l-.955 3.486 3.58-.934z" /></svg>
                  WhatsApp
                </a>
                {/* X */}
                <a href="https://twitter.com/intent/tweet?text=İyilik%20Ağı" target="_blank" rel="noopener noreferrer" className="share-btn bg-slate-900 border border-slate-950 text-white hover:bg-black">
                  X Twitter
                </a>
                {/* Facebook */}
                <a href="https://www.facebook.com/sharer/sharer.php?u=iyilikagi.org" target="_blank" rel="noopener noreferrer" className="share-btn bg-blue-50 border border-blue-200/50 hover:bg-blue-100/60 text-blue-700">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  Facebook
                </a>
              </div>
              <div className="relative flex-1 w-full">
                <input
                  type="text"
                  readOnly
                  defaultValue="https://iyilikagi.org/events/evt-1"
                  className="w-full pl-3 pr-24 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-mono font-semibold text-slate-500 outline-none"
                />
                <button className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-pine-teal hover:bg-emerald-700 text-white font-bold rounded-lg text-[9px] transition-all cursor-pointer">
                  Kopyala
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-4 space-y-6">

          {/* Progress Card */}
          <div className="card-base shadow-md space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Etkinlik Durumu</h3>

            <div>
              <div className="flex justify-between items-end mb-1.5">
                <span className="text-xs font-semibold text-slate-500">Toplanan Tutar</span>
                <span className="text-lg font-black font-mono text-amber-500">{PERCENTAGE}%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-amber-400 transition-all duration-500" style={{ width: `${PERCENTAGE}%` }}></div>
              </div>
              <div className="flex justify-between items-center mt-2.5">
                <span className="text-base font-bold font-mono text-slate-800">{formatMoney(STATIC_EVENT.raisedAmount)}</span>
                <span className="text-xs text-slate-400">Hedef: <strong className="font-semibold font-mono text-slate-600">{formatMoney(STATIC_EVENT.targetAmount)}</strong></span>
              </div>
            </div>

            <div className="border-t border-slate-100 my-4"></div>

            {/* Countdown — sabit */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
                <span className="text-[9px] text-slate-400 uppercase font-bold block mb-1">Kalan Süre</span>
                <span className="font-mono text-xs font-bold block text-amber-500">45g 08s 22d</span>
                <span className="font-mono text-[10px] text-slate-400 block mt-0.5">36 saniye</span>
              </div>
              <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
                <span className="text-[9px] text-slate-400 uppercase font-bold block mb-1">Destekçi Sayısı</span>
                <span className="font-mono text-xs font-bold text-slate-700 block">{STATIC_EVENT.donorCount.toLocaleString('tr-TR')} Kişi</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Aktif bağışçı</span>
              </div>
            </div>

            {/* Donate & Participate Buttons */}
            <div className="space-y-3 pt-2">
              <Link
                to="/payment"
                className="btn btn-accent w-full py-3.5 text-center block"
              >
                Bu Etkinliğe Bağış Yap
              </Link>
              <button
                type="button"
                className="btn btn-primary w-full py-3.5 text-center"
              >
                Gönüllü Olarak Katıl
              </button>
            </div>
          </div>

          {/* Son Bağışlar — 6 sabit satır */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Son Bağışlar</h3>
              <span className="text-[10px] font-bold text-pine-teal bg-pine-teal/5 px-2 py-0.5 rounded-md">Canlı Akış</span>
            </div>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {/* Bağış 1 */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs hover:border-pine-teal/10 transition-all">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-pine-teal/10 flex items-center justify-center text-pine-teal font-bold text-xs shrink-0">M</div>
                  <div className="min-w-0">
                    <span className="font-bold text-slate-700 block truncate">Mehmet Yılmaz</span>
                    <span className="text-[9px] text-slate-400 block">2 dk önce</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-emerald-600 shrink-0">+₺500</span>
              </div>
              {/* Bağış 2 */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs hover:border-pine-teal/10 transition-all">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-pine-teal/10 flex items-center justify-center text-pine-teal font-bold text-xs shrink-0">A</div>
                  <div className="min-w-0">
                    <span className="font-bold text-slate-700 block truncate">Ayşe Kaya</span>
                    <span className="text-[9px] text-slate-400 block">15 dk önce</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-emerald-600 shrink-0">+₺250</span>
              </div>
              {/* Bağış 3 */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs hover:border-pine-teal/10 transition-all">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-pine-teal/10 flex items-center justify-center text-pine-teal font-bold text-xs shrink-0">O</div>
                  <div className="min-w-0">
                    <span className="font-bold text-slate-700 block truncate">Onur Baha Koç</span>
                    <span className="text-[9px] text-slate-400 block">1 sa önce</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-emerald-600 shrink-0">+₺1.000</span>
              </div>
              {/* Bağış 4 */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs hover:border-pine-teal/10 transition-all">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-pine-teal/10 flex items-center justify-center text-pine-teal font-bold text-xs shrink-0">F</div>
                  <div className="min-w-0">
                    <span className="font-bold text-slate-700 block truncate">Fatma Demir</span>
                    <span className="text-[9px] text-slate-400 block">3 sa önce</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-emerald-600 shrink-0">+₺150</span>
              </div>
              {/* Bağış 5 */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs hover:border-pine-teal/10 transition-all">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-pine-teal/10 flex items-center justify-center text-pine-teal font-bold text-xs shrink-0">A</div>
                  <div className="min-w-0">
                    <span className="font-bold text-slate-700 block truncate">Ali Çelik</span>
                    <span className="text-[9px] text-slate-400 block">1 gün önce</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-emerald-600 shrink-0">+₺750</span>
              </div>
              {/* Bağış 6 */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs hover:border-pine-teal/10 transition-all">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-pine-teal/10 flex items-center justify-center text-pine-teal font-bold text-xs shrink-0">Z</div>
                  <div className="min-w-0">
                    <span className="font-bold text-slate-700 block truncate">Zeynep Şahin</span>
                    <span className="text-[9px] text-slate-400 block">2 gün önce</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-emerald-600 shrink-0">+₺2.000</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
