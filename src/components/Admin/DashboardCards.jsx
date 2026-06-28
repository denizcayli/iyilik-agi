import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '../../store/slices/eventSlice';



export default function DashboardCards() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.list);

  const [metrics, setMetrics] = useState({
    totalRaised: 25647500,
    avgCompletion: 67.3,
    activeCount: 8
  });

  const applyMetrics = (eventsList) => {
    if (!eventsList || eventsList.length === 0) {
      setMetrics({
        totalRaised: 16347500,
        avgCompletion: 0,
        activeCount: 2
      });
      return;
    }
    const totalRaised = eventsList.reduce((sum, e) => sum + (e.raisedAmount || 0), 0) + 16347500;
    const activeCount = eventsList.filter((e) => e.status !== 'TAMAMLANDI' && (e.raisedAmount || 0) < (e.targetAmount || 0) && (e.daysLeft || 0) > 0).length + 2;
    const avgCompletion = eventsList.reduce((sum, e) => sum + (((e.raisedAmount || 0) / (e.targetAmount || 1)) * 100), 0) / eventsList.length;

    setMetrics({
      totalRaised,
      avgCompletion: Number(avgCompletion.toFixed(1)),
      activeCount
    });
  };

  useEffect(() => {
    if (events && events.length > 0) {
      applyMetrics(events);
    } else {
      dispatch(fetchEvents());
    }
  }, [events, dispatch]);

  useEffect(() => {
    const refresh = () => {
      dispatch(fetchEvents());
    };
    window.addEventListener('dashboard-data-updated', refresh);
    window.addEventListener('donation-list-updated', refresh);
    return () => {
      window.removeEventListener('dashboard-data-updated', refresh);
      window.removeEventListener('donation-list-updated', refresh);
    };
  }, [dispatch]);

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
          {metrics.totalRaised.toLocaleString('tr-TR')}₺
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
