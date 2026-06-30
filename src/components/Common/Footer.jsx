import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer-wrap">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand-col space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-pine-teal flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="footer-logo-text">
                İyilik <span className="text-pine-teal">Ağı</span>
              </span>
            </div>
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">Şeffaf ve Güvenilir</h5>
              <p className="footer-desc">
                İyilik Ağı Platformu, toplanan her bir kuruşun hedefine ulaşmasını garanti eder. Blokzincir tabanlı işlem kayıtları ve bağımsız denetim raporları ile bağışçı güvenini en üst düzeyde tutuyoruz.
              </p>
            </div>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-heading mb-4">Hızlı Bağlantılar</h4>
            <ul className="footer-list">
              <li><Link to="/" className="footer-link">Ana Sayfa</Link></li>
              <li><Link to="/events" className="footer-link">Etkinlikler</Link></li>
              <li><Link to="/about" className="footer-link">Hakkımızda</Link></li>
              <li><Link to="/contact" className="footer-link">İletişim</Link></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-heading mb-4">Temel İlkelerimiz</h4>
            <ul className="footer-list text-slate-400">
              <li>%100 Şeffaf İşlem Kaydı</li>
              <li>STK ve Dernek İşbirlikleri</li>
              <li>Sanal Kart Ödeme Güvencesi</li>
              <li>Bağımsız Denetim Raporları</li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-heading mb-4">İletişim</h4>
            <ul className="footer-list text-slate-400">
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
                <span className="break-words">Meltem Sokak, No: 42, Beşiktaş, İstanbul</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 İyilik Ağı Platformu. Tüm Hakları Saklıdır.</p>
          <p>Tasarım ve Arayüz Simülasyonu • React Router & Recharts</p>
        </div>
      </div>
    </footer>
  );
}
