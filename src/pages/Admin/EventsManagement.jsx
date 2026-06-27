import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

// 7 sabit etkinlik satırı
const STATIC_EVENTS = [
  { id: 'e1', title: 'Geleceğe Nefes: Orman Yangını Rehabilitasyonu', category: 'Çevre', targetAmount: 10000000, raisedAmount: 7450000, daysLeft: 45, imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=80&q=60' },
  { id: 'e2', title: 'Köy Okullarına Bilgisayar Laboratuvarı', category: 'Eğitim', targetAmount: 500000, raisedAmount: 420000, daysLeft: 22, imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=80&q=60' },
  { id: 'e3', title: 'Sokak Hayvanları Mobil Klinik', category: 'Hayvanlar', targetAmount: 250000, raisedAmount: 148000, daysLeft: 60, imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=80&q=60' },
  { id: 'e4', title: 'Kırsal Bölgelere Temiz Su Kuyusu', category: 'Su', targetAmount: 350000, raisedAmount: 210000, daysLeft: 18, imageUrl: 'https://images.unsplash.com/photo-1509140973433-35e9f77f57b8?auto=format&fit=crop&w=80&q=60' },
  { id: 'e5', title: 'Deprem Bölgesi Çocukları için Geçici Okul', category: 'Afet', targetAmount: 750000, raisedAmount: 580000, daysLeft: 12, imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=80&q=60' },
  { id: 'e6', title: 'Yaşlı Bakım Merkezi Rehabilitasyon', category: 'Yaşlı', targetAmount: 180000, raisedAmount: 92000, daysLeft: 75, imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=80&q=60' },
  { id: 'e7', title: 'Çocuk Kanseri Destek Bağışı', category: 'Sağlık', targetAmount: 400000, raisedAmount: 400000, daysLeft: 0, imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=80&q=60' },
];

export default function EventsManagement() {
  return (
    <AdminLayout>
      <div className="space-y-8 max-w-6xl mx-auto">
        
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
                {/* Satır 1 */}
                <tr className="hover:bg-slate-50/40 transition-colors">
                  <td className="px-6 py-3"><img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=80&q=60" alt="Orman" className="w-12 h-9 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-100" /></td>
                  <td className="px-6 py-3 font-bold text-pine-teal max-w-[200px] truncate">Geleceğe Nefes: Orman Yangını Rehabilitasyonu</td>
                  <td className="px-6 py-3"><span className="inline-flex px-2 py-0.5 rounded text-[9px] font-extrabold bg-slate-50 text-slate-500 border border-slate-200/50">Çevre</span></td>
                  <td className="px-6 py-3 text-slate-700 font-mono font-bold">₺10.000.000</td>
                  <td className="px-6 py-3 text-emerald-600 font-mono font-bold">₺7.450.000</td>
                  <td className="px-6 py-3 min-w-[160px]"><div className="flex items-center gap-2"><div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full rounded-full bg-pine-teal" style={{width:'75%'}} /></div><span className="text-[10px] font-mono font-bold text-pine-teal shrink-0 w-8 text-right">75%</span></div></td>
                  <td className="px-6 py-3 text-slate-500 font-mono">45 Gün</td>
                  <td className="px-6 py-3 text-center"><span className="inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border bg-emerald-50 text-emerald-700 border-emerald-100/50">AKTİF</span></td>
                  <td className="px-6 py-3">
                    <div className="flex justify-center items-center gap-1.5">
                      <Link to="/admin/edit-event/e1" className="btn btn-secondary py-1 px-2 text-[10px]">
                        Düzenle
                      </Link>
                      <button type="button" className="btn btn-danger py-1 px-2 text-[10px] bg-red-50 hover:bg-red-100 text-red-600 border-red-200">
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Satır 2 */}
                <tr className="hover:bg-slate-50/40 transition-colors">
                  <td className="px-6 py-3"><img src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=80&q=60" alt="Okul" className="w-12 h-9 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-100" /></td>
                  <td className="px-6 py-3 font-bold text-pine-teal max-w-[200px] truncate">Köy Okullarına Bilgisayar Laboratuvarı</td>
                  <td className="px-6 py-3"><span className="inline-flex px-2 py-0.5 rounded text-[9px] font-extrabold bg-slate-50 text-slate-500 border border-slate-200/50">Eğitim</span></td>
                  <td className="px-6 py-3 text-slate-700 font-mono font-bold">₺500.000</td>
                  <td className="px-6 py-3 text-emerald-600 font-mono font-bold">₺420.000</td>
                  <td className="px-6 py-3 min-w-[160px]"><div className="flex items-center gap-2"><div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full rounded-full bg-pine-teal" style={{width:'84%'}} /></div><span className="text-[10px] font-mono font-bold text-pine-teal shrink-0 w-8 text-right">84%</span></div></td>
                  <td className="px-6 py-3 text-slate-500 font-mono">22 Gün</td>
                  <td className="px-6 py-3 text-center"><span className="inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border bg-emerald-50 text-emerald-700 border-emerald-100/50">AKTİF</span></td>
                  <td className="px-6 py-3">
                    <div className="flex justify-center items-center gap-1.5">
                      <Link to="/admin/edit-event/e2" className="btn btn-secondary py-1 px-2 text-[10px]">
                        Düzenle
                      </Link>
                      <button type="button" className="btn btn-danger py-1 px-2 text-[10px] bg-red-50 hover:bg-red-100 text-red-600 border-red-200">
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Satır 3 */}
                <tr className="hover:bg-slate-50/40 transition-colors">
                  <td className="px-6 py-3"><img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=80&q=60" alt="Hayvan" className="w-12 h-9 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-100" /></td>
                  <td className="px-6 py-3 font-bold text-pine-teal max-w-[200px] truncate">Sokak Hayvanları Mobil Klinik</td>
                  <td className="px-6 py-3"><span className="inline-flex px-2 py-0.5 rounded text-[9px] font-extrabold bg-slate-50 text-slate-500 border border-slate-200/50">Hayvanlar</span></td>
                  <td className="px-6 py-3 text-slate-700 font-mono font-bold">₺250.000</td>
                  <td className="px-6 py-3 text-emerald-600 font-mono font-bold">₺148.000</td>
                  <td className="px-6 py-3 min-w-[160px]"><div className="flex items-center gap-2"><div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full rounded-full bg-pine-teal" style={{width:'59%'}} /></div><span className="text-[10px] font-mono font-bold text-pine-teal shrink-0 w-8 text-right">59%</span></div></td>
                  <td className="px-6 py-3 text-slate-500 font-mono">60 Gün</td>
                  <td className="px-6 py-3 text-center"><span className="inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border bg-emerald-50 text-emerald-700 border-emerald-100/50">AKTİF</span></td>
                  <td className="px-6 py-3">
                    <div className="flex justify-center items-center gap-1.5">
                      <Link to="/admin/edit-event/e3" className="btn btn-secondary py-1 px-2 text-[10px]">
                        Düzenle
                      </Link>
                      <button type="button" className="btn btn-danger py-1 px-2 text-[10px] bg-red-50 hover:bg-red-100 text-red-600 border-red-200">
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Satır 4 */}
                <tr className="hover:bg-slate-50/40 transition-colors">
                  <td className="px-6 py-3"><img src="https://images.unsplash.com/photo-1509140973433-35e9f77f57b8?auto=format&fit=crop&w=80&q=60" alt="Su" className="w-12 h-9 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-100" /></td>
                  <td className="px-6 py-3 font-bold text-pine-teal max-w-[200px] truncate">Kırsal Bölgelere Temiz Su Kuyusu</td>
                  <td className="px-6 py-3"><span className="inline-flex px-2 py-0.5 rounded text-[9px] font-extrabold bg-slate-50 text-slate-500 border border-slate-200/50">Su</span></td>
                  <td className="px-6 py-3 text-slate-700 font-mono font-bold">₺350.000</td>
                  <td className="px-6 py-3 text-emerald-600 font-mono font-bold">₺210.000</td>
                  <td className="px-6 py-3 min-w-[160px]"><div className="flex items-center gap-2"><div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full rounded-full bg-pine-teal" style={{width:'60%'}} /></div><span className="text-[10px] font-mono font-bold text-pine-teal shrink-0 w-8 text-right">60%</span></div></td>
                  <td className="px-6 py-3 text-slate-500 font-mono">18 Gün</td>
                  <td className="px-6 py-3 text-center"><span className="inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border bg-emerald-50 text-emerald-700 border-emerald-100/50">AKTİF</span></td>
                  <td className="px-6 py-3">
                    <div className="flex justify-center items-center gap-1.5">
                      <Link to="/admin/edit-event/e4" className="btn btn-secondary py-1 px-2 text-[10px]">
                        Düzenle
                      </Link>
                      <button type="button" className="btn btn-danger py-1 px-2 text-[10px] bg-red-50 hover:bg-red-100 text-red-600 border-red-200">
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Satır 5 */}
                <tr className="hover:bg-slate-50/40 transition-colors">
                  <td className="px-6 py-3"><img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=80&q=60" alt="Deprem" className="w-12 h-9 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-100" /></td>
                  <td className="px-6 py-3 font-bold text-pine-teal max-w-[200px] truncate">Deprem Bölgesi Çocukları için Geçici Okul</td>
                  <td className="px-6 py-3"><span className="inline-flex px-2 py-0.5 rounded text-[9px] font-extrabold bg-slate-50 text-slate-500 border border-slate-200/50">Afet</span></td>
                  <td className="px-6 py-3 text-slate-700 font-mono font-bold">₺750.000</td>
                  <td className="px-6 py-3 text-emerald-600 font-mono font-bold">₺580.000</td>
                  <td className="px-6 py-3 min-w-[160px]"><div className="flex items-center gap-2"><div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full rounded-full bg-pine-teal" style={{width:'77%'}} /></div><span className="text-[10px] font-mono font-bold text-pine-teal shrink-0 w-8 text-right">77%</span></div></td>
                  <td className="px-6 py-3 text-slate-500 font-mono">12 Gün</td>
                  <td className="px-6 py-3 text-center"><span className="inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border bg-emerald-50 text-emerald-700 border-emerald-100/50">AKTİF</span></td>
                  <td className="px-6 py-3">
                    <div className="flex justify-center items-center gap-1.5">
                      <Link to="/admin/edit-event/e5" className="btn btn-secondary py-1 px-2 text-[10px]">
                        Düzenle
                      </Link>
                      <button type="button" className="btn btn-danger py-1 px-2 text-[10px] bg-red-50 hover:bg-red-100 text-red-600 border-red-200">
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Satır 6 */}
                <tr className="hover:bg-slate-50/40 transition-colors">
                  <td className="px-6 py-3"><img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=80&q=60" alt="Yaşlı" className="w-12 h-9 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-100" /></td>
                  <td className="px-6 py-3 font-bold text-pine-teal max-w-[200px] truncate">Yaşlı Bakım Merkezi Rehabilitasyon</td>
                  <td className="px-6 py-3"><span className="inline-flex px-2 py-0.5 rounded text-[9px] font-extrabold bg-slate-50 text-slate-500 border border-slate-200/50">Yaşlı</span></td>
                  <td className="px-6 py-3 text-slate-700 font-mono font-bold">₺180.000</td>
                  <td className="px-6 py-3 text-emerald-600 font-mono font-bold">₺92.000</td>
                  <td className="px-6 py-3 min-w-[160px]"><div className="flex items-center gap-2"><div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full rounded-full bg-pine-teal" style={{width:'51%'}} /></div><span className="text-[10px] font-mono font-bold text-pine-teal shrink-0 w-8 text-right">51%</span></div></td>
                  <td className="px-6 py-3 text-slate-500 font-mono">75 Gün</td>
                  <td className="px-6 py-3 text-center"><span className="inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border bg-emerald-50 text-emerald-700 border-emerald-100/50">AKTİF</span></td>
                  <td className="px-6 py-3">
                    <div className="flex justify-center items-center gap-1.5">
                      <Link to="/admin/edit-event/e6" className="btn btn-secondary py-1 px-2 text-[10px]">
                        Düzenle
                      </Link>
                      <button type="button" className="btn btn-danger py-1 px-2 text-[10px] bg-red-50 hover:bg-red-100 text-red-600 border-red-200">
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Satır 7 */}
                <tr className="hover:bg-slate-50/40 transition-colors">
                  <td className="px-6 py-3"><img src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=80&q=60" alt="Sağlık" className="w-12 h-9 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-100" /></td>
                  <td className="px-6 py-3 font-bold text-pine-teal max-w-[200px] truncate">Çocuk Kanseri Destek Bağışı</td>
                  <td className="px-6 py-3"><span className="inline-flex px-2 py-0.5 rounded text-[9px] font-extrabold bg-slate-50 text-slate-500 border border-slate-200/50">Sağlık</span></td>
                  <td className="px-6 py-3 text-slate-700 font-mono font-bold">₺400.000</td>
                  <td className="px-6 py-3 text-emerald-600 font-mono font-bold">₺400.000</td>
                  <td className="px-6 py-3 min-w-[160px]"><div className="flex items-center gap-2"><div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full rounded-full bg-pine-teal" style={{width:'100%'}} /></div><span className="text-[10px] font-mono font-bold text-pine-teal shrink-0 w-8 text-right">100%</span></div></td>
                  <td className="px-6 py-3 text-slate-500 font-mono">0 Gün</td>
                  <td className="px-6 py-3 text-center"><span className="inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border bg-amber-50 text-amber-700 border-amber-100/50">TAMAMLANDI</span></td>
                  <td className="px-6 py-3">
                    <div className="flex justify-center items-center gap-1.5">
                      <Link to="/admin/edit-event/e7" className="btn btn-secondary py-1 px-2 text-[10px]">
                        Düzenle
                      </Link>
                      <button type="button" className="btn btn-danger py-1 px-2 text-[10px] bg-red-50 hover:bg-red-100 text-red-600 border-red-200">
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

          {/* Pagination Bar */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/40 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Info Text */}
            <p className="text-[11px] text-slate-400 font-medium">
              Toplam <span className="font-bold text-slate-600">10</span> etkinlik,{' '}
              <span className="font-bold text-slate-600">8</span>'i gösteriliyor
            </p>

            {/* Page Buttons */}
            <div className="flex items-center gap-1.5">
              {/* Prev Arrow */}
              <button
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:bg-slate-100 transition-all cursor-not-allowed opacity-50"
                disabled
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Page 1 – Active */}
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-pine-teal text-white text-xs font-extrabold shadow-sm shadow-pine-teal/20 border border-pine-teal cursor-default">
                1
              </button>

              {/* Page 2 – Passive */}
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer">
                2
              </button>

              {/* Next Arrow */}
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 transition-all cursor-pointer">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
}
