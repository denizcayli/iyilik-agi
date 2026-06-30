
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function AdminSidebar({ onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const activePath = location.pathname;

  const handleLogoutClick = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('auth-state-changed'));
    window.location.href = '/';
  };

  return (
    <aside className="w-72 bg-white border-r border-slate-100 flex flex-col justify-between shrink-0 h-screen sticky top-0 py-6 px-5 text-left">
      <div className="space-y-6">
        <div className="flex flex-col gap-2 border-b border-slate-100 pb-4 mb-2 text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-pine-teal flex items-center justify-center shadow-lg shadow-pine-teal/20 shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="text-xs font-black text-inst-navy uppercase tracking-wider">İyilik Ağı</span>
          </div>
          <div className="pt-2">
            <span className="text-lg font-black text-inst-navy block tracking-tight">Hoş geldiniz</span>
            <span className="text-[11px] font-bold text-slate-500 block truncate max-w-[200px]">
              {JSON.parse(localStorage.getItem('user') || '{}').name || 'Yönetici'}
            </span>
          </div>
        </div>

        <Link
          to="/admin/new-event"
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-pine-teal hover:bg-emerald-800 text-white font-extrabold rounded-2xl text-xs transition-all shadow-md shadow-pine-teal/10 hover:shadow-lg hover:shadow-pine-teal/20 shrink-0 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          <span>Yeni Etkinlik Ekle</span>
        </Link>

        <div className="pt-2">
          <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block mb-3 pl-2">MENÜ</span>
          <nav className="space-y-1">
            <Link
              to="/admin"
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${activePath === '/admin'
                ? 'bg-pine-teal/5 text-pine-teal border-l-4 border-pine-teal pl-3 rounded-l-none'
                : 'text-slate-500 hover:text-pine-teal hover:bg-slate-50'
                }`}
            >
              <span className={activePath === '/admin' ? 'text-pine-teal' : 'text-slate-400'}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
                </svg>
              </span>
              <span>Kontrol Paneli</span>
            </Link>

            <Link
              to="/admin/events"
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${activePath.startsWith('/admin/events')
                ? 'bg-pine-teal/5 text-pine-teal border-l-4 border-pine-teal pl-3 rounded-l-none'
                : 'text-slate-500 hover:text-pine-teal hover:bg-slate-50'
                }`}
            >
              <span className={activePath.startsWith('/admin/events') ? 'text-pine-teal' : 'text-slate-400'}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </span>
              <span>Etkinlik Yönetimi</span>
            </Link>

            <Link
              to="/admin/reports"
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${activePath.startsWith('/admin/reports')
                ? 'bg-pine-teal/5 text-pine-teal border-l-4 border-pine-teal pl-3 rounded-l-none'
                : 'text-slate-500 hover:text-pine-teal hover:bg-slate-50'
                }`}
            >
              <span className={activePath.startsWith('/admin/reports') ? 'text-pine-teal' : 'text-slate-400'}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </span>
              <span>Finansal Raporlar</span>
            </Link>

            <Link
              to="/admin/volunteers"
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${activePath.startsWith('/admin/volunteers')
                ? 'bg-pine-teal/5 text-pine-teal border-l-4 border-pine-teal pl-3 rounded-l-none'
                : 'text-slate-500 hover:text-pine-teal hover:bg-slate-50'
                }`}
            >
              <span className={activePath.startsWith('/admin/volunteers') ? 'text-pine-teal' : 'text-slate-400'}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </span>
              <span>Gönüllü Takibi</span>
            </Link>
          </nav>
        </div>
      </div>

      <div className="space-y-1.5 pt-4 border-t border-slate-100">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-pine-teal hover:bg-slate-50 cursor-pointer transition-all"
        >
          <svg className="w-4.5 h-4.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Ana Sayfaya Dön</span>
        </Link>
        <button
          onClick={handleLogoutClick}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-ember-coral hover:bg-rose-50/50 cursor-pointer transition-all text-left"
        >
          <svg className="w-4.5 h-4.5 text-ember-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Çıkış Yap</span>
        </button>
      </div>
    </aside>
  );
}
