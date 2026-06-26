import React from 'react';

// Sabit 6 finansal kayıt satırı
const STATIC_RECORDS = [
  { id: 'r1', project: 'Geleceğe Nefes: Orman Yangını', sponsor: 2500000, raised: 7450000, spent: 5900000, status: 'Onaylandı' },
  { id: 'r2', project: 'Köy Okullarına Bilgisayar Lab.', sponsor: 150000, raised: 420000, spent: 310000, status: 'Onaylandı' },
  { id: 'r3', project: 'Sokak Hayvanları Mobil Klinik', sponsor: 0, raised: 148000, spent: 89000, status: 'Süreçte' },
  { id: 'r4', project: 'Temiz Su Kuyusu Projesi', sponsor: 50000, raised: 210000, spent: 175000, status: 'Onaylandı' },
  { id: 'r5', project: 'Deprem Bölgesi Geçici Okul', sponsor: 300000, raised: 580000, spent: 420000, status: 'Süreçte' },
  { id: 'r6', project: 'Çocuk Kanseri Destek Bağışı', sponsor: 100000, raised: 400000, spent: 398000, status: 'Onaylandı' },
];

function formatMoney(val) {
  return '₺' + new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 }).format(val);
}

export default function ReportTable() {
  return (
    <div className="space-y-8 text-left">

      {/* Tablo Başlık */}
      <div>
        <h1 className="text-2xl font-extrabold text-inst-navy tracking-tight">Finansal Raporlar</h1>
        <p className="text-xs text-slate-400 mt-0.5 font-medium">Tüm etkinliklerin sponsor geliri, toplanan fon ve harcama kalemleri.</p>
      </div>

      {/* Finansal Tablo */}
      <div className="bg-white border border-slate-100 shadow-xl shadow-slate-200/20 rounded-[2rem] overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 bg-white">
          <h3 className="text-xs font-black text-inst-navy uppercase tracking-wider">FİNANSAL ÖZET TABLOSU</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50/50 text-[10px] text-slate-400 font-extrabold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th scope="col" className="px-6 py-4">PROJE ADI</th>
                <th scope="col" className="px-6 py-4">SPONSOR GELİRİ</th>
                <th scope="col" className="px-6 py-4">TOPLANAN FON</th>
                <th scope="col" className="px-6 py-4">HARCANAN BÜTÇE</th>
                <th scope="col" className="px-6 py-4 text-center">DENETİM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {/* Satır 1 */}
              <tr className="hover:bg-slate-50/40 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-800 max-w-[220px] truncate">Geleceğe Nefes: Orman Yangını</td>
                <td className="px-6 py-4 font-mono text-slate-600">₺2.500.000</td>
                <td className="px-6 py-4 font-mono font-bold text-pine-teal">₺7.450.000</td>
                <td className="px-6 py-4 font-mono text-slate-700">₺5.900.000</td>
                <td className="px-6 py-4 text-center"><span className="inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border bg-emerald-50 text-emerald-700 border-emerald-100/50">Onayandı</span></td>
              </tr>
              {/* Satır 2 */}
              <tr className="hover:bg-slate-50/40 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-800 max-w-[220px] truncate">Köy Okullarına Bilgisayar Lab.</td>
                <td className="px-6 py-4 font-mono text-slate-600">₺150.000</td>
                <td className="px-6 py-4 font-mono font-bold text-pine-teal">₺420.000</td>
                <td className="px-6 py-4 font-mono text-slate-700">₺310.000</td>
                <td className="px-6 py-4 text-center"><span className="inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border bg-emerald-50 text-emerald-700 border-emerald-100/50">Onayandı</span></td>
              </tr>
              {/* Satır 3 */}
              <tr className="hover:bg-slate-50/40 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-800 max-w-[220px] truncate">Sokak Hayvanları Mobil Klinik</td>
                <td className="px-6 py-4 font-mono text-slate-600">₺0</td>
                <td className="px-6 py-4 font-mono font-bold text-pine-teal">₺148.000</td>
                <td className="px-6 py-4 font-mono text-slate-700">₺89.000</td>
                <td className="px-6 py-4 text-center"><span className="inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border bg-amber-50 text-amber-700 border-amber-100/50">Süreçte</span></td>
              </tr>
              {/* Satır 4 */}
              <tr className="hover:bg-slate-50/40 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-800 max-w-[220px] truncate">Temiz Su Kuyusu Projesi</td>
                <td className="px-6 py-4 font-mono text-slate-600">₺50.000</td>
                <td className="px-6 py-4 font-mono font-bold text-pine-teal">₺210.000</td>
                <td className="px-6 py-4 font-mono text-slate-700">₺175.000</td>
                <td className="px-6 py-4 text-center"><span className="inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border bg-emerald-50 text-emerald-700 border-emerald-100/50">Onayandı</span></td>
              </tr>
              {/* Satır 5 */}
              <tr className="hover:bg-slate-50/40 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-800 max-w-[220px] truncate">Deprem Bölgesi Geçici Okul</td>
                <td className="px-6 py-4 font-mono text-slate-600">₺300.000</td>
                <td className="px-6 py-4 font-mono font-bold text-pine-teal">₺580.000</td>
                <td className="px-6 py-4 font-mono text-slate-700">₺420.000</td>
                <td className="px-6 py-4 text-center"><span className="inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border bg-amber-50 text-amber-700 border-amber-100/50">Süreçte</span></td>
              </tr>
              {/* Satır 6 */}
              <tr className="hover:bg-slate-50/40 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-800 max-w-[220px] truncate">Çocuk Kanseri Destek Bağışı</td>
                <td className="px-6 py-4 font-mono text-slate-600">₺100.000</td>
                <td className="px-6 py-4 font-mono font-bold text-pine-teal">₺400.000</td>
                <td className="px-6 py-4 font-mono text-slate-700">₺398.000</td>
                <td className="px-6 py-4 text-center"><span className="inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border bg-emerald-50 text-emerald-700 border-emerald-100/50">Onayandı</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Manuel Bağış Formu — uncontrolled */}
      <div className="bg-white border border-slate-100 shadow-xl shadow-slate-200/20 p-6 md:p-8 rounded-[2rem]">
        <h3 className="text-xs font-black text-inst-navy uppercase tracking-wider border-b border-slate-100 pb-4 mb-6">MANUEL BAĞIŞ KAYDI</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Bağışçı Adı *</label>
            <input
              type="text"
              placeholder="Ad Soyad"
              className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 focus:border-pine-teal rounded-xl text-xs font-semibold text-slate-800 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Etkinlik *</label>
            <select className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 focus:border-pine-teal rounded-xl text-xs font-semibold text-slate-700 outline-none transition-all cursor-pointer">
              <option>Geleceğe Nefes: Orman Yangını</option>
              <option>Köy Okullarına Bilgisayar Lab.</option>
              <option>Sokak Hayvanları Mobil Klinik</option>
              <option>Temiz Su Kuyusu Projesi</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tutar (₺) *</label>
            <input
              type="number"
              placeholder="500"
              className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 focus:border-pine-teal rounded-xl text-xs font-semibold text-slate-800 outline-none transition-all"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-3">
          <button
            type="button"
            className="px-5 py-2.5 bg-pine-teal hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md shadow-pine-teal/10 cursor-pointer transition-all"
          >
            Bağışı Kaydet
          </button>
          <button
            type="button"
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer transition-all"
          >
            Excel'e Aktar
          </button>
        </div>
      </div>

    </div>
  );
}
