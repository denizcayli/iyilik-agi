import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Sabit statik kullanıcı — giriş yapılmış hal her zaman görünür
const STATIC_USER = { name: 'Onur Baha Koç', email: 'koconurbaha@gmail.com', role: 'gönüllü' };
const STATIC_WALLET = '₺15.000';
const IS_ADMIN = STATIC_USER.role === 'admin';

export default function Layout({ children }) {
  const location = useLocation();
  const activePath = location.pathname;
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);



  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between relative overflow-x-hidden text-left">

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group shrink-0">
              <div className="w-9 h-9 rounded-xl bg-pine-teal flex items-center justify-center shadow-md shadow-pine-teal/20 group-hover:scale-105 transition-transform duration-300">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-inst-navy tracking-tight group-hover:text-pine-teal transition-colors">
                İyilik <span className="text-pine-teal">Ağı</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1 lg:space-x-2">
              <Link
                to="/"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activePath === '/'
                    ? 'text-pine-teal bg-pine-teal/5'
                    : 'text-slate-600 hover:text-pine-teal hover:bg-slate-50'
                }`}
              >
                Ana Sayfa
              </Link>
              <Link
                to="/events"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activePath === '/events' || activePath.startsWith('/events/')
                    ? 'text-pine-teal bg-pine-teal/5'
                    : 'text-slate-600 hover:text-pine-teal hover:bg-slate-50'
                }`}
              >
                Etkinlikler
              </Link>
              <Link
                to="/about"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activePath === '/about'
                    ? 'text-pine-teal bg-pine-teal/5'
                    : 'text-slate-600 hover:text-pine-teal hover:bg-slate-50'
                }`}
              >
                Hakkımızda
              </Link>
              <Link
                to="/contact"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activePath === '/contact'
                    ? 'text-pine-teal bg-pine-teal/5'
                    : 'text-slate-600 hover:text-pine-teal hover:bg-slate-50'
                }`}
              >
                İletişim
              </Link>
              {/* Yönetici Paneli — sadece admin rolünde görünür */}
              {IS_ADMIN && (
                <Link
                  to="/admin"
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold border border-transparent transition-all ${
                    activePath.startsWith('/admin')
                      ? 'text-amber-600 bg-amber-50 border-amber-200/50'
                      : 'text-amber-600 hover:bg-amber-50 hover:border-amber-200/50'
                  }`}
                >
                  Yönetici Paneli
                </Link>
              )}
            </nav>

            {/* Desktop: Logged-in Controls (sabit gönüllü kullanıcı) */}
            <div className="hidden md:flex items-center gap-3">
              {/* Cüzdan Bakiyesi */}
              <Link
                to="/payment"
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-2xl px-4 py-1.5 flex items-center gap-2 transition-all hover:border-pine-teal/20 group"
              >
                <div className="w-6 h-6 rounded-lg bg-pine-teal/10 flex items-center justify-center text-pine-teal group-hover:scale-105 transition-transform">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-slate-400 block font-medium -mb-0.5 uppercase tracking-wider">Cüzdanım</span>
                  <span className="text-xs font-bold font-mono text-slate-700">{STATIC_WALLET}</span>
                </div>
              </Link>

              {/* Profil Butonu */}
              <Link
                to="/profile"
                className={`px-3.5 h-9 rounded-xl flex items-center gap-2 border transition-all ${
                  activePath === '/profile'
                    ? 'bg-pine-teal border-pine-teal text-white'
                    : 'bg-white border-slate-200 hover:border-pine-teal text-slate-600 hover:text-pine-teal'
                }`}
                title="Profilim"
              >
                <span className="text-xs font-bold">{STATIC_USER.name}</span>
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>

              {/* Çıkış Yap Butonu */}
              <button
                onClick={() => navigate('/login')}
                className="px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-800 hover:bg-slate-900 text-white shadow-sm transition-all border border-slate-900 cursor-pointer"
              >
                Çıkış Yap
              </button>
            </div>

            {/* Mobile: Cüzdan + Hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <Link
                to="/payment"
                className="bg-slate-50 border border-slate-200/60 rounded-xl px-2.5 py-1.5 flex items-center gap-1.5"
              >
                <span className="text-[10px] font-bold font-mono text-slate-700">{STATIC_WALLET}</span>
              </Link>
              {/* Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl text-slate-600 hover:text-pine-teal hover:bg-slate-50 border border-slate-100 transition-all"
              >
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

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white py-3 px-4">
          <div className="flex flex-col gap-2">
            <Link
              to="/"
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activePath === '/' ? 'text-pine-teal bg-pine-teal/5' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Ana Sayfa
            </Link>
            <Link
              to="/events"
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activePath === '/events' || activePath.startsWith('/events/') ? 'text-pine-teal bg-pine-teal/5' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Etkinlikler
            </Link>
            <Link
              to="/about"
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activePath === '/about' ? 'text-pine-teal bg-pine-teal/5' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Hakkımızda
            </Link>
            <Link
              to="/contact"
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activePath === '/contact' ? 'text-pine-teal bg-pine-teal/5' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              İletişim
            </Link>
            {/* Yönetici Paneli — sadece admin rolünde görünür */}
            {IS_ADMIN && (
              <Link
                to="/admin"
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-amber-600 hover:bg-amber-50 transition-all ${
                  activePath.startsWith('/admin') ? 'bg-amber-50' : ''
                }`}
              >
                Yönetici Paneli
              </Link>
            )}

            <div className="border-t border-slate-100 my-2 pt-2 flex flex-col gap-2">
              <Link
                to="/profile"
                className={`w-full py-2.5 rounded-xl text-sm font-semibold border flex items-center justify-center gap-2 transition-all ${
                  activePath === '/profile'
                    ? 'bg-pine-teal border-pine-teal text-white'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profilim ({STATIC_USER.name})
              </Link>
              <button
                onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}
                className="w-full py-2.5 rounded-xl text-sm font-semibold bg-slate-800 text-white text-center cursor-pointer"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-inst-navy text-white/80 border-t border-slate-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-pine-teal flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                İyilik <span className="text-pine-teal">Ağı</span>
              </span>
            </div>
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">Şeffaf ve Güvenilir</h5>
              <p className="text-xs text-white/60 leading-relaxed max-w-xs">
                İyilik Ağı Platformu, toplanan her bir kuruşun hedefine ulaşmasını garanti eder. Blokzincir tabanlı işlem kayıtları ve bağımsız denetim raporları ile bağışçı güvenini en üst düzeyde tutuyoruz.
              </p>
            </div>
          </div>

          {/* Col 2: Navigation links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Hızlı Bağlantılar</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-pine-teal transition-colors">Ana Sayfa</Link></li>
              <li><Link to="/events" className="hover:text-pine-teal transition-colors">Etkinlikler</Link></li>
              <li><Link to="/about" className="hover:text-pine-teal transition-colors">Hakkımızda</Link></li>
              <li><Link to="/contact" className="hover:text-pine-teal transition-colors">İletişim</Link></li>
            </ul>
          </div>

          {/* Col 3: Principles */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Temel İlkelerimiz</h4>
            <ul className="space-y-2 text-xs text-white/60">
              <li>%100 Şeffaf İşlem Kaydı</li>
              <li>STK ve Dernek İşbirlikleri</li>
              <li>Sanal Kart Ödeme Güvencesi</li>
              <li>Bağımsız Denetim Raporları</li>
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">İletişim</h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-pine-teal shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>destek@iyilikagi.org</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-pine-teal shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Meltem Sokak, No: 42, Beşiktaş, İstanbul</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© 2026 İyilik Ağı Platformu. Tüm Hakları Saklıdır.</p>
          <p>Tasarım ve Arayüz Simülasyonu • React Router & Recharts</p>
        </div>
      </footer>

    </div>
  );
}
