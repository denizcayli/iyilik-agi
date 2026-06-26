import React from 'react';

export default function Login() {
  return (
    <div className="min-h-[750px] md:min-h-[800px] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative bg-slate-900">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.15), rgba(15, 23, 42, 0.05)), url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80')`
        }}
      />
      <div className="max-w-md w-full relative z-10 space-y-4">

        {/* Liquid Glass Login Card */}
        <div className="liquid-glass border-white/40 text-slate-800 shadow-2xl p-6 md:p-8 rounded-[2rem] bg-white/80">
          {/* Logo / Heading */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-pine-teal flex items-center justify-center text-white mx-auto mb-3 shadow-md shadow-pine-teal/20 border border-white/20">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-inst-navy">İyilik Ağı Platformu</h2>
            <p className="text-xs text-slate-500 mt-1 font-semibold">Sosyal sorumluluk projelerinin dijital dünyası</p>
          </div>

          {/* Form — uncontrolled, no onSubmit */}
          <form className="space-y-5">

            {/* Email Input */}
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-2">E-posta Adresiniz</label>
              <input
                type="email"
                placeholder="ornek@mail.com"
                defaultValue=""
                className="w-full px-4 py-3 bg-slate-50/85 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-pine-teal focus:ring-2 focus:ring-pine-teal/10 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 outline-none transition-all"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-2">Şifreniz</label>
              <input
                type="password"
                placeholder="••••••••"
                defaultValue=""
                className="w-full px-4 py-3 bg-slate-50/85 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-pine-teal focus:ring-2 focus:ring-pine-teal/10 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 outline-none transition-all"
              />
            </div>

            {/* Submit Button — görünür ama işlevsiz */}
            <button
              type="button"
              className="w-full py-3.5 px-4 bg-ember-coral hover:bg-[#c2422b] text-white font-bold rounded-xl shadow-lg shadow-ember-coral/20 hover:shadow-xl transition-all text-xs flex items-center justify-center gap-2 cursor-pointer border border-white/10"
            >
              Giriş Yap
            </button>

          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-200/60"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider">
              <span className="bg-slate-50 border border-slate-200/60 px-3 text-slate-500 rounded-full py-0.5">veya hızlı giriş</span>
            </div>
          </div>

          {/* Demo Buttons — görünür ama işlevsiz */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="py-2.5 px-2 bg-pine-teal hover:bg-emerald-700 border border-emerald-800 rounded-xl text-[10px] font-extrabold text-white transition-all text-center cursor-pointer shadow-sm hover:shadow"
            >
              Gönüllü Giriş
            </button>
            <button
              type="button"
              className="py-2.5 px-2 bg-amber-600 hover:bg-amber-700 border border-amber-700 rounded-xl text-[10px] font-extrabold text-white transition-all text-center cursor-pointer shadow-sm hover:shadow"
            >
              Admin Giriş
            </button>
          </div>

        </div>

        {/* Info label */}
        <div className="text-center text-[10px] text-white font-medium">
          Gönüllü şifresi: <strong className="text-white font-mono">123456</strong> | Yönetici şifresi: <strong className="text-white font-mono">123456</strong>
        </div>

      </div>
    </div>
  );
}
