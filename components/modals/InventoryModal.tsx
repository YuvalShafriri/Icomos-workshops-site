import React from 'react';
import { Library, Copy, Sparkles, ExternalLink, Info } from 'lucide-react';
import { Modal } from '../common';
import MarkdownRenderer from '../MarkdownRenderer';
import { MARC_INSTRUCTIONS } from '../../constants';

export interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'he' | 'en';
}

export const InventoryModal: React.FC<InventoryModalProps> = ({ isOpen, onClose, lang }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-emerald-600 text-white rounded-lg shadow-sm"><Library size={18} /></div>
          <span className="text-lg font-black text-slate-900">{MARC_INSTRUCTIONS[lang].title}</span>
        </div>
      }
      maxWidth="max-w-4xl"
    >
      <div className="flex flex-col gap-4 pt-2">
        <div className={`space-y-6 ${lang === 'en' ? 'text-left' : 'text-right'}`} dir={lang === 'en' ? 'ltr' : 'rtl'}>
          <p className="text-sm font-bold text-slate-600 border-r-4 border-emerald-500 pr-4 italic leading-relaxed">
            {MARC_INSTRUCTIONS[lang].purpose}
          </p>

          {/* Black Format Prompt Display */}
          <div className="relative group/code rtl">
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-0 overflow-hidden shadow-xl">
              <div className="p-2 flex items-center justify-between opacity-80">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20"></div>
                </div>
              </div>
              <div className="px-6 pb-8 pt-6 overflow-y-auto max-h-[50vh] custom-scrollbar">
                <MarkdownRenderer
                  text={MARC_INSTRUCTIONS[lang].promptContent}
                  dir={lang === 'en' ? 'ltr' : 'rtl'}
                  theme="dark"
                />
              </div>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(MARC_INSTRUCTIONS[lang].promptContent || '')}
              className="absolute bottom-4 left-4 bg-white/10 hover:bg-emerald-600 text-white/70 hover:text-white backdrop-blur-sm border border-white/10 p-2 rounded-lg transition-all active:scale-95 group/btn flex items-center gap-2 font-bold text-[10px]"
              title="העתק ללוח"
            >
              <Copy size={14} className="group-hover/btn:scale-110 transition-transform" />
              <span>העתק פרומפט</span>
            </button>
          </div>

          {/* Example Link - NotebookLM */}
          <div
            className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 p-4 rounded-xl flex items-center justify-between gap-4 group cursor-pointer hover:shadow-md transition-all shadow-sm"
            onClick={() => window.open('https://gemini.google.com/share/7cf5304dbf7e', '_blank')}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm text-emerald-600 group-hover:scale-110 transition-transform"><Sparkles size={18} /></div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">דוגמה לניתוח אוסף</h4>
                <p className="text-[10px] text-slate-500 font-medium">הדגמה של ביצוע באתר.בוט גמיני המחובר לאוסף הערכות הנכסים מהסדנאות ב-NotebookLM</p>
              </div>
            </div>
            <div className="bg-white px-3 py-1.5 rounded-lg text-[10px] font-bold text-emerald-600 border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-all flex items-center gap-2">
              צפה <ExternalLink size={10} />
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center gap-4">
            <div className="p-2 bg-white text-emerald-600 rounded-lg shadow-sm"><Info size={16} /></div>
            <p className="text-[10px] font-bold text-slate-500 leading-tight">
              {lang === 'he' ?
                "הערה: מיני-סוכן זה מופעל רק כמשתמש מבקש 'בצע ניתוח אוסף'  אחרי שהעלה מידע על אוסף נכסים או הערכות למשל של סקר אזורי" :
                "Note: This workflow is triggered only when atar.bot detects a collection of files (inventory) or when the user explicitly requests 'collection analysis'."
              }
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InventoryModal;
