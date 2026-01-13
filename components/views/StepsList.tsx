
import React from 'react';
import { AgentConfig } from '../../types';

export interface StepsListProps {
    agents: AgentConfig[];
    selectedAgentId: number | null;
    onAgentSelect: (agentId: number) => void;
    getAgentTheme: (agentId: number, colorName: string, isSelected: boolean) => { card: string; icon: string };
}

export const StepsList: React.FC<StepsListProps> = ({
    agents,
    selectedAgentId,
    onAgentSelect,
    getAgentTheme
}) => {
    return (
        <div className="flex-1 flex flex-col h-full bg-white overflow-hidden" dir="rtl">
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="px-4 py-3 border-b border-slate-200 bg-white sticky top-0 z-10 shrink-0 space-y-2">
                    {/* Breadcrumb Navigation */}
                    <div className="flex items-center gap-2 text-sm">
                        <button 
                          onClick={() => window.location.hash = 'home'}
                          className="text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-1 transition-colors font-medium"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                          <span>בית</span>
                        </button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><polyline points="15 18 9 12 15 6"/></svg>
                        <span className="text-slate-600 font-medium">שלבים</span>
                    </div>
                    <div className="text-xs font-black uppercase tracking-widest text-slate-400">
                        תהליך הערכה בשלבים (בגישת <span className="text-[12px]">CBSA</span>)
                    </div>
                </div>

                <div className="p-3 space-y-2">
                    {agents.map((agent) => {
                        const isSelected = selectedAgentId === agent.id;
                        const theme = getAgentTheme(agent.id, agent.color, isSelected);

                        return (
                            <React.Fragment key={agent.id}>
                                <button
                                    onClick={() => onAgentSelect(agent.id)}
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
                </div>
            </div>
        </div>
    );
};
