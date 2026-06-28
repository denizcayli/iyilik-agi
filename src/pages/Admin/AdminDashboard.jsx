import React, { useState, useEffect, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import AdminLayout from '../../components/AdminLayout';
import DashboardCards from '../../components/Admin/DashboardCards';

export default function AdminDashboard() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [donations, setDonations] = useState([]);

  // Dashboard verilerini yerel depolamadan okur ve dinamik olarak hesaplar
  const fetchDashboardData = () => {
    const storedDonations = localStorage.getItem('all_donations');
    let donationsList = [];
    if (storedDonations) {
      try {
        donationsList = JSON.parse(storedDonations);
      } catch (error) {
        donationsList = [];
      }
    }

    const INITIAL_DONATIONS = [
      { id: 'd1', donorName: 'Mehmet Yılmaz', campaignTitle: 'Geleceğe Nefes: Orman Yangını', amount: 500, timeAgo: '3 dk önce', date: '2026-06-27' },
      { id: 'd2', donorName: 'Ayşe Kaya', campaignTitle: 'Köy Okullarına Lab.', amount: 250, timeAgo: '15 dk önce', date: '2026-06-27' },
      { id: 'd3', donorName: 'Onur Baha Koç', campaignTitle: 'Sokak Hayvanları Mobil Klinik', amount: 1000, timeAgo: '18 dk önce', date: '2026-06-27' },
      { id: 'd4', donorName: 'Fatma Demir', campaignTitle: 'Temiz Su Kuyusu', amount: 150, timeAgo: '3 sa önce', date: '2026-06-27' },
      { id: 'd5', donorName: 'Ali Çelik', campaignTitle: 'Deprem Bölgesi Okul', amount: 750, timeAgo: '1 gün önce', date: '2026-06-26' },
    ];

    if (donationsList.length === 0) {
      donationsList = INITIAL_DONATIONS;
      localStorage.setItem('all_donations', JSON.stringify(INITIAL_DONATIONS));
    }
    setDonations(donationsList);

    const monthlySum = {
      'Oca': 2400000,
      'Şub': 3800000,
      'Mar': 3500000,
      'Nis': 5000000,
      'May': 8500000,
      'Haz': 4800000,
      'Tem': 6200000,
      'Ağu': 0,
      'Eyl': 0,
      'Eki': 0,
      'Kas': 0,
      'Ara': 0
    };

    const MONTH_LABELS = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];

    donationsList.forEach((don) => {
      if (don.id && String(don.id).startsWith('d_')) {
        const dateObj = new Date(don.date);
        if (!isNaN(dateObj.getTime())) {
          const monthName = MONTH_LABELS[dateObj.getMonth()];
          if (monthlySum[monthName] !== undefined) {
            monthlySum[monthName] += Number(don.amount) || 0;
          }
        }
      }
    });

    const chartData = Object.keys(monthlySum).map((month) => ({
      name: month,
      value: monthlySum[month]
    })).filter(item => item.value > 0 || ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem'].includes(item.name));

    setMonthlyData(chartData);
  };

  useEffect(() => {
    fetchDashboardData();
    window.addEventListener('donation-list-updated', fetchDashboardData);
    window.addEventListener('dashboard-data-updated', fetchDashboardData);
    return () => {
      window.removeEventListener('donation-list-updated', fetchDashboardData);
      window.removeEventListener('dashboard-data-updated', fetchDashboardData);
    };
  }, []);

  // En yüksek bağış hacmine sahip olan ayı tespit eder
  const maxValue = useMemo(() => {
    if (monthlyData.length === 0) return 0;
    return Math.max(...monthlyData.map((d) => d.value));
  }, [monthlyData]);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-left">
            <h1 className="text-3xl font-black text-inst-navy tracking-tight">Hoş geldiniz</h1>
            <p className="text-sm font-bold text-slate-500 mt-1">
              {JSON.parse(localStorage.getItem('user') || '{}').name || 'Yönetici'}
            </p>
          </div>

        </div>

        <DashboardCards />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 card-base p-6 space-y-4">
            <div>
              <h3 className="text-xs font-black text-inst-navy uppercase tracking-wider">AYLIK BAĞIŞ ANALİTİĞİ</h3>
              <p className="text-[10px] text-slate-400 font-medium">Aylara göre toplanan toplam bağış verisi.</p>
            </div>
            <div className="h-80 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F8FAFC" />
                  <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 'bold' }} axisLine={{ stroke: '#F1F5F9' }} tickLine={false} />
                  <YAxis tick={{ fill: '#94A3B8', fontSize: 9, fontFamily: 'monospace' }} axisLine={{ stroke: '#F1F5F9' }} tickLine={false} tickFormatter={(val) => `${val / 1000000}M`} />
                  <Tooltip
                    formatter={(value) => [value.toLocaleString('tr-TR') + ' ₺', 'Bağış']}
                    contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', border: '1px solid #E2E8F0', borderRadius: '1rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', fontSize: '11px', fontWeight: 'bold', color: '#1E293B' }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={36}>
                    {monthlyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.value === maxValue && maxValue > 0 ? '#10B981' : '#E2E8F0'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-4 card-base p-6 space-y-4">
            <div>
              <h3 className="text-xs font-black text-inst-navy uppercase tracking-wider">SON BAĞIŞLAR</h3>
              <p className="text-[10px] text-slate-400 font-medium">Sistem üzerinden yeni yapılan son işlemler.</p>
            </div>
            <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
              {donations.map((don) => {
                const displayName = don.donorEmail === 'Anonim' ? 'Anonim Bağışçı' : don.donorName;
                const initials = displayName
                  ? displayName.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()
                  : 'B';
                return (
                  <div key={don.id} className="flex justify-between items-center py-2.5 border-b border-slate-50">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-pine-teal/5 flex items-center justify-center font-extrabold text-xs text-pine-teal shrink-0">
                        {initials}
                      </div>
                      <div className="text-left min-w-0">
                        <span className="font-bold text-xs text-slate-700 block truncate max-w-[130px]">{displayName}</span>
                        <span className="text-[9px] text-slate-400 font-bold block truncate max-w-[130px]">{don.campaignTitle}</span>
                        <span className="inline-flex px-1.5 py-0.5 rounded text-[8px] font-extrabold bg-slate-50 text-slate-500 border border-slate-200/50 mt-0.5">{don.category || 'Genel'}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-black font-mono text-slate-700 block">+{don.amount.toLocaleString('tr-TR')} ₺</span>
                      <span className="text-[9px] text-slate-400 font-semibold block">{don.timeAgo}</span>
                      <span className="text-[8px] text-slate-350 font-bold block mt-0.5">{don.date || 'Bugün'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
