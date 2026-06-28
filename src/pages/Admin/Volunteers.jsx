import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function Volunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [emailStatus, setEmailStatus] = useState('');
  const [excelStatus, setExcelStatus] = useState('');
  const [isExcelLoading, setIsExcelLoading] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (msg) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3500);
  };

  const loadAllVolunteers = () => {
    fetch('/volunteers.json')
      .then((r) => r.json())
      .then((jsonVolunteers) => {
        const combined = [];
        const seenEmails = new Set();
        const seenNames = new Set();

        const addOrUpdate = (name, email, task, hours = 0, status = 'AKTİF') => {
          const emailKey = email ? email.toLowerCase() : '';
          if (emailKey && emailKey !== 'anonim' && emailKey !== 'anonim@iyilikagi.org') {
            if (seenEmails.has(emailKey)) {
              const existing = combined.find(x => x.email && x.email.toLowerCase() === emailKey);
              if (existing) {
                if (task === 'Bağışçı / Destekçi') {
                  existing.task = 'Bağışçı / Destekçi';
                }
                existing.name = name;
              }
            } else {
              seenEmails.add(emailKey);
              seenNames.add(name.toLowerCase());
              combined.push({ name, email, task, hours, status });
            }
          } else {
            const nameKey = name.toLowerCase();
            if (!seenNames.has(nameKey)) {
              seenNames.add(nameKey);
              combined.push({ name, email: email || 'gonullu@iyilikagi.org', task, hours, status });
            }
          }
        };

        // 1. Statik Gönüllüler
        jsonVolunteers.forEach(v => {
          addOrUpdate(v.name, v.email, v.task || 'Gönüllü Üye', v.hours || 0, v.status || 'AKTİF');
        });

        // 2. Yeni Kayıt Olan Kullanıcılar (registeredUsers)
        const storedUsers = localStorage.getItem('registeredUsers');
        let registeredUsersList = [];
        if (storedUsers) {
          try {
            registeredUsersList = JSON.parse(storedUsers);
          } catch (e) {
            registeredUsersList = [];
          }
        }
        registeredUsersList.forEach(u => {
          if (u.role === 'gönüllü') {
            addOrUpdate(u.name, u.email, 'Gönüllü Üye', 0, 'AKTİF');
          }
        });

        // 3. Bağış Yapan Kayıtlı Kişiler
        const storedDonations = localStorage.getItem('all_donations');
        let donationsList = [];
        if (storedDonations) {
          try {
            donationsList = JSON.parse(storedDonations);
          } catch (e) {
            donationsList = [];
          }
        }

        donationsList.forEach(d => {
          const email = d.donorEmail || 'Anonim';
          const emailKey = email.toLowerCase();
          
          if (emailKey && emailKey !== 'anonim' && emailKey !== 'anonim@iyilikagi.org') {
            const regUser = registeredUsersList.find(u => u.email.toLowerCase() === emailKey);
            const actualName = regUser ? regUser.name : (d.donorName || 'Anonim Bağışçı');
            addOrUpdate(actualName, email, 'Bağışçı / Destekçi', 0, 'AKTİF');
          }
        });

        setVolunteers(combined);
      })
      .catch((err) => console.error('volunteers.json yüklenemedi:', err));
  };

  useEffect(() => {
    loadAllVolunteers();
    window.addEventListener('donation-list-updated', loadAllVolunteers);
    window.addEventListener('dashboard-data-updated', loadAllVolunteers);
    return () => {
      window.removeEventListener('donation-list-updated', loadAllVolunteers);
      window.removeEventListener('dashboard-data-updated', loadAllVolunteers);
    };
  }, []);

  // Gönüllü adına göre arama filtrelemesi yapar
  const filteredVolunteers = volunteers.filter((vol) =>
    vol.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toplu e-postaları sıraya alır
  const handleSendEmails = () => {
    setEmailStatus('E-postalar başarıyla sıraya alındı.');
    setTimeout(() => setEmailStatus(''), 4000);
  };

  // Excel indirme simülasyonu başlatır
  const handleDownloadExcel = () => {
    setIsExcelLoading(true);
    setExcelStatus('');
    setTimeout(() => {
      setIsExcelLoading(false);
      setExcelStatus('Finansal_Rapor.xlsx başarıyla indirildi.');
      showToast('Excel dosyası başarıyla indirildi');
      setTimeout(() => setExcelStatus(''), 4000);
    }, 1000);
  };

  // PDF indirme simülasyonu başlatır
  const handleDownloadPdf = () => {
    setIsPdfLoading(true);
    setTimeout(() => {
      setIsPdfLoading(false);
      showToast('PDF dosyası başarıyla indirildi');
    }, 1000);
  };

  return (
    <AdminLayout>
      {/* Toast Notification */}
      {toastVisible && (
        <div className="fixed top-24 right-6 z-50 bg-white border border-emerald-100 shadow-xl rounded-2xl p-4 max-w-sm flex items-start gap-3 toast-animate-in transition-all">
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-slate-800">Başarılı!</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{toastMsg}</p>
          </div>
          <button
            onClick={() => setToastVisible(false)}
            className="text-slate-400 hover:text-slate-650 shrink-0 transition-colors cursor-pointer"
            type="button"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div className="space-y-8 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-left">
            <h1 className="text-2xl font-extrabold text-inst-navy tracking-tight">Gönüllü Takibi</h1>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">Kayıtlı aktif ve pasif sivil toplum gönüllülerinin takibi.</p>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={handleSendEmails}
              className="btn btn-primary px-4 py-2.5 flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Toplu E-posta Gönder</span>
            </button>
            <button
              onClick={handleDownloadExcel}
              disabled={isExcelLoading}
              className="btn btn-secondary px-4 py-2.5 flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExcelLoading ? (
                <div className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              )}
              <span>{isExcelLoading ? 'Hazırlanıyor...' : 'Excel İndir'}</span>
            </button>
            <button
              onClick={handleDownloadPdf}
              disabled={isPdfLoading}
              className="btn btn-secondary px-4 py-2.5 flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPdfLoading ? (
                <div className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )}
              <span>{isPdfLoading ? 'Hazırlanıyor...' : 'PDF İndir'}</span>
            </button>
          </div>
        </div>

        {emailStatus && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-3 rounded-2xl text-left font-bold animate-fade-in shadow-sm">
            {emailStatus}
          </div>
        )}

        {excelStatus && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-3 rounded-2xl text-left font-bold animate-fade-in shadow-sm">
            {excelStatus}
          </div>
        )}

        <div className="card-base shadow-xl shadow-slate-200/20 text-left p-0 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <h3 className="text-xs font-black text-inst-navy uppercase tracking-wider">AKTİF GÖNÜLLÜLER LİSTESİ</h3>
            <div className="search-input-wrapper w-full sm:w-64">
              <input
                type="text"
                placeholder="Gönüllü ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input w-full"
              />
              <svg className="search-input-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50/50 text-[10px] text-slate-400 font-extrabold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th scope="col" className="px-6 py-4">GÖNÜLLÜ ADI SOYADI</th>
                  <th scope="col" className="px-6 py-4">E-POSTA</th>
                  <th scope="col" className="px-6 py-4">KAYITLI GÖREV</th>
                  <th scope="col" className="px-6 py-4">KATKI SÜRESİ (SAAT)</th>
                  <th scope="col" className="px-6 py-4 text-center">DURUM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredVolunteers.map((vol, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/40 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{vol.name}</td>
                    <td className="px-6 py-4 text-slate-500">{vol.email}</td>
                    <td className="px-6 py-4 text-pine-teal font-bold">{vol.task}</td>
                    <td className="px-6 py-4 text-slate-700 font-mono font-bold">{vol.hours} Saat</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border ${
                        vol.status === 'AKTİF'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100/50'
                          : 'bg-slate-50 text-slate-500 border-slate-200/50'
                      }`}>
                        {vol.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
