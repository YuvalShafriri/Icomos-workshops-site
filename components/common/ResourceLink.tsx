import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface ResourceLinkProps {
  href?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  label: React.ReactNode;
  secondaryLabel?: string;
  highlight?: boolean;
  noBorder?: boolean;
  colorScheme?: 'indigo' | 'emerald' | 'amber' | 'slate';
}

export const ResourceLink: React.FC<ResourceLinkProps> = ({
  href,
  onClick,
  icon,
  label,
  secondaryLabel,
  highlight,
  noBorder,
  colorScheme = 'indigo'
}) => {
  const Component = href ? 'a' : 'button';
  // Tailwind can't reliably pick up dynamic class names like `bg-${color}-600`.
  // Use explicit class maps so production builds include the right styles.
  const schemeClasses = {
    indigo: {
      iconHighlight: 'bg-indigo-600 text-white shadow-indigo-200 shadow-lg',
      iconNormal: 'bg-slate-100 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500',
      labelHover: 'group-hover:text-indigo-600',
      arrowHover: 'group-hover:text-indigo-400',
    },
    emerald: {
      iconHighlight: 'bg-emerald-600 text-white shadow-emerald-200 shadow-lg',
      iconNormal: 'bg-slate-100 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500',
      labelHover: 'group-hover:text-emerald-600',
      arrowHover: 'group-hover:text-emerald-400',
    },
    amber: {
      iconHighlight: 'bg-amber-600 text-white shadow-amber-200 shadow-lg',
      iconNormal: 'bg-slate-100 text-slate-400 group-hover:bg-amber-50 group-hover:text-amber-500',
      labelHover: 'group-hover:text-amber-600',
      arrowHover: 'group-hover:text-amber-400',
    },
    slate: {
      iconHighlight: 'bg-white text-slate-900 border-2 border-slate-900 shadow-sm',
      iconNormal: 'bg-slate-100 text-slate-400 group-hover:bg-slate-50 group-hover:text-slate-600',
      labelHover: 'group-hover:text-slate-700',
      arrowHover: 'group-hover:text-slate-500',
    },
  } as const;
  const currentScheme = schemeClasses[colorScheme];

  return (
    <Component
      href={href}
      onClick={onClick}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      className={`flex items-center justify-between p-3.5 hover:bg-slate-50 transition-all group w-full text-right ${noBorder ? '' : 'border-b border-slate-100 last:border-0'}`}
    >
      <div className="flex items-center gap-4 text-right">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${highlight
          ? currentScheme.iconHighlight
          : currentScheme.iconNormal
          }`}>
          {icon}
        </div>
        <div>
          <h4 className={`font-bold text-sm text-slate-800 ${currentScheme.labelHover} transition-colors`}>{label}</h4>
          {secondaryLabel && <p className="text-[10px] text-slate-400 font-medium">{secondaryLabel}</p>}
        </div>
      </div>
      <ArrowUpRight size={14} className={`text-slate-300 ${currentScheme.arrowHover} group-hover:translate-x-1 group-hover:-translate-y-1 transition-all`} />
    </Component>
  );
};

export default ResourceLink;
