
import React, { useState, useEffect } from 'react';

// tarayıcı oturumundaki kayıtlı kullanıcı listesini okuyan yardımcı fonksiyon
const getRegisteredUsers = () => {
  const storedUsers = localStorage.getItem('registeredUsers');

  // eğer tarayıcıda kullanıcılar zaten kayıtlıysa onları çekip diziye dönüştürüyoruz
  if (storedUsers) {
    try {
      const parsedUsers = JSON.parse(storedUsers);
      if (Array.isArray(parsedUsers) && parsedUsers.length > 0) {
        return parsedUsers;
      }
    } catch (error) {
      console.error('registeredUsers parse error', error);
    }
  }

  return [];
};

export default function Login() {
  // giriş yap ve kayıt ol sekmelerinin durumunu tutuyoruz
  const [activeTab, setActiveTab] = useState('login');

  // İlk yüklemede /db.json'dan varsayılan kullanıcıları localStorage'a yükler
  useEffect(() => {
    const existing = localStorage.getItem('registeredUsers');
    if (!existing) {
      fetch('/db.json')
        .then((r) => r.json())
        .then((data) => {
          localStorage.setItem('registeredUsers', JSON.stringify(data.user || data.users));
        })
        .catch((err) => console.error('db.json yüklenemedi:', err));
    }
  }, []);

  // giriş yaparken doldurulan form alanlarının durumları
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // kayıt olurken doldurulan form alanlarının durumları
  const [name, setName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  // şifrelerin görünür olup olmadığını kontrol eden durumlar
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  // kullanıcıya gösterilecek hata veya başarı bildirim mesajı
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  // test yaparken hızlıca gönüllü bilgilerini yazdıran buton fonksiyonu
  const handleVolunteerQuickFill = () => {
    setEmail('gonullu@gmail.com');
    setPassword('123456');
    setFeedback({ type: '', message: '' });
  };

  // test yaparken hızlıca admin bilgilerini yazdıran buton fonksiyonu
  const handleAdminQuickFill = () => {
    setEmail('admin@gmail.com');
    setPassword('123456');
    setFeedback({ type: '', message: '' });
  };

  // giriş yap butonuna basıldığında çalışacak fonksiyon
  const handleLogin = (event) => {
    // sayfanın kendi kendine yenilenmesini (reload) durduruyoruz
    event.preventDefault();
    // e-posta ve şifrenin kenarındaki boşlukları siliyoruz
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // eğer e-posta veya şifre boş bırakıldıysa uyarı veriyoruz
    if (!trimmedEmail || !trimmedPassword) {
      setFeedback({ type: 'error', message: 'Kayıtlı kullanıcı bulunamamaktadır.' });
      return;
    }

    const users = getRegisteredUsers();
    const matchedUser = users.find(
      (user) => user.email === trimmedEmail && user.password === trimmedPassword
    );

    if (!matchedUser) {
      setFeedback({ type: 'error', message: 'Kayıtlı kullanıcı bulunamamaktadır.' });
      return;
    }

    // giriş başarılı olunca tarayıcı oturumuna giriş yaptı bilgisini kaydediyoruz
    localStorage.setItem('isLoggedIn', 'true');
    // kullanıcının adı, e-postası ve rolünü metne çevirip tarayıcı hafızasına yazıyoruz
    localStorage.setItem('user', JSON.stringify({
      name: matchedUser.name,
      email: matchedUser.email,
      role: matchedUser.role
    }));

    // eğer kullanıcının cüzdanı yoksa ilk kez 0 lira ile oluşturuyoruz
    const walletKey = 'wallet_' + matchedUser.email;
    if (localStorage.getItem(walletKey) === null) {
      localStorage.setItem(walletKey, '0');
    }

    window.location.href = matchedUser.role === 'admin' ? '/admin' : '/';
  };

  // yeni bir kullanıcı kayıt olma butonuna basınca çalışacak fonksiyon
  const handleRegister = (event) => {
    // sayfanın kendi kendine yenilenmesini engelliyoruz
    event.preventDefault();
    // girdi alanlarındaki gereksiz sağ-sol boşlukları siliyoruz
    const trimmedName = name.trim();
    const trimmedEmail = registerEmail.trim();
    const trimmedPassword = registerPassword.trim();

    // eğer alanlardan herhangi biri boş bırakıldıysa hata mesajı gösteriyoruz
    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      setFeedback({ type: 'error', message: 'Lütfen tüm alanları doldurun.' });
      return;
    }

    const users = getRegisteredUsers();
    const isDuplicate = users.some((user) => user.email === trimmedEmail);

    if (isDuplicate) {
      setFeedback({ type: 'error', message: 'Bu e-posta zaten kayıtlı.' });
      return;
    }

    const updatedUsers = [
      ...users,
      {
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
        role: 'gönüllü'
      }
    ];

    // yeni kullanıcı listesini tarayıcı hafızasına güncellenmiş haliyle kaydediyoruz
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    // kayıt formundaki kutuları temizliyoruz
    setName('');
    setRegisterEmail('');
    setRegisterPassword('');
    // kullanıcıyı doğrudan giriş ekranına aktarıp, yazdığı e-posta şifreyi otomatik dolduruyoruz
    setActiveTab('login');
    setEmail(trimmedEmail);
    setPassword(trimmedPassword);
    // kayıt işleminin başarılı olduğunu gösteren yeşil mesaj kutusu çıkarıyoruz
    setFeedback({ type: 'success', message: 'Kayıt başarılı, giriş yapabilirsiniz.' });
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

        {/* cam görünümlü şık giriş kartı kutusu */}
        <div className="liquid-glass border-white/40 text-slate-800 shadow-2xl p-6 md:p-8 rounded-[2rem] bg-white/80">
          {/* kartın en üstündeki logo ve başlık alanı */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-pine-teal flex items-center justify-center text-white mx-auto mb-3 shadow-md shadow-pine-teal/20 border border-white/20">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-inst-navy">İyilik Ağı Platformu</h2>
            <p className="text-xs text-slate-500 mt-1 font-semibold">Sosyal sorumluluk projelerinin dijital dünyası</p>
          </div>

          <div className="flex rounded-2xl border border-slate-200/70 bg-slate-50 p-1 mb-5">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setFeedback({ type: '', message: '' });
              }}
              className={`flex-1 rounded-xl px-3 py-2 text-[11px] font-bold uppercase tracking-wider transition-all ${activeTab === 'login' ? 'bg-white text-pine-teal shadow-sm' : 'text-slate-500'
                }`}
            >
              Giriş Yap
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setFeedback({ type: '', message: '' });
              }}
              className={`flex-1 rounded-xl px-3 py-2 text-[11px] font-bold uppercase tracking-wider transition-all ${activeTab === 'register' ? 'bg-white text-pine-teal shadow-sm' : 'text-slate-500'
                }`}
            >
              Kayıt Ol
            </button>
          </div>

          {feedback.message && (
            <div className={`mb-4 rounded-xl border px-3 py-2 text-sm ${feedback.type === 'error' ? 'border-red-200 bg-red-50 text-red-600' : 'border-emerald-200 bg-emerald-50 text-emerald-600'}`}>
              {feedback.message}
            </div>
          )}

          {activeTab === 'login' ? (
            <>
              <form className="space-y-5" onSubmit={handleLogin}>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-2">E-posta Adresiniz</label>
                  <input
                    type="email"
                    placeholder="ornek@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input w-full"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-2">Şifreniz</label>
                  <div className="relative">
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-input w-full pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                      aria-label={showLoginPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
                    >
                      {showLoginPassword ? (
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.182.05.162.05.338 0 .5C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.182z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      ) : (
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.5 12c1.392 4.675 5.325 8 10.5 8 1.672 0 3.25-.31 4.656-.87M8.706 8.706A4.5 4.5 0 0115.5 15.5m-2.91-8.79A10.47 10.47 0 0122.5 12c-1.392 4.675-5.325 8-10.5 8a10.5 10.5 0 01-4.023-.79M3 3l18 18" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn btn-accent w-full py-3.5">
                  Giriş Yap
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-slate-200/60"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider">
                  <span className="bg-slate-50 border border-slate-200/60 px-3 text-slate-500 rounded-full py-0.5">veya hızlı giriş</span>
                </div>
              </div>

              {/* şifre yazmadan hızlıca denemek için test butonları */}

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleVolunteerQuickFill}
                  className="btn btn-primary py-2.5 px-2 text-[10px]"
                >
                  Gönüllü
                </button>
                <button
                  type="button"
                  onClick={handleAdminQuickFill}
                  className="btn py-2.5 px-2 text-[10px] bg-amber-600 hover:bg-amber-700 text-white border-transparent"
                >
                  Admin
                </button>
              </div>
            </>
          ) : (
            <form className="space-y-5" onSubmit={handleRegister}>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-2">Ad Soyad</label>
                <input
                  type="text"
                  placeholder="Ad Soyad"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input w-full"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-2">E-posta Adresiniz</label>
                <input
                  type="email"
                  placeholder="ornek@mail.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="form-input w-full"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-2">Şifreniz</label>
                <div className="relative">
                  <input
                    type={showRegisterPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="form-input w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegisterPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                    aria-label={showRegisterPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
                  >
                    {showRegisterPassword ? (
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 4.638 0 9.963 7.182.05.162.05.338 0 .5C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.182z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.5 12c1.392 4.675 5.325 8 10.5 8 1.672 0 3.25-.31 4.656-.87M8.706 8.706A4.5 4.5 0 0115.5 15.5m-2.91-8.79A10.47 10.47 0 0122.5 12c-1.392 4.675-5.325 8-10.5 8a10.5 10.5 0 01-4.023-.79M3 3l18 18" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-accent w-full py-3.5">
                Kayıt Ol
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
