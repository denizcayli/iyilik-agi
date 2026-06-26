import React from 'react';

export default function EventForm() {
  return (
    <div className="bg-white border border-slate-100 shadow-xl shadow-slate-200/20 p-6 md:p-8 rounded-[2rem] text-left">
      <div className="border-b border-slate-100 pb-4 mb-6">
        <h3 className="text-xs font-black text-inst-navy uppercase tracking-wider">ETKİNLİK BİLGİLERİ</h3>
      </div>

      {/* Form — uncontrolled, no onSubmit */}
      <div className="space-y-6">

        {/* Row 1: Başlık + Kategori */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">ETKİNLİK BAŞLIĞI *</label>
            <input
              type="text"
              placeholder="Örn: Geleceğe Nefes"
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200/80 focus:border-pine-teal focus:ring-1 focus:ring-pine-teal/20 rounded-2xl text-xs font-semibold text-slate-800 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">KATEGORİ *</label>
            <select className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200/80 focus:border-pine-teal focus:ring-1 focus:ring-pine-teal/20 rounded-2xl text-xs font-semibold text-slate-700 outline-none transition-all cursor-pointer">
              <option value="Çevre">Çevre</option>
              <option value="Eğitim">Eğitim</option>
              <option value="Sağlık">Sağlık</option>
              <option value="Hayvanlar">Hayvanlar</option>
              <option value="Afet">Afet</option>
              <option value="Çocuk">Çocuk</option>
              <option value="Yaşlı">Yaşlı</option>
              <option value="Su">Su</option>
            </select>
          </div>
        </div>

        {/* Row 2: Hedef Bütçe + Süre */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">HEDEF BÜTÇE (₺) *</label>
            <input
              type="number"
              placeholder="Örn: 1000000"
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200/80 focus:border-pine-teal focus:ring-1 focus:ring-pine-teal/20 rounded-2xl text-xs font-semibold text-slate-800 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">ETKİNLİK SÜRESİ (GÜN) *</label>
            <input
              type="number"
              placeholder="Örn: 100"
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200/80 focus:border-pine-teal focus:ring-1 focus:ring-pine-teal/20 rounded-2xl text-xs font-semibold text-slate-800 outline-none transition-all"
            />
          </div>
        </div>

        {/* Row 3: Görsel URL */}
        <div>
          <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">GÖRSEL URL (İSTEĞE BAĞLI)</label>
          <input
            type="url"
            placeholder="Örn: https://images.unsplash.com/..."
            className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200/80 focus:border-pine-teal focus:ring-1 focus:ring-pine-teal/20 rounded-2xl text-xs font-semibold text-slate-800 outline-none transition-all"
          />
        </div>

        {/* Row 4: Açıklama */}
        <div>
          <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">PROJE DETAYLI AÇIKLAMASI *</label>
          <textarea
            placeholder="Projenin amacı, kapsamı ve hedef kitlesi hakkında detaylı bilgi yazın..."
            rows={5}
            className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200/80 focus:border-pine-teal focus:ring-1 focus:ring-pine-teal/20 rounded-2xl text-xs font-semibold text-slate-800 outline-none transition-all resize-none"
          />
        </div>

        {/* Butonlar */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-50">
          <button
            type="button"
            className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all cursor-pointer shadow-sm"
          >
            İptal
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 px-6 py-2.5 bg-pine-teal hover:bg-emerald-800 text-white font-extrabold rounded-xl text-xs transition-all shadow-md shadow-pine-teal/10 hover:shadow-lg cursor-pointer"
          >
            <svg className="w-4 h-4 rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span>Etkinliği Başlat</span>
          </button>
        </div>

      </div>
    </div>
  );
}
