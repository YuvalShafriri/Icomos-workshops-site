import React from 'react';

export interface SectionDividerProps {
  label: string;
  colorClass?: string;
  bgColor?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  label,
  colorClass = "text-slate-400",
  bgColor = "bg-slate-50"
}) => (
  <div className="relative py-2">
    <div className="absolute inset-0 flex items-center" aria-hidden="true">
      <div className="w-full border-t border-slate-200"></div>
    </div>
    <div className="relative flex justify-center">
      <span className={`${bgColor} px-4 text-[10px] font-black uppercase tracking-[0.2em] ${colorClass} text-center leading-tight`}>
        {label}
      </span>
    </div>
  </div>
);

export default SectionDivider;
