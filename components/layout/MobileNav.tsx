import React, { useMemo, useState } from 'react';
import { Home, Info, ListOrdered, Menu, X, Zap } from 'lucide-react';
import { AgentConfig } from '../../types';

export interface MobileNavProps {
  showResearchAids: boolean;
  selectedAgentId: number | null;
  agents: AgentConfig[];
  onHomeClick: () => void;
  onAboutClick: () => void;
  onResearchAidsClick: () => void;
  onAgentSelect: (agentId: number) => void;
  getMobileStageTheme: (colorName: string, isSelected: boolean) => { pill: string; badge: string };
  getAgentTheme: (agentId: number, colorName: string, isSelected: boolean) => { card: string; icon: string };
}

export const MobileNav: React.FC<MobileNavProps> = ({
  showResearchAids,
  selectedAgentId,
  agents,
  onHomeClick,
  onAboutClick,
  onResearchAidsClick,
  onAgentSelect,
  getMobileStageTheme,
  getAgentTheme,
}) => {
  /* 
   * MANUAL CONFIGURATION GUIDE:
   * --------------------------
   * 1. Modal Height: Adjust 'bottom-16' in the absolute positioning div (around line 149).
   * 2. Header Sizing: Adjust 'py-3', 'text-xs', 'text-[12px]' in the header section (around line 150).
   * 3. Item Layout: Adjust 'p-2.5' (padding), 'w-9 h-6' (icon container), text sizes in the list items (around line 170).
   * 4. Back Navigation: 'MENU_HASH' defines the hash used for the menu state.
   */
  // CONFIG: Back Navigation - Hash to use for menu state
  const MENU_HASH = 'menu';
  const [isOpen, setIsOpen] = useState(false);

  // Sync state with hash
  React.useEffect(() => {
    const handleHashChange = () => {
      setIsOpen(window.location.hash.includes(MENU_HASH));
    };
    window.addEventListener('hashchange', handleHashChange);
    // Initial check
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openMenu = () => {
    window.location.hash = MENU_HASH;
  };

  const closeMenu = () => {
    // If hash is there, go back to remove it. If not, just close (fallback)
    if (window.location.hash.includes(MENU_HASH)) {
      window.history.back();
    } else {
      setIsOpen(false);
    }
  };

  const currentLabel = useMemo(() => {
    if (showResearchAids) return 'כלים נוספים';
    if (selectedAgentId === null) return 'מסך הבית';
    const agent = agents.find((a) => a.id === selectedAgentId);
    return agent ? agent.name.replace(/^שלב \d+ - /, '') : 'שלב';
  }, [agents, selectedAgentId, showResearchAids]);

  return (
    <>
      {/* Tablet-sized "mobile" top bar (>=sm and <md) */}
      <div
        className="hidden sm:flex md:hidden items-center justify-between gap-3 px-3 py-2 bg-slate-50/95 backdrop-blur border-b border-slate-200 shrink-0 sticky top-0 z-40"
        dir="rtl"
      >
        <button
          onClick={openMenu}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white shadow-sm text-slate-700"
          aria-label="פתח רשימת שלבים"
        >
          <Menu size={18} className="text-slate-600" />
          <span className="text-xs font-bold">שלבים</span>
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

      {/* Phone-only bottom tabs (<sm) */}
      <nav
        className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-t border-slate-200"
        dir="rtl"
        aria-label="ניווט מובייל"
      >
        <div className="grid grid-cols-4 px-1 py-1.5">
          <button
            onClick={onHomeClick}
            className={`flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg ${!showResearchAids && selectedAgentId === null ? 'text-indigo-600' : 'text-slate-600'}`}
            aria-label="בית"
          >
            <Home size={18} />
            <span className="text-[10px] font-bold">בית</span>
          </button>

          <button
            onClick={openMenu}
            className={`flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg ${selectedAgentId !== null ? 'text-indigo-600' : 'text-slate-600'}`}
            aria-label="שלבים"
          >
            <ListOrdered size={18} />
            <span className="text-[10px] font-bold">שלבים</span>
          </button>

          <button
            onClick={onResearchAidsClick}
            className={`flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg ${showResearchAids ? 'text-indigo-600' : 'text-slate-600'}`}
            aria-label="כלים"
          >
            <Zap size={18} />
            <span className="text-[10px] font-bold">הרחבות</span>
          </button>

          <button
            onClick={onAboutClick}
            className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg text-slate-600"
            aria-label="מה באתר"
          >
            <Info size={18} />
            <span className="text-[10px] font-bold">מה באתר</span>
          </button>
        </div>

        {/* iOS safe-area */}
        <div style={{ height: 'env(safe-area-inset-bottom, 0px)' }} />
      </nav>

      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50" dir="rtl">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeMenu}
            aria-hidden="true"
          />

          <div className="absolute top-0 left-0 right-0 bottom-16 bg-white border-b border-slate-200 shadow-lg overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white sticky top-0 z-10">
              <div className="text-xs font-black uppercase tracking-widest text-slate-400">
                תהליך הערכה בשלבים (בגישת <span className="text-[12px]">CBSA</span>)
              </div>
              <button
                onClick={closeMenu}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
                aria-label="סגור תפריט"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-3 space-y-2">
              {agents.map((agent) => {
                const isSelected = selectedAgentId === agent.id;
                const theme = getAgentTheme(agent.id, agent.color, isSelected);

                return (
                  <React.Fragment key={agent.id}>
                    <button
                      onClick={() => {
                        onAgentSelect(agent.id);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl border-2 cursor-pointer transition-all duration-300 text-right ${theme.card}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm duration-500 ${theme.icon}`}>
                          {React.cloneElement(agent.icon as React.ReactElement<{ size?: number }>, { size: 16 })}
                        </div>
                        <div>
                          <h3 className={`font-bold  leading-tight ${isSelected ? 'text-slate-900' : 'text-slate-600'}`}>
                            {agent.name}
                          </h3>
                          <p className="text-[13px] text-slate-500 uppercase tracking-wide">{agent.role}</p>
                        </div>
                      </div>
                    </button>
                    {
                      (agent.id === 0 || agent.id === 5) && (
                        <div className="py-1 px-4">
                          <div className="h-px bg-slate-400 w-full opacity-70"></div>
                        </div>
                      )
                    }
                    {
                      agent.id === 6 && (
                        <div className="py-3 px-4 mt-1">
                          <div className="h-px bg-slate-300 w-full"></div>
                        </div>
                      )
                    }
                  </React.Fragment >
                );
              })}
            </div >
          </div >
        </div >
      )}
    </>
  );
};

export default MobileNav;
