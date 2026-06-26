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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Header */}
      <div className="mb-10 text-center max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-pine-teal bg-pine-teal/5 px-3 py-1.5 rounded-full inline-block mb-3">
          Güvenli Ödeme
        </span>
        <h1 className="text-2xl md:text-4xl font-extrabold text-inst-navy tracking-tight">
          Bağış Ödeme Simülasyonu
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1 font-medium">
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
          <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-6 text-center">
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
          <div className="bg-white border border-slate-100 shadow-xl shadow-slate-200/20 p-6 md:p-8 rounded-[2rem] text-left space-y-5">
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
                defaultValue=""
                placeholder="1234 5678 9012 3456"
                className="w-full px-3.5 py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-pine-teal rounded-xl text-xs font-mono font-bold text-slate-800 outline-none transition-all tracking-widest"
                maxLength={19}
              />
            </div>

            {/* Kart Sahibi */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kart Üzerindeki İsim *</label>
              <input
                type="text"
                defaultValue=""
                placeholder="AD SOYAD"
                className="w-full px-3.5 py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-pine-teal rounded-xl text-xs font-semibold text-slate-800 uppercase outline-none transition-all"
              />
            </div>

            {/* Son Kullanma + CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Son Kullanma *</label>
                <input
                  type="text"
                  defaultValue=""
                  placeholder="AA/YY"
                  className="w-full px-3.5 py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-pine-teal rounded-xl text-xs font-mono font-bold text-slate-800 outline-none transition-all"
                  maxLength={5}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">CVV *</label>
                <input
                  type="text"
                  defaultValue=""
                  placeholder="•••"
                  className="w-full px-3.5 py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-pine-teal rounded-xl text-xs font-mono font-bold text-slate-800 outline-none transition-all"
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
                  defaultValue=""
                  placeholder="500"
                  className="w-full pl-7 pr-3.5 py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-pine-teal rounded-xl text-xs font-mono font-bold text-slate-800 outline-none transition-all"
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
              className="w-full py-4 mt-2 bg-pine-teal hover:bg-emerald-800 text-white font-extrabold rounded-2xl shadow-lg shadow-pine-teal/20 hover:shadow-xl transition-all text-sm cursor-pointer border border-white/10 flex items-center justify-center gap-2"
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
        <div className="w-full p-6 md:p-8 rounded-3xl shadow-2xl border border-slate-100 bg-white text-slate-800">
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
              defaultValue=""
              placeholder="_ _ _ _ _ _"
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 focus:border-pine-teal rounded-xl text-center text-xl font-mono font-black text-slate-800 tracking-[0.5em] outline-none transition-all"
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
            className="w-full py-3.5 mt-5 bg-pine-teal hover:bg-emerald-800 text-white font-extrabold rounded-2xl shadow-md shadow-pine-teal/10 hover:shadow-lg transition-all text-sm cursor-pointer"
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
            <button type="button" className="py-2.5 px-4 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold rounded-xl text-xs hover:bg-emerald-100 transition-all cursor-pointer">
              Ana Sayfaya Dön
            </button>
            <button type="button" className="py-2.5 px-4 bg-pine-teal text-white font-bold rounded-xl text-xs hover:bg-emerald-700 transition-all cursor-pointer">
              Etkinliklere Git
            </button>
          </div>
        </GlassCard>
      </div>

    </div>
  );
}
