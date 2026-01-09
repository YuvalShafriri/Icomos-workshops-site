import React from 'react';
import { Cpu, CheckCircle2, Zap, BookOpen } from 'lucide-react';
import { Modal } from '../common';

export interface WelcomeOverlayProps {
  onClose: () => void;
}

export const WelcomeOverlay: React.FC<WelcomeOverlayProps> = ({ onClose }) => {
  return (
    <Modal
      isOpen
      onClose={onClose}
      maxWidth="max-w-2xl"
      title={
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <div className="p-1.5 md:p-2 bg-indigo-600 text-white rounded-xl shadow-md shrink-0">
            <Cpu size={16} className="md:hidden" />
            <Cpu size={22} className="hidden md:block" />
          </div>
          <div className="min-w-0">
            <div className="font-black text-sm sm:text-base md:text-lg leading-tight truncate">
              מרכז המשאבים של סדנאות אתר.בוט
            </div>
            <div className="text-[11px] md:text-[13px] text-slate-400 font-medium truncate">
              סוכן AI לתמיכה בהערכת משמעות תרבותית של מורשת
            </div>
          </div>
        </div>
      }
    >
      <div className="text-right" dir="rtl">
        <div className="text-sm text-slate-600 leading-relaxed mb-6 space-y-3">
          <p>
            אתר.בוט הוא כלי AI ניסויי להערכת משמעות תרבותית של אתרי מורשת בגישת{' '}
            <span className="text-s">
              CBSA <br />(Context Based Significance Assessment)
            </span>.
          </p>
          <p>
            המערכת מפותחת לצרכי מחקר על ידי ד"ר יעל אלף ויובל שפרירי, ותשולב במעבדת <b>InSites</b> - מעבדת מחקר חדשה
            בפקולטה לארכיטקטורה בטכניון.
            המעבדה תעסוק בחקר היבטי הערכה של נכסי מורשת, לצורך קבלת החלטות על שילובם בתכנון והבנת מקומם בתרבות, חברה וקהילה.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">מה יש באתר?</h3>

          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg shrink-0">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-800">מסגרת שלבי ההערכה</h4>
              <p className="text-[12px] text-slate-500">
                תהליך ההערכה המובנה שקיים באתר.בוט (בצד ימין) - בלחיצה על כל שלב אפשר לראות את הרציונל ותמצית ההנחיות שלו
              </p>
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
              <p className="text-xs text-slate-500">קישורים לבוט, הפרויקט בגיטהאב, דוגמאות "קצת אחרת" והשראה</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default WelcomeOverlay;
