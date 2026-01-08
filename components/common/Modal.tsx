import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-3xl"
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-[100] flex items-center justify-center p-2 animate-in fade-in duration-300"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={`bg-white w-full ${maxWidth} max-h-[98vh] rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 animate-in zoom-in-95 duration-300`}>
        <div className="p-3 md:p-4 border-b border-slate-100 flex justify-between items-center shrink-0 bg-slate-50/50">
          <h2 className="text-base md:text-lg font-black text-slate-900 tracking-tight">{title}</h2>
          <button
            onClick={onClose}
            className="px-2.5 py-2 hover:bg-slate-100 rounded-xl text-slate-500 transition-all flex items-center gap-2 border border-transparent hover:border-slate-200"
            aria-label="סגור"
          >
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">סגור</span>
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 md:p-4 custom-scrollbar">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
