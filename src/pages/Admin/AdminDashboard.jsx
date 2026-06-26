import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import AdminLayout from '../../components/AdminLayout';
import DashboardCards from '../../components/Admin/DashboardCards';

// Sabit aylık grafik verisi
const monthlyData = [
  { name: 'Oca', value: 2400000 },
  { name: 'Şub', value: 3800000 },
  { name: 'Mar', value: 3500000 },
  { name: 'Nis', value: 5000000 },
  { name: 'May', value: 8500000, isHighlighted: true },
  { name: 'Haz', value: 4800000 },
  { name: 'Tem', value: 6200000 },
];

// Sabit son bağışlar
const STATIC_DONATIONS = [
  { id: 'd1', donorName: 'Mehmet Yılmaz', campaignTitle: 'Geleceğe Nefes: Orman Yangını', amount: 500, timeAgo: '2 dk önce' },
  { id: 'd2', donorName: 'Ayşe Kaya', campaignTitle: 'Köy Okullarına Lab.', amount: 250, timeAgo: '15 dk önce' },
  { id: 'd3', donorName: 'Onur Baha Koç', campaignTitle: 'Sokak Hayvanları Mobil Klinik', amount: 1000, timeAgo: '1 sa önce' },
  { id: 'd4', donorName: 'Fatma Demir', campaignTitle: 'Temiz Su Kuyusu', amount: 150, timeAgo: '3 sa önce' },
  { id: 'd5', donorName: 'Ali Çelik', campaignTitle: 'Deprem Bölgesi Okul', amount: 750, timeAgo: '1 gün önce' },
];



export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-8">

        {/* Header bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-left">
            <h1 className="text-2xl font-extrabold text-inst-navy tracking-tight">Kontrol Paneli</h1>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">Sistem genel görünümü ve güncel bağış metrikleri.</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto self-stretch sm:self-auto justify-end">
            {/* Arama */}
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Ara..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-700 placeholder-slate-400 focus:border-pine-teal focus:ring-1 focus:ring-pine-teal/20 outline-none transition-all"
              />
              <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {/* Bildirim Zili */}
            <button className="p-2 bg-white border border-slate-200/80 hover:border-slate-300 text-slate-500 rounded-xl transition-all relative shrink-0 cursor-pointer">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="w-2 h-2 rounded-full bg-ember-coral absolute top-1.5 right-1.5 border border-white"></span>
            </button>
          </div>
        </div>

        {/* 3 Metrik Kartı — sabit değerler */}
        <DashboardCards />

        {/* Ana Grid: Grafik + Son Bağışlar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Aylık Trend Grafiği */}
          <div className="lg:col-span-8 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
            <div>
              <h3 className="text-xs font-black text-inst-navy uppercase tracking-wider">AYLIK BAĞIŞ TRENDİ</h3>
              <p className="text-[10px] text-slate-400 font-medium">Aylara göre toplanan toplam bağış verisi.</p>
            </div>
            <div className="h-80 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F8FAFC" />
                  <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 'bold' }} axisLine={{ stroke: '#F1F5F9' }} tickLine={false} />
                  <YAxis tick={{ fill: '#94A3B8', fontSize: 9, fontFamily: 'monospace' }} axisLine={{ stroke: '#F1F5F9' }} tickLine={false} tickFormatter={(val) => `${val / 1000000}M`} />
                  <Tooltip
                    formatter={(value) => [value.toLocaleString('tr-TR') + ' ₺', 'Bağış']}
                    contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', border: '1px solid #E2E8F0', borderRadius: '1rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', fontSize: '11px', fontWeight: 'bold', color: '#1E293B' }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={36}>
                    {monthlyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.isHighlighted ? '#0B6E5F' : '#E2E8F0'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Son Bağışlar — 5 sabit satır */}
          <div className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
            <div>
              <h3 className="text-xs font-black text-inst-navy uppercase tracking-wider">SON BAĞIŞLAR</h3>
              <p className="text-[10px] text-slate-400 font-medium">Sistem üzerinden yeni yapılan son işlemler.</p>
            </div>
            <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
              {/* Bağış 1 */}
              <div className="flex justify-between items-center py-2.5 border-b border-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-pine-teal/5 flex items-center justify-center font-extrabold text-xs text-pine-teal shrink-0">MY</div>
                  <div className="text-left min-w-0">
                    <span className="font-bold text-xs text-slate-700 block truncate max-w-[130px]">Mehmet Yılmaz</span>
                    <span className="text-[9px] text-slate-400 font-bold block truncate max-w-[130px]">Geleceğe Nefes: Orman Yangını</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-black font-mono text-slate-700 block">+500 ₺</span>
                  <span className="text-[9px] text-slate-400 font-semibold block">2 dk önce</span>
                </div>
              </div>
              {/* Bağış 2 */}
              <div className="flex justify-between items-center py-2.5 border-b border-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-pine-teal/5 flex items-center justify-center font-extrabold text-xs text-pine-teal shrink-0">AK</div>
                  <div className="text-left min-w-0">
                    <span className="font-bold text-xs text-slate-700 block truncate max-w-[130px]">Ayşe Kaya</span>
                    <span className="text-[9px] text-slate-400 font-bold block truncate max-w-[130px]">Köy Okullarına Lab.</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-black font-mono text-slate-700 block">+250 ₺</span>
                  <span className="text-[9px] text-slate-400 font-semibold block">15 dk önce</span>
                </div>
              </div>
              {/* Bağış 3 */}
              <div className="flex justify-between items-center py-2.5 border-b border-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-pine-teal/5 flex items-center justify-center font-extrabold text-xs text-pine-teal shrink-0">OB</div>
                  <div className="text-left min-w-0">
                    <span className="font-bold text-xs text-slate-700 block truncate max-w-[130px]">Onur Baha Koç</span>
                    <span className="text-[9px] text-slate-400 font-bold block truncate max-w-[130px]">Sokak Hayvanları Mobil Klinik</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-black font-mono text-slate-700 block">+1.000 ₺</span>
                  <span className="text-[9px] text-slate-400 font-semibold block">1 sa önce</span>
                </div>
              </div>
              {/* Bağış 4 */}
              <div className="flex justify-between items-center py-2.5 border-b border-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-pine-teal/5 flex items-center justify-center font-extrabold text-xs text-pine-teal shrink-0">FD</div>
                  <div className="text-left min-w-0">
                    <span className="font-bold text-xs text-slate-700 block truncate max-w-[130px]">Fatma Demir</span>
                    <span className="text-[9px] text-slate-400 font-bold block truncate max-w-[130px]">Temiz Su Kuyusu</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-black font-mono text-slate-700 block">+150 ₺</span>
                  <span className="text-[9px] text-slate-400 font-semibold block">3 sa önce</span>
                </div>
              </div>
              {/* Bağış 5 */}
              <div className="flex justify-between items-center py-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-pine-teal/5 flex items-center justify-center font-extrabold text-xs text-pine-teal shrink-0">AÇ</div>
                  <div className="text-left min-w-0">
                    <span className="font-bold text-xs text-slate-700 block truncate max-w-[130px]">Ali Çelik</span>
                    <span className="text-[9px] text-slate-400 font-bold block truncate max-w-[130px]">Deprem Bölgesi Okul</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-black font-mono text-slate-700 block">+750 ₺</span>
                  <span className="text-[9px] text-slate-400 font-semibold block">1 gün önce</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}
