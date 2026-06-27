import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Genel Destek / Bilgi Talebi",
    message: ""
  });

  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);

    setFormData({
      name: "",
      email: "",
      subject: "Genel Destek / Bilgi Talebi",
      message: ""
    });

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div
      className="contact-container"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(22, 49, 77, 0.7), rgba(22, 49, 77, 0.6)), url('https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80')`
      }}
    >
      {showToast && (
        <div className="fixed top-24 right-6 z-50 bg-white border border-emerald-100 shadow-xl rounded-2xl p-4 max-w-sm flex items-start gap-3 toast-animate-in transition-all">
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-slate-800 text-left">
              Mesajınız İletildi!
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed text-left">
              Bizimle iletişime geçtiğiniz için teşekkür ederiz. Ekibimiz en kısa sürede tarafınıza dönüş yapacaktır.
            </p>
          </div>
          <button
            onClick={() => setShowToast(false)}
            className="text-slate-400 hover:text-slate-650 shrink-0 transition-colors cursor-pointer focus:outline-none"
            type="button"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div className="contact-grid">
        <div className="contact-info-col">
          <span className="contact-tag">İletişime Geçin</span>
          <h2 className="contact-title">
            Bize Mesaj Gönderin
          </h2>
          <p className="contact-desc">
            Platformumuz, işbirliklerimiz, sosyal sorumluluk projeleriniz veya teknik destek talepleriniz için yandaki formu doldurarak bize hemen ulaşabilirsiniz.
          </p>
          <div className="contact-details">
            <p className="contact-detail-item">
              <strong>Tel:</strong> +90 (212) 345 67 89
            </p>
            <p className="contact-detail-item">
              <strong>E-posta:</strong> iletisim@iyilikagi.org
            </p>
          </div>
        </div>

        <div className="contact-form-col">
          <GlassCard className="liquid-glass contact-glass-card">
            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="contact-input-label">Adınız Soyadınız *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Adınız ve soyadınız"
                  className="contact-form-input"
                  required
                />
              </div>

              <div>
                <label className="contact-input-label">E-posta Adresiniz *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ornek@mail.com"
                  className="contact-form-input"
                  required
                />
              </div>

              <div>
                <label className="contact-input-label">Konu Başlığı</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="contact-form-select"
                >
                  <option className="text-slate-800" value="Genel Destek / Bilgi Talebi">Genel Destek / Bilgi Talebi</option>
                  <option className="text-slate-800" value="Kurumsal İşbirliği Vakıf/Dernek">Kurumsal İşbirliği Vakıf/Dernek</option>
                  <option className="text-slate-800" value="Etkinlik / Sosyal Proje Önerisi">Etkinlik / Sosyal Proje Önerisi</option>
                  <option className="text-slate-800" value="Hata Bildirimi / Teknik Sorun">Hata Bildirimi / Teknik Sorun</option>
                </select>
              </div>

              <div>
                <label className="contact-input-label">Mesajınız *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Mesajınızı buraya yazın..."
                  rows={4}
                  className="contact-form-textarea"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-accent contact-submit-btn"
              >
                Mesajı İlet
              </button>

            </form>
          </GlassCard>
        </div>

      </div>
    </div>
  );
}
