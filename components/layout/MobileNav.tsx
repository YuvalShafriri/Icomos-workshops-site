import React from 'react';
import { Zap } from 'lucide-react';
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
  return (
    <div
      className="md:hidden flex overflow-x-auto p-2 gap-2 bg-slate-50/95 backdrop-blur border-b border-slate-200 shrink-0 sticky top-0 z-40 hide-scrollbar"
      dir="rtl"
    >
      {/* Mobile Extensions Button */}
      <button
        onClick={onResearchAidsClick}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg border shadow-sm whitespace-nowrap transition-all shrink-0 cursor-pointer ${showResearchAids ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white border-slate-200 text-indigo-600'}`}
      >
        <Zap size={14} className={showResearchAids ? 'text-white' : 'text-indigo-500'} />
        <span className="text-xs font-bold">כלים נוספים</span>
      </button>

      {agents.map((agent) => {
        const isSelected = selectedAgentId === agent.id;
        const cleanName = agent.name.replace(/^שלב \d+ - /, '');
        const mobileTheme = getMobileStageTheme(agent.color, isSelected);

        return (
          <button
            key={agent.id}
            onClick={() => onAgentSelect(agent.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border shadow-sm whitespace-nowrap transition-all shrink-0 cursor-pointer ${mobileTheme.pill}`}
          >
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${mobileTheme.badge}`}>
              {agent.id}
            </div>
            <span className="text-xs font-bold">{cleanName}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MobileNav;
