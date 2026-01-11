import React, { useMemo } from 'react';
import { Home, Info, ListOrdered, Menu, Zap } from 'lucide-react';
import { AgentConfig } from '../../types';

export interface MobileNavProps {
  currentView: 'HOME' | 'TOOLS' | 'STEPS' | 'ABOUT' | 'STEP_DETAIL';
  selectedAgentId: number | null;
  agents: AgentConfig[];
  onHomeClick: () => void;
  onAboutClick: () => void;
  onResearchAidsClick: () => void;
  onStepsClick: () => void;
  onAgentSelect: (agentId: number) => void;
  getMobileStageTheme: (colorName: string, isSelected: boolean) => { pill: string; badge: string };
  getAgentTheme: (agentId: number, colorName: string, isSelected: boolean) => { card: string; icon: string };
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentView,
  selectedAgentId,
  agents,
  onHomeClick,
  onAboutClick,
  onResearchAidsClick,
  onStepsClick,
}) => {

  const currentLabel = useMemo(() => {
    if (currentView === 'TOOLS') return 'כלים נוספים';
    if (currentView === 'STEPS') return 'תהליך הערכה';
    if (currentView === 'ABOUT') return 'אודות המערכת';
    if (selectedAgentId === null) return 'מסך הבית';
    const agent = agents.find((a) => a.id === selectedAgentId);
    return agent ? agent.name.replace(/^שלב \d+ - /, '') : 'שלב';
  }, [agents, selectedAgentId, currentView]);

  return (
    <>
      {/* Tablet-sized "mobile" top bar (>=sm and <md) */}
      <div
        className="hidden sm:flex md:hidden items-center justify-between gap-3 px-3 py-2 bg-slate-50/95 backdrop-blur border-b border-slate-200 shrink-0 sticky top-0 z-40"
        dir="rtl"
      >
        <button
          onClick={onStepsClick}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg border shadow-sm transition-all ${currentView === 'STEPS' ? 'bg-slate-800 text-white border-slate-700' : 'bg-white border-slate-200 text-slate-700'}`}
          aria-label="פתח רשימת שלבים"
        >
          <Menu size={18} />
          <span className="text-xs font-bold">שלבים</span>
        </button>

        <div className="text-xs font-bold text-slate-500 truncate">{currentLabel}</div>

        <button
          onClick={onResearchAidsClick}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg border shadow-sm whitespace-nowrap transition-all shrink-0 cursor-pointer ${currentView === 'TOOLS' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white border-slate-200 text-indigo-600'}`}
          aria-label="כלים נוספים"
        >
          <Zap size={14} className={currentView === 'TOOLS' ? 'text-white' : 'text-indigo-500'} />
          <span className="text-xs font-bold">כלים</span>
        </button>
      </div>

      {/* Phone-only bottom tabs (<sm) */}
      <nav
        className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-t border-slate-200"
        dir="rtl"
        aria-label="ניווט מובייל"
      >
        <div className="grid grid-cols-4 px-1 py-1.5">
          <button
            onClick={onHomeClick}
            className={`flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg ${currentView === 'HOME' && selectedAgentId === null ? 'text-indigo-600' : 'text-slate-600'}`}
            aria-label="בית"
          >
            <Home size={18} />
            <span className="text-[10px] font-bold">בית</span>
          </button>

          <button
            onClick={onStepsClick}
            className={`flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg ${currentView === 'STEPS' || currentView === 'STEP_DETAIL' || selectedAgentId !== null ? 'text-indigo-600' : 'text-slate-600'}`}
            aria-label="שלבים"
          >
            <ListOrdered size={18} />
            <span className="text-[10px] font-bold">שלבים</span>
          </button>

          <button
            onClick={onResearchAidsClick}
            className={`flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg ${currentView === 'TOOLS' ? 'text-indigo-600' : 'text-slate-600'}`}
            aria-label="כלים"
          >
            <Zap size={18} />
            <span className="text-[10px] font-bold">הרחבות</span>
          </button>

          <button
            onClick={onAboutClick}
            className={`flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg ${currentView === 'ABOUT' ? 'text-indigo-600' : 'text-slate-600'}`}
            aria-label="מה באתר"
          >
            <Info size={18} />
            <span className="text-[10px] font-bold">מה באתר</span>
          </button>
        </div>

        {/* iOS safe-area */}
        <div style={{ height: 'env(safe-area-inset-bottom, 0px)' }} />
      </nav>
    </>
  );
};

export default MobileNav;

