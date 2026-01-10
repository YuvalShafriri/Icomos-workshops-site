import React, { useMemo, useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { AgentConfig } from '../../types';

export interface MobileNavProps {
  showResearchAids: boolean;
  selectedAgentId: number | null;
  agents: AgentConfig[];
  onResearchAidsClick: () => void;
  onAgentSelect: (agentId: number) => void;
  getMobileStageTheme: (colorName: string, isSelected: boolean) => { pill: string; badge: string };
}

export const MobileNav: React.FC<MobileNavProps> = ({
  showResearchAids,
  selectedAgentId,
  agents,
  onResearchAidsClick,
  onAgentSelect,
  getMobileStageTheme,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentLabel = useMemo(() => {
    if (showResearchAids) return 'כלים נוספים';
    if (selectedAgentId === null) return 'מסך הבית';
    const agent = agents.find((a) => a.id === selectedAgentId);
    return agent ? agent.name.replace(/^שלב \d+ - /, '') : 'שלב';
  }, [agents, selectedAgentId, showResearchAids]);

  return (
    <>
      <div
        className="md:hidden flex items-center justify-between gap-3 px-3 py-2 bg-slate-50/95 backdrop-blur border-b border-slate-200 shrink-0 sticky top-0 z-40"
        dir="rtl"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white shadow-sm text-slate-700"
          aria-label="פתח תפריט שלבים וכלים"
        >
          <Menu size={18} className="text-slate-600" />
          <span className="text-xs font-bold">תפריט</span>
        </button>

        <div className="text-xs font-bold text-slate-500 truncate">{currentLabel}</div>

        <button
          onClick={() => {
            onResearchAidsClick();
          }}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg border shadow-sm whitespace-nowrap transition-all shrink-0 cursor-pointer ${showResearchAids ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white border-slate-200 text-indigo-600'}`}
          aria-label="כלים נוספים"
        >
          <Zap size={14} className={showResearchAids ? 'text-white' : 'text-indigo-500'} />
          <span className="text-xs font-bold">כלים</span>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50" dir="rtl">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div className="absolute top-0 left-0 right-0 bg-white border-b border-slate-200 shadow-lg max-h-[85dvh] overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white sticky top-0 z-10">
              <div className="text-sm font-black text-slate-800">שלבים וכלים</div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
                aria-label="סגור תפריט"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-3 space-y-3">
              <button
                onClick={() => {
                  onResearchAidsClick();
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-xl border shadow-sm transition-all ${showResearchAids ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white border-slate-200 text-indigo-600'}`}
              >
                <span className="text-sm font-black">כלים נוספים</span>
                <Zap size={16} className={showResearchAids ? 'text-white' : 'text-indigo-500'} />
              </button>

              <div className="space-y-2">
                {agents.map((agent) => {
                  const isSelected = selectedAgentId === agent.id;
                  const cleanName = agent.name.replace(/^שלב \d+ - /, '');
                  const mobileTheme = getMobileStageTheme(agent.color, isSelected);

                  return (
                    <button
                      key={agent.id}
                      onClick={() => {
                        onAgentSelect(agent.id);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-3 rounded-xl border shadow-sm transition-all ${mobileTheme.pill}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black ${mobileTheme.badge}`}>
                          {agent.id}
                        </div>
                        <span className="text-sm font-black text-right">{cleanName}</span>
                      </div>
                      <span className="text-[10px] font-black text-slate-400">פתח</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav;
