import React from 'react';
import { Cpu, Info } from 'lucide-react';

export interface HeaderProps {
  onAboutClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAboutClick }) => {
  return (
    <header className="bg-[#020617] text-white p-3 flex justify-between items-center shadow-xl z-50 shrink-0 border-b border-slate-800 px-6">
      <div className="flex items-center gap-4">
        <div className="p-1.5 bg-indigo-600 rounded-lg shadow-inner border border-indigo-400/20">
          <Cpu size={24} />
        </div>
        <h1 className="font-black text-2xl tracking-tight leading-none text-indigo-100">
          אתר.בוט - אתר הסדנאות
        </h1>
        <button
          onClick={onAboutClick}
          title="מה יש באתר?"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl border border-indigo-400/30 transition-all text-white shadow-sm hover:shadow-md active:scale-[0.99]"
        >
          <Info size={16} />
          <span className="text-sm font-black">אודות</span>
        </button>
      </div>
      <div className="flex items-center gap-2" dir="ltr">
        <h3 className="text-slate-200 font-bold text-2xl">InSites</h3>
        <div className="w-1 h-4 bg-slate-800 rounded-full"></div>
      </div>
    </header>
  );
};

export default Header;
