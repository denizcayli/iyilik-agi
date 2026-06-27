import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  
  const [eventData, setEventData] = useState({
    title: '',
    category: 'Çevre',
    targetAmount: 0,
    daysLeft: 0,
    imageUrl: '',
    description: ''
  });

  // Seçilen etkinliğin verilerini yerel depolama veya json dosyasından yükler
  useEffect(() => {
    const stored = localStorage.getItem('events_list');
    if (stored) {
      try {
        const list = JSON.parse(stored);
        const found = list.find((e) => e.id === id);
        if (found) {
          setEventData(found);
          setLoading(false);
        } else {
          navigate('/admin/events');
        }
      } catch (error) {
        navigate('/admin/events');
      }
    } else {
      fetch('/events.json')
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem('events_list', JSON.stringify(data));
          const found = data.find((e) => e.id === id);
          if (found) {
            setEventData(found);
            setLoading(false);
          } else {
            navigate('/admin/events');
          }
        });
    }
  }, [id, navigate]);

  const handleChange = (field, val) => {
    setEventData((prev) => ({ ...prev, [field]: val }));
  };

  // Değişiklikleri yerel depolamaya yazar ve alt-orta toast gösterir
  const handleSave = () => {
    // Sadece başlık zorunlu — description opsiyonel
    if (!eventData.title.trim()) {
      return;
    }

    const applyUpdate = (list) => {
      const updated = list.map((e) => {
        if (e.id === id) {
          return {
            ...e,
            title: eventData.title,
            category: eventData.category,
            targetAmount: Number(eventData.targetAmount) || 0,
            daysLeft: Number(eventData.daysLeft) || 0,
            imageUrl: eventData.imageUrl,
            description: eventData.description || ''
          };
        }
        return e;
      });
      // Önce localStorage'a yaz
      localStorage.setItem('events_list', JSON.stringify(updated));
      window.dispatchEvent(new Event('dashboard-data-updated'));
      // EventsManagement açılınca göstermek için mesajı sessionStorage'a yaz
      sessionStorage.setItem('pending_toast', 'Değişiklikler kaydedildi');
      // Hemen listeye dön
      navigate('/admin/events');
    };

    const stored = localStorage.getItem('events_list');
    if (stored) {
      try {
        applyUpdate(JSON.parse(stored));
      } catch (error) {
        console.error('Kayıt hatası:', error);
      }
    } else {
      fetch('/events.json')
        .then((r) => r.json())
        .then((data) => applyUpdate(data))
        .catch((err) => console.error('Fetch hatası:', err));
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="py-20 text-center text-slate-500 font-bold text-sm">Yükleniyor...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-4xl mx-auto relative">

        {/* Fade Bildirim - Alt Orta (her zaman DOM'da, opacity ile görünüp kaybolur) */}
        <div
          style={{
            opacity: showNotification ? 1 : 0,
            transform: showNotification ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.35s ease, transform 0.35s ease',
            pointerEvents: 'none'
          }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 whitespace-nowrap"
        >
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          <span>Değişiklikler kaydedildi</span>
        </div>

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

        {/* Edit Form */}
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
                  value={eventData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="form-input w-full font-semibold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">KATEGORİ *</label>
                <select
                  value={eventData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="form-input w-full cursor-pointer"
                >
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
                  value={eventData.targetAmount}
                  onChange={(e) => handleChange('targetAmount', e.target.value)}
                  className="form-input w-full"
                />
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">ETKİNLİK SÜRESİ (GÜN) *</label>
                <input
                  type="number"
                  value={eventData.daysLeft}
                  onChange={(e) => handleChange('daysLeft', e.target.value)}
                  className="form-input w-full"
                />
              </div>
            </div>

            {/* Row 3: Görsel URL */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">GÖRSEL URL</label>
              <input
                type="url"
                value={eventData.imageUrl}
                onChange={(e) => handleChange('imageUrl', e.target.value)}
                className="form-input w-full"
              />
            </div>

            {/* Row 4: Açıklama */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">PROJE DETAYLI AÇIKLAMASI *</label>
              <textarea
                value={eventData.description}
                onChange={(e) => handleChange('description', e.target.value)}
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
                onClick={handleSave}
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
