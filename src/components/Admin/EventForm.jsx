import React from 'react';

export default function EventForm() {
  return (
    <div className="card-base md:p-8 text-left">
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
              className="form-input w-full"
            />
          </div>
          <div>
            <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">KATEGORİ *</label>
            <select className="form-input w-full cursor-pointer">
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
              className="form-input w-full"
            />
          </div>
          <div>
            <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">ETKİNLİK SÜRESİ (GÜN) *</label>
            <input
              type="number"
              placeholder="Örn: 100"
              className="form-input w-full"
            />
          </div>
        </div>

        {/* Row 3: Görsel URL */}
        <div>
          <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">GÖRSEL URL (İSTEĞE BAĞLI)</label>
          <input
            type="url"
            placeholder="Örn: https://images.unsplash.com/..."
            className="form-input w-full"
          />
        </div>

        {/* Row 4: Açıklama */}
        <div>
          <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">PROJE DETAYLI AÇIKLAMASI *</label>
          <textarea
            placeholder="Projenin amacı, kapsamı ve hedef kitlesi hakkında detaylı bilgi yazın..."
            rows={5}
            className="form-input w-full resize-none"
          />
        </div>

        {/* Butonlar */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-50">
          <button
            type="button"
            className="btn btn-secondary px-6 py-2.5"
          >
            İptal
          </button>
          <button
            type="button"
            className="btn btn-primary flex items-center gap-1.5 px-6 py-2.5"
          >
            <svg className="w-4 h-4 rotate-45 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span>Etkinliği Başlat</span>
          </button>
        </div>

      </div>
    </div>
  );
}
