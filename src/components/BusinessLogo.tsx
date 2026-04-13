interface BusinessLogoProps {
  name: string;
  type: 'restaurant' | 'cafe' | 'education' | 'spa' | 'retail' | 'office' | 'school' | 'district' | 'tech' | 'hotel' | 'fitness' | 'healthcare' | 'travel';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export function BusinessLogo({ type, size = 'md', className = '', onClick }: BusinessLogoProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  const cursorClass = onClick ? 'cursor-pointer hover:scale-105 transition-transform' : '';

  const logos = {
    restaurant: (
      <div onClick={onClick} className={`${sizeClasses[size]} ${className} ${cursorClass} rounded-2xl bg-gradient-to-br from-[#ff6b6b] to-[#ee5a6f] flex items-center justify-center shadow-lg`}>
        <svg className="w-1/2 h-1/2 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.1 13.34l2.83-2.83L3.91 3.5a4.008 4.008 0 0 0 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
        </svg>
      </div>
    ),
    cafe: (
      <div onClick={onClick} className={`${sizeClasses[size]} ${className} ${cursorClass} rounded-2xl bg-gradient-to-br from-[#c77b4d] to-[#8b5a3c] flex items-center justify-center shadow-lg`}>
        <svg className="w-1/2 h-1/2 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M2 21h18v-2H2v2zm0-9h4v7H2v-7zm6 0h4v7H8v-7zm6 0h4v7h-4v-7zm8-5H2v3h20V7zm0-6H2v3h20V1z"/>
          <path d="M20 8h-2v7h2c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2z"/>
        </svg>
      </div>
    ),
    education: (
      <div onClick={onClick} className={`${sizeClasses[size]} ${className} ${cursorClass} rounded-2xl bg-gradient-to-br from-[#4dabf7] to-[#228be6] flex items-center justify-center shadow-lg`}>
        <svg className="w-1/2 h-1/2 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
        </svg>
      </div>
    ),
    spa: (
      <div onClick={onClick} className={`${sizeClasses[size]} ${className} ${cursorClass} rounded-2xl bg-gradient-to-br from-[#b197fc] to-[#9775fa] flex items-center justify-center shadow-lg`}>
        <svg className="w-1/2 h-1/2 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 15.45C9.85 12.17 6.18 10 2 10c0 5.32 3.36 9.82 8.03 11.49.63.23 1.29.4 1.97.51.68-.12 1.33-.29 1.97-.51C18.64 19.82 22 15.32 22 10c-4.18 0-7.85 2.17-10 5.45z"/>
        </svg>
      </div>
    ),
    retail: (
      <div onClick={onClick} className={`${sizeClasses[size]} ${className} ${cursorClass} rounded-2xl bg-gradient-to-br from-[#ff8787] to-[#fa5252] flex items-center justify-center shadow-lg`}>
        <svg className="w-1/2 h-1/2 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
      </div>
    ),
    office: (
      <div onClick={onClick} className={`${sizeClasses[size]} ${className} ${cursorClass} rounded-2xl bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center shadow-lg`}>
        <svg className="w-1/2 h-1/2 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
        </svg>
      </div>
    ),
    school: (
      <div onClick={onClick} className={`${sizeClasses[size]} ${className} ${cursorClass} rounded-2xl bg-gradient-to-br from-[#3b82f6] to-[#2563eb] flex items-center justify-center shadow-lg`}>
        <svg className="w-1/2 h-1/2 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
        </svg>
      </div>
    ),
    district: (
      <div onClick={onClick} className={`${sizeClasses[size]} ${className} ${cursorClass} rounded-2xl bg-gradient-to-br from-[#f59e0b] to-[#d97706] flex items-center justify-center shadow-lg`}>
        <svg className="w-1/2 h-1/2 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z"/>
        </svg>
      </div>
    ),
    tech: (
      <div onClick={onClick} className={`${sizeClasses[size]} ${className} ${cursorClass} rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] flex items-center justify-center shadow-lg`}>
        <svg className="w-1/2 h-1/2 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/>
        </svg>
      </div>
    ),
    hotel: (
      <div onClick={onClick} className={`${sizeClasses[size]} ${className} ${cursorClass} rounded-2xl bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] flex items-center justify-center shadow-lg`}>
        <svg className="w-1/2 h-1/2 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/>
        </svg>
      </div>
    ),
    fitness: (
      <div onClick={onClick} className={`${sizeClasses[size]} ${className} ${cursorClass} rounded-2xl bg-gradient-to-br from-[#f97316] to-[#ea580c] flex items-center justify-center shadow-lg`}>
        <svg className="w-1/2 h-1/2 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z"/>
        </svg>
      </div>
    ),
    healthcare: (
      <div onClick={onClick} className={`${sizeClasses[size]} ${className} ${cursorClass} rounded-2xl bg-gradient-to-br from-[#14b8a6] to-[#0d9488] flex items-center justify-center shadow-lg`}>
        <svg className="w-1/2 h-1/2 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
        </svg>
      </div>
    ),
    travel: (
      <div onClick={onClick} className={`${sizeClasses[size]} ${className} ${cursorClass} rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#4f46e5] flex items-center justify-center shadow-lg`}>
        <svg className="w-1/2 h-1/2 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
        </svg>
      </div>
    ),
  };

  return logos[type] || logos.office;
}
