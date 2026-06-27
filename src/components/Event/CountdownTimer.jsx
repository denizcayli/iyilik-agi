import React from 'react';

export default function CountdownTimer({ daysLeft, hoursLeft, minutesLeft, isCompleted, isExpired, urgencyColor }) {
  if (isCompleted) {
    return (
      <div className="text-xs font-bold text-emerald-600 flex items-center gap-1">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Tamamlandı</span>
      </div>
    );
  }

  if (isExpired) {
    return (
      <div className="text-xs font-bold text-slate-500 flex items-center gap-1">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Süresi Bitti</span>
      </div>
    );
  }

  return (
    <div
      className="font-mono text-xs font-bold flex items-center gap-1"
      style={{ color: urgencyColor }}
    >
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{daysLeft}g {String(hoursLeft).padStart(2, '0')}s {String(minutesLeft).padStart(2, '0')}d</span>
    </div>
  );
}
