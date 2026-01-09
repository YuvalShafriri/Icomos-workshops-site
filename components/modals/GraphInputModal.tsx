import React from 'react';
import { FileText, BookOpen, Zap } from 'lucide-react';
import { Modal } from '../common';
import { DEMO_DATA, ZAIRA_TEXT } from '../../constants';

export interface GraphInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputText: string;
  onInputTextChange: (value: string) => void;
  onGenerate: () => void;
}

export const GraphInputModal: React.FC<GraphInputModalProps> = ({
  isOpen,
  onClose,
  inputText,
  onInputTextChange,
  onGenerate,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="יצירת גרף ידע (Knowledge Graph)" maxWidth="max-w-2xl">
      <div className="space-y-6">
        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
          <p className="text-xs text-emerald-800 font-medium leading-relaxed">
            כלי זה מנתח טקסט חופשי ומחלץ ממנו ישויות, ערכים וקשרים ליצירת מפה סמנטית ויזואלית.
          </p>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-700">טקסט לניתוח:</label>
          <div className="flex gap-2 mb-2">
            <button
              onClick={() => onInputTextChange(DEMO_DATA)}
              className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <FileText size={14} /> טען: תחנת הקמח
            </button>
            <button
              onClick={() => onInputTextChange(ZAIRA_TEXT)}
              className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <BookOpen size={14} /> טען: העיר זאירה
            </button>
          </div>
          <textarea
            className="w-full h-48 p-4 bg-white rounded-xl border border-slate-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-sm leading-relaxed text-slate-700 placeholder:text-slate-300 resize-none shadow-inner"
            placeholder="הדבק כאן את הטקסט שברצונך לנתח..."
            value={inputText}
            onChange={(e) => onInputTextChange(e.target.value)}
          />
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            onClick={() => {
              onClose();
              onGenerate();
            }}
            disabled={!inputText.trim()}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg hover:shadow-emerald-200 transition-all active:scale-95"
          >
            <Zap size={18} />
            <span>צור גרף ידע</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default GraphInputModal;
