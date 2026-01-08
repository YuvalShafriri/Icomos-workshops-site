import React from 'react';
import { X, Zap, Loader2 } from 'lucide-react';
import { getNodeColor, TYPE_HE } from '../../constants';

export interface NodeDetails {
  type: string;
  name?: string;
  label?: string;
  meaning?: string;
}

export interface GraphModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedNodeDetails: NodeDetails | null;
  isLoading: boolean;
  graphContainerRef: React.RefObject<HTMLDivElement>;
}

export const GraphModal: React.FC<GraphModalProps> = ({
  isOpen,
  onClose,
  selectedNodeDetails,
  isLoading,
  graphContainerRef,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-900/35 backdrop-blur-sm z-[100] flex flex-col items-center justify-center p-2 animate-in fade-in duration-300"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white w-full max-w-7xl h-full md:h-[95vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative border border-slate-800/20">
        <div className="p-3 md:p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-3">
            <Zap size={20} className="text-emerald-600" />
            <h2 className="text-lg font-black text-slate-900 leading-tight">גרף ידע אינטראקטיבי</h2>
          </div>
          <button
            onClick={onClose}
            className="px-2.5 py-2 hover:bg-slate-100 rounded-xl text-slate-500 transition-all flex items-center gap-2 border border-transparent hover:border-slate-200"
            aria-label="סגור"
          >
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">סגור</span>
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 relative flex overflow-hidden">
          <div
            className={`w-full md:w-80 border-l border-slate-100 bg-slate-50/90 backdrop-blur-md transition-all absolute left-0 h-full z-20 overflow-y-auto ${
              selectedNodeDetails ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 shadow-none'
            }`}
          >
            {selectedNodeDetails && (
              <div className="p-5 space-y-4 text-right">
                <div className="space-y-2">
                  <span
                    className="inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider text-slate-700"
                    style={{ backgroundColor: `${getNodeColor(selectedNodeDetails.type).background}33` }}
                  >
                    {TYPE_HE[selectedNodeDetails.type] || selectedNodeDetails.type}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 leading-tight">
                    {selectedNodeDetails.name || selectedNodeDetails.label}
                  </h3>
                </div>
                <div className="h-px bg-slate-200 w-full"></div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 leading-none">
                    משמעות תרבותית
                  </h4>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm text-xs text-slate-700 leading-relaxed">
                    {selectedNodeDetails.meaning}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex-1 relative bg-slate-50/20">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full gap-2">
                <Loader2 size={32} className="animate-spin text-indigo-600" />
                <p className="text-lg font-black text-slate-900">יוצר גרף...</p>
              </div>
            ) : (
              <div ref={graphContainerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphModal;
