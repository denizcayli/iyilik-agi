export const getUrgencyStyles = (daysLeft) => {
  if (daysLeft < 10) {
    return {
      color: '#D9533B',
      bg: 'bg-red-50 text-red-700 border-red-200/50',
      progressBarBg: 'bg-gradient-to-r from-[#D9533B] to-[#e6735e]',
      badgeText: 'Süre Azalıyor!',
      isCritical: true
    };
  } else if (daysLeft <= 20) {
    return {
      color: '#D97706',
      bg: 'bg-amber-50 text-amber-700 border-amber-200/50',
      progressBarBg: 'bg-gradient-to-r from-[#D97706] to-[#f59e0b]',
      badgeText: 'Son Günler',
      isCritical: false
    };
  } else {
    return {
      color: '#0B6E5F',
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/50',
      progressBarBg: 'bg-gradient-to-r from-pine-teal to-emerald-500',
      badgeText: null,
      isCritical: false
    };
  }
};
