import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

export default function EditEvent() {
  return (
    <AdminLayout>
      <div className="space-y-8 max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center pb-2 border-b border-slate-100/60">
          <div className="text-left">
            <h1 className="text-2xl font-extrabold text-inst-navy tracking-tight">Etkinliği Düzenle</h1>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">Seçilen yardım projesinin detaylarını ve hedeflerini güncelleyin.</p>
          </div>
          <Link
            to="/admin/events"
            className="btn btn-secondary px-3 py-1.5 inline-flex items-center gap-1.5 text-xs font-bold"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Geri Dön</span>
          </Link>
        </div>

        {/* Edit Form with prefilled STATIC data */}
        <div className="card-base md:p-8 text-left">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <h3 className="text-xs font-black text-inst-navy uppercase tracking-wider">KAMPANYA DETAYLARI</h3>
          </div>

          <div className="space-y-6">

            {/* Row 1: Başlık + Kategori */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">ETKİNLİK BAŞLIĞI *</label>
                <input
                  type="text"
                  defaultValue="Geleceğe Nefes: Orman Yangını Rehabilitasyonu"
                  className="form-input w-full font-semibold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">KATEGORİ *</label>
                <select defaultValue="Çevre" className="form-input w-full cursor-pointer">
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
                  defaultValue="10000000"
                  className="form-input w-full"
                />
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">ETKİNLİK SÜRESİ (GÜN) *</label>
                <input
                  type="number"
                  defaultValue="45"
                  className="form-input w-full"
                />
              </div>
            </div>

            {/* Row 3: Görsel URL */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">GÖRSEL URL</label>
              <input
                type="url"
                defaultValue="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=80&q=60"
                className="form-input w-full"
              />
            </div>

            {/* Row 4: Açıklama */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">PROJE DETAYLI AÇIKLAMASI *</label>
              <textarea
                defaultValue="Akdeniz bölgesinde meydana gelen orman yangınlarının ardından tahrip olan ekosistemin rehabilitasyonu amacıyla başlatılan fidan dikimi ve çevre düzenlemesi projesidir. Toplanan fonlar tamamen TEMA Vakfı koordinasyonunda fidan alımı ve dikim sahası lojistik operasyonları için kullanılacaktır."
                rows={5}
                className="form-input w-full resize-none"
              />
            </div>

            {/* Butonlar */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-50">
              <Link
                to="/admin/events"
                className="btn btn-secondary px-6 py-2.5"
              >
                İptal
              </Link>
              <button
                type="button"
                className="btn btn-primary flex items-center gap-1.5 px-6 py-2.5"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>Değişiklikleri Kaydet</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
