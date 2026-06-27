import React from 'react';

export default function Login() {
  const handleVolunteerLogin = () => {
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('user', JSON.stringify({ name: 'Onur Baha Koç', email: 'koconurbaha@gmail.com', role: 'gönüllü' }));
    window.location.href = '/';
  };

  const handleAdminLogin = () => {
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('user', JSON.stringify({ name: 'Onur Baha (Admin)', email: 'admin@iyilikagi.com', role: 'admin' }));
    window.location.href = '/admin';
  };

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

          {/* Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>

            {/* Email Input */}
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-2">E-posta Adresiniz</label>
              <input
                type="email"
                placeholder="ornek@mail.com"
                defaultValue="koconurbaha@gmail.com"
                className="form-input w-full"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-2">Şifreniz</label>
              <input
                type="password"
                placeholder="••••••••"
                defaultValue="123456"
                className="form-input w-full"
              />
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleVolunteerLogin}
              className="btn btn-accent w-full py-3.5"
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

          {/* Demo Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleVolunteerLogin}
              className="btn btn-primary py-2.5 px-2 text-[10px]"
            >
              Gönüllü Giriş
            </button>
            <button
              type="button"
              onClick={handleAdminLogin}
              className="btn py-2.5 px-2 text-[10px] bg-amber-600 hover:bg-amber-700 text-white border-transparent"
            >
              Admin Giriş
            </button>
          </div>

        </div>

        {/* Info label */}
        <div className="text-center text-[10px] text-white font-medium">
          Gönüllü Giriş veya Giriş Yap butonu ile <strong className="text-white">Gönüllü</strong>, Admin Giriş butonu ile <strong className="text-white">Yönetici</strong> paneline erişebilirsiniz.
        </div>

      </div>
    </div>
  );
}
