import React from 'react';

export default function ProgressBar({ percentage, progressBarBg = 'bg-pine-teal' }) {
  return (
    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
      <div 
        className={`h-full rounded-full transition-all duration-500 ease-out ${progressBarBg}`} 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}
