import React from 'react';
import { Modal } from '../common';

export interface PrinciplesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrinciplesModal: React.FC<PrinciplesModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="אז כיצד לעשות הערכה תרבותית בעידן שלנו?"
      maxWidth="max-w-6xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 md:items-start text-right" dir="rtl">
        <div className="md:col-span-2 order-1 md:order-2">
          <h3 className="text-2xl font-bold text-slate-800 mb-4 md:-mt-2.5">
            אז כיצד לעשות הערכה תרבותית בעידן שלנו?
          </h3>
          <ul className="space-y-3 text-base mb-6 text-slate-700">
            <li className="flex gap-2">
              <span>•</span>
              <span>הערכת נכסי מורשת דורשת חשיבה היסטורית, ערכית וקהילתית. כלומר אנושית.</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>AI יכול להוביל ל"מראית עין של חכמה" – ללא הבנה עמוקה.</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>CBSA מחייבת אותך להיות נוכח – להבין הקשרים, לזהות ערכים, ולנסח משמעות.</span>
            </li>
          </ul>
          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="p-3 font-bold uppercase bg-green-100 text-green-800 border-b border-slate-200">
                    ✅ עשה
                  </th>
                  <th className="p-3 font-bold uppercase bg-red-100 text-red-800 border-b border-slate-200">
                    ❌ אל תעשה
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border-b border-slate-100 border-l font-medium">
                    השתמש בבוט כשותף קוגניטבי
                  </td>
                  <td className="p-4 border-b border-slate-100 font-medium">
                    אל תבקש מהבוט "לכתוב את כל ההערכה"
                  </td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border-b border-slate-100 font-medium">
                    אל תעתיק מבלי לחשוב
                  </td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border-b border-slate-100 border-l font-medium">
                    השתמש בו כדי לנסח שאלות חדשות
                  </td>
                  <td className="p-4 border-b border-slate-100 font-medium">
                    אל תדלג על שלב הניתוח שלך
                  </td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border-slate-100 border-l font-medium">
                    היעזר ביכולות זיהוי התבניות והניסוח של הבינה
                  </td>
                  <td className="p-4 border-slate-100 font-medium">
                    אך אל תוותר על ה"קול שלך"
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="md:col-span-1 order-2 md:order-1 space-y-6">
          <div className="rounded-xl overflow-hidden shadow-lg border-4 border-white ring-1 ring-slate-200 bg-slate-50">
            <img
              src="https://alephplace.com/atar.bot/tamuz.jpg"
              alt="Work Principles"
              className="w-full h-auto object-cover"
            />
          </div>
          <blockquote className="bg-slate-50 p-5 rounded-2xl border-r-4 border-indigo-500 shadow-sm">
            <p className="italic text-slate-600 text-sm leading-relaxed font-medium">
              "סם לִשְׁכֵּחָה הוא זה, לא לִרְפוּאָה לַזִּכָּרוֹן. לא חָכְמָה אֶלָּא דְּמוּת-חָכְמָה יִרְכְּשׁו..."
            </p>
            <cite className="block not-italic mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              (המלך תמוז לאל תוֹת על המצאת הכתב – פיידרוס/אפלטון, 275a)
            </cite>
          </blockquote>
        </div>
      </div>
    </Modal>
  );
};

export default PrinciplesModal;
