import React from 'react';

export default function DonationModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white border border-slate-100 shadow-2xl rounded-3xl overflow-hidden p-6 relative text-left">

        <button className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-6">
          <span className="text-[10px] font-bold uppercase tracking-wider text-pine-teal bg-pine-teal/5 px-2.5 py-1 rounded-md inline-block mb-2">
            Bağış Yap
          </span>
          <h3 className="text-base font-extrabold text-inst-navy">Fidan Bağışı ile Doğayı Koruyun</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Cüzdan bakiyeniz üzerinden kolayca bağışınızı tamamlayın.</p>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex justify-between items-center mb-5">
          <span className="text-[11px] text-slate-500 font-bold">Mevcut Bakiyeniz</span>
          <span className="font-mono text-sm font-black text-pine-teal">₺15.000</span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Bağış Miktarını Seçin</label>
            <div className="grid grid-cols-3 gap-2">
              <button className="py-2.5 border border-pine-teal bg-pine-teal/5 text-pine-teal rounded-xl text-xs font-bold transition-all cursor-pointer">₺100</button>
              <button className="py-2.5 border border-slate-200 hover:border-pine-teal text-slate-600 hover:text-pine-teal rounded-xl text-xs font-bold transition-all cursor-pointer">₺250</button>
              <button className="py-2.5 border border-slate-200 hover:border-pine-teal text-slate-600 hover:text-pine-teal rounded-xl text-xs font-bold transition-all cursor-pointer">₺500</button>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Veya Farklı Bir Tutar Girin</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">₺</span>
              <input
                type="number"
                placeholder="Örn: 750"
                className="w-full pl-7 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-pine-teal rounded-xl text-xs font-mono font-bold text-slate-800 outline-none transition-all"
              />
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all cursor-pointer text-center">
              Vazgeç
            </button>
            <button className="flex-1 py-3 bg-pine-teal hover:bg-emerald-800 text-white font-extrabold rounded-xl text-xs transition-all cursor-pointer text-center shadow-md shadow-pine-teal/10">
              Bağışı Tamamla
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
