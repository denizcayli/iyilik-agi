import React from 'react';
import { Link } from 'react-router-dom';
import { getUrgencyStyles } from '../../utils/urgency';
import ProgressBar from './ProgressBar';
import CountdownTimer from './CountdownTimer';

export default function EventCard({ event }) {
  const { id, title, description, category, targetAmount, raisedAmount, daysLeft, imageUrl, donorCount } = event;

  const percentage = Math.min(Math.round((raisedAmount / targetAmount) * 100), 100);
  const isCompleted = raisedAmount >= targetAmount;
  const isExpired = daysLeft <= 0;

  const urgency = getUrgencyStyles(daysLeft);

  const formatMoney = (val) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(val);
  };

  const getCategoryBadgeClass = (cat) => {
    switch (cat) {
      case 'Çevre': return 'bg-emerald-50 text-emerald-700 border-emerald-200/50';
      case 'Eğitim': return 'bg-blue-50 text-blue-700 border-blue-200/50';
      case 'Sağlık': return 'bg-purple-50 text-purple-700 border-purple-200/50';
      case 'Hayvanlar': return 'bg-amber-50 text-amber-700 border-amber-200/50';
      case 'Afet': return 'bg-red-50 text-red-700 border-red-200/50';
      case 'Çocuk': return 'bg-pink-50 text-pink-700 border-pink-200/50';
      case 'Yaşlı': return 'bg-indigo-50 text-indigo-700 border-indigo-200/50';
      case 'Su': return 'bg-cyan-50 text-cyan-700 border-cyan-200/50';
      default: return 'bg-slate-50 text-slate-700 border-slate-200/50';
    }
  };

  return (
    <div className={`bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200/60 transition-all duration-300 flex flex-col overflow-hidden group text-left ${
      isCompleted ? 'opacity-85 saturate-[85%]' : isExpired ? 'opacity-75 grayscale-[20%]' : ''
    }`}>

      {/* Event Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>

        {/* Category Badge */}
        <span className={`absolute top-4 left-4 text-[10px] font-bold px-2.5 py-1 rounded-lg border shadow-sm backdrop-blur-md ${getCategoryBadgeClass(category)}`}>
          {category}
        </span>

        {/* Status/Urgency Badge */}
        {isCompleted ? (
          <span className="absolute top-4 right-4 text-[9px] font-extrabold px-2.5 py-1 rounded-lg border shadow-sm backdrop-blur-md flex items-center gap-1 bg-emerald-50 text-emerald-700 border-emerald-200">
            <svg className="w-3 h-3 text-emerald-600 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            Tamamlandı
          </span>
        ) : isExpired ? (
          <span className="absolute top-4 right-4 text-[9px] font-extrabold px-2.5 py-1 rounded-lg border shadow-sm backdrop-blur-md flex items-center gap-1 bg-slate-50 text-slate-600 border-slate-200">
            Süresi Bitti
          </span>
        ) : urgency.badgeText ? (
          <span className={`absolute top-4 right-4 text-[9px] font-extrabold px-2.5 py-1 rounded-lg border shadow-sm backdrop-blur-md flex items-center gap-1 bg-white/90 ${
            urgency.isCritical ? 'text-[#D9533B] border-red-200 animate-pulse' : 'text-[#D97706] border-amber-200'
          }`}>
            {urgency.isCritical && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9533B] inline-block animate-ping"></span>
            )}
            {urgency.badgeText}
          </span>
        ) : null}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title — Link ile detay sayfasına */}
          <Link
            to={`/events/${id}`}
            className="text-sm font-extrabold text-inst-navy mb-2 line-clamp-1 hover:text-pine-teal cursor-pointer transition-colors block"
          >
            {title}
          </Link>

          {/* Description */}
          <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed font-medium">
            {description}
          </p>
        </div>

        <div>
          {/* Progress Section */}
          <div className="mb-4">
            <div className="flex justify-between items-end mb-1.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Toplanan İlerleme</span>
              <span
                className="text-xs font-black font-mono"
                style={{ color: urgency.color }}
              >
                {percentage}%
              </span>
            </div>
            <ProgressBar percentage={percentage} progressBarBg={urgency.progressBarBg} />
            <div className="flex justify-between items-center mt-2 text-[10px] font-semibold">
              <span className="font-mono text-slate-700">{formatMoney(raisedAmount)}</span>
              <span className="text-slate-400">Hedef: <strong className="font-mono text-slate-600">{formatMoney(targetAmount)}</strong></span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100 my-4"></div>

          {/* Countdown & Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Durum / Süre</span>
              <CountdownTimer
                daysLeft={daysLeft}
                isCompleted={isCompleted}
                isExpired={isExpired}
                urgencyColor={urgency.color}
              />
            </div>
            <div>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Destekçi Sayısı</span>
              <div className="font-mono text-xs font-bold text-slate-700 flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-pine-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>{donorCount} kişi</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Link
              to={`/events/${id}`}
              className="px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-inst-navy transition-all text-center cursor-pointer font-sans font-semibold"
            >
              Detaylar
            </Link>
            {isCompleted ? (
              <button
                disabled
                className="px-3 py-2 text-xs font-bold rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/45 cursor-not-allowed text-center font-sans font-semibold"
              >
                Hedefe Ulaştı
              </button>
            ) : isExpired ? (
              <button
                disabled
                className="px-3 py-2 text-xs font-bold rounded-xl bg-slate-50 text-slate-400 border border-slate-200/45 cursor-not-allowed text-center font-sans font-semibold"
              >
                Süresi Bitti
              </button>
            ) : (
              <Link
                to="/payment"
                className="px-3 py-2 text-xs font-bold rounded-xl bg-ember-coral hover:bg-[#c2422b] text-white transition-all shadow-sm shadow-ember-coral/10 hover:shadow-md cursor-pointer border border-white/10 font-sans font-semibold text-center"
              >
                Bağış Yap
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
