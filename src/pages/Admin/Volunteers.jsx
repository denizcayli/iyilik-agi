import React from 'react';
import AdminLayout from '../../components/AdminLayout';

const volunteerList = [
  { name: 'Deniz Çaylı', email: 'deniz@iyilikagi.com', task: 'Ağaç Dikimi', hours: 42, status: 'AKTİF' },
  { name: 'Onur Baha Koç', email: 'koconurbaha@gmail.com', task: 'Barınak Bakımı', hours: 128, status: 'AKTİF' },
  { name: 'Ayşe Yılmaz', email: 'ayse@gmail.com', task: 'Masal Saati', hours: 15, status: 'PASİF' },
  { name: 'Kemal Aydın', email: 'kaydın@gmail.com', task: 'Yemek Dağıtımı', hours: 56, status: 'AKTİF' },
  { name: 'Selin Korkmaz', email: 'selin.k@hotmail.com', task: 'Kütüphane Organizasyonu', hours: 33, status: 'AKTİF' },
  { name: 'Musa Demir', email: 'musa.d@gmail.com', task: 'Spor Koçluğu', hours: 8, status: 'PASİF' },
];

export default function Volunteers() {
  return (
    <AdminLayout>
      <div className="space-y-8 max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-left">
            <h1 className="text-2xl font-extrabold text-inst-navy tracking-tight">Gönüllü Takibi</h1>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">Kayıtlı aktif ve pasif sivil toplum gönüllülerinin takibi.</p>
          </div>
          {/* Görünür ama işlevsiz */}
          <button className="flex items-center gap-1.5 px-4 py-2.5 bg-pine-teal hover:bg-emerald-800 text-white font-extrabold rounded-xl text-xs transition-all shadow-md shadow-pine-teal/10 hover:shadow-lg cursor-pointer">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Toplu E-posta Gönder</span>
          </button>
        </div>

        {/* Tablo */}
        <div className="bg-white border border-slate-100 shadow-xl shadow-slate-200/20 rounded-[2rem] overflow-hidden text-left">
          <div className="px-6 py-5 border-b border-slate-100 bg-white">
            <h3 className="text-xs font-black text-inst-navy uppercase tracking-wider">AKTİF GÖNÜLLÜLER LİSTESİ</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50/50 text-[10px] text-slate-400 font-extrabold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th scope="col" className="px-6 py-4">GÖNÜLLÜ ADI SOYADI</th>
                  <th scope="col" className="px-6 py-4">E-POSTA</th>
                  <th scope="col" className="px-6 py-4">KAYITLI GÖREV</th>
                  <th scope="col" className="px-6 py-4">KATKI SÜRESİ (SAAT)</th>
                  <th scope="col" className="px-6 py-4 text-center">DURUM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {/* Satır 1 */}
                <tr className="hover:bg-slate-50/40 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800">Deniz Çaylı</td>
                  <td className="px-6 py-4 text-slate-500">deniz@iyilikagi.com</td>
                  <td className="px-6 py-4 text-pine-teal font-bold">Ağaç Dikimi</td>
                  <td className="px-6 py-4 text-slate-700 font-mono font-bold">42 Saat</td>
                  <td className="px-6 py-4 text-center"><span className="inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border bg-emerald-50 text-emerald-700 border-emerald-100/50">AKTİF</span></td>
                </tr>
                {/* Satır 2 */}
                <tr className="hover:bg-slate-50/40 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800">Onur Baha Koç</td>
                  <td className="px-6 py-4 text-slate-500">koconurbaha@gmail.com</td>
                  <td className="px-6 py-4 text-pine-teal font-bold">Barınak Bakımı</td>
                  <td className="px-6 py-4 text-slate-700 font-mono font-bold">128 Saat</td>
                  <td className="px-6 py-4 text-center"><span className="inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border bg-emerald-50 text-emerald-700 border-emerald-100/50">AKTİF</span></td>
                </tr>
                {/* Satır 3 */}
                <tr className="hover:bg-slate-50/40 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800">Ayşe Yılmaz</td>
                  <td className="px-6 py-4 text-slate-500">ayse@gmail.com</td>
                  <td className="px-6 py-4 text-pine-teal font-bold">Masal Saati</td>
                  <td className="px-6 py-4 text-slate-700 font-mono font-bold">15 Saat</td>
                  <td className="px-6 py-4 text-center"><span className="inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border bg-slate-50 text-slate-500 border-slate-200/50">PASİF</span></td>
                </tr>
                {/* Satır 4 */}
                <tr className="hover:bg-slate-50/40 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800">Kemal Aydın</td>
                  <td className="px-6 py-4 text-slate-500">kaydin@gmail.com</td>
                  <td className="px-6 py-4 text-pine-teal font-bold">Yemek Dağıtımı</td>
                  <td className="px-6 py-4 text-slate-700 font-mono font-bold">56 Saat</td>
                  <td className="px-6 py-4 text-center"><span className="inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border bg-emerald-50 text-emerald-700 border-emerald-100/50">AKTİF</span></td>
                </tr>
                {/* Satır 5 */}
                <tr className="hover:bg-slate-50/40 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800">Selin Korkmaz</td>
                  <td className="px-6 py-4 text-slate-500">selin.k@hotmail.com</td>
                  <td className="px-6 py-4 text-pine-teal font-bold">Kütüphane Organizasyonu</td>
                  <td className="px-6 py-4 text-slate-700 font-mono font-bold">33 Saat</td>
                  <td className="px-6 py-4 text-center"><span className="inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border bg-emerald-50 text-emerald-700 border-emerald-100/50">AKTİF</span></td>
                </tr>
                {/* Satır 6 */}
                <tr className="hover:bg-slate-50/40 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800">Musa Demir</td>
                  <td className="px-6 py-4 text-slate-500">musa.d@gmail.com</td>
                  <td className="px-6 py-4 text-pine-teal font-bold">Spor Koçluğu</td>
                  <td className="px-6 py-4 text-slate-700 font-mono font-bold">8 Saat</td>
                  <td className="px-6 py-4 text-center"><span className="inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border bg-slate-50 text-slate-500 border-slate-200/50">PASİF</span></td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
