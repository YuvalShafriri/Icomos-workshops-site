import React from 'react';
import { X, Cpu, CheckCircle2, Zap, BookOpen, ArrowRight } from 'lucide-react';

export interface WelcomeOverlayProps {
  onClose: () => void;
}

export const WelcomeOverlay: React.FC<WelcomeOverlayProps> = ({ onClose }) => {
  return (
    <div
      className="absolute inset-0 z-40 bg-slate-900/35 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-8 text-right animate-in fade-in zoom-in-95 duration-300 relative"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        dir="rtl"
      >
        <button
          onClick={onClose}
          className="absolute top-3 left-3 px-2.5 py-2 rounded-xl text-slate-500 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all flex items-center gap-2"
          aria-label="סגור"
        >
          <span className="text-[12px] font-black uppercase tracking-widest hidden sm:inline">סגור</span>
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-md">
            <Cpu size={24} />
          </div>
          <div>
            <h2 className="font-black text-xl text-slate-900">ברוכים הבאים לאתר הסדנאות של אתר.בוט</h2>
            <p className="text-xs text-slate-400 font-medium">סוכן AI נסיוני לתמיכה בהערכת משמעות תרבותית של מורשת</p>
          </div>
        </div>

        <div className="text-sm text-slate-600 leading-relaxed mb-6 space-y-3">
          <p>
            אתר.בוט הוא כלי AI נסיוני להערכת משמעות תרבותית של אתרי מורשת בגישת <span className="text-s">CBSA <br/>(Context Based Significance Assessment)</span>.
          </p>
          <p>
            המערכת מפותחת לצרכי מחקר על ידי ד"ר יעל אלף ויובל שפרירי, ותשולב במעבדת <b>InSites</b> - מעבדת מחקר חדשה בפקולטה לארכיטקטורה בטכניון.
           
            המעבדה תעסוק בחקר היבטי הערכה של נכסי מורשת, לצורך קבלת החלטות על שילובם בתכנון והבנת מקומם בתרבות, חברה וקהילה.
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">מה יש באתר?</h3>

          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg shrink-0">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-800">מסגרת השלבים</h4>
              <p className="text-[12px] text-slate-500">תהליך ההערכה המובנה שקיים באתר.בוט (בצד ימין) - בלחיצה על כל שלב אפשר לראות את הרציונל ותמצית ההנחיות שלו  </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg shrink-0">
              <Zap size={16} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-800">הרחבות לתהליך</h4>
              <p className="text-xs text-slate-500">גרף ידע, ניתוח חזותי, ניתוח אוסף והצעות לשאילתות הרחבה להדבקה בבוט</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="p-1.5 bg-amber-100 text-amber-600 rounded-lg shrink-0">
              <BookOpen size={16} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-800">משאבים</h4>
              <p className="text-xs text-slate-500">קישורים לבוט, קוד המקור בגיטהאב, דוגמאות "קצת אחרת" והשראה</p>
            </div>
          </div>
        </div>

        {/* <button
          onClick={onClose}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <span>בואו נתחיל</span>
          <ArrowRight size={18} className="rotate-180" />
        </button> */}
      </div>
    </div>
  );
};

export default WelcomeOverlay;
