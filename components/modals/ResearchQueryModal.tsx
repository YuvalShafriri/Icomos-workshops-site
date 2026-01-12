import React from 'react';
import { Terminal, Copy, Info } from 'lucide-react';
import { Modal } from '../common';
import MarkdownRenderer from '../MarkdownRenderer';
import { ResearchQuerySelection } from '../../constants';
import { copyToClipboard } from '../../utils';

export interface ResearchQueryModalProps {
  query: ResearchQuerySelection | null;
  onClose: () => void;
  onNavigate: (route: string) => void;
}

export const ResearchQueryModal: React.FC<ResearchQueryModalProps> = ({
  query,
  onClose,
  onNavigate,
}) => {
  const hasSubQueries = query && 'subQueries' in query && Array.isArray((query as any).subQueries);

  return (
    <Modal
      isOpen={!!query}
      onClose={onClose}
      title={query?.title || ''}
      maxWidth="max-w-3xl"
    >
      {query && (
        <div className="space-y-6">
          <div className="bg-indigo-50 p-4 rounded-xl flex items-start gap-4 border border-indigo-100">
            <div className="p-2 bg-white text-indigo-600 rounded-xl shadow-sm shrink-0">
              {query.icon}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">{query.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{query.description}</p>
            </div>
          </div>

          {/* Standard Single Query Logic */}
          {!hasSubQueries && (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Terminal size={12} /> פרומפט להעתקה
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-slate-400 font-bold bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                    CBSA Methodology
                  </span>
                </div>
              </div>
              <div className="relative group/code">
                <div className="bg-slate-950 rounded-2xl border border-slate-800 p-0 overflow-hidden shadow-xl">
                  <div className="bg-slate-900/50 p-3 border-b border-white/5 flex items-center justify-between">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20"></div>
                    </div>
                    <span className="text-[9px] font-mono text-slate-600">research_query.prompt</span>
                  </div>
                  <div className="p-6 overflow-y-auto max-h-[40vh] custom-scrollbar">
                    <MarkdownRenderer text={(query as any).prompt || ''} dir="auto" theme="dark" />
                  </div>
                </div>
                <button
                  onClick={() => {
                    copyToClipboard((query as any).prompt!);
                  }}
                  className="absolute top-4 left-4 bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 p-2 rounded-lg shadow-sm transition-all active:scale-95 group/btn flex items-center gap-2 font-bold text-[10px]"
                  title="העתק ללוח"
                >
                  <Copy size={14} className="group-hover/btn:scale-110 transition-transform" />
                  <span>העתק</span>
                </button>
              </div>
            </div>
          )}

          {/* Sub-Queries Logic (Reflective Voices) */}
          {hasSubQueries && (
            <div className="space-y-8">
              {((query as any).subQueries as any[]).map((sub: any, idx: number) => (
                <div key={idx} className="space-y-3">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                    <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">{sub.icon}</div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{sub.title}</h4>
                      <p className="text-[11px] text-slate-500">{sub.description}</p>
                    </div>
                    {sub.route && (
                      <button
                        onClick={() => onNavigate(sub.route)}
                        className="ml-auto text-[10px] font-bold text-indigo-600 hover:text-indigo-800 bg-white border border-indigo-100 hover:border-indigo-200 px-2 py-1 rounded-lg transition-all"
                        title="קישור ישיר"
                      >
                        קישור
                      </button>
                    )}
                  </div>

                  <div className="relative group/code">
                    <div className="bg-slate-950 rounded-xl border border-slate-800 p-0 overflow-hidden shadow-sm">
                      <div className="bg-slate-900/50 p-2.5 border-b border-white/5 flex items-center justify-between">
                        <span className="text-[9px] font-mono text-slate-600 flex items-center gap-2">
                          <Terminal size={10} /> prompt
                        </span>
                      </div>
                      <div className="p-4 overflow-y-auto max-h-[200px] custom-scrollbar">
                        <MarkdownRenderer text={sub.prompt || ''} dir="auto" theme="dark" />
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(sub.prompt)}
                      className="absolute top-3 left-3 bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 p-1.5 rounded-md shadow-sm transition-all active:scale-95 group/btn flex items-center gap-1.5 font-bold text-[10px]"
                      title="העתק ללוח"
                    >
                      <Copy size={12} className="group-hover/btn:scale-110 transition-transform" />
                      <span>העתק</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 flex items-center gap-3">
            <Info size={14} className="text-slate-400" />
            <p className="text-[10px] text-slate-500 font-medium leading-tight">
              טיפ: העתק את הפרומפט והדבק אותו בחלון השיחה שלך באתר.בוט בשלב הרלוונטי, מומלץ בעיקר לגבי שלב 2 - ניתוח ערכים, ו 5 הצהרת-המשמעות.
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ResearchQueryModal;
