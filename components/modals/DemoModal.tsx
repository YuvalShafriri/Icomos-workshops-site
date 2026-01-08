import React from 'react';
import { Eye, Quote, Gem, Layers, History, Search } from 'lucide-react';
import { Modal } from '../common';

export interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Eye size={20} className="text-indigo-600" />
          <span className="mr-1">ניתוח חזותי באתר.בוט: של תמונת המצאת הכתב וה-AI</span>
        </div>
      }
      maxWidth="max-w-7xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start h-full">
        <div className="lg:col-span-5 space-y-6 order-1 lg:order-2 shrink-0">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-slate-200 bg-slate-50 flex items-center justify-center">
            <img
              src="https://alephplace.com/atar.bot/tamuz.jpg"
              alt="Detailed Visual Analysis Case"
              className="max-w-full max-h-[55vh] object-contain"
            />
          </div>
          <div className="bg-indigo-600 p-4 rounded-2xl shadow-xl border-b-4 border-indigo-800">
            <Quote size={20} className="text-indigo-400/40 mb-2" />
            <p className="italic text-white text-sm md:text-base leading-relaxed font-bold">
              "סם לִשְׁכֵּחָה הוא זה, לא לִרְפוּאָה לַזִּכָּרוֹן. לא חָכְמָה אֶלָּא דְּמוּת-חָכְמָה יִרְכְּשׁו..."
            </p>
            <div className="mt-3 pt-3 border-t border-white/20 flex justify-between items-center text-[10px] text-indigo-100 font-bold">
              <span>מתוך: המלך תמוז לאל תוֹת | פיידרוס | אפלטון</span>
              <div className="px-2 py-0.5 bg-white/20 rounded uppercase tracking-widest text-[8px]">
                AI Visual Decoding
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6 order-2 lg:order-1 flex flex-col h-full text-right">
          <div className="space-y-4">
            <p className="text-sm text-slate-600 leading-relaxed font-medium border-r-4 border-indigo-500 pr-4">
              להלן תוצאות הניתוח המבני שביצע אתר.בוט על הדימוי החזותי, תוך שימוש במתודולוגיית CBSA לזיהוי ערכים והקשרים.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-2">
              <div className="flex items-center gap-3 text-indigo-600 font-black text-sm border-b border-slate-50 pb-2">
                <Gem size={16} />
                <span>1. ערכי מורשת שזוהו</span>
              </div>
              <div className="space-y-2 text-sm leading-relaxed text-slate-700">
                <p>
                  <b>ערך סמלי:</b> האיור מייצג את המתח המתמיד בין טכנולוגיה לזיכרון אנושי.
                </p>
                <p>
                  <b>ערך חינוכי:</b> התמונה מנגישה דיון פילוסופי עמוק דרך הקשר מודרני של בינה מלאכותית.
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-2">
              <div className="flex items-center gap-3 text-emerald-600 font-black text-sm border-b border-slate-50 pb-2">
                <Layers size={16} />
                <span>2. הערכת מצב חזותית</span>
              </div>
              <div className="space-y-2 text-sm leading-relaxed text-slate-700">
                <p>
                  <b>שכבות נראות:</b> שילוב של איקונוגרפיה מצרית עם דמות פילוסוף יווני קלאסי.
                </p>
                <p>
                  <b>ניגודיות:</b> המגילה המוחשית מול מסך ה-ChatGPT מייצגת את השינוי במרקם הידע.
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-2">
              <div className="flex items-center gap-3 text-amber-600 font-black text-sm border-b border-slate-50 pb-2">
                <History size={16} />
                <span>3. רמזי הקשר</span>
              </div>
              <div className="space-y-2 text-sm leading-relaxed text-slate-700">
                <p>
                  <b>הקשר תמאטי:</b> הדיאלוג עוסק ב"שכחה" (Forgetfulness) כנושא מרכזי.
                </p>
                <p>
                  <b>מורשת בלתי מוחשית:</b> העברת ידע, מסורת שבעל-פה מול תיעוד חיצוני.
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-2">
              <div className="flex items-center gap-3 text-rose-600 font-black text-sm border-b border-slate-50 pb-2">
                <Search size={16} />
                <span>4. השוואות ופערי מידע</span>
              </div>
              <div className="space-y-2 text-sm leading-relaxed text-slate-700">
                <p>
                  <b>השוואה:</b> התמונה מעגנת את ה-AI בתוך רצף היסטורי ארוך של חרדה טכנולוגית.
                </p>
                <p className="italic text-slate-500">
                  ⚠️ <b>פערי מידע:</b> המקור המדויק אינו מופיע בדימוי (נוצר ב-AI).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DemoModal;
