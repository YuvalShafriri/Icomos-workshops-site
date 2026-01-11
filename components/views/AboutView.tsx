import React from 'react';
import { Cpu, CheckCircle2, Zap, BookOpen, ExternalLink } from 'lucide-react';

export interface AboutViewProps {
    onNavigate?: (route: string) => void;
    hideHeader?: boolean;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, hideHeader = false }) => {
    const handleNavigate = (route: string) => {
        if (onNavigate) {
            onNavigate(route);
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-white" dir="rtl">
            <div className="pt-2 pb-6 px-6 md:pt-3 md:pb-8 md:px-8 max-w-2xl mx-auto w-full space-y-2">
                {/* Header Section - hidden when inside modal */}
                {!hideHeader && (
                    <div className="flex items-center gap-3 mb-2">
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
                )}

                <div className="text-right">
                    <div className="text-sm text-slate-600 leading-relaxed mb-6 space-y-4">
                        <p>
                            אתר.בוט הוא כלי AI ניסויי להערכת משמעות תרבותית של אתרי מורשת בגישת{' '}
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

                        <button
                            onClick={() => handleNavigate('steps')}
                            className="w-full flex items-start gap-4 p-4 bg-slate-50 hover:bg-emerald-50 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all group cursor-pointer text-right"
                        >
                            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl shrink-0 group-hover:scale-110 transition-transform">
                                <CheckCircle2 size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-base text-slate-800 mb-1">מסגרת שלבי ההערכה</h4>
                                <p className="text-sm text-slate-500 leading-snug">
                                    תהליך ההערכה המובנה שקיים באתר.בוט. בלחיצה על כל שלב אפשר לראות את הרציונל ותמצית ההנחיות שלו.
                                </p>
                            </div>
                        </button>

                        <button
                            onClick={() => handleNavigate('tools')}
                            className="w-full flex items-start gap-4 p-4 bg-slate-50 hover:bg-indigo-50 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-all group cursor-pointer text-right"
                        >
                            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl shrink-0 group-hover:scale-110 transition-transform">
                                <Zap size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-base text-slate-800 mb-1">הרחבות לתהליך</h4>
                                <p className="text-sm text-slate-500 leading-snug">גרף ידע, ניתוח חזותי, ניתוח אוסף והצעות לשאילתות הרחבה להדבקה בבוט.</p>
                            </div>
                        </button>

                        <a
                            href="https://atar.bot"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-start gap-4 p-4 bg-slate-50 hover:bg-amber-50 rounded-2xl border border-slate-100 hover:border-amber-200 transition-all group cursor-pointer text-right"
                        >
                            <div className="p-2 bg-amber-100 text-amber-600 rounded-xl shrink-0 group-hover:scale-110 transition-transform">
                                <BookOpen size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-base text-slate-800 mb-1 flex items-center gap-2">
                                    משאבים
                                    <ExternalLink size={14} className="text-slate-400" />
                                </h4>
                                <p className="text-sm text-slate-500 leading-snug">קישורים לבוט, הפרויקט בגיטהאב, דוגמאות "קצת אחרת" והשראה.</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutView;
