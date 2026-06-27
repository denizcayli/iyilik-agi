
import React from 'react';


export default function CreditCardVisual({
  cardNumber = '', // kart numarası bilgisi
  cardHolder = '', // kart sahibinin adı
  expiry = '', // son kullanma tarihi
  cvv = '', // 3 haneli güvenlik kodu
  isFlipped = false // kartın arkasının dönük olup olmadığı durumu
}) {
  // kart numarasını aralara boşluk koyarak 4'lü gruplara ayırıyoruz
  const formatCardNumber = (num) => {
    const cleanNum = (num || '').replace(/\D/g, '');
    let formatted = '';
    for (let i = 0; i < 16; i++) {
      if (i > 0 && i % 4 === 0) formatted += ' ';
      if (cleanNum[i]) {
        formatted += cleanNum[i];
      } else {
        formatted += '•';
      }
    }
    return formatted;
  };

  // son kullanma tarihi
  const formatExpiry = (exp) => {
    if (!exp) return 'AA/YY';
    return exp;
  };

  // kartın arkasındaki güvenlik kodu
  const formatCvv = (val) => {
    if (!val) return 'CVV';
    return val;
  };

  return (
    <div className="card-container w-full max-w-[380px] aspect-[1.586/1] mx-auto cursor-pointer select-none">
      <div className={`card-inner w-full h-full relative ${isFlipped ? 'flipped' : ''}`}>

        {/* kartın ön yüzü */}
        <div className="card-front w-full h-full absolute inset-0 bg-gradient-to-br from-pine-teal via-[#0e584d] to-inst-navy text-white p-6 shadow-2xl flex flex-col justify-between overflow-hidden">

          <div className="absolute -right-20 -top-20 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -left-20 -bottom-20 w-48 h-48 bg-ember-coral/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex justify-between items-start z-10 text-left">

            <div className="w-12 h-9 bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-100 rounded-md relative overflow-hidden shadow-inner border border-yellow-300/30">
              <div className="absolute inset-0 grid grid-cols-3 gap-[1px] p-[2px]">
                <div className="border-r border-b border-yellow-600/40"></div>
                <div className="border-r border-b border-yellow-600/40"></div>
                <div className="border-b border-yellow-600/40"></div>
                <div className="border-r border-yellow-600/40"></div>
                <div className="border-r border-yellow-600/40"></div>
                <div className="border-yellow-600/40"></div>
              </div>
              <div className="absolute w-4 h-4 rounded-full border border-yellow-700/30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400/20"></div>
            </div>


            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-wider text-white/60 font-medium">İyilik Ağı</span>
              <div className="flex gap-1 mt-1 text-white/80">
                <svg className="w-6 h-6 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>


          <div className="z-10 mt-2 text-left">
            <div className="text-xl md:text-2xl font-mono tracking-widest text-shadow-md text-white/90 drop-shadow">
              {formatCardNumber(cardNumber)}
            </div>
          </div>

          {/* isim tarih ve logo alanı */}
          <div className="flex justify-between items-end z-10 text-left">
            <div className="flex-1 mr-4 overflow-hidden">
              <div className="text-[9px] uppercase tracking-wider text-white/50 font-semibold mb-0.5">Kart Sahibi</div>
              <div className="text-xs md:text-sm font-medium tracking-wide uppercase truncate text-white/90">
                {cardHolder.trim() ? cardHolder : 'KART SAHİBİ'}
              </div>
            </div>

            <div className="flex flex-col items-center mr-6">
              <div className="text-[9px] uppercase tracking-wider text-white/50 font-semibold mb-0.5">GEÇ. TAR.</div>
              <div className="text-xs md:text-sm font-mono font-medium text-white/90">
                {formatExpiry(expiry)}
              </div>
            </div>


            <div className="flex relative w-10 h-7 shrink-0">
              <div className="w-6 h-6 rounded-full bg-ember-coral/80 absolute left-0 z-0 mix-blend-screen"></div>
              <div className="w-6 h-6 rounded-full bg-amber-500/80 absolute right-0 z-10 mix-blend-screen"></div>
            </div>
          </div>

        </div>

        {/* kartın arka yüzü */}
        <div className="card-back w-full h-full absolute inset-0 bg-gradient-to-br from-inst-navy to-[#1f476e] text-white py-6 shadow-2xl flex flex-col justify-between overflow-hidden">

          <div className="w-full h-11 bg-slate-950/90 -mt-2"></div>

          <div className="px-6 mt-4 text-left">
            <div className="text-[8px] uppercase tracking-wider text-white/40 mb-1 font-semibold">Yetkili İmza</div>
            <div className="flex items-center">

              <div className="flex-1 h-9 bg-gradient-to-r from-slate-200 to-slate-300 rounded-l-md px-3 flex items-center text-slate-700 italic font-serif text-sm select-none pointer-events-none bg-opacity-90">
                {cardHolder.trim() ? cardHolder : 'KART SAHİBİ'}
              </div>

              <div className="w-12 h-9 bg-white text-slate-900 rounded-r-md flex items-center justify-center font-mono font-bold tracking-wider text-base border-l border-slate-300 shadow-inner">
                {formatCvv(cvv)}
              </div>
            </div>
          </div>


          <div className="px-6 mt-2 text-[7px] text-white/40 leading-normal text-left">
            Bu kart sanal bir ödeme simülasyonu amacıyla İyilik Ağı platformu için özel olarak üretilmiştir. Gerçek finansal işlemlerde kullanılamaz. Kartın kullanımı sırasında girilen hiçbir veri kaydedilmez veya saklanmaz.
          </div>

        </div>

      </div>
    </div>
  );
}
