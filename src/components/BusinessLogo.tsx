interface BusinessLogoProps {
  name: string;
  type: 'restaurant' | 'cafe' | 'education' | 'spa' | 'retail' | 'office' | 'school' | 'district' | 'tech' | 'hotel' | 'fitness' | 'healthcare' | 'travel';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: (e: MouseEvent) => void;
}

import type { ReactElement, MouseEvent } from 'react';

const NAMED_LOGOS: Record<string, (size: string, cursorClass: string, className: string, onClick?: (e: MouseEvent) => void) => ReactElement> = {
  'Chez Georges': (size, cursorClass, className, onClick) => (
    <div
      onClick={onClick}
      className={`${size} ${className} ${cursorClass} rounded-2xl flex items-center justify-center shadow-lg overflow-hidden`}
      style={{ background: 'radial-gradient(circle at 40% 35%, #4a2c1a 0%, #2b1507 60%, #1a0d04 100%)' }}
    >
      <svg viewBox="0 0 48 48" className="w-4/5 h-4/5" fill="none">
        {/* Outer decorative ring */}
        <circle cx="24" cy="24" r="21" stroke="#c8955a" strokeWidth="0.8" opacity="0.5" />
        <circle cx="24" cy="24" r="18.5" stroke="#c8955a" strokeWidth="0.4" opacity="0.3" />
        {/* Fork left */}
        <line x1="16" y1="13" x2="16" y2="35" stroke="#e8bc80" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="14" y1="13" x2="14" y2="19" stroke="#e8bc80" strokeWidth="1" strokeLinecap="round" />
        <line x1="18" y1="13" x2="18" y2="19" stroke="#e8bc80" strokeWidth="1" strokeLinecap="round" />
        <path d="M14 19 Q16 22 18 19" stroke="#e8bc80" strokeWidth="1" fill="none" strokeLinecap="round" />
        {/* Knife right */}
        <line x1="32" y1="13" x2="32" y2="35" stroke="#e8bc80" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M32 13 Q36 17 34 22 L32 22" stroke="#e8bc80" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* G letter center */}
        <text x="24" y="27" textAnchor="middle" fontSize="8" fontFamily="Georgia, serif" fill="#e8bc80" fontWeight="bold" letterSpacing="0.5">G</text>
      </svg>
    </div>
  ),
  'Lotte Hotels Moscow': (size, cursorClass, className, onClick) => (
    <div onClick={onClick} className={`${size} ${className} ${cursorClass} rounded-2xl flex flex-col items-center justify-center shadow-lg bg-white px-1`}>
      <svg viewBox="0 0 40 18" className="w-4/5">
        <circle cx="5" cy="9" r="4.5" fill="none" stroke="#8b6914" strokeWidth="1.2" />
        <circle cx="5" cy="9" r="2" fill="#8b6914" />
        <text x="12" y="13" fontFamily="Georgia, serif" fontWeight="700" fontSize="9" fill="#333" letterSpacing="0.5">LOTTE</text>
      </svg>
      <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 300, fontSize: '0.3rem', letterSpacing: '0.18em', color: '#888' }}>HOTELS</span>
    </div>
  ),
  "Tör're Astana": (size, cursorClass, className, onClick) => (
    <div onClick={onClick} className={`${size} ${className} ${cursorClass} rounded-2xl flex flex-col items-center justify-center shadow-lg overflow-hidden`} style={{ background: '#1a3a28' }}>
      <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 400, fontSize: '0.28rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)' }}>TRADEMARK COLLECTION</span>
      <span style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '0.52rem', letterSpacing: '0.08em', color: 'white', lineHeight: 1.1 }}>TÖR'RE</span>
      <span style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '0.52rem', letterSpacing: '0.08em', color: 'white', lineHeight: 1.1 }}>ASTANA</span>
    </div>
  ),
  'Beijing Palace': (size, cursorClass, className, onClick) => (
    <div onClick={onClick} className={`${size} ${className} ${cursorClass} rounded-2xl flex flex-col items-center justify-center shadow-lg bg-white`}>
      <svg viewBox="0 0 40 28" className="w-4/5">
        {/* Pagoda roof tiers */}
        <path d="M20 4 L28 10 L12 10 Z" fill="#c8202a" />
        <path d="M20 9 L30 16 L10 16 Z" fill="#c8202a" />
        <path d="M20 15 L32 22 L8 22 Z" fill="#b01818" />
        {/* Door */}
        <rect x="17" y="22" width="6" height="6" fill="#8a1010" rx="3" />
        {/* Decorative dots */}
        <circle cx="14" cy="13" r="1" fill="#f5c800" />
        <circle cx="26" cy="13" r="1" fill="#f5c800" />
      </svg>
      <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: '0.32rem', letterSpacing: '0.08em', color: '#c8202a' }}>BEIJING PALACE</span>
    </div>
  ),
  'Green Wellness Burabay': (size, cursorClass, className, onClick) => (
    <div onClick={onClick} className={`${size} ${className} ${cursorClass} rounded-2xl flex flex-col items-center justify-center shadow-lg bg-white px-1`}>
      <svg viewBox="0 0 40 22" className="w-4/5">
        {/* Mountains */}
        <path d="M4 20 L12 8 L20 20 Z" fill="#6ab04c" />
        <path d="M14 20 L24 5 L34 20 Z" fill="#4a9030" />
        {/* Tree */}
        <path d="M30 20 L35 12 L40 20 Z" fill="#6ab04c" />
        <rect x="33.5" y="20" width="3" height="4" fill="#8b6914" rx="0.5" />
      </svg>
      <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: '0.3rem', letterSpacing: '0.06em', color: '#4a9030', lineHeight: 1.3, textAlign: 'center' }}>GREEN WELLNESS</span>
      <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 400, fontSize: '0.28rem', letterSpacing: '0.1em', color: '#888' }}>BURABAY</span>
    </div>
  ),
  'Wyndham Garden Astana': (size, cursorClass, className, onClick) => (
    <div onClick={onClick} className={`${size} ${className} ${cursorClass} rounded-2xl flex flex-col items-center justify-center shadow-lg overflow-hidden`} style={{ background: '#2d6a2d' }}>
      <svg viewBox="0 0 32 18" className="w-3/4">
        {/* W diamond badge */}
        <rect x="10" y="1" width="12" height="12" rx="2" fill="white" transform="rotate(45 16 7)" />
        <text x="16" y="10" textAnchor="middle" fontSize="7" fontFamily="Arial Black, sans-serif" fontWeight="900" fill="#2d6a2d">W</text>
      </svg>
      <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: '0.36rem', letterSpacing: '0.1em', color: 'white', lineHeight: 1.2 }}>WYNDHAM</span>
      <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 400, fontSize: '0.3rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.8)' }}>GARDEN</span>
    </div>
  ),
  'Wyndham Garden Burabay': (size, cursorClass, className, onClick) => (
    <div onClick={onClick} className={`${size} ${className} ${cursorClass} rounded-2xl flex flex-col items-center justify-center shadow-lg overflow-hidden`} style={{ background: '#2d6a2d' }}>
      <svg viewBox="0 0 32 18" className="w-3/4">
        <rect x="10" y="1" width="12" height="12" rx="2" fill="white" transform="rotate(45 16 7)" />
        <text x="16" y="10" textAnchor="middle" fontSize="7" fontFamily="Arial Black, sans-serif" fontWeight="900" fill="#2d6a2d">W</text>
      </svg>
      <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: '0.36rem', letterSpacing: '0.1em', color: 'white', lineHeight: 1.2 }}>WYNDHAM</span>
      <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 400, fontSize: '0.3rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.8)' }}>GARDEN</span>
    </div>
  ),
  'Sheraton Astana': (size, cursorClass, className, onClick) => (
    <div onClick={onClick} className={`${size} ${className} ${cursorClass} rounded-2xl flex flex-col items-center justify-center shadow-lg bg-white`}>
      <svg viewBox="0 0 40 30" className="w-4/5">
        {/* Sheraton S emblem wreath */}
        <circle cx="20" cy="13" r="9" fill="none" stroke="#888" strokeWidth="0.6" strokeDasharray="2 1.5" />
        <text x="20" y="18" textAnchor="middle" fontSize="12" fontFamily="Georgia, serif" fontWeight="400" fill="#444">S</text>
        <text x="20" y="27" textAnchor="middle" fontSize="5" fontFamily="Arial, sans-serif" fontWeight="400" fill="#555" letterSpacing="1">SHERATON</text>
      </svg>
    </div>
  ),
  'Ramada by Wyndham Astana': (size, cursorClass, className, onClick) => (
    <div onClick={onClick} className={`${size} ${className} ${cursorClass} rounded-2xl flex flex-col items-center justify-center shadow-lg bg-white px-1`}>
      <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 700, fontSize: '0.7rem', color: '#c8202a', lineHeight: 1 }}>Ramada</span>
      <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 300, fontSize: '0.26rem', letterSpacing: '0.12em', color: '#888', lineHeight: 1.4 }}>BY WYNDHAM</span>
      <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: '0.3rem', letterSpacing: '0.14em', color: '#555' }}>ASTANA</span>
    </div>
  ),
  'Air Astana': (size, cursorClass, className, onClick) => (
    <div onClick={onClick} className={`${size} ${className} ${cursorClass} rounded-2xl flex flex-col items-center justify-center shadow-lg bg-white`}>
      <svg viewBox="0 0 40 28" className="w-4/5">
        {/* Stylized bird/wing shape in gold */}
        <path d="M4 18 C8 10 16 8 20 10 C24 8 32 10 36 18 C28 14 24 16 20 14 C16 16 12 14 4 18Z" fill="#c8a84b" />
        <path d="M14 18 C16 13 18 12 20 13 C22 12 24 13 26 18 C24 15 22 15 20 14.5 C18 15 16 15 14 18Z" fill="#a07830" />
        <text x="20" y="27" textAnchor="middle" fontSize="5" fontFamily="Arial, sans-serif" fontWeight="700" fill="#1a3f6f" letterSpacing="0.5">air astana</text>
      </svg>
    </div>
  ),
  'Tulip Medicine': (size, cursorClass, className, onClick) => (
    <div onClick={onClick} className={`${size} ${className} ${cursorClass} rounded-2xl flex flex-col items-center justify-center shadow-lg bg-white px-1`}>
      <svg viewBox="0 0 40 28" className="w-4/5">
        {/* "20" in red */}
        <text x="4" y="22" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="22" fill="#c8202a">20</text>
        {/* Small tulip/medical icon top-right of 20 */}
        <circle cx="31" cy="8" r="5" fill="#c8202a" />
        <path d="M31 5 L31 11 M28 8 L34 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 400, fontSize: '0.32rem', color: '#c8202a', letterSpacing: '0.06em', marginTop: '-2px' }}>Tulip Medicine</span>
    </div>
  ),
  'Anga Dental Clinic': (size, cursorClass, className, onClick) => (
    <div onClick={onClick} className={`${size} ${className} ${cursorClass} rounded-2xl flex flex-col items-center justify-center shadow-lg bg-white px-1`}>
      <span style={{ fontFamily: 'Arial Black, Arial, sans-serif', fontWeight: 900, fontSize: '0.38rem', letterSpacing: '0.06em', color: '#111', lineHeight: 1.2, textAlign: 'center' }}>ANGA</span>
      <span style={{ fontFamily: 'Arial Black, Arial, sans-serif', fontWeight: 900, fontSize: '0.38rem', letterSpacing: '0.06em', color: '#111', lineHeight: 1.2, textAlign: 'center' }}>DENTAL</span>
      <span style={{ fontFamily: 'Arial Black, Arial, sans-serif', fontWeight: 900, fontSize: '0.38rem', letterSpacing: '0.06em', color: '#111', lineHeight: 1.2, textAlign: 'center' }}>CLINIC</span>
    </div>
  ),
  'International SOS': (size, cursorClass, className, onClick) => (
    <div onClick={onClick} className={`${size} ${className} ${cursorClass} rounded-2xl flex items-center justify-center shadow-lg overflow-hidden`} style={{ background: '#1a3f6f' }}>
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <circle cx="24" cy="24" r="24" fill="#1a3f6f" />
        {/* Globe lines */}
        <circle cx="24" cy="24" r="14" fill="none" stroke="white" strokeWidth="1" opacity="0.7" />
        <ellipse cx="24" cy="24" rx="7" ry="14" fill="none" stroke="white" strokeWidth="0.8" opacity="0.6" />
        <line x1="10" y1="24" x2="38" y2="24" stroke="white" strokeWidth="0.8" opacity="0.6" />
        <line x1="12" y1="18" x2="36" y2="18" stroke="white" strokeWidth="0.6" opacity="0.5" />
        <line x1="12" y1="30" x2="36" y2="30" stroke="white" strokeWidth="0.6" opacity="0.5" />
        <text x="24" y="40" textAnchor="middle" fontSize="4" fontFamily="Arial, sans-serif" fontWeight="700" fill="white" letterSpacing="0.3">INTERNATIONAL SOS</text>
      </svg>
    </div>
  ),
  'Interteach': (size, cursorClass, className, onClick) => (
    <div onClick={onClick} className={`${size} ${className} ${cursorClass} rounded-2xl flex items-center justify-center shadow-lg bg-white overflow-hidden`}>
      <svg viewBox="0 0 48 48" className="w-4/5 h-4/5">
        {/* UN-style laurel wreath globe */}
        <circle cx="24" cy="22" r="10" fill="none" stroke="#4a90d9" strokeWidth="1.5" />
        <ellipse cx="24" cy="22" rx="5" ry="10" fill="none" stroke="#4a90d9" strokeWidth="1" />
        <line x1="14" y1="22" x2="34" y2="22" stroke="#4a90d9" strokeWidth="1" />
        <line x1="15" y1="17" x2="33" y2="17" stroke="#4a90d9" strokeWidth="0.8" />
        <line x1="15" y1="27" x2="33" y2="27" stroke="#4a90d9" strokeWidth="0.8" />
        {/* Laurel branches */}
        <path d="M12 14 Q10 18 11 22 Q10 26 12 30" fill="none" stroke="#4a90d9" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M36 14 Q38 18 37 22 Q38 26 36 30" fill="none" stroke="#4a90d9" strokeWidth="1.2" strokeLinecap="round" />
        <text x="24" y="42" textAnchor="middle" fontSize="4.5" fontFamily="Arial, sans-serif" fontWeight="700" fill="#4a90d9" letterSpacing="0.3">INTERTEACH</text>
      </svg>
    </div>
  ),
  'Ana Flowers': (size, cursorClass, className, onClick) => (
    <div onClick={onClick} className={`${size} ${className} ${cursorClass} rounded-2xl flex flex-col items-center justify-center shadow-lg px-1`} style={{ background: '#1a1a1a' }}>
      <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 400, fontSize: '0.52rem', letterSpacing: '0.12em', color: 'white', lineHeight: 1.2, textAlign: 'center' }}>ANA</span>
      <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 400, fontSize: '0.52rem', letterSpacing: '0.12em', color: 'white', lineHeight: 1.2, textAlign: 'center' }}>FLOWERS</span>
    </div>
  ),
  'Rixos Almaty': (size, cursorClass, className, onClick) => (
    <div onClick={onClick} className={`${size} ${className} ${cursorClass} rounded-2xl flex flex-col items-center justify-center shadow-lg bg-white px-1`}>
      <svg viewBox="0 0 56 20" className="w-4/5">
        <text x="0" y="16" fontFamily="Georgia, serif" fontWeight="400" fontSize="14" fill="#555" letterSpacing="2">RI</text>
        {/* X with decorative cross */}
        <path d="M26 3 L32 17 M32 3 L26 17" stroke="#555" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M29 10 L26 10 M29 10 L32 10 M29 10 L29 7 M29 10 L29 13" stroke="#888" strokeWidth="0.8" />
        <text x="34" y="16" fontFamily="Georgia, serif" fontWeight="400" fontSize="14" fill="#555" letterSpacing="2">OS</text>
      </svg>
      <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 300, fontSize: '0.28rem', letterSpacing: '0.2em', color: '#888' }}>HOTELS</span>
    </div>
  ),
  'Rixos Borovoe': (size, cursorClass, className, onClick) => (
    <div onClick={onClick} className={`${size} ${className} ${cursorClass} rounded-2xl flex flex-col items-center justify-center shadow-lg bg-white px-1`}>
      <svg viewBox="0 0 56 20" className="w-4/5">
        <text x="0" y="16" fontFamily="Georgia, serif" fontWeight="400" fontSize="14" fill="#555" letterSpacing="2">RI</text>
        <path d="M26 3 L32 17 M32 3 L26 17" stroke="#555" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M29 10 L26 10 M29 10 L32 10 M29 10 L29 7 M29 10 L29 13" stroke="#888" strokeWidth="0.8" />
        <text x="34" y="16" fontFamily="Georgia, serif" fontWeight="400" fontSize="14" fill="#555" letterSpacing="2">OS</text>
      </svg>
      <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 300, fontSize: '0.28rem', letterSpacing: '0.2em', color: '#888' }}>HOTELS</span>
    </div>
  ),
  'Hilton Astana': (size, cursorClass, className, onClick) => (
    <div onClick={onClick} className={`${size} ${className} ${cursorClass} rounded-2xl flex flex-col items-center justify-center shadow-lg bg-white`}>
      <svg viewBox="0 0 48 48" className="w-4/5 h-4/5">
        {/* Hilton H emblem in blue circle */}
        <circle cx="24" cy="20" r="14" fill="#003580" />
        <text x="24" y="26" textAnchor="middle" fontSize="16" fontFamily="Georgia, serif" fontWeight="700" fill="white">H</text>
        <text x="24" y="40" textAnchor="middle" fontSize="4.5" fontFamily="Arial, sans-serif" fontWeight="400" fill="#003580" letterSpacing="0.8">ASTANA</text>
      </svg>
    </div>
  ),
  'Coventry University Kazakhstan': (size, cursorClass, className, onClick) => (
    <div
      onClick={onClick}
      className={`${size} ${className} ${cursorClass} rounded-2xl flex items-center justify-center shadow-lg overflow-hidden`}
      style={{ background: '#1a5eb8' }}
    >
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <circle cx="24" cy="24" r="24" fill="#1a5eb8" />
        <circle cx="24" cy="24" r="20" fill="none" stroke="white" strokeWidth="0.6" opacity="0.4" />
        <text x="24" y="20" textAnchor="middle" fontSize="5.5" fontFamily="Arial, sans-serif" fontWeight="700" fill="white" letterSpacing="0.3">Coventry</text>
        <text x="24" y="27" textAnchor="middle" fontSize="4" fontFamily="Arial, sans-serif" fontWeight="400" fill="white" letterSpacing="0.2">University</text>
        <path d="M14 31 Q24 28 34 31" stroke="white" strokeWidth="0.8" fill="none" opacity="0.6" />
      </svg>
    </div>
  ),
  'Ardingly Astana': (size, cursorClass, className, onClick) => (
    <div
      onClick={onClick}
      className={`${size} ${className} ${cursorClass} rounded-2xl flex flex-col items-center justify-center shadow-lg bg-white px-1`}
    >
      <span style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '0.5rem', letterSpacing: '0.18em', color: '#222', lineHeight: 1 }}>ARDINGLY</span>
      <div style={{ width: '70%', height: '1px', background: 'linear-gradient(to right, transparent, #c8a84b, transparent)', margin: '3px 0' }} />
      <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 400, fontSize: '0.28rem', letterSpacing: '0.1em', color: '#888' }}>ASTANA</span>
    </div>
  ),
  'Nazarbayev University GSB': (size, cursorClass, className, onClick) => (
    <div
      onClick={onClick}
      className={`${size} ${className} ${cursorClass} rounded-2xl flex items-center justify-center shadow-lg overflow-hidden`}
      style={{ background: '#c9b99a' }}
    >
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <circle cx="24" cy="24" r="24" fill="#c9b99a" />
        <circle cx="24" cy="24" r="19" fill="none" stroke="#8a6e50" strokeWidth="0.8" opacity="0.6" />
        <circle cx="24" cy="24" r="15" fill="none" stroke="#8a6e50" strokeWidth="0.5" opacity="0.4" />
        {/* Fleur-de-lis simplified */}
        <path d="M24 14 C24 14 22 17 22 20 C20 19 18 20 19 22 C20 24 22 23 22 23 C21 26 20 28 18 30 L24 28 L30 30 C28 28 27 26 26 23 C26 23 28 24 29 22 C30 20 28 19 26 20 C26 17 24 14 24 14Z" fill="#8a6e50" opacity="0.8" />
      </svg>
    </div>
  ),
  'Abadan Kindergarten': (size, cursorClass, className, onClick) => (
    <div
      onClick={onClick}
      className={`${size} ${className} ${cursorClass} rounded-2xl flex items-center justify-center shadow-lg bg-white`}
    >
      <svg viewBox="0 0 48 48" className="w-3/5 h-3/5" fill="none">
        <circle cx="24" cy="24" r="20" stroke="#4a9a3a" strokeWidth="2.5" />
        {/* Pointing hand/finger */}
        <path d="M24 34 L24 22 M21 22 L21 26 M27 22 L27 26" stroke="#4a9a3a" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 22 C20 20 22 19 24 19 C26 19 28 20 28 22 L28 26 C28 28 26 29 24 29 C22 29 20 28 20 26 Z" stroke="#4a9a3a" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        <circle cx="24" cy="17" r="2.5" stroke="#4a9a3a" strokeWidth="1.5" />
      </svg>
    </div>
  ),
  'Invictus Go': (size, cursorClass, className, onClick) => (
    <div
      onClick={onClick}
      className={`${size} ${className} ${cursorClass} rounded-2xl flex items-center justify-center shadow-lg`}
      style={{ background: '#cc1e1e' }}
    >
      <span style={{ fontFamily: 'Arial Black, Arial, sans-serif', fontWeight: 900, fontSize: '0.85rem', color: 'white', letterSpacing: '0.02em' }}>GO!</span>
    </div>
  ),
  'Bronx Fitness': (size, cursorClass, className, onClick) => (
    <div
      onClick={onClick}
      className={`${size} ${className} ${cursorClass} rounded-full flex flex-col items-center justify-center shadow-lg`}
      style={{ background: '#1a1a1a' }}
    >
      <span style={{ fontFamily: 'Arial Black, Arial, sans-serif', fontWeight: 900, fontSize: '0.42rem', letterSpacing: '0.08em', color: '#f5c800', lineHeight: 1.2 }}>BRONX</span>
      <span style={{ fontFamily: 'Arial Black, Arial, sans-serif', fontWeight: 900, fontSize: '0.36rem', letterSpacing: '0.08em', color: '#f5c800', lineHeight: 1.2 }}>FITNESS</span>
    </div>
  ),
  'Rafe Beauty Lounge': (size, cursorClass, className, onClick) => (
    <div
      onClick={onClick}
      className={`${size} ${className} ${cursorClass} rounded-2xl flex flex-col items-center justify-center shadow-lg bg-white px-1`}
    >
      <span style={{ fontFamily: 'Arial Black, Arial, sans-serif', fontWeight: 900, fontSize: '0.38rem', letterSpacing: '0.06em', color: '#111', lineHeight: 1.2, textAlign: 'center' }}>RAFE BEAUTY</span>
      <span style={{ fontFamily: 'Arial Black, Arial, sans-serif', fontWeight: 900, fontSize: '0.38rem', letterSpacing: '0.06em', color: '#111', lineHeight: 1.2, textAlign: 'center' }}>LOUNGE</span>
    </div>
  ),
  'Peak Buro': (size, cursorClass, className, onClick) => (
    <div
      onClick={onClick}
      className={`${size} ${className} ${cursorClass} rounded-2xl flex items-center justify-center shadow-lg bg-white px-1`}
    >
      <svg viewBox="0 0 60 24" className="w-4/5">
        <text x="0" y="18" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="18" fill="#2d5a27" letterSpacing="1">PE</text>
        {/* Mountain peak between PE and AK */}
        <path d="M36 18 L39 8 L42 18" fill="none" stroke="#2d5a27" strokeWidth="2" strokeLinejoin="round" />
        <text x="42" y="18" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="18" fill="#2d5a27" letterSpacing="1">AK</text>
      </svg>
    </div>
  ),
  'Bella Ciao': (size, cursorClass, className, onClick) => (
    <div
      onClick={onClick}
      className={`${size} ${className} ${cursorClass} rounded-2xl flex flex-col items-center justify-center shadow-lg bg-white px-1`}
    >
      <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 400, fontSize: '0.6rem', color: '#333', letterSpacing: '0.02em', lineHeight: 1 }}>Bella Ciao</span>
      <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 400, fontSize: '0.26rem', letterSpacing: '0.12em', color: '#888', marginTop: '2px' }}>TRATTORIA ITALIANA</span>
    </div>
  ),
  'Lia Bistro': (size, cursorClass, className, onClick) => (
    <div
      onClick={onClick}
      className={`${size} ${className} ${cursorClass} rounded-2xl flex flex-col items-center justify-center shadow-lg bg-white px-1`}
    >
      <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 400, fontSize: '0.9rem', color: '#8faa4a', lineHeight: 1 }}>lia</span>
      <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 400, fontSize: '0.25rem', letterSpacing: '0.1em', color: '#8faa4a', marginTop: '1px' }}>pizza · pasta · wine</span>
    </div>
  ),
  'Antal Kazakhstan': (size, cursorClass, className, onClick) => (
    <div
      onClick={onClick}
      className={`${size} ${className} ${cursorClass} rounded-2xl flex flex-col items-center justify-center shadow-lg bg-white gap-0.5`}
    >
      <svg viewBox="0 0 32 32" className="w-2/5 h-2/5">
        <defs>
          <linearGradient id="antalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e040fb" />
            <stop offset="25%" stopColor="#2979ff" />
            <stop offset="50%" stopColor="#00e676" />
            <stop offset="75%" stopColor="#ffea00" />
            <stop offset="100%" stopColor="#ff1744" />
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="13" fill="none" stroke="url(#antalGrad)" strokeWidth="4" />
      </svg>
      <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: '0.42rem', color: '#222', letterSpacing: '0.05em' }}>Antal</span>
    </div>
  ),
  'Aula': (size, cursorClass, className, onClick) => (
    <div
      onClick={onClick}
      className={`${size} ${className} ${cursorClass} rounded-2xl flex flex-col items-center justify-center shadow-lg bg-white gap-0.5`}
    >
      <svg viewBox="0 0 32 20" className="w-3/5" fill="none">
        {/* Spiral swirl */}
        <path d="M16 10 C16 10 13 7 13 5 C13 3 15 2 17 3 C19 4 19 7 17 9 C15 11 12 11 11 9 C10 7 11 4 14 3" stroke="#7a4a1e" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
      <span style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '0.6rem', letterSpacing: '0.15em', color: '#5a3210' }}>AULÁ</span>
      <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 400, fontSize: '0.3rem', letterSpacing: '0.08em', color: '#8a6040' }}>SHEF · TANDIR · MANGAL</span>
    </div>
  ),
  'Laliko': (size, cursorClass, className, onClick) => (
    <div
      onClick={onClick}
      className={`${size} ${className} ${cursorClass} rounded-2xl flex flex-col items-center justify-center shadow-lg bg-white`}
    >
      <span style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.12em', color: '#c0392b', lineHeight: 1 }}>LALIKO</span>
      <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 400, fontSize: '0.28rem', color: '#c0392b', opacity: 0.7, marginTop: '2px', letterSpacing: '0.06em' }}>GEORGIAN CUISINE</span>
    </div>
  ),
  'Kultura Diktuet': (size, cursorClass, className, onClick) => (
    <div
      onClick={onClick}
      className={`${size} ${className} ${cursorClass} rounded-2xl flex flex-col items-center justify-center shadow-lg bg-white gap-0.5 px-1`}
    >
      <svg viewBox="0 0 24 8" className="w-2/5" fill="none">
        {/* Steam wisps */}
        <path d="M6 7 Q5 4 6 2" stroke="#e8a020" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M12 7 Q11 4 12 1" stroke="#e8a020" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M18 7 Q17 4 18 2" stroke="#e8a020" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: '0.42rem', letterSpacing: '0.06em', color: '#e8a020', lineHeight: 1.1, textAlign: 'center' }}>КУЛЬТУРА</span>
      <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: '0.42rem', letterSpacing: '0.06em', color: '#e8a020', lineHeight: 1.1, textAlign: 'center' }}>ДИКТУЕТ</span>
    </div>
  ),
  'Культура Диктует': (size, cursorClass, className, onClick) => (
    <div
      onClick={onClick}
      className={`${size} ${className} ${cursorClass} rounded-2xl flex flex-col items-center justify-center shadow-lg bg-white gap-0.5 px-1`}
    >
      <svg viewBox="0 0 24 8" className="w-2/5" fill="none">
        <path d="M6 7 Q5 4 6 2" stroke="#e8a020" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M12 7 Q11 4 12 1" stroke="#e8a020" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M18 7 Q17 4 18 2" stroke="#e8a020" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: '0.42rem', letterSpacing: '0.06em', color: '#e8a020', lineHeight: 1.1, textAlign: 'center' }}>КУЛЬТУРА</span>
      <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: '0.42rem', letterSpacing: '0.06em', color: '#e8a020', lineHeight: 1.1, textAlign: 'center' }}>ДИКТУЕТ</span>
    </div>
  ),
  'Master Coffee': (size, cursorClass, className, onClick) => (
    <div
      onClick={onClick}
      className={`${size} ${className} ${cursorClass} rounded-2xl flex flex-col items-center justify-center shadow-lg bg-white px-1`}
    >
      <span style={{ fontFamily: 'Arial Black, Arial, sans-serif', fontWeight: 900, fontSize: '0.5rem', letterSpacing: '0.08em', color: '#111', lineHeight: 1.2, textAlign: 'center' }}>MASTER</span>
      <span style={{ fontFamily: 'Arial Black, Arial, sans-serif', fontWeight: 900, fontSize: '0.5rem', letterSpacing: '0.08em', color: '#111', lineHeight: 1.2, textAlign: 'center' }}>COFFEE</span>
    </div>
  ),
  'Luckee Yu': (size, cursorClass, className, onClick) => (
    <div
      onClick={onClick}
      className={`${size} ${className} ${cursorClass} rounded-2xl flex items-center justify-center shadow-lg bg-white`}
    >
      <div className="flex flex-col items-center leading-none">
        <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: '0.55rem', letterSpacing: '0.12em', color: '#111' }}>LUCKEE</span>
        <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: '0.55rem', letterSpacing: '0.12em', color: '#111' }}>YU</span>
      </div>
    </div>
  ),
  'Canadian International School': (size, cursorClass, className, onClick) => (
    <div
      onClick={onClick}
      className={`${size} ${className} ${cursorClass} rounded-2xl flex items-center justify-center shadow-lg bg-white`}
    >
      <svg viewBox="0 0 48 48" className="w-3/5 h-3/5" fill="none">
        {/* Maple leaf — stylized outline matching the logo */}
        <path
          d="M24 4
             L21 14 L14 11 L17 17
             L8 16 L13 21
             L4 26 L13 25 L11 30
             L18 27 L17 36
             L21 33 L21 44
             L24 41 L27 44
             L27 33 L31 36
             L30 27 L37 30
             L35 25 L44 26
             L35 21 L40 16
             L31 17 L34 11
             L27 14 Z"
          fill="#d1232a"
          stroke="#d1232a"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  ),
};

export function BusinessLogo({ name, type, size = 'md', className = '', onClick }: BusinessLogoProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  const cursorClass = onClick ? 'cursor-pointer hover:scale-105 transition-transform' : '';

  if (NAMED_LOGOS[name]) {
    return NAMED_LOGOS[name](sizeClasses[size], cursorClass, className, onClick);
  }

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
