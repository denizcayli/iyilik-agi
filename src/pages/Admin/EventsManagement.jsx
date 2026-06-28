import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents, deleteEventAsync } from '../../store/slices/eventSlice';
import AdminLayout from '../../components/AdminLayout';

export default function EventsManagement() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.list);
  const status = useSelector((state) => state.events.status);
  const loading = status === 'loading';

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [notification, setNotification] = useState({ message: '', visible: false });

  const showNotification = (msg) => {
    setNotification({ message: msg, visible: true });
    setTimeout(() => setNotification((n) => ({ ...n, visible: false })), 2200);
    setTimeout(() => setNotification({ message: '', visible: false }), 2600);
  };

  useEffect(() => {
    dispatch(fetchEvents());

    const pendingMsg = sessionStorage.getItem('pending_toast');
    if (pendingMsg) {
      sessionStorage.removeItem('pending_toast');
      setTimeout(() => showNotification(pendingMsg), 100);
    }
  }, [dispatch]);

  const confirmDelete = (id) => {
    setDeleteTarget(id);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    dispatch(deleteEventAsync(deleteTarget)).then(() => {
      window.dispatchEvent(new Event('dashboard-data-updated'));
      showNotification('Etkinlik silindi');
    });
    setDeleteTarget(null);
  };

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="py-20 text-center text-slate-500 font-bold text-sm">Yükleniyor...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-6xl mx-auto relative">

        <div
          style={{
            opacity: notification.visible ? 1 : 0,
            transform: notification.visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.35s ease, transform 0.35s ease',
            pointerEvents: 'none'
          }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 whitespace-nowrap"
        >
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          <span>{notification.message}</span>
        </div>

        {deleteTarget && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-xs w-full mx-4 text-center">
              <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-sm font-extrabold text-slate-800 mb-1">Etkinliği Sil</h3>
              <p className="text-xs text-slate-500 mb-5">Bu etkinliği silmek istediğinize emin misiniz? Bu işlem geri alınamaz.</p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="btn btn-secondary px-4 py-2 text-xs"
                >
                  Vazgeç
                </button>
                <button
                  onClick={handleDelete}
                  className="btn px-4 py-2 text-xs bg-rose-500 hover:bg-rose-600 text-white border-rose-500 font-bold rounded-xl transition-colors"
                >
                  Evet, Sil
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Header bar with Add Event button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-left">
            <h1 className="text-2xl font-extrabold text-inst-navy tracking-tight">Etkinlik Yönetimi</h1>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">Platformdaki tüm sosyal sorumluluk ve bağış etkinliklerinin kontrolü.</p>
          </div>
          <Link
            to="/admin/new-event"
            className="btn btn-primary px-4 py-2.5 flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            <span>Yeni Etkinlik Ekle</span>
          </Link>
        </div>

        {/* Filters and List */}
        <div className="card-base shadow-xl shadow-slate-200/20 text-left p-0 overflow-hidden">

          {/* Table Header & Search */}
          <div className="px-6 py-5 border-b border-slate-100 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <h3 className="text-xs font-black text-inst-navy uppercase tracking-wider">TÜM ETKİNLİKLER LİSTESİ</h3>

            <div className="search-input-wrapper w-full sm:w-64">
              <input
                type="text"
                placeholder="Etkinlik veya kategori ara..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
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
                  <th scope="col" className="px-6 py-4">GÖRSEL</th>
                  <th scope="col" className="px-6 py-4">ETKİNLİK ADI</th>
                  <th scope="col" className="px-6 py-4">KATEGORİ</th>
                  <th scope="col" className="px-6 py-4">HEDEF BÜTÇE</th>
                  <th scope="col" className="px-6 py-4">TOPLANAN FON</th>
                  <th scope="col" className="px-6 py-4 min-w-[160px]">İLERLEME</th>
                  <th scope="col" className="px-6 py-4">KALAN SÜRE</th>
                  <th scope="col" className="px-6 py-4 text-center">DURUM</th>
                  <th scope="col" className="px-6 py-4 text-center">AKSİYONLAR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {paginatedEvents.map((evt) => {
                  const percentage = Math.min(Math.round((evt.raisedAmount / evt.targetAmount) * 100), 100);
                  const isCompleted = evt.raisedAmount >= evt.targetAmount;
                  return (
                    <tr key={evt.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="px-6 py-3">
                        <img src={evt.imageUrl} alt={evt.title} className="w-12 h-9 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-100" />
                      </td>
                      <td className="px-6 py-3 font-bold text-pine-teal max-w-[200px] truncate">{evt.title}</td>
                      <td className="px-6 py-3">
                        <span className="inline-flex px-2 py-0.5 rounded text-[9px] font-extrabold bg-slate-50 text-slate-500 border border-slate-200/50">{evt.category}</span>
                      </td>
                      <td className="px-6 py-3 text-slate-700 font-mono font-bold">₺{evt.targetAmount.toLocaleString('tr-TR')}</td>
                      <td className="px-6 py-3 text-emerald-600 font-mono font-bold">₺{evt.raisedAmount.toLocaleString('tr-TR')}</td>
                      <td className="px-6 py-3 min-w-[160px]">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-pine-teal" style={{ width: `${percentage}%` }} />
                          </div>
                          <span className="text-[10px] font-mono font-bold text-pine-teal shrink-0 w-8 text-right">{percentage}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-slate-500 font-mono">{evt.daysLeft} Gün</td>
                      <td className="px-6 py-3 text-center">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border ${isCompleted
                          ? 'bg-amber-50 text-amber-700 border-amber-100/50'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-100/50'
                          }`}>
                          {isCompleted ? 'TAMAMLANDI' : 'AKTİF'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center shrink-0 min-w-[90px]">
                        <div className="flex justify-center items-center gap-1.5">
                          <Link
                            to={`/admin/edit-event/${evt.id}`}
                            className="p-1.5 bg-slate-50 hover:bg-slate-100/80 text-slate-650 hover:text-pine-teal border border-slate-200 hover:border-pine-teal/30 rounded-lg transition-all"
                            title="Düzenle"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Link>
                          <button
                            type="button"
                            onClick={() => confirmDelete(evt.id)}
                            className="p-1.5 bg-rose-50/50 hover:bg-rose-50 text-rose-600 border border-rose-100 hover:border-rose-200 rounded-lg transition-all cursor-pointer"
                            title="Sil"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Bar */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/40 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Info Text */}
            <p className="text-[11px] text-slate-400 font-medium">
              Toplam <span className="font-bold text-slate-600">{filteredEvents.length}</span> etkinlikten{' '}
              <span className="font-bold text-slate-600">{paginatedEvents.length}</span> tanesi gösteriliyor.
            </p>

            {/* Page Buttons */}
            {totalPages > 1 && (
              <div className="flex items-center gap-1.5">
                {/* Prev Arrow */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-450 hover:bg-slate-50 transition-all ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                    }`}
                  disabled={currentPage === 1}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-extrabold border transition-all ${currentPage === page
                      ? 'bg-pine-teal text-white shadow-sm shadow-pine-teal/20 border-pine-teal cursor-default'
                      : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 cursor-pointer'
                      }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next Arrow */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-450 hover:bg-slate-50 transition-all ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                    }`}
                  disabled={currentPage === totalPages}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
