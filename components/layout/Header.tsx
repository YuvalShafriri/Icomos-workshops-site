import React, { useState } from 'react';
import { Cpu, Info } from 'lucide-react';

export interface HeaderProps {
  onAboutClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAboutClick }) => {
  const [brand] = useState<string>(() => {
    try {
      return localStorage.getItem('siteBrandColor') || '#4F46E5';
    } catch {
      return '#4F46E5';
    }
  });

  const lightenHex = (hex: string, percent: number) => {
    const h = hex.replace('#', '');
    const num = parseInt(h, 16);
    let r = (num >> 16) + Math.round(255 * (percent / 100));
    let g = ((num >> 8) & 0x00ff) + Math.round(255 * (percent / 100));
    let b = (num & 0x0000ff) + Math.round(255 * (percent / 100));
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  const headerStyle: React.CSSProperties = {
    // CSS variables used by the styles below
    ['--brand' as any]: brand,
    ['--brand-hover' as any]: lightenHex(brand, 10),
  };

  return (
    <header
      style={headerStyle}
      className="bg-[#020617] text-white shadow-xl z-50 shrink-0 border-b border-slate-800 px-3 py-1.5 md:py-2 md:px-6"
    >
      <div className="w-full flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div
            className="p-1 md:p-1.5 rounded-lg shadow-inner cpu-box"
            style={{ boxShadow: 'inset 0 0 6px rgba(0,0,0,0.25)' }}
          >
            <Cpu size={20} />
          </div>

          <h1 className="min-w-0 flex-1 font-black tracking-tight leading-none text-indigo-100 text-base md:text-lg truncate">
            סדנת אתר.בוט
          </h1>
        </div>

        <div className="flex items-center gap-2 md:gap-3 shrink-0 whitespace-nowrap" dir="ltr">
          {/* Mobile Technion logo (public/technion-small.png) */}
          <img
            src="technion-small.png"
            alt="Technion"
            className="h-6 object-contain inline-block md:hidden"
          />

          {/* Desktop Technion logo (public/Technion_Logo.png) */}
          <img
            src="Technion_Logo.png"
            alt="Technion"
            className="h-6 md:h-7 lg:h-8 object-contain hidden md:inline-block mr-1"
          />

          <h3 className="text-slate-200 font-bold text-lg md:text-[1.5rem] leading-none">InSites Lab</h3>

          <button
            onClick={onAboutClick}
            title="מה יש באתר?"
            aria-label="מה יש באתר?"
            className="cursor-pointer hidden sm:flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg border transition-all text-white shadow-sm hover:shadow-md active:scale-[0.99] brand-btn md:ring-1 md:ring-white/20 md:shadow-md md:hover:shadow-lg md:hover:ring-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <Info className="w-4 h-4 sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" strokeWidth={1.8} />
          </button>

          <div className="w-1 h-4 bg-slate-800 rounded-full"></div>
        </div>
      </div>
      <style>{`
        .brand-btn{ background: var(--brand); border: 1px solid rgba(255,255,255,0.06); }
        @media (min-width: 768px){
          .brand-btn{ border-color: rgba(255,255,255,0.16); }
          .brand-btn:hover{ border-color: rgba(255,255,255,0.28); }
        }
        .brand-btn:hover{ background: var(--brand-hover); }
        .cpu-box{ background: var(--brand); border: 1px solid rgba(255,255,255,0.06); display:inline-flex; align-items:center; justify-content:center }
      `}</style>
    </header>
  );
};

export default Header;
