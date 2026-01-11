
import React from 'react';
import { Cpu, CheckCircle2, Zap, BookOpen } from 'lucide-react';

export const AboutView: React.FC = () => {
    return (
        <div className="flex-1 flex flex-col h-full bg-white" dir="rtl">
            {/* Header for Mobile View (hidden in Modal wrapper usually, or we can include it and hide in modal) */}
            {/* For reusable view, we might want just the content. The header is handled by the container in mobile nav usually, 
          but here we want a specific header for the view. Let's include the header content and allow the parent to style/position if needed, 
          or just build the full content block. 
      */}

            <div className="p-6 md:p-8 max-w-2xl mx-auto w-full space-y-6">
                {/* Header Section */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-md shrink-0">
                        <Cpu size={24} />
                    </div>
                    <div>
                        <h2 className="font-black text-xl text-slate-900 leading-tight">
                            מרכז המשאבים
                        </h2>
                        <p className="text-sm text-slate-500 font-medium">
                            סדנאות אתר.בוט - הערכת משמעות
                        </p>
                    </div>
                </div>

                <div className="text-right">
                    <div className="text-sm text-slate-600 leading-relaxed mb-8 space-y-4">
                        <p>
                            אר.בוט הוא כלי AI ניסויי להערכת משמעות תרבותית של אתרי מורשת בגישת{' '}
                            <span className="font-bold text-indigo-700">
                                CBSA (Context Based Significance Assessment)
                            </span>.
                        </p>
                        <p>
                            המערכת מפותחת לצרכי מחקר על ידי ד"ר יעל אלף ויובל שפרירי, ותשולב במעבדת <b>InSites</b> - מעבדת מחקר חדשה
                            בפקולטה לארכיטקטורה בטכניון.
                            המעבדה תעסוק בחקר היבטי הערכה של נכסי מורשת, לצורך קבלת החלטות על שילובם בתכנון והבנת מקומם בתרבות, חברה וקהילה.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">מה יש באתר?</h3>

                        <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl shrink-0">
                                <CheckCircle2 size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-base text-slate-800 mb-1">מסגרת שלבי ההערכה</h4>
                                <p className="text-sm text-slate-500 leading-snug">
                                    תהליך ההערכה המובנה שקיים באתר.בוט. בלחיצה על כל שלב אפשר לראות את הרציונל ותמצית ההנחיות שלו.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl shrink-0">
                                <Zap size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-base text-slate-800 mb-1">הרחבות לתהליך</h4>
                                <p className="text-sm text-slate-500 leading-snug">גרף ידע, ניתוח חזותי, ניתוח אוסף והצעות לשאילתות הרחבה להדבקה בבוט.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="p-2 bg-amber-100 text-amber-600 rounded-xl shrink-0">
                                <BookOpen size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-base text-slate-800 mb-1">משאבים</h4>
                                <p className="text-sm text-slate-500 leading-snug">קישורים לבוט, הפרויקט בגיטהאב, דוגמאות "קצת אחרת" והשראה.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutView;
