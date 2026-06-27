import React from 'react';
import GlassCard from '../components/GlassCard';

export default function Contact() {
  return (
    <div
      className="min-h-[750px] md:min-h-[800px] bg-cover bg-center flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(22, 49, 77, 0.7), rgba(22, 49, 77, 0.6)), url('https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80')`
      }}
    >
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">

        {/* Contact Info Text */}
        <div className="md:col-span-5 text-white space-y-4 text-center md:text-left">
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">İletişime Geçin</span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white text-shadow-md">
            Bize Mesaj Gönderin
          </h2>
          <p className="text-xs text-slate-200/90 leading-relaxed max-w-xs mx-auto md:mx-0 text-shadow-sm">
            Platformumuz, işbirliklerimiz, sosyal sorumluluk projeleriniz veya teknik destek talepleriniz için yandaki formu doldurarak bize hemen ulaşabilirsiniz.
          </p>
          <div className="pt-4 space-y-2 text-xs">
            <p className="flex items-center justify-center md:justify-start gap-2 text-slate-200 text-shadow-sm">
              <strong>Tel:</strong> +90 (212) 345 67 89
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2 text-slate-200 text-shadow-sm">
              <strong>E-posta:</strong> iletisim@iyilikagi.org
            </p>
          </div>
        </div>

        {/* Liquid Glass Contact Form */}
        <div className="md:col-span-7 flex justify-center w-full">
          <GlassCard
            className="liquid-glass border-white/30 text-white shadow-2xl p-6 md:p-8 backdrop-blur-3xl saturate-150 w-full max-w-md"
          >
            <div className="space-y-4">

              {/* Name Input */}
              <div>
                <label className="block text-[10px] font-bold text-slate-200 uppercase tracking-wider mb-1 text-shadow-sm">Adınız Soyadınız *</label>
                <input
                  type="text"
                  defaultValue=""
                  placeholder="Adınız ve soyadınız"
                  className="w-full px-3.5 py-2.5 bg-white/10 hover:bg-white/15 focus:bg-white/25 border border-white/20 focus:border-white/50 focus:ring-2 focus:ring-white/10 rounded-xl text-xs font-semibold text-white placeholder-white/50 outline-none transition-all"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-[10px] font-bold text-slate-200 uppercase tracking-wider mb-1 text-shadow-sm">E-posta Adresiniz *</label>
                <input
                  type="email"
                  defaultValue=""
                  placeholder="ornek@mail.com"
                  className="w-full px-3.5 py-2.5 bg-white/10 hover:bg-white/15 focus:bg-white/25 border border-white/20 focus:border-white/50 focus:ring-2 focus:ring-white/10 rounded-xl text-xs font-semibold text-white placeholder-white/50 outline-none transition-all"
                />
              </div>

              {/* Subject Dropdown */}
              <div>
                <label className="block text-[10px] font-bold text-slate-200 uppercase tracking-wider mb-1 text-shadow-sm">Konu Başlığı</label>
                <select className="w-full px-3.5 py-2.5 bg-white/10 hover:bg-white/15 focus:bg-white/25 border border-white/20 focus:border-white/50 rounded-xl text-xs font-semibold text-slate-200 outline-none transition-all cursor-pointer">
                  <option className="text-slate-800">Genel Destek / Bilgi Talebi</option>
                  <option className="text-slate-800">Kurumsal İşbirliği Vakıf/Dernek</option>
                  <option className="text-slate-800">Etkinlik / Sosyal Proje Önerisi</option>
                  <option className="text-slate-800">Hata Bildirimi / Teknik Sorun</option>
                </select>
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-[10px] font-bold text-slate-200 uppercase tracking-wider mb-1 text-shadow-sm">Mesajınız *</label>
                <textarea
                  defaultValue=""
                  placeholder="Mesajınızı buraya yazın..."
                  rows={4}
                  className="w-full px-3.5 py-2.5 bg-white/10 hover:bg-white/15 focus:bg-white/25 border border-white/20 focus:border-white/50 focus:ring-2 focus:ring-white/10 rounded-xl text-xs font-semibold text-white placeholder-white/50 outline-none transition-all resize-none"
                />
              </div>

              {/* Submit Button — görünür ama işlevsiz */}
              <button
                type="button"
                className="btn btn-accent w-full py-3 border border-white/10"
              >
                Mesajı İlet
              </button>

            </div>
          </GlassCard>
        </div>

      </div>
    </div>
  );
}
