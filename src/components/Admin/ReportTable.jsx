import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editEventAsync } from '../../store/slices/eventSlice';
import { fetchRecords } from '../../store/slices/financialSlice';

export default function ReportTable() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.list);
  const records = useSelector((state) => state.financial.records);
  const recordsStatus = useSelector((state) => state.financial.status);

  useEffect(() => {
    if (recordsStatus === 'idle') {
      dispatch(fetchRecords());
    }
  }, [recordsStatus, dispatch]);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [isExcelLoading, setIsExcelLoading] = useState(false);
  const [excelStatus, setExcelStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  // Proje adına göre filtreleme yapar
  const filteredRecords = records.filter((rec) =>
    rec.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [formData, setFormData] = useState({
    donorName: '',
    project: '',
    amount: '',
    donationDate: new Date().toISOString().split('T')[0]
  });

  // Dynamic initialization of the selected project
  useEffect(() => {
    if (events && events.length > 0) {
      // If the current selected project is empty or not in the events list, pick the first one
      if (!formData.project || !events.some(e => e.title === formData.project)) {
        setFormData(prev => ({ ...prev, project: events[0].title }));
      }
    }
  }, [events, formData.project]);

  // Form gönderildiğinde bağışı kaydeder ve bütçeyi günceller
  const handleSubmit = () => {
    const val = Number(formData.amount);
    if (!formData.donorName.trim() || isNaN(val) || val <= 0 || !formData.project) {
      setFeedback({ type: 'error', message: 'Lütfen tüm alanları doğru ve 0\'dan büyük bir tutarla doldurun.' });
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 2700);
      setTimeout(() => setFeedback({ type: '', message: '' }), 3000);
      return;
    }

    // Find the event to update
    const matchedEvent = events.find(e => e.title === formData.project);
    if (matchedEvent) {
      const nextRaised = (matchedEvent.raisedAmount || 0) + val;
      const isCompleted = nextRaised >= (matchedEvent.targetAmount || 0);
      
      const updatedEvent = {
        ...matchedEvent,
        raisedAmount: nextRaised,
        status: isCompleted ? 'TAMAMLANDI' : 'AKTİF',
        daysLeft: isCompleted ? 0 : matchedEvent.daysLeft
      };

      // Update through Redux (this will automatically sync and update the financial records state/storage)
      dispatch(editEventAsync(updatedEvent));
    }

    // all_donations listesine ekleme yapar
    const storedDonations = localStorage.getItem('all_donations');
    let donations = [];
    try {
      donations = storedDonations ? JSON.parse(storedDonations) : [
        { id: 'd1', donorName: 'Mehmet Yılmaz', campaignTitle: 'Geleceğe Nefes: Orman Yangını', amount: 500, timeAgo: '3 dk önce', date: '2026-06-27' },
        { id: 'd2', donorName: 'Ayşe Kaya', campaignTitle: 'Köy Okullarına Lab.', amount: 250, timeAgo: '15 dk önce', date: '2026-06-27' },
        { id: 'd3', donorName: 'Onur Baha Koç', campaignTitle: 'Sokak Hayvanları Mobil Klinik', amount: 1000, timeAgo: '18 dk önce', date: '2026-06-27' },
        { id: 'd4', donorName: 'Fatma Demir', campaignTitle: 'Temiz Su Kuyusu', amount: 150, timeAgo: '3 sa önce', date: '2026-06-27' },
        { id: 'd5', donorName: 'Ali Çelik', campaignTitle: 'Deprem Bölgesi Okul', amount: 750, timeAgo: '1 gün önce', date: '2026-06-26' },
      ];
    } catch (error) {
      donations = [];
    }

    const newDonation = {
      id: 'd_' + Date.now(),
      donorName: formData.donorName,
      campaignTitle: formData.project,
      amount: val,
      timeAgo: 'Az önce',
      date: formData.donationDate
    };

    localStorage.setItem('all_donations', JSON.stringify([newDonation, ...donations]));

    window.dispatchEvent(new Event('donation-list-updated'));
    window.dispatchEvent(new Event('dashboard-data-updated'));

    setFeedback({ type: 'success', message: 'Bağış başarıyla kaydedildi!' });
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2700);
    setTimeout(() => setFeedback({ type: '', message: '' }), 3000);

    setFormData({
      donorName: '',
      project: events && events.length > 0 ? events[0].title : '',
      amount: '',
      donationDate: new Date().toISOString().split('T')[0]
    });
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

  const formFields = [
    {
      id: 'donorName',
      label: 'Bağışçı Adı *',
      type: 'text',
      placeholder: 'Ad Soyad',
      value: formData.donorName,
      onChange: (e) => setFormData((prev) => ({ ...prev, donorName: e.target.value }))
    },
    {
      id: 'project',
      label: 'Etkinlik *',
      type: 'select',
      value: formData.project,
      onChange: (e) => setFormData((prev) => ({ ...prev, project: e.target.value })),
      options: events.length > 0 ? events.map((e) => e.title) : ['Seçiniz']
    },
    {
      id: 'amount',
      label: 'Tutar (₺) *',
      type: 'number',
      placeholder: '500',
      value: formData.amount,
      onChange: (e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))
    },
    {
      id: 'donationDate',
      label: 'Bağış Tarihi *',
      type: 'date',
      value: formData.donationDate,
      onChange: (e) => setFormData((prev) => ({ ...prev, donationDate: e.target.value }))
    }
  ];

  return (
    <div className="space-y-8 text-left">
      <div>
        <h1 className="text-2xl font-extrabold text-inst-navy tracking-tight">Finansal Raporlar</h1>
        <p className="text-xs text-slate-400 mt-0.5 font-medium">Tüm etkinliklerin sponsor geliri, toplanan fon ve harcama kalemleri.</p>
      </div>

      {excelStatus && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-3 rounded-2xl text-left font-bold animate-fade-in shadow-sm">
          {excelStatus}
        </div>
      )}

      <div className="card-base shadow-xl shadow-slate-200/20 p-0 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h3 className="text-xs font-black text-inst-navy uppercase tracking-wider">FİNANSAL ÖZET TABLOSU</h3>
          <div className="search-input-wrapper w-full sm:w-64">
            <input
              type="text"
              placeholder="Proje veya etkinlik ara..."
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
                <th scope="col" className="px-6 py-4">PROJE ADI</th>
                <th scope="col" className="px-6 py-4">SPONSOR GELİRİ</th>
                <th scope="col" className="px-6 py-4">TOPLANAN FON</th>
                <th scope="col" className="px-6 py-4">HARCANAN BÜTÇE</th>
                <th scope="col" className="px-6 py-4 text-center">DENETİM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/40 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800 max-w-[220px] truncate">{rec.project}</td>
                  <td className="px-6 py-4 font-mono text-slate-600">{rec.sponsor.toLocaleString('tr-TR')}₺</td>
                  <td className="px-6 py-4 font-mono font-bold text-pine-teal">{rec.raised.toLocaleString('tr-TR')}₺</td>
                  <td className="px-6 py-4 font-mono text-slate-700">{rec.spent.toLocaleString('tr-TR')}₺</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border ${
                      rec.status === 'Onaylandı'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100/50'
                        : 'bg-amber-50 text-amber-700 border-amber-100/50'
                    }`}>
                      {rec.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card-base shadow-xl shadow-slate-200/20 md:p-8">
        <h3 className="text-xs font-black text-inst-navy uppercase tracking-wider border-b border-slate-100 pb-4 mb-6">MANUEL BAĞIŞ KAYDI</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {formFields.map((field) => (
            <div key={field.id}>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">{field.label}</label>
              {field.type === 'select' ? (
                <select
                  value={field.value}
                  onChange={field.onChange}
                  className="form-input w-full cursor-pointer"
                >
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={field.onChange}
                  className="form-input w-full"
                />
              )}
            </div>
          ))}
        </div>

        {feedback.message && (
          <div
            style={{
              opacity: showFeedback ? 1 : 0,
              transform: showFeedback ? 'translateY(0)' : 'translateY(-5px)',
              transition: 'opacity 0.3s ease, transform 0.3s ease'
            }}
            className={`mt-4 px-4 py-3 rounded-2xl text-xs font-bold ${
              feedback.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-rose-50 border border-rose-200 text-rose-800'
            }`}
          >
            {feedback.message}
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleDownloadExcel}
            disabled={isExcelLoading}
            className="btn btn-secondary px-5 py-2.5 flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
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
          <button type="button" onClick={handleSubmit} className="btn btn-primary px-5 py-2.5">
            Bağışı Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}
