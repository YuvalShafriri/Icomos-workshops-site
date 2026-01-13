import React, { useState } from "react";
import { Cpu, Info } from "lucide-react";

export interface HeaderProps {
  onAboutClick: () => void;
  onHomeClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onAboutClick,
  onHomeClick,
}) => {
  const [brand] = useState<string>(() => {
    try {
      return localStorage.getItem("siteBrandColor") || "#4F46E5";
    } catch {
      return "#4F46E5";
    }
  });

  const lightenHex = (hex: string, percent: number) => {
    const h = hex.replace("#", "");
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
    ["--brand" as any]: brand,
    ["--brand-hover" as any]: lightenHex(brand, 10),
  };

  return (
    <header
      style={headerStyle}
      className="bg-[#020617] text-white shadow-xl z-50 shrink-0 border-b border-slate-800 px-3 py-1.5 md:py-2 md:px-6"
    >
      <div className="w-full flex items-center justify-between gap-2">
         <div className="flex items-center gap-3 min-w-2">
          <div
            className="p-1 md:p-1.5 rounded-lg shadow-inner cpu-box"
            style={{ boxShadow: "inset 0 0 6px rgba(0,0,0,0.25)" }}
          >
            <Cpu size={20} />
          </div>
     
         <button
  onClick={onHomeClick}
  title="חזרה לדף הבית"
  aria-label="חזרה לדף הבית"
  className="group min-w-0 flex-1 text-right cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded px-0 py-1.5 flex items-center"
>
  <h1 className="font-black tracking-tight leading-none text-indigo-100 group-hover:text-white text-base md:text-lg truncate relative inline-block transition-colors duration-300">
    סדנת אתר.בוט
    <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
  </h1>
</button>
 
          {/* About button - Desktop only (>=768px), subtle transparent style */}
          <button
            onClick={onAboutClick}
            title="מה יש באתר?"
            aria-label="מה יש באתר?"
            className="cursor-pointer hidden md:flex items-center justify-center w-12 h-8 
            rounded-lg border border-white/20 text-white/100 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all
            active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <Info className="w-[24px] h-[21px]" strokeWidth={2.5} />
          </button>
        </div>
        <div
          className="flex items-center gap-2 md:gap-3 shrink-0 whitespace-nowrap justify-end"
          dir="ltr"
        >
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

          <h3 className="text-slate-200 font-bold text-lg md:text-[1.5rem] leading-none">
            InSites Lab
          </h3>

          <div className="w-1 h-4 bg-slate-800 rounded-full hidden md:block"></div>
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
