import React from 'react';
import { useSelector } from 'react-redux';

const CATEGORY_CLASSES = {
  'Çevre': 'bg-emerald-50 text-emerald-700 border-emerald-100/50',
  'Eğitim': 'bg-blue-50 text-blue-700 border-blue-100/50',
  'Sağlık': 'bg-purple-50 text-purple-700 border-purple-100/50',
  'Hayvanlar': 'bg-amber-50 text-amber-700 border-amber-100/50',
  'Afet': 'bg-red-50 text-red-700 border-red-200/50',
  'Çocuk': 'bg-pink-50 text-pink-700 border-pink-100/50',
  'Yaşlı': 'bg-indigo-50 text-indigo-700 border-indigo-100/50',
  'Su': 'bg-cyan-50 text-cyan-700 border-cyan-100/50',
  'Cüzdan': 'bg-slate-100 text-slate-700 border-slate-200',
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    const months = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${day} ${month} ${year} - ${hours}:${minutes}`;
  } catch (e) {
    return dateStr;
  }
};

export default function TransactionTable() {
  const transactions = useSelector((state) => state.wallet.transactions);

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
          {transactions.length > 0 ? (
            transactions.map((t) => {
              const categoryClass = CATEGORY_CLASSES[t.category] || 'bg-slate-50 text-slate-600 border-slate-100';
              const isDeposit = t.category === 'Cüzdan' || t.campaignTitle === 'Bakiye Yükleme';
              const amountPrefix = isDeposit ? '+' : '-';
              const amountColor = isDeposit ? 'text-emerald-600' : 'text-rose-655';
              
              return (
                <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-700">{t.donorName || 'Onur Baha Koç'}</td>
                  <td className="py-3.5 px-4 max-w-xs md:max-w-md truncate text-inst-navy font-bold">{t.campaignTitle}</td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2.5 py-1 rounded-lg border text-[9px] font-bold ${categoryClass}`}>{t.category}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-medium">{formatDate(t.date)}</td>
                  <td className={`py-3.5 px-4 text-right font-mono font-bold ${amountColor}`}>{amountPrefix}₺{Number(t.amount).toLocaleString('tr-TR')}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" className="py-8 text-center text-slate-400">Henüz bir işlem bulunmuyor.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
