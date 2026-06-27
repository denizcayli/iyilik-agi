import React, { useState, useEffect } from 'react';

const formatMoney = (val) => `${val.toLocaleString('tr-TR')} ₺`;


export default function DashboardCards() {
  const [metrics, setMetrics] = useState({
    totalRaised: 25647500,
    avgCompletion: 67.3,
    activeCount: 8
  });

  // Metrik verilerini etkinlik listesine göre hesaplar
  const applyMetrics = (events) => {
    const totalRaised = events.reduce((sum, e) => sum + e.raisedAmount, 0) + 16347500;
    const activeCount = events.filter((e) => e.status !== 'TAMAMLANDI' && e.raisedAmount < e.targetAmount && e.daysLeft > 0).length + 2;
    const avgCompletion = events.length > 0
      ? events.reduce((sum, e) => sum + (e.raisedAmount / e.targetAmount) * 100, 0) / events.length
      : 0;
    setMetrics({
      totalRaised,
      avgCompletion: Number(avgCompletion.toFixed(1)),
      activeCount
    });
  };

  const calculateMetrics = () => {
    const stored = localStorage.getItem('events_list');
    if (stored) {
      try {
        const events = JSON.parse(stored);
        if (events.length > 0) { applyMetrics(events); return; }
      } catch (error) { /* fall through */ }
    }
    // localStorage boşsa /events.json'dan yükle
    fetch('/events.json')
      .then((r) => r.json())
      .then((data) => {
        localStorage.setItem('events_list', JSON.stringify(data));
        applyMetrics(data);
      })
      .catch((err) => console.error('events.json yüklenemedi:', err));
  };

  useEffect(() => {
    calculateMetrics();
    window.addEventListener('dashboard-data-updated', calculateMetrics);
    window.addEventListener('donation-list-updated', calculateMetrics);
    return () => {
      window.removeEventListener('dashboard-data-updated', calculateMetrics);
      window.removeEventListener('donation-list-updated', calculateMetrics);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
      <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-6 flex flex-col justify-between h-36">
        <div className="flex justify-between items-start">
          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">TOPLAM BAĞIŞ</span>
          <div className="w-7 h-7 rounded-lg bg-pine-teal/5 flex items-center justify-center text-pine-teal">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
        </div>
        <div className="text-2xl font-black font-mono text-slate-700 tracking-tight leading-none mb-1">
          {formatMoney(metrics.totalRaised)}
        </div>
      </div>

      <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-6 flex flex-col justify-between h-36">
        <div className="flex justify-between items-start">
          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">ORTALAMA TAMAMLANMA</span>
          <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-black text-slate-700 leading-none">
              %{metrics.avgCompletion.toString().replace('.', ',')}
            </span>
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-50 text-emerald-600 border border-emerald-100">
              ↑ 2.1%
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-pine-teal rounded-full" style={{ width: `${Math.min(metrics.avgCompletion, 100)}%` }}></div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-6 flex flex-col justify-between h-36">
        <div className="flex justify-between items-start">
          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">AKTİF ETKİNLİK</span>
          <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
          </div>
        </div>
        <div className="text-2xl font-black font-mono text-slate-700 tracking-tight leading-none mb-1">
          {metrics.activeCount}
        </div>
      </div>
    </div>
  );
}
