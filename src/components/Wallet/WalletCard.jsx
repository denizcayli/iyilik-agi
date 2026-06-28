
import React from 'react';
// buton tıklandığında ödeme sayfasına yönlendirme yapabilmek için navigate kancasını alıyoruz
import { useNavigate } from 'react-router-dom';

// kullanıcının cüzdan bakiyesini kutu şeklinde gösteren bileşen
export default function WalletCard({ walletBalance }) {
  // sayfa yönlendirmesi için react router hook'u
  const navigate = useNavigate();

  return (
    // cüzdan bakiyesini gösteren gri renkli kart kutusu
    <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 flex flex-col justify-between h-40 text-left">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block mb-0.5">CÜZDAN BAKİYEM</span>
          <span className="text-2xl font-black text-pine-teal">{walletBalance.toLocaleString('tr-TR')}₺</span>
        </div>
        <div className="w-10 h-10 rounded-xl bg-pine-teal/5 flex items-center justify-center text-pine-teal shadow-inner">
          <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
      </div>
      <button
        onClick={() => navigate('/payment')}
        className="w-full py-2.5 bg-pine-teal hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs shadow-md shadow-pine-teal/10 hover:shadow-lg transition-all text-center cursor-pointer font-sans"
      >
        Cüzdana Bakiye Yükle
      </button>
    </div>
  );
}
