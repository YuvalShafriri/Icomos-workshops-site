import React, { useEffect, useState } from 'react';
import { Cpu, Info } from 'lucide-react';

export interface HeaderProps {
  onAboutClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAboutClick }) => {
  const [brand, setBrand] = useState<string>(() => {
    try {
      return localStorage.getItem('siteBrandColor') || '#4F46E5';
    } catch {
      return '#4F46E5';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('siteBrandColor', brand);
    } catch {}
  }, [brand]);

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
    <header style={headerStyle} className="bg-[#020617] text-white p-2 flex justify-between items-center shadow-xl z-50 shrink-0 border-b border-slate-800 px-6">
      <div className="flex items-center gap-4">
        <div className="p-1.5 rounded-lg shadow-inner cpu-box" style={{ boxShadow: 'inset 0 0 6px rgba(0,0,0,0.25)' }}>
          <Cpu size={24} />
        </div>
        <h1 className="font-black text-lg tracking-tight leading-none text-indigo-100">
          אתר.בוט - אתר הסדנאות
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={onAboutClick}
            title="מה יש באתר?"
            className="flex items-center gap-2 px-4 py-2 rounded-xl border transition-all text-white shadow-sm hover:shadow-md active:scale-[0.99] brand-btn"
          >
            <Info size={16} />
            <span className="text-sm font-black">אודות</span>
          </button>

          
        </div>
      </div>
      <div className="flex items-center gap-3" dir="ltr">
        {/* Technion logo: place Technion_Logo.png (horizontal) in the project's public/ folder */}
        <img src="/Technion_Logo.png" alt="Technion" className="h-6 md:h-7 lg:h-8 object-contain inline-block mr-3" />
        <h3 className="pt-2 text-slate-200 font-bold text-[1.5rem]">InSites Lab</h3>
        <div className="w-1 h-4 bg-slate-800 rounded-full"></div>
      </div>
      <style>{`
        .brand-btn{ background: var(--brand); border: 1px solid rgba(255,255,255,0.06); }
        .brand-btn:hover{ background: var(--brand-hover); }
        .cpu-box{ background: var(--brand); border: 1px solid rgba(255,255,255,0.06); display:inline-flex; align-items:center; justify-content:center }
      `}</style>
    </header>
  );
};

export default Header;
