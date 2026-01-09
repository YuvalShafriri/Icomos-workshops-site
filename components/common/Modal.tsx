import React, { useEffect, useState } from 'react';
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

  // Keep mounted during exit animation so we can animate out smoothly
  const [mounted, setMounted] = useState<boolean>(isOpen);
  const [exiting, setExiting] = useState<boolean>(false);
  const [entered, setEntered] = useState<boolean>(false);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined;
    if (isOpen) {
      setMounted(true);
      setExiting(false);
      setEntered(false);
      // trigger enter transition on next tick
      t = setTimeout(() => setEntered(true), 10);
      return () => t && clearTimeout(t);
    }

    if (!isOpen && mounted) {
      // start exit transition
      setEntered(false);
      setExiting(true);
      t = setTimeout(() => {
        setMounted(false);
        setExiting(false);
      }, 300); // must match the CSS transition duration
      return () => t && clearTimeout(t);
    }
  }, [isOpen, mounted]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-[100] flex items-start md:items-center justify-center p-2 transition-opacity duration-300 ${entered ? 'opacity-100' : 'opacity-0'}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        paddingTop: 'calc(env(safe-area-inset-top, 0px) + 1rem)',
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)',
      }}
    >
      <div className={`bg-white w-full ${maxWidth} max-h-[calc(100dvh-2rem)] md:max-h-[98vh] rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 transition-all duration-300 ease-out ${entered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}>
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
