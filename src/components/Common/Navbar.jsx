import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from './Footer';

export default function Layout({ children }) {
  const location = useLocation();
  const activePath = location.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);

  const syncAuthState = useCallback(() => {
    const logged = localStorage.getItem('isLoggedIn') === 'true';

    if (logged) {
      setIsLoggedIn(true);

      const rawUser = localStorage.getItem('user');
      let userEmail = 'gonullu@gmail.com';

      if (rawUser) {
        try {
          const parsed = JSON.parse(rawUser);
          setUser(parsed);
          userEmail = parsed.email;
        } catch (e) {
          setUser({ name: 'Onur Baha Koç', email: 'gonullu@gmail.com', role: 'gönüllü' });
        }
      } else {
        setUser(null);
      }

      const storedBalance = sessionStorage.getItem('wallet_' + userEmail);
      setWalletBalance(storedBalance !== null ? Number(storedBalance) || 0 : 0);
    } else {
      setIsLoggedIn(false);
      setUser(null);
      setWalletBalance(0);
    }
  }, []);

  useEffect(() => {
    syncAuthState();
  }, [location.pathname, syncAuthState]);

  useEffect(() => {
    window.addEventListener('storage', syncAuthState);
    window.addEventListener('auth-state-changed', syncAuthState);
    return () => {
      window.removeEventListener('storage', syncAuthState);
      window.removeEventListener('auth-state-changed', syncAuthState);
    };
  }, [syncAuthState]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setIsMobileMenuOpen(false);
    window.dispatchEvent(new Event('auth-state-changed'));
    window.location.href = '/';
  };

  const walletAmount = isLoggedIn
    ? `₺${walletBalance.toLocaleString('tr-TR')}`
    : '₺0';
  const isAdmin = isLoggedIn && user && user.role === 'admin';

  return (
    <div className="app-layout">
      <header className="nav-header">
        <div className="nav-container">
          <div className="nav-wrapper">

            <Link to="/" className="nav-brand">
              <div className="nav-logo-box">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="nav-brand-text">
                İyilik <span className="text-pine-teal">Ağı</span>
              </span>
            </Link>

            <nav className="nav-menu">
              <Link to="/" className={activePath === '/' ? 'nav-item-active' : 'nav-item'}>
                Ana Sayfa
              </Link>
              <Link to="/events" className={activePath === '/events' || activePath.startsWith('/events/') ? 'nav-item-active' : 'nav-item'}>
                Etkinlikler
              </Link>
              <Link to="/about" className={activePath === '/about' ? 'nav-item-active' : 'nav-item'}>
                Hakkımızda
              </Link>
              <Link to="/contact" className={activePath === '/contact' ? 'nav-item-active' : 'nav-item'}>
                İletişim
              </Link>
              {isAdmin && (
                <Link to="/admin" className={activePath.startsWith('/admin') ? 'nav-item-admin-active' : 'nav-item-admin'}>
                  Yönetici Paneli
                </Link>
              )}
            </nav>

            <div className="nav-actions hidden md:flex">
              {isLoggedIn ? (
                <>
                  <Link to="/payment" className="nav-wallet">
                    <div className="nav-wallet-icon">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div className="nav-wallet-details">
                      <span className="nav-wallet-label">Cüzdanım</span>
                      <span className="nav-wallet-value">{walletAmount}</span>
                    </div>
                  </Link>

                  <Link to="/profile" className={activePath === '/profile' ? 'nav-profile-btn-active' : 'nav-profile-btn'} title="Profilim">
                    <span className="text-xs font-bold">{user?.name || 'Kullanıcı'}</span>
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </Link>

                  <button onClick={handleLogout} className="btn btn-secondary">
                    Çıkış Yap
                  </button>
                </>
              ) : (
                <Link to="/login" className="btn btn-primary px-5 py-2">
                  Giriş Yap
                </Link>
              )}
            </div>

            <div className="flex md:hidden items-center gap-2">
              {isLoggedIn && (
                <Link to="/payment" className="bg-slate-50 border border-slate-200/60 rounded-xl px-2.5 py-1.5 flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-slate-700">{walletAmount}</span>
                </Link>
              )}
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="nav-mobile-btn border border-slate-100">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white py-3 px-4">
            <div className="flex flex-col gap-2">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${activePath === '/' ? 'text-pine-teal bg-pine-teal/5' : 'text-slate-600 hover:bg-slate-50'}`}>
                Ana Sayfa
              </Link>
              <Link to="/events" onClick={() => setIsMobileMenuOpen(false)} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${activePath === '/events' || activePath.startsWith('/events/') ? 'text-pine-teal bg-pine-teal/5' : 'text-slate-600 hover:bg-slate-50'}`}>
                Etkinlikler
              </Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${activePath === '/about' ? 'text-pine-teal bg-pine-teal/5' : 'text-slate-600 hover:bg-slate-50'}`}>
                Hakkımızda
              </Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${activePath === '/contact' ? 'text-pine-teal bg-pine-teal/5' : 'text-slate-600 hover:bg-slate-50'}`}>
                İletişim
              </Link>
              {isAdmin && (
                <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-amber-600 hover:bg-amber-50 transition-all ${activePath.startsWith('/admin') ? 'bg-amber-50' : ''}`}>
                  Yönetici Paneli
                </Link>
              )}

              <div className="border-t border-slate-100 my-2 pt-2 flex flex-col gap-2">
                {isLoggedIn ? (
                  <>
                    <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className={`w-full py-2.5 rounded-xl text-sm font-semibold border flex items-center justify-center gap-2 transition-all ${activePath === '/profile' ? 'bg-pine-teal border-pine-teal text-white' : 'bg-white border-slate-200 text-slate-600'}`}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profilim ({user?.name || 'Gönüllü'})
                    </Link>
                    <button onClick={handleLogout} className="w-full py-2.5 rounded-xl text-sm font-semibold bg-slate-800 text-white text-center cursor-pointer">
                      Çıkış Yap
                    </button>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-2.5 rounded-xl text-sm font-semibold bg-pine-teal text-white text-center cursor-pointer">
                    Giriş Yap
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="main-content">
        {children}
      </main>

      <Footer />
    </div>
  );
}