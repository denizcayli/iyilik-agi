import React from 'react';

export default function GlassCard({ children, className = '', variant = 'light', ...props }) {
  let glassClass = 'glass-panel';
  if (variant === 'heavy') {
    glassClass = 'glass-panel-heavy';
  } else if (variant === 'solid') {
    glassClass = 'glass-panel-solid';
  } else if (variant === 'dark') {
    glassClass = 'glass-panel-dark';
  }

  return (
    <div
      className={`${glassClass} rounded-2xl p-6 transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
