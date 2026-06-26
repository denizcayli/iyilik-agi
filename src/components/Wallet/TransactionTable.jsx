import React from 'react';

// 7 sabit işlem satırı — hardcoded
const STATIC_DONATIONS = [
  { id: 'd1', donorName: 'Onur Baha Koç', campaignTitle: 'Geleceğe Nefes: Orman Yangını Sonrası Rehabilitasyon', category: 'Çevre', date: '26 Haz 2026 - 22:14', amount: '₺500' },
  { id: 'd2', donorName: 'Onur Baha Koç', campaignTitle: 'Köy Okullarına Bilgisayar Laboratuvarı', category: 'Eğitim', date: '24 Haz 2026 - 18:45', amount: '₺250' },
  { id: 'd3', donorName: 'Onur Baha Koç', campaignTitle: 'Sokak Hayvanları Mobil Klinik', category: 'Hayvanlar', date: '20 Haz 2026 - 11:30', amount: '₺1.000' },
  { id: 'd4', donorName: 'Onur Baha Koç', campaignTitle: 'Kırsal Bölgelere Temiz Su Kuyusu', category: 'Su', date: '15 Haz 2026 - 09:05', amount: '₺150' },
  { id: 'd5', donorName: 'Onur Baha Koç', campaignTitle: 'Deprem Bölgesi Çocukları için Geçici Okul', category: 'Afet', date: '10 Haz 2026 - 14:22', amount: '₺750' },
  { id: 'd6', donorName: 'Onur Baha Koç', campaignTitle: 'Yaşlı Bakım Merkezi Rehabilitasyon', category: 'Yaşlı', date: '05 Haz 2026 - 16:58', amount: '₺300' },
  { id: 'd7', donorName: 'Onur Baha Koç', campaignTitle: 'Çocuk Kanseri Destek Bağışı', category: 'Sağlık', date: '01 Haz 2026 - 08:00', amount: '₺500' },
];

const CATEGORY_CLASSES = {
  'Çevre': 'bg-emerald-50 text-emerald-700 border-emerald-100/50',
  'Eğitim': 'bg-blue-50 text-blue-700 border-blue-100/50',
  'Sağlık': 'bg-purple-50 text-purple-700 border-purple-100/50',
  'Hayvanlar': 'bg-amber-50 text-amber-700 border-amber-100/50',
  'Afet': 'bg-red-50 text-red-700 border-red-200/50',
  'Çocuk': 'bg-pink-50 text-pink-700 border-pink-100/50',
  'Yaşlı': 'bg-indigo-50 text-indigo-700 border-indigo-100/50',
  'Su': 'bg-cyan-50 text-cyan-700 border-cyan-100/50',
};

export default function TransactionTable() {
  return (
    <div className="overflow-x-auto border border-slate-100 rounded-2xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/75 text-slate-400 text-[10px] uppercase font-bold tracking-wider border-b border-slate-100">
            <th className="py-3 px-4">Bağışçı</th>
            <th className="py-3 px-4">Etkinlik Başlığı</th>
            <th className="py-3 px-4">Kategori</th>
            <th className="py-3 px-4">Tarih</th>
            <th className="py-3 px-4 text-right">Miktar</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-xs text-slate-600 font-medium">
          {/* Satır 1 */}
          <tr className="hover:bg-slate-50/50 transition-colors">
            <td className="py-3.5 px-4 font-bold text-slate-700">Onur Baha Koç</td>
            <td className="py-3.5 px-4 max-w-xs md:max-w-md truncate text-inst-navy font-bold">Geleceğe Nefes: Orman Yangını Sonrası Rehabilitasyon</td>
            <td className="py-3.5 px-4">
              <span className="inline-block px-2.5 py-1 rounded-lg border text-[9px] font-bold bg-emerald-50 text-emerald-700 border-emerald-100/50">Çevre</span>
            </td>
            <td className="py-3.5 px-4 text-slate-400 font-medium">26 Haz 2026 - 22:14</td>
            <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-600">+₺500</td>
          </tr>

          {/* Satır 2 */}
          <tr className="hover:bg-slate-50/50 transition-colors">
            <td className="py-3.5 px-4 font-bold text-slate-700">Onur Baha Koç</td>
            <td className="py-3.5 px-4 max-w-xs md:max-w-md truncate text-inst-navy font-bold">Köy Okullarına Bilgisayar Laboratuvarı</td>
            <td className="py-3.5 px-4">
              <span className="inline-block px-2.5 py-1 rounded-lg border text-[9px] font-bold bg-blue-50 text-blue-700 border-blue-100/50">Eğitim</span>
            </td>
            <td className="py-3.5 px-4 text-slate-400 font-medium">24 Haz 2026 - 18:45</td>
            <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-600">+₺250</td>
          </tr>

          {/* Satır 3 */}
          <tr className="hover:bg-slate-50/50 transition-colors">
            <td className="py-3.5 px-4 font-bold text-slate-700">Onur Baha Koç</td>
            <td className="py-3.5 px-4 max-w-xs md:max-w-md truncate text-inst-navy font-bold">Sokak Hayvanları Mobil Klinik</td>
            <td className="py-3.5 px-4">
              <span className="inline-block px-2.5 py-1 rounded-lg border text-[9px] font-bold bg-amber-50 text-amber-700 border-amber-100/50">Hayvanlar</span>
            </td>
            <td className="py-3.5 px-4 text-slate-400 font-medium">20 Haz 2026 - 11:30</td>
            <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-600">+₺1.000</td>
          </tr>

          {/* Satır 4 */}
          <tr className="hover:bg-slate-50/50 transition-colors">
            <td className="py-3.5 px-4 font-bold text-slate-700">Onur Baha Koç</td>
            <td className="py-3.5 px-4 max-w-xs md:max-w-md truncate text-inst-navy font-bold">Kırsal Bölgelere Temiz Su Kuyusu</td>
            <td className="py-3.5 px-4">
              <span className="inline-block px-2.5 py-1 rounded-lg border text-[9px] font-bold bg-cyan-50 text-cyan-700 border-cyan-100/50">Su</span>
            </td>
            <td className="py-3.5 px-4 text-slate-400 font-medium">15 Haz 2026 - 09:05</td>
            <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-600">+₺150</td>
          </tr>

          {/* Satır 5 */}
          <tr className="hover:bg-slate-50/50 transition-colors">
            <td className="py-3.5 px-4 font-bold text-slate-700">Onur Baha Koç</td>
            <td className="py-3.5 px-4 max-w-xs md:max-w-md truncate text-inst-navy font-bold">Deprem Bölgesi Çocukları için Geçici Okul</td>
            <td className="py-3.5 px-4">
              <span className="inline-block px-2.5 py-1 rounded-lg border text-[9px] font-bold bg-red-50 text-red-700 border-red-200/50">Afet</span>
            </td>
            <td className="py-3.5 px-4 text-slate-400 font-medium">10 Haz 2026 - 14:22</td>
            <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-600">+₺750</td>
          </tr>

          {/* Satır 6 */}
          <tr className="hover:bg-slate-50/50 transition-colors">
            <td className="py-3.5 px-4 font-bold text-slate-700">Onur Baha Koç</td>
            <td className="py-3.5 px-4 max-w-xs md:max-w-md truncate text-inst-navy font-bold">Yaşlı Bakım Merkezi Rehabilitasyon</td>
            <td className="py-3.5 px-4">
              <span className="inline-block px-2.5 py-1 rounded-lg border text-[9px] font-bold bg-indigo-50 text-indigo-700 border-indigo-100/50">Yaşlı</span>
            </td>
            <td className="py-3.5 px-4 text-slate-400 font-medium">05 Haz 2026 - 16:58</td>
            <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-600">+₺300</td>
          </tr>

          {/* Satır 7 */}
          <tr className="hover:bg-slate-50/50 transition-colors">
            <td className="py-3.5 px-4 font-bold text-slate-700">Onur Baha Koç</td>
            <td className="py-3.5 px-4 max-w-xs md:max-w-md truncate text-inst-navy font-bold">Çocuk Kanseri Destek Bağışı</td>
            <td className="py-3.5 px-4">
              <span className="inline-block px-2.5 py-1 rounded-lg border text-[9px] font-bold bg-purple-50 text-purple-700 border-purple-100/50">Sağlık</span>
            </td>
            <td className="py-3.5 px-4 text-slate-400 font-medium">01 Haz 2026 - 08:00</td>
            <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-600">+₺500</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
