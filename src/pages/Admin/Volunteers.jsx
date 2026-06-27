import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function Volunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [emailStatus, setEmailStatus] = useState('');
  const [excelStatus, setExcelStatus] = useState('');
  const [isExcelLoading, setIsExcelLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Gönüllü listesini /volunteers.json'dan yükler
  useEffect(() => {
    fetch('/volunteers.json')
      .then((r) => r.json())
      .then((data) => setVolunteers(data))
      .catch((err) => console.error('volunteers.json yüklenemedi:', err));
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
      setTimeout(() => setExcelStatus(''), 4000);
    }, 1000);
  };

  return (
    <AdminLayout>
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
