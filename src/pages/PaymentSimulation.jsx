import React from 'react';
import CreditCardVisual from '../components/Wallet/CreditCardVisual';
import GlassCard from '../components/GlassCard';

// Sabit örnek etkinlik
const STATIC_EVENT = {
  title: 'Geleceğe Nefes: Orman Yangını Sonrası Rehabilitasyon',
  targetAmount: 10000000,
  raisedAmount: 7450000,
};

// Sabit kart verisi — görsel gösterim için
const STATIC_CARD = {
  cardNumber: '4532 1234 5678 9012',
  cardHolder: 'ONUR BAHA KOÇ',
  expiry: '12/27',
  cvv: '***',
};

export default function PaymentSimulation() {
  return (
    <div className="page-container">

      {/* Header */}
      <div className="header-wrapper max-w-xl mx-auto text-center">
        <span className="header-badge">
          Güvenli Ödeme
        </span>
        <h1 className="header-title">
          Bağış Ödeme Simülasyonu
        </h1>
        <p className="header-desc">
          "{STATIC_EVENT.title}" etkinliğine doğrudan bağış yapmak için kredi kartı bilgilerini girin.
        </p>
      </div>

      {/* ============================================================ */}
      {/* BÖLÜM 1: ANA ÖDEME FORMU */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto mb-16">

        {/* Sol: Kart Görseli + Bakiye */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-center">

          {/* Bakiye Kartı */}
          <div className="card-base text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Cüzdan Güncel Bakiyeniz</span>
            <span className="text-3xl font-black font-mono text-pine-teal">₺15.000</span>
            <p className="text-[10px] text-slate-400 mt-1 font-medium">Kart ile ödeme yaptığınızda cüzdan bakiyeniz artacaktır.</p>
          </div>

          {/* 3D Kart Görseli */}
          <CreditCardVisual
            cardNumber={STATIC_CARD.cardNumber}
            cardHolder={STATIC_CARD.cardHolder}
            expiry={STATIC_CARD.expiry}
            cvv={STATIC_CARD.cvv}
            isFlipped={false}
          />
        </div>

        {/* Sağ: Ödeme Formu */}
        <div className="lg:col-span-7">
          <div className="card-base md:p-8 space-y-5 shadow-xl shadow-slate-200/20 text-left">
            <h3 className="text-xs font-black text-inst-navy uppercase tracking-wider border-b border-slate-100 pb-4">KART BİLGİLERİ</h3>

            {/* Etkinlik bilgisi */}
            <div className="bg-pine-teal/5 border border-pine-teal/10 rounded-xl p-3 text-xs flex justify-between items-center text-slate-700 font-bold mb-2">
              <span className="text-slate-500 font-medium">Hedef Etkinlik</span>
              <span className="text-pine-teal truncate max-w-[200px]">{STATIC_EVENT.title}</span>
            </div>

            {/* Kart Numarası */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kart Numarası *</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="form-input font-mono font-bold tracking-widest w-full"
                maxLength={19}
              />
            </div>

            {/* Kart Sahibi */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kart Üzerindeki İsim *</label>
              <input
                type="text"
                placeholder="AD SOYAD"
                className="form-input font-semibold uppercase w-full"
              />
            </div>

            {/* Son Kullanma + CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Son Kullanma *</label>
                <input
                  type="text"
                  placeholder="AA/YY"
                  className="form-input font-mono font-bold w-full"
                  maxLength={5}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">CVV *</label>
                <input
                  type="text"
                  placeholder="•••"
                  className="form-input font-mono font-bold w-full"
                  maxLength={4}
                />
              </div>
            </div>

            {/* Tutar */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Bağış Tutarı (₺) *</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">₺</span>
                <input
                  type="number"
                  placeholder="500"
                  className="form-input font-mono font-bold pl-7 w-full"
                />
              </div>
            </div>

            {/* Hızlı Tutar Butonları */}
            <div className="flex gap-2 flex-wrap">
              <button type="button" className="px-3 py-1.5 bg-slate-50 hover:bg-pine-teal/5 border border-slate-200 hover:border-pine-teal/20 rounded-lg text-[10px] font-bold text-slate-600 hover:text-pine-teal transition-all cursor-pointer">₺50</button>
              <button type="button" className="px-3 py-1.5 bg-slate-50 hover:bg-pine-teal/5 border border-slate-200 hover:border-pine-teal/20 rounded-lg text-[10px] font-bold text-slate-600 hover:text-pine-teal transition-all cursor-pointer">₺100</button>
              <button type="button" className="px-3 py-1.5 bg-slate-50 hover:bg-pine-teal/5 border border-slate-200 hover:border-pine-teal/20 rounded-lg text-[10px] font-bold text-slate-600 hover:text-pine-teal transition-all cursor-pointer">₺250</button>
              <button type="button" className="px-3 py-1.5 bg-slate-50 hover:bg-pine-teal/5 border border-slate-200 hover:border-pine-teal/20 rounded-lg text-[10px] font-bold text-slate-600 hover:text-pine-teal transition-all cursor-pointer">₺500</button>
              <button type="button" className="px-3 py-1.5 bg-slate-50 hover:bg-pine-teal/5 border border-slate-200 hover:border-pine-teal/20 rounded-lg text-[10px] font-bold text-slate-600 hover:text-pine-teal transition-all cursor-pointer">₺1.000</button>
              <button type="button" className="px-3 py-1.5 bg-slate-50 hover:bg-pine-teal/5 border border-slate-200 hover:border-pine-teal/20 rounded-lg text-[10px] font-bold text-slate-600 hover:text-pine-teal transition-all cursor-pointer">₺2.000</button>
              <button type="button" className="px-3 py-1.5 bg-slate-50 hover:bg-pine-teal/5 border border-slate-200 hover:border-pine-teal/20 rounded-lg text-[10px] font-bold text-slate-600 hover:text-pine-teal transition-all cursor-pointer">₺5.000</button>
              <button type="button" className="px-3 py-1.5 bg-slate-50 hover:bg-pine-teal/5 border border-slate-200 hover:border-pine-teal/20 rounded-lg text-[10px] font-bold text-slate-600 hover:text-pine-teal transition-all cursor-pointer">₺10.000</button>
            </div>

            {/* Ödeme Butonu */}
            <button
              type="button"
              className="btn btn-primary w-full py-4 mt-2 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Güvenli Ödeme Yap ve SMS Onayla
            </button>

          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* BÖLÜM 2: 3D SECURE OTP MODAL — Sayfada her zaman görünür */}
      {/* ============================================================ */}
      <div className="max-w-md mx-auto mb-16">
        <div className="mb-4 text-center">
          <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
            📱 3D Secure — SMS Doğrulama Ekranı (Tasarım Önizleme)
          </span>
        </div>
        <div className="card-base md:p-8 shadow-2xl text-slate-800 text-left">
          {/* Visa Secure ve Mastercard logoları */}
          <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 text-white font-black text-[10px] px-2 py-1 rounded">VISA</div>
              <span className="text-[10px] font-bold text-blue-700">Verified by Visa</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-red-600 text-white font-black text-[10px] px-2 py-1 rounded">MC</div>
              <span className="text-[10px] font-bold text-red-700">SecureCode</span>
            </div>
          </div>

          {/* İşlem Bilgisi */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-5 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">İşlem Tutarı</span>
              <span className="font-mono font-black text-slate-800">₺500,00</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">Kart</span>
              <span className="font-mono font-bold text-slate-700">**** **** **** 9012</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">Alıcı</span>
              <span className="font-bold text-pine-teal truncate max-w-[160px]">İyilik Ağı Vakfı</span>
            </div>
          </div>

          {/* OTP Kod Girişi */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Onay Şifresi (SMS Şifresi) *</label>
            <input
              type="text"
              placeholder="_ _ _ _ _ _"
              className="form-input text-center text-xl font-mono font-black tracking-[0.5em] w-full"
              maxLength={6}
            />
            {/* Zamanlayıcı */}
            <div className="flex justify-between items-center mt-2 text-[10px] font-semibold text-slate-400">
              <span>Kalan Süre: <strong className="font-mono text-slate-600">02:47</strong></span>
              <button type="button" className="text-pine-teal hover:underline cursor-pointer font-bold">Yeniden Gönder</button>
            </div>
          </div>

          {/* OTP Submit Button */}
          <button
            type="button"
            className="btn btn-primary w-full py-3.5 mt-5"
          >
            Onayla ve Ödemeyi Bitir
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* BÖLÜM 3: BAŞARI EKRANI — Sayfada her zaman görünür */}
      {/* ============================================================ */}
      <div className="min-h-[300px] flex items-center justify-center py-12 px-4">
        <div className="mb-4">
          <div className="mb-4 text-center">
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              ✅ Başarı Ekranı (Tasarım Önizleme)
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center pb-16">
        <GlassCard
          variant="solid"
          className="w-full max-w-md p-8 text-center shadow-2xl border-emerald-200 ring-2 ring-emerald-100/50 rounded-3xl"
        >
          {/* Checkmark animasyonu */}
          <div className="flex justify-center mb-5">
            <svg className="success-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="checkmark-circle checkmark-circle-fill" cx="26" cy="26" r="25" fill="none" />
              <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>

          <h2 className="text-xl font-black text-emerald-700 mb-2">Bağış Başarıyla Tamamlandı!</h2>
          <p className="text-xs text-slate-500 mb-5 leading-relaxed font-medium">
            Bağışınız güvenli şekilde işlendi ve cüzdanınıza yansıtıldı.
            Sosyal sorumluluk zincirimize katkınız için teşekkür ederiz.
          </p>

          <div className="bg-emerald-50 border border-emerald-200/50 rounded-2xl p-4 mb-6 text-left space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 font-medium">Yüklenen Tutar</span>
              <span className="font-mono font-black text-emerald-700">+₺500</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 font-medium">Yeni Bakiye</span>
              <span className="font-mono font-black text-slate-800">₺15.500</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 font-medium">İşlem Tarihi</span>
              <span className="font-mono text-slate-600">26 Haz 2026 22:14</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button type="button" className="btn btn-secondary py-2.5 px-4 text-xs">
              Ana Sayfaya Dön
            </button>
            <button type="button" className="btn btn-primary py-2.5 px-4 text-xs">
              Etkinliklere Git
            </button>
          </div>
        </GlassCard>
      </div>

      {/* ============================================================ */}
      {/* BÖLÜM 4: HATA EKRANI — Sayfada her zaman görünür */}
      {/* ============================================================ */}
      <div className="min-h-[300px] flex items-center justify-center py-12 px-4">
        <div className="mb-4">
          <div className="mb-4 text-center">
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1.5 rounded-full border border-red-200">
              ❌ Hata Ekranı (Tasarım Önizleme)
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center pb-16">
        <GlassCard
          variant="solid"
          className="w-full max-w-md p-8 text-center shadow-2xl border-red-200 ring-2 ring-red-100/50 rounded-3xl"
        >
          {/* Hata ikon */}
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>

          <h2 className="text-xl font-black text-red-700 mb-2">Bağış İşlemi Başarısız Oldu!</h2>
          <p className="text-xs text-slate-500 mb-5 leading-relaxed font-medium">
            Ödeme bankanız tarafından onaylanmadı veya yetersiz bakiye sebebiyle işlem gerçekleştirilemedi.
            Lütfen kart bilgilerinizi kontrol edip tekrar deneyin.
          </p>

          <div className="bg-red-50 border border-red-200/50 rounded-2xl p-4 mb-6 text-left space-y-2">
            <div className="flex justify-between text-xs text-red-800">
              <span className="text-slate-500 font-medium">Hata Kodu</span>
              <span className="font-mono font-bold">51 - Yetersiz Bakiye</span>
            </div>
            <div className="flex justify-between text-xs text-red-800">
              <span className="text-slate-500 font-medium">İşlem Saati</span>
              <span className="font-mono text-slate-600">26 Haz 2026 22:15</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button type="button" className="btn btn-secondary py-2.5 px-4 text-xs">
              Vazgeç
            </button>
            <button type="button" className="btn btn-danger py-2.5 px-4 text-xs bg-red-600 text-white border-transparent">
              Tekrar Dene
            </button>
          </div>
        </GlassCard>
      </div>

    </div>
  );
}
