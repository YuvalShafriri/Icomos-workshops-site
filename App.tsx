
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  CheckCircle2,
  Cpu,
  ArrowRight,
  X,
  FileText,
  Loader2,
  Sparkles,
  Copy,
  Check,
  Code,
  Zap,
  MessageSquare,
  ExternalLink,
  Github,
  ClipboardCheck,
  Bot,
  Globe,
  Info,
  ArrowUpRight,
  Trash2,
  BookOpen,
  Lightbulb,
  Send,
  Terminal,
  Activity,
  Quote,
  Target,
  UserCheck,
  ListChecks,
  Type,
  ShieldCheck,
  Gem,
  Puzzle,
  Scale,
  Scroll,
  SearchCheck,
  Library,
  Box,
  Layout,
  ChevronLeft,
  Users,
  Eye,
  GraduationCap,
  History,
  Layers,
  Search,
  PieChart,
  Workflow,
  FileCode,
  TerminalSquare,
  MessageCircle,
  Smile,
  Share2,
  Fingerprint,
  Drama,
  Footprints
} from 'lucide-react';
import { CORE_AGENTS, DEMO_DATA, ZAIRA_TEXT, GRAPH_PROMPT, DIALOGUE_PRINCIPLES, PROMPT_ADVISOR_SYSTEM, PROMPT_TRANSLATIONS, PROMPT_PREVIEWS_EN, PROMPT_TEMPLATES, STEP_DETAILS } from './constants';
import { callGemini } from './services/geminiService';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';


const TYPE_HE: Record<string, string> = {
  // Physical
  site: 'אתר מורשת',
  place: 'מקום',
  structure: 'מבנה',
  architectural_element: 'אלמנט אדריכלי',
  natural_phenomenon: 'תופעת טבע',
  // Social
  person: 'אישיות',
  social_group: 'קבוצה חברתית',
  religion: 'דת/אמונה',
  // Time/Event
  period: 'תקופה',
  event: 'אירוע',
  historical_period: 'תקופה היסטורית',
  collective_memory: 'זיכרון קולקטיבי',
  // Abstract
  value: 'ערך',
  cultural_value: 'ערך תרבותי',
  narrative: 'נרטיב',
  tradition: 'מסורת',
  artwork: 'יצירת אמנות',
  // Fallback
  physical: 'פיזי',
  default: 'כללי'
};

const EDUCATIONAL_PROMPT = `👤 **תפקיד:** כמומחה לתחום הערכה תרבותית וגם לבינה מלאכותית יוצרת (Gen AI).
🎯 **מטרה:** להסביר למשתתפי הסדנה מהו מודל שפה גדול (LLM) ואיך הוא שונה מחשיבה אנושית בהערכת מורשת.
📝 **משימות:**
1. הסבר איך מודל שפה מנסה להבין "משמעות" של נכס מורשת (למשל 'מגדל מים') דרך סטטיסטיקה וניבוי מילים, לעומת הדרך שבה חוקר אנושי מפרש אותו כצומת של זיכרונות, זהות והקשרים פיזיים.
2. השתמש במושג "אפקט ההקשר" (Context Effect) כדי להראות איך הבינה המלאכותית יכולה לעזור לחלץ הקשרים אבל רק האדם יכול להעניק להם ערך תרבותי.
🌀 **תוספת רפלקטיבית:** אילו 3 שאלות אתה מציע שאשאל את עצמי בכל פעם שאני מקבל ממך (הבוט) ניתוח ערכים, כדי לוודא שלא איבדתי את "הקול המקצועי" שלי?`;

const MARC_INSTRUCTIONS = {
  he: {
    title: "ניתוח אוסף הערכות",
    purpose: "סיוע למשתמשים לסרוק אוסף של אתרים, נכסים או נופי תרבות עירוניים באמצעות תהליך מובנה מונחה-משתמש",
    promptContent: `פעל כמנהל מורשת ומדען נתונים. המשימה - ניתוח רוחבי של האוסף שהועלה בשלבים:

1. קריאה ואינדוקס: נתח את הקבצים שהועלה ללא הקדמות. אנדקס כל רשומה כ'אתר', 'נכס' או 'נוף תרבות עירוני'.

2. דגלי ראיות: סמן (✓/—) עבור כל פריט: קיום ערכים, הצהרת משמעות, שלמות ואותנטיות, ומידע מתוארך.

3. טבלת תמונת מצב: הצג טבלה מרכזת של עד 10 שורות עם נתוני ליבה של האוסף.

4. סיכום נתונים: תאר בקצרה (3-5 משפטים) דפוסים בולטים, ערכים ותמות מרכזיות ופערי מידע בתוך האוסף.

שאלות עצירה מנדטוריות (Stop Prompts):
• האם יש מה להוסיף או לתקן בתמונת המצב או בסיכום?
• האם תרצה אפשרויות ניתוח (כמותי / איכותני)?
• האם תרצה אפשרויות לסיווג אתרים לצרכי ניהול מורשת?`,
    steps: [], // Keeping empty or removing usage downstream
    prompts: []
  },
  en: {
    title: "Assessment Collection Analysis [MA-RC]",
    purpose: "Assist users in scanning a collection of sites, assets, or urban-cultural landscapes using structured, user-led steps.",
    promptContent: `Act as a Quality Controller and Information Specialist for Heritage Collections. Mission: Perform a cross-sectional analysis of the uploaded collection according to the following steps:

1. Read & Index
   >> Parse uploaded files without excessive preamble; index each record as Site / Asset / Urban-Cultural Landscape.

2. Evidence Flags
   >> For every item note (✓/—) for: Values (CA-V), Significance statements, Integrity/Auth, and Dated info.

3. Snapshot Table
   >> Display totals plus a summary table (max 10 rows).

4. Data Summary
   >> Write 3-5 sentences on evident patterns and gaps. Strictly descriptive.

---
Mandatory Stop Prompts:
• Anything to add or correct in the snapshot or summary?
• Would you like analysis options?
• Would you like proposed site classification options?`,
    steps: [], // Keeping empty or removing usage downstream
    prompts: []
  }
};

const RESEARCH_QUERIES = [
  {
    title: "נרטיבים חלופיים",
    description: "בחינת האתר דרך עיניים של בעלי עניין שונים.",
    icon: <Users size={16} />,
    prompt: `פעל כחוקר מורשת בגישת 'ניהול מבוסס-ערכים' (Values-Based Management) ומתודולוגיית CBSA, המקדמת **רב-קוליות** (Polyvocality) בתהליכי שימור.

המשימה: נתח את האתר דרך 'עדשות' של 3 קבוצות זהות או בעלי עניין שונים ומובהקים (למשל: תושבים ותיקים, יזם פיתוח, דמות היסטורית, או סופר שיצירתו מהדהדת את המקום).

עבור כל קבוצה, נתח:
1. שיקוף ערכי: מהם ערכי המורשת המרכזיים שקבוצה זו מייחסת לאתר? (למשל: ערך חברתי, סמלי, כלכלי, או זהותי).
2. מוקדי מתח: היכן הפרשנות שלהם מתנגשת עם נרטיבים של קבוצות אחרות?
3. תפקיד המרחב: כיצד האתר הפיזי משמש כ**גשר** (מחבר בין הזהויות) או כ**חסם** (מנציח את הקונפליקט)?

סיכום: הצג תובנה אינטגרטיבית על הפוטנציאל להכלה (Inclusion) של הנרטיבים השונים באתר.`
  },
  {
    title: "סנטימנט קהילתי",
    description: "ניתוח סנטימנט וערכי קהילה.",
    icon: <MessageCircle size={16} />,
    prompt: `פעל כנתח סנטימנט וערכים קהילתיים. 
משימה: מתוך הטקסט המצורף, חלץ את "מפת הערכים החברתיים". 
חפש מילות מפתח רגשיות, זיכרונות משותפים, ותיאורי שימוש יומיומיים. 
הצג בטבלה: [מובאה מהטקסט] | [ערך חברתי שזהה] | [עוצמת הקשר הרגשי]. 
סיכום: מהו ה"רוח של המקום" (Genius Loci) כפי שהקהילה תופסת אותו?`
  },
  {
    title: "המסרה וחינוך",
    description: "הצעות לפעילויות ותכנים באתר המבוססים על ערכי המורשת שזוהו.",
    icon: <Footprints size={16} />,
    prompt: `פעל כצוות של מתכנן בכיר להמסרת מורשת (Heritage Interpretation) ומפתח פעילויות למידה בהתמחות למידה בשטח. 
המשימה: גיבוש 3 קונספטים לפעילות חווייתית-חינוכית באתר, המנכיחים את 'הצהרת המשמעות' ואת מאפייני האתר שזיהינו.

תהליך העבודה:
1. איסוף נתונים (שלב מקדים): לפני הצגת הרעיונות, שאל אותי לגבי המאפיינים הפיזיים של האתר שיש לקחת בחשבון, מצב השימור הנוכחי ואילוצים ניהוליים/אחרים שיש לקחת בחשבון. המתן לתשובתי.
2. פיתוח ההצעות: על בסיס תשובתי, פתח 3 הצעות המשלבות למידה פעילה (Learning by Doing) וממשק פיזי-דיגיטלי (Phygital) המותאם לאופי האתר או רעיון יצירתי אחר לא מוגבל.

מבנה כל הצעה:
• הערך המוביל: איזה ערך/ים מורשת ספציפי/ם (מתוך הניתוח הקודם) הפעילות 'מפעילה'?
• פרופיל החוויה: קהל היעד, המטרה הפדגוגית והרגש המרכזי שיוצרת הפעילות.
• תיאור הפעילות: מה המבקר עושה בפועל? (חיבור בין המרחב הפיזי לתוכן).
• היבטים תכנוניים: דרישות פיזיות/תשתיות נדרשות באתר למימוש הפעילות.
• היתכנות: הערכת משאבים נדרשת (תקציב/תפעול).

תשתדל שהתגובות שלך יהיו קצרות באופן אופטימלי.`
  },
  {
    title: "ניתוח סמיוטי",
    description: "פענוח סמלים, קודים תרבותיים ומטאפורות בנכס המורשת.",
    icon: <Fingerprint size={16} />,
    prompt: `פעל כמומחה לסמיוטיקה תרבותית. 
משימה: בצע "קריאה סמיוטית" של האתר. 
זהה 3 אלמנטים (פיזיים או מופשטים) המתפקדים כ"סימנים" תרבותיים. 
עבור כל סימן: 
1. מהו המסמן (האלמנט הפיזי)? 
2. מהו המסומל (המשמעות התרבותית/המטאפורה)? 
3. כיצד הקוד התרבותי הזה השתנה לאורך זמן (דיאכרוניה)?`
  },
  {
    title: "ליצן החצר / מקהלה יוונית",
    description: "קולות רפלקטיביים לבחינת התהליך: ליצן החצר המערער והמקהלה המפרשת.",
    icon: <Drama size={16} />,
    subQueries: [
      {
        title: "ליצן החצר",
        description: "אתגור הנחות יסוד באמצעות שאלות פרובוקטיביות.",
        icon: <Smile size={16} />,
        prompt: `פעל כ"ליצן החצר" ברוח מתודולוגיית CBSA.
תפקידך: לאתגר את הניתוח מבפנים בקול חתרני–משחקי, ולחשוף סתירות, ביטחון־יתר והנחות נסתרות — מבלי להוסיף עובדות.
פעל כך:
1. ערער על ניסוחים בטוחים מדי ("האומנם?").
2. הצבע על סתירות פנימיות או אבסורדים שהניתוח מנסה להחליק.
3. חשוף הנחות סמויות שלא נאמרו במפורש.
4. השתמש בהיפוך, אירוניה ושאלה חדה.
מה לא לעשות: אל תוסיף מידע או הקשרים, אל תציע ניתוח חלופי, ואל תדבר בשפה סמכותית.
טון: חד, שובב, לא רשמי אך אינטליגנטי. מותר להגזים מעט כדי לחשוף אמת.
סיום: סיים באמירה או שאלה שמערערת את הוודאות הקיימת.`
      },
      {
        title: "מקהלה יוונית",
        description: "ליווי פרשני-ציבורי המאיר בחירות ומתחים ערכיים.",
        icon: <Users size={16} />,
        prompt: `פעל כ"קול המקהלה היוונית" ברוח מתודולוגיית CBSA.
תפקידך: ללוות את הפלט הקיים בקול פרשני–ציבורי מודע, מבלי להוסיף מידע חדש ומבלי להכריע.
פעל כך:
1. הצבע על מעברים מתיאור למשמעות.
2. האר בחירות ניסוח שקטות והנחות מובלעות.
3. סמן מתחים ערכיים או מוקדי רגישות.
4. התייחס למשמעות של אופן הניסוח, לא לנכונות העובדות.
מה לא לעשות: אל תוסיף ראיות, הקשרים או פרשנות חדשה. אל תציע ניסוח חלופי מלא, ואל תקבע מה נכון או שגוי.
טון: זהיר, ציבורי, מודע לעצמו. השתמש בניסוחים מסייגים (“כך זה עשוי להישמע”, “יש כאן בחירה”).
סיום: סיים תמיד בשאלת עצירה פתוחה שמחזירה את האחריות למשתמש.`
      }
    ]
  }
];

const getNodeColor = (type: string) => {
  switch (type) {
    // Physical/Spatial - Green/Stone/Teal
    case 'site': return { background: '#10b981', border: '#047857', highlight: '#34d399' };
    case 'place': return { background: '#10b981', border: '#047857', highlight: '#34d399' };
    case 'structure': return { background: '#64748b', border: '#334155', highlight: '#94a3b8' };
    case 'architectural_element': return { background: '#78716c', border: '#44403c', highlight: '#a8a29e' };
    case 'natural_phenomenon': return { background: '#059669', border: '#064e3b', highlight: '#34d399' };

    // Human/Social - Violet/Pink/Purple
    case 'person': return { background: '#8b5cf6', border: '#5b21b6', highlight: '#a78bfa' };
    case 'social_group': return { background: '#ec4899', border: '#be185d', highlight: '#f472b6' };
    case 'religion': return { background: '#a855f7', border: '#7e22ce', highlight: '#c084fc' };

    // Temporal/Events - Orange/Blue/Cyan
    case 'period': return { background: '#f59e0b', border: '#b45309', highlight: '#fbbf24' };
    case 'event': return { background: '#f59e0b', border: '#b45309', highlight: '#fbbf24' };
    case 'historical_period': return { background: '#3b82f6', border: '#1e3a8a', highlight: '#60a5fa' };
    case 'collective_memory': return { background: '#06b6d4', border: '#0e7490', highlight: '#67e8f9' };

    // Cultural/Abstract - Amber/Rose/Fuchsia
    case 'value': return { background: '#f59e0b', border: '#b45309', highlight: '#fbbf24' };
    case 'cultural_value': return { background: '#d97706', border: '#b45309', highlight: '#f59e0b' };
    case 'narrative': return { background: '#f43f5e', border: '#be123c', highlight: '#fb7185' };
    case 'tradition': return { background: '#14b8a6', border: '#0f766e', highlight: '#5eead4' };
    case 'artwork': return { background: '#d946ef', border: '#a21caf', highlight: '#e879f9' };

    default: return { background: '#94a3b8', border: '#475569', highlight: '#cbd5e1' };
  }
};

type AgentColor = 'slate' | 'blue' | 'amber' | 'emerald' | 'indigo' | 'purple' | 'rose';

const AGENT_STYLE: Record<AgentColor, { selectedCard: string; selectedIcon: string; unselectedIcon: string; chip: string; mobileSelected: string; mobileBadgeSelected: string; }> = {
  slate: {
    selectedCard: 'bg-white border-slate-300 ring-1 ring-slate-200 shadow-md z-10',
    selectedIcon: 'bg-slate-900 text-white shadow-slate-200',
    unselectedIcon: 'bg-slate-50 text-slate-700 border-slate-200',
    chip: 'bg-slate-100 text-slate-700',
    mobileSelected: 'bg-slate-50 border-slate-300 ring-1 ring-slate-200 text-slate-800',
    mobileBadgeSelected: 'bg-slate-900 text-white',
  },
  blue: {
    selectedCard: 'bg-white border-blue-200 ring-1 ring-blue-200 shadow-md z-10',
    selectedIcon: 'bg-blue-600 text-white shadow-blue-200',
    unselectedIcon: 'bg-blue-50 text-blue-700 border-blue-100',
    chip: 'bg-blue-100 text-blue-700',
    mobileSelected: 'bg-blue-50 border-blue-200 ring-1 ring-blue-200 text-blue-800',
    mobileBadgeSelected: 'bg-blue-600 text-white',
  },
  amber: {
    selectedCard: 'bg-white border-amber-200 ring-1 ring-amber-200 shadow-md z-10',
    selectedIcon: 'bg-amber-600 text-white shadow-amber-200',
    unselectedIcon: 'bg-amber-50 text-amber-700 border-amber-100',
    chip: 'bg-amber-100 text-amber-800',
    mobileSelected: 'bg-amber-50 border-amber-200 ring-1 ring-amber-200 text-amber-900',
    mobileBadgeSelected: 'bg-amber-600 text-white',
  },
  emerald: {
    selectedCard: 'bg-white border-emerald-200 ring-1 ring-emerald-200 shadow-md z-10',
    selectedIcon: 'bg-emerald-600 text-white shadow-emerald-200',
    unselectedIcon: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    chip: 'bg-emerald-100 text-emerald-700',
    mobileSelected: 'bg-emerald-50 border-emerald-200 ring-1 ring-emerald-200 text-emerald-800',
    mobileBadgeSelected: 'bg-emerald-600 text-white',
  },
  indigo: {
    selectedCard: 'bg-white border-indigo-200 ring-1 ring-indigo-200 shadow-md z-10',
    selectedIcon: 'bg-indigo-600 text-white shadow-indigo-200',
    unselectedIcon: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    chip: 'bg-indigo-100 text-indigo-700',
    mobileSelected: 'bg-indigo-50 border-indigo-200 ring-1 ring-indigo-200 text-indigo-800',
    mobileBadgeSelected: 'bg-indigo-600 text-white',
  },
  purple: {
    selectedCard: 'bg-white border-purple-200 ring-1 ring-purple-200 shadow-md z-10',
    selectedIcon: 'bg-purple-600 text-white shadow-purple-200',
    unselectedIcon: 'bg-purple-50 text-purple-700 border-purple-100',
    chip: 'bg-purple-100 text-purple-700',
    mobileSelected: 'bg-purple-50 border-purple-200 ring-1 ring-purple-200 text-purple-800',
    mobileBadgeSelected: 'bg-purple-600 text-white',
  },
  rose: {
    selectedCard: 'bg-white border-rose-200 ring-1 ring-rose-200 shadow-md z-10',
    selectedIcon: 'bg-rose-600 text-white shadow-rose-200',
    unselectedIcon: 'bg-rose-50 text-rose-700 border-rose-100',
    chip: 'bg-rose-100 text-rose-700',
    mobileSelected: 'bg-rose-50 border-rose-200 ring-1 ring-rose-200 text-rose-800',
    mobileBadgeSelected: 'bg-rose-600 text-white',
  },
};

const getAgentColorStyle = (colorName: string) => {
  const normalized = (colorName || '').toLowerCase() as AgentColor;
  return AGENT_STYLE[normalized] ?? AGENT_STYLE.slate;
};

const getAgentTheme = (agentId: number, colorName: string, isSelected: boolean) => {
  const style = getAgentColorStyle(colorName);
  if (isSelected) {
    return { card: style.selectedCard, icon: style.selectedIcon };
  }
  return { card: 'bg-white hover:shadow-md border-slate-200', icon: style.unselectedIcon };
};

const getMobileStageTheme = (colorName: string, isSelected: boolean) => {
  const style = getAgentColorStyle(colorName);
  return {
    pill: isSelected ? style.mobileSelected : 'bg-white border-slate-200 text-slate-600',
    badge: isSelected ? style.mobileBadgeSelected : 'bg-slate-100 text-slate-500',
  };
};

const getAgentChipTheme = (colorName: string) => {
  const style = getAgentColorStyle(colorName);
  return style.chip;
};

const ResourceGroup: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
    <div className="bg-slate-50 px-4 py-2 border-b border-slate-100"><h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</h4></div>
    <div className="divide-y divide-slate-100 flex flex-col">{children}</div>
  </div>
);

const ResourceLink: React.FC<{
  href?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  label: React.ReactNode;
  secondaryLabel?: string;
  highlight?: boolean;
  noBorder?: boolean;
  colorScheme?: 'indigo' | 'emerald' | 'amber' | 'slate';
}> = ({ href, onClick, icon, label, secondaryLabel, highlight, noBorder, colorScheme = 'indigo' }) => {
  const Component = href ? 'a' : 'button';
  // Tailwind can't reliably pick up dynamic class names like `bg-${color}-600`.
  // Use explicit class maps so production builds include the right styles.
  const schemeClasses = {
    indigo: {
      iconHighlight: 'bg-indigo-600 text-white shadow-indigo-200 shadow-lg',
      iconNormal: 'bg-slate-100 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500',
      labelHover: 'group-hover:text-indigo-600',
      arrowHover: 'group-hover:text-indigo-400',
    },
    emerald: {
      iconHighlight: 'bg-emerald-600 text-white shadow-emerald-200 shadow-lg',
      iconNormal: 'bg-slate-100 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500',
      labelHover: 'group-hover:text-emerald-600',
      arrowHover: 'group-hover:text-emerald-400',
    },
    amber: {
      iconHighlight: 'bg-amber-600 text-white shadow-amber-200 shadow-lg',
      iconNormal: 'bg-slate-100 text-slate-400 group-hover:bg-amber-50 group-hover:text-amber-500',
      labelHover: 'group-hover:text-amber-600',
      arrowHover: 'group-hover:text-amber-400',
    },
    slate: {
      iconHighlight: 'bg-white text-slate-900 border-2 border-slate-900 shadow-sm',
      iconNormal: 'bg-slate-100 text-slate-400 group-hover:bg-slate-50 group-hover:text-slate-600',
      labelHover: 'group-hover:text-slate-700',
      arrowHover: 'group-hover:text-slate-500',
    },
  } as const;
  const currentScheme = schemeClasses[colorScheme];

  return (
    <Component
      href={href}
      onClick={onClick}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      className={`flex items-center justify-between p-3.5 hover:bg-slate-50 transition-all group w-full text-right ${noBorder ? '' : 'border-b border-slate-100 last:border-0'}`}
    >
      <div className="flex items-center gap-4 text-right">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${highlight
          ? currentScheme.iconHighlight
          : currentScheme.iconNormal
          }`}>
          {icon}
        </div>
        <div>
          <h4 className={`font-bold text-sm text-slate-800 ${currentScheme.labelHover} transition-colors`}>{label}</h4>
          {secondaryLabel && <p className="text-[10px] text-slate-400 font-medium">{secondaryLabel}</p>}
        </div>
      </div>
      <ArrowUpRight size={14} className={`text-slate-300 ${currentScheme.arrowHover} group-hover:translate-x-1 group-hover:-translate-y-1 transition-all`} />
    </Component>
  );
};

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: React.ReactNode; children: React.ReactNode; maxWidth?: string }> = ({ isOpen, onClose, title, children, maxWidth = "max-w-3xl" }) => {
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

const SectionDivider: React.FC<{ label: string; colorClass?: string; bgColor?: string }> = ({ label, colorClass = "text-slate-400", bgColor = "bg-slate-50" }) => (
  <div className="relative py-2">
    <div className="absolute inset-0 flex items-center" aria-hidden="true"><div className="w-full border-t border-slate-200"></div></div>
    <div className="relative flex justify-center"><span className={`${bgColor} px-4 text-[10px] font-black uppercase tracking-[0.2em] ${colorClass} text-center leading-tight`}>{label}</span></div>
  </div>
);

const App: React.FC = () => {
  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null);
  const [showResearchAids, setShowResearchAids] = useState<boolean>(false);
  const [rawData] = useState<string>(DEMO_DATA);
  const [sidebarWidth, setSidebarWidth] = useState<number>(340);
  const [isResizingState, setIsResizingState] = useState<boolean>(false);
  const [promptLang, setPromptLang] = useState<'he' | 'en'>('he');

  // Welcome/About overlay state
  const [showWelcome, setShowWelcome] = useState<boolean>(() => {
    return !localStorage.getItem('atar-bot-welcomed');
  });

  const handleCloseWelcome = () => {
    localStorage.setItem('atar-bot-welcomed', 'true');
    setShowWelcome(false);
  };

  // Dialogue Advisor states
  const [consultationInput, setConsultationInput] = useState<string>("");
  const [consultationResult, setConsultationResult] = useState<string | null>(null);
  const [isConsulting, setIsConsulting] = useState<boolean>(false);

  // Custom KG input
  const [kgInputText, setKgInputText] = useState<string>(DEMO_DATA);

  // Modals states
  const [isGraphModalOpen, setIsGraphModalOpen] = useState(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isPrinciplesModalOpen, setIsPrinciplesModalOpen] = useState(false);
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
  const [isGraphInputModalOpen, setIsGraphInputModalOpen] = useState(false);
  const [inventoryModalLang, setInventoryModalLang] = useState<'he' | 'en'>('he');
  const [selectedQuery, setSelectedQuery] = useState<typeof RESEARCH_QUERIES[0] | null>(null);

  // Deep linking - hash routes mapping
  const hashRoutes: Record<string, () => void> = {
    'graph': () => setIsGraphModalOpen(true),
    'graph-create': () => setIsGraphInputModalOpen(true),
    'visual': () => setIsDemoModalOpen(true),
    'prompts': () => setIsPromptModalOpen(true),
    'principles': () => setIsPrinciplesModalOpen(true),
    'inventory': () => setIsInventoryModalOpen(true),
    'tools': () => { setShowResearchAids(true); setSelectedAgentId(null); },
    'welcome': () => setShowWelcome(true),
    'step-0': () => { setSelectedAgentId(0); setShowResearchAids(false); },
    'step-1': () => { setSelectedAgentId(1); setShowResearchAids(false); },
    'step-2': () => { setSelectedAgentId(2); setShowResearchAids(false); },
    'step-3': () => { setSelectedAgentId(3); setShowResearchAids(false); },
    'step-4': () => { setSelectedAgentId(4); setShowResearchAids(false); },
    'step-5': () => { setSelectedAgentId(5); setShowResearchAids(false); },
    'step-6': () => { setSelectedAgentId(6); setShowResearchAids(false); },
  };

  // Navigate to hash route
  const navigateTo = useCallback((hash: string) => {
    window.location.hash = hash;
  }, []);

  // Close all modals and clear hash
  const closeAllModals = useCallback(() => {
    setIsGraphModalOpen(false);
    setIsGraphInputModalOpen(false);
    setIsDemoModalOpen(false);
    setIsPromptModalOpen(false);
    setIsPrinciplesModalOpen(false);
    setIsInventoryModalOpen(false);
  }, []);

  // Handle hash change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove #
      if (hash && hashRoutes[hash]) {
        closeAllModals();
        hashRoutes[hash]();
      } else if (!hash) {
        closeAllModals();
      }
    };

    // Handle initial hash on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Knowledge Graph states
  const [graphData, setGraphData] = useState<any | null>(null);
  const [isGraphLoading, setIsGraphLoading] = useState(false);
  const [selectedNodeDetails, setSelectedNodeDetails] = useState<any | null>(null);
  const graphContainerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);

  const currentAgent = selectedAgentId !== null ? CORE_AGENTS.find(a => a.id === selectedAgentId) : null;
  const selectedStepDetails = selectedAgentId !== null ? STEP_DETAILS[selectedAgentId] : undefined;
  const isResizing = useRef<boolean>(false);

  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    setIsResizingState(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, []);

  const stopResizing = useCallback(() => {
    if (isResizing.current) {
      isResizing.current = false;
      setIsResizingState(false);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    }
  }, []);

  const resize = useCallback((e: MouseEvent) => {
    if (!isResizing.current) return;
    const newWidth = window.innerWidth - e.clientX;
    if (newWidth > 220 && newWidth < 700) {
      setSidebarWidth(newWidth);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  const handleConsult = async () => {
    if (!consultationInput.trim()) return;
    setIsConsulting(true);
    setConsultationResult(null);
    try {
      const result = await callGemini(`${PROMPT_ADVISOR_SYSTEM}\nהמטרה המחקרית המבוקשת: "${consultationInput}"`);
      setConsultationResult(result);
    } catch (e) {
      setConsultationResult("חלה שגיאה בבניית המהלך המחקרי. נסו שוב.");
    } finally {
      setIsConsulting(false);
    }
  };

  const generateKnowledgeGraph = async () => {
    window.location.hash = 'graph';
    setIsGraphModalOpen(true);
    setIsGraphLoading(true);
    setSelectedNodeDetails(null);
    const prompt = GRAPH_PROMPT(kgInputText, "Methodology learning session.");
    try {
      const response = await callGemini(prompt);
      const cleanJson = response.replace(/```json|```/gi, '').trim();
      const data = JSON.parse(cleanJson);
      setGraphData(data);
    } catch (e) {
      console.error("Graph Error", e);
      alert("שגיאה ביצירת הגרף. וודא שהמודל החזיר JSON תקין.");
    } finally {
      setIsGraphLoading(false);
    }
  };

  useEffect(() => {
    if (!showWelcome && !isGraphModalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (isGraphModalOpen) setIsGraphModalOpen(false);
      if (showWelcome) handleCloseWelcome();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showWelcome, isGraphModalOpen]);

  useEffect(() => {
    if (graphData && graphContainerRef.current) {
      const nodes = new DataSet(graphData.nodes.map((n: any) => ({
        ...n,
        label: n.name || n.label, // Fix: Ensure label is populated from name
        color: getNodeColor(n.type),
        font: { color: '#000000', face: 'Assistant', size: 14, weight: 'bold' },
        shape: n.type === 'site' ? 'hexagon' : 'dot',
        size: n.type === 'site' ? 40 : 25,
        borderWidth: 2,
        shadow: true
      })));
      const edges = new DataSet(graphData.edges.map((e: any) => ({
        ...e,
        arrows: 'to',
        color: { color: '#cbd5e1', highlight: '#6366f1' },
        width: 1,
        font: { align: 'middle', size: 10, face: 'Assistant' },
        smooth: { type: 'continuous' }
      })));
      const options = {
        physics: { enabled: true, barnesHut: { gravitationalConstant: -2000, centralGravity: 0.3, springLength: 150, springConstant: 0.04, damping: 0.09, avoidOverlap: 1 }, stabilization: { iterations: 150 } },
        interaction: { hover: true, tooltipDelay: 200, hideEdgesOnDrag: true }
      };
      const network = new Network(graphContainerRef.current, { nodes, edges }, options);
      networkRef.current = network;
      network.on("click", (params) => {
        if (params.nodes.length > 0) {
          const nodeId = params.nodes[0];
          const node = graphData.nodes.find((n: any) => n.id === nodeId);
          setSelectedNodeDetails(node);
        } else {
          setSelectedNodeDetails(null);
        }
      });
      return () => { network.destroy(); };
    }
  }, [graphData]);



  return (
    <div className="flex flex-col h-screen bg-slate-100 text-slate-800 font-sans overflow-hidden" dir="rtl">

      <header className="bg-[#020617] text-white p-3 flex justify-between items-center shadow-xl z-50 shrink-0 border-b border-slate-800 px-6">
        <div className="flex items-center gap-4">

          <div className="p-1.5 bg-indigo-600 rounded-lg shadow-inner border border-indigo-400/20"><Cpu size={24} /></div>
          <h1 className="font-black text-2xl tracking-tight leading-none text-indigo-100">אתר.בוט - אתר הסדנאות</h1>
          <button
            onClick={() => setShowWelcome(true)}
            className=" flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-all text-slate-300 hover:text-white"
          >
            <Info size={14} />
            <span className="text-s font-bold">אודות</span>
          </button>
        </div>
        <div className="flex items-center gap-2" dir="ltr">
          <h3 className="text-slate-200 font-bold text-2xl">InSites</h3>
          <div className="w-1 h-4 bg-slate-800 rounded-full"></div>
        </div>
      </header>

      {/* Mobile Horizontal Navigation (Sticky) */}
      <div className="md:hidden flex overflow-x-auto p-2 gap-2 bg-slate-50/95 backdrop-blur border-b border-slate-200 shrink-0 sticky top-0 z-40 hide-scrollbar" dir="rtl">
        {/* Mobile Extensions Button */}
        <button
          onClick={() => { setShowResearchAids(true); setSelectedAgentId(null); handleCloseWelcome(); }}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg border shadow-sm whitespace-nowrap transition-all shrink-0 ${showResearchAids ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white border-slate-200 text-indigo-600'}`}
        >
          <Zap size={14} className={showResearchAids ? 'text-white' : 'text-indigo-500'} />
          <span className="text-xs font-bold">כלים נוספים</span>
        </button>

        {CORE_AGENTS.map((agent) => {
          const isSelected = selectedAgentId === agent.id;
          const cleanName = agent.name.replace(/^שלב \d+ - /, '');
          const mobileTheme = getMobileStageTheme(agent.color, isSelected);

          return (
            <button
              key={agent.id}
              onClick={() => { setSelectedAgentId(agent.id); setShowResearchAids(false); handleCloseWelcome(); }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border shadow-sm whitespace-nowrap transition-all shrink-0 ${mobileTheme.pill}`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${mobileTheme.badge}`}>
                {agent.id}
              </div>
              <span className="text-xs font-bold">{cleanName}</span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-hidden relative flex flex-col md:flex-row">

        <aside style={{ width: sidebarWidth }} className={`shrink-0 border-l border-slate-200 bg-slate-50/80 backdrop-blur-md transition-all z-20 flex-col relative hidden md:flex ${selectedAgentId !== null || showResearchAids ? 'shadow-2xl' : ''}`}>
          <div onMouseDown={startResizing} className={`absolute top-0 bottom-0 left-0 w-2 cursor-col-resize z-50 group hover:bg-indigo-400/30 transition-colors ${isResizingState ? 'bg-indigo-500/40' : ''}`} title="גרור לשינוי גודל">
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-8 bg-slate-300 rounded-full group-hover:bg-indigo-500 transition-colors ${isResizingState ? 'bg-indigo-600 h-12' : ''}`}></div>
          </div>
          <div dir="ltr" className="flex-1 overflow-y-auto custom-scrollbar-right">
            <div dir="rtl" className="p-4 pt-1 text-right flex flex-col h-full">
              <div className="space-y-1 relative">
                <div className="py-3 mb-2">
                  <h3 className="text-s font-black uppercase tracking-widest text-slate-500 text-center">תהליך הערכה - בשלבים (בגישת <span className="text-[9px]">CBSA</span>)</h3>
                </div>
                {CORE_AGENTS.map((agent) => {
                  const theme = getAgentTheme(agent.id, agent.color, selectedAgentId === agent.id);
                  return (
                    <React.Fragment key={agent.id}>
                      <div onClick={() => { setSelectedAgentId(agent.id); setShowResearchAids(false); handleCloseWelcome(); }} className={`relative flex items-center justify-between p-2.5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${theme.card}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-sm duration-500 ${theme.icon}`}>
                            {React.cloneElement(agent.icon as React.ReactElement<{ size?: number }>, { size: 16 })}
                          </div>
                          <div>
                            <h3 className={`font-bold text-[13px] leading-tight ${selectedAgentId === agent.id ? 'text-slate-900' : 'text-slate-600'}`}>{agent.name}</h3>
                            <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wide">{agent.role}</p>
                          </div>
                        </div>
                      </div>
                      {(agent.id === 0 || agent.id === 5) && <div className="py-2 px-4"><div className="h-px bg-slate-200 w-full opacity-50"></div></div>}
                      {agent.id === 6 && <div className="py-3 px-4 mt-1"><div className="h-px bg-slate-300 w-full"></div></div>}
                    </React.Fragment>
                  );
                })}

              </div>

              <div className="pt-2 px-3 mt-4">
                <button
                  onClick={() => { setShowResearchAids(true); setSelectedAgentId(null); handleCloseWelcome(); }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all duration-300 group ${showResearchAids ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-200' : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-md'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg transition-all ${showResearchAids ? 'bg-white/20 text-white' : 'bg-slate-50 text-indigo-500 group-hover:bg-indigo-50'}`}>
                      <Zap size={14} />
                    </div>
                    <div className="text-right">
                      <h3 className="font-bold text-[11px] uppercase tracking-wider">הרחבות וכלים</h3>
                    </div>
                  </div>
                  <ChevronLeft size={14} className={`transition-transform duration-300 ${showResearchAids ? 'text-indigo-200 -translate-x-1' : 'text-slate-300 group-hover:text-indigo-300'}`} />
                </button>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 flex flex-col bg-white shadow-inner relative transition-all overflow-hidden">
          {/* Welcome/About Overlay */}
          {showWelcome && (
            <div
              className="absolute inset-0 z-40 bg-slate-900/35 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={handleCloseWelcome}
            >
              <div
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-8 text-right animate-in fade-in zoom-in-95 duration-300 relative"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                dir="rtl"
              >
                <button
                  onClick={handleCloseWelcome}
                  className="absolute top-3 left-3 px-2.5 py-2 rounded-xl text-slate-500 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all flex items-center gap-2"
                  aria-label="סגור"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">סגור</span>
                  <X size={18} />
                </button>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-md">
                    <Cpu size={24} />
                  </div>
                  <div>
                    <h2 className="font-black text-xl text-slate-900">ברוכים הבאים לאתר הסדנאות של אתר.בוט</h2>
                    <p className="text-xs text-slate-400 font-medium">סוכן AI נסיוני לתמיכה בהערכת משמעות תרבותית של מורשת </p>
                  </div>
                </div>

                <div className="text-sm text-slate-600 leading-relaxed mb-6 space-y-3">
                  <p>
                    אתר.בוט הוא כלי AI נסיוני להערכת משמעות תרבותית של אתרי מורשת בגישת <span className="text-xs">CBSA</span> (Context Based Significance Assessment).
                  </p>
                  <p>
                    המערכת מפותחת לצרכי מחקר על ידי ד"ר יעל אלף ויובל שפרירי, ותשולב במעבדת InSites - מעבדת מחקר חדשה בפקולטה לארכיטקטורה בטכניון.
                  </p>
                  <p>
                    המעבדה מוקדשת לחקר היבטי הערכה של נכסי מורשת, לצורך קבלת החלטות על שילובם בתכנון והבנת מקומם בתרבות, חברה וקהילה.
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
                      <p className="text-xs text-slate-500">תהליך הערכה מובנה ב-6 שלבים (בצד ימין)</p>
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

                <button
                  onClick={handleCloseWelcome}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <span>בואו נתחיל</span>
                  <ArrowRight size={18} className="rotate-180" />
                </button>
              </div>
            </div>
          )}

          {selectedAgentId !== null && currentAgent ? (
            <>
              <div className="p-2.5 border-b border-slate-200 flex justify-between items-center bg-white shadow-sm z-30 px-6 shrink-0 min-h-[56px]">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl ${getAgentChipTheme(currentAgent.color)} shadow-md border border-white`}>{React.cloneElement(currentAgent.icon as React.ReactElement<{ size?: number }>, { size: 20 })}</div>
                  <div>
                    <h2 className="font-black text-lg leading-tight text-slate-900 tracking-tight">{currentAgent.name}</h2>
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{currentAgent.role}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedAgentId(null)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-all group flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline group-hover:text-slate-600 transition-colors">סגור תצוגה</span>
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto custom-scrollbar" dir="rtl">
                <div className="p-6 md:p-8 max-w-3xl mx-auto w-full space-y-6">
                  {/* Why Important & Cognitive Link - Side by Side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb size={16} className="text-amber-600" />
                        <h3 className="font-bold text-amber-800 text-sm">למה שלב זה חשוב?</h3>
                      </div>
                      <p className="text-amber-900/80 text-sm leading-relaxed">
                        {selectedStepDetails?.whyImportant}
                      </p>
                    </div>
                    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Layers size={16} className="text-indigo-600" />
                        <h3 className="font-bold text-indigo-800 text-sm">קשר לשלבים קודמים</h3>
                      </div>
                      <p className="text-indigo-900/80 text-sm leading-relaxed">
                        {selectedStepDetails?.cognitiveLink}
                      </p>
                    </div>
                  </div>

                  {/* What Happens */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <ListChecks size={16} className="text-emerald-600" />
                      <h3 className="font-bold text-slate-800 text-sm">מה קורה בשלב זה?</h3>
                    </div>
                    <ul className="space-y-2">
                      {(selectedStepDetails?.whatHappens ?? []).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className="text-emerald-500 mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Extensions for Step 5 */}
                  {selectedAgentId === 5 && STEP_DETAILS[5]?.extensions && (
                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Sparkles size={16} className="text-purple-600" />
                          <h3 className="font-bold text-purple-800 text-sm">מסלולי העמקה אופציונליים</h3>
                        </div>
                        <button
                          onClick={() => navigateTo('tools')}
                          className="flex items-center gap-1.5 px-2 py-1 text-purple-600 hover:text-purple-800 hover:bg-purple-100 rounded-lg transition-all text-[11px] font-semibold"
                        >
                          <span>כל הכלים</span>
                          <ExternalLink size={11} />
                        </button>
                      </div>
                      {/* First row - 3 items */}
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        {STEP_DETAILS[5].extensions.slice(0, 3).map((ext, idx) => (
                          <button
                            key={idx}
                            onClick={() => navigateTo(ext.url)}
                            className="flex flex-col items-center p-2 bg-white border border-purple-100 rounded-lg hover:border-purple-300 transition-all group text-center"
                          >
                            <span className="font-semibold text-purple-800 text-xs">{ext.name}</span>
                            <span className="text-purple-500/70 text-[10px] leading-tight">{ext.description}</span>
                          </button>
                        ))}
                      </div>
                      {/* Second row - 2 items */}
                      <div className="grid grid-cols-2 gap-2">
                        {STEP_DETAILS[5].extensions.slice(3, 5).map((ext, idx) => (
                          <button
                            key={idx}
                            onClick={() => navigateTo(ext.url)}
                            className="flex flex-col items-center p-2 bg-white border border-purple-100 rounded-lg hover:border-purple-300 transition-all group text-center"
                          >
                            <span className="font-semibold text-purple-800 text-xs">{ext.name}</span>
                            <span className="text-purple-500/70 text-[10px] leading-tight">{ext.description}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Prompt Section - Collapsible */}
                  <details className="bg-slate-100 border border-slate-200 rounded-xl overflow-hidden group">
                    <summary className="p-4 cursor-pointer flex items-center justify-between hover:bg-slate-200/50 transition-all">
                      <div className="flex items-center gap-2">
                        <Code size={16} className="text-slate-500" />
                        <h3 className="font-bold text-slate-700 text-sm">ההנחיות לבוט (פרומפט)</h3>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex bg-white rounded-lg p-0.5 border border-slate-200" dir="ltr">
                          <button
                            onClick={(e) => { e.preventDefault(); setPromptLang('he'); }}
                            className={`px-2 py-0.5 text-[10px] font-bold rounded transition-all ${promptLang === 'he' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-700'}`}
                          >עברית</button>
                          <button
                            onClick={(e) => { e.preventDefault(); setPromptLang('en'); }}
                            className={`px-2 py-0.5 text-[10px] font-bold rounded transition-all ${promptLang === 'en' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-700'}`}
                          >English</button>
                        </div>
                        <ChevronLeft size={16} className="text-slate-400 group-open:-rotate-90 transition-transform" />
                      </div>
                    </summary>
                    <div className="p-4 pt-0 border-t border-slate-200 bg-white">
                      <div className="bg-slate-900 rounded-lg p-4 mt-3">
                        <pre className={`whitespace-pre-wrap leading-relaxed text-xs ${promptLang === 'he' ? 'text-right font-sans text-blue-50/90' : 'text-left font-mono text-blue-100/70'}`} dir={promptLang === 'he' ? 'rtl' : 'ltr'}>
                          {selectedAgentId !== null ? (promptLang === 'he' ? (PROMPT_TRANSLATIONS[selectedAgentId] || PROMPT_TEMPLATES[selectedAgentId](rawData).toString()) : (PROMPT_PREVIEWS_EN[selectedAgentId] || PROMPT_TEMPLATES[selectedAgentId](rawData).toString())) : ""}
                        </pre>
                      </div>
                    </div>
                  </details>
                </div>
              </div>
            </>
          ) : showResearchAids ? (
            <div className="flex-1 flex flex-col bg-white overflow-y-auto custom-scrollbar animate-in fade-in duration-300 pb-20">
              <div className="p-6 md:p-10 max-w-5xl mx-auto w-full space-y-6">
                <div className="flex justify-between items-end">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none">הרחבות ושאילתות משלימות</h2>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">ארגז כלים משלים להעמקה מחקרית</p>
                  </div>
                  <button
                    onClick={() => setShowResearchAids(false)}
                    className="px-3 py-2 hover:bg-slate-100 rounded-xl text-slate-600 transition-all border border-slate-200 flex items-center gap-2"
                    aria-label="חזרה לשלבים"
                  >
                    <span className="text-[11px] font-black">חזרה לשלבים</span>
                    <X size={18} className="text-slate-400" />
                  </button>
                </div>



                {/* Unified Research Toolkit Section */}
                <section className="space-y-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] bg-slate-100 px-2 py-1 rounded">ארגז כלים ושאילתות למחקר</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Knowledge Graph Card (FIRST) */}
                    <div
                      onClick={() => navigateTo('graph-create')}
                      className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:border-emerald-200 transition-all flex flex-col cursor-pointer group h-full relative hover:shadow-md"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-all"><Share2 size={18} /></div>
                        <h4 className="font-bold text-slate-800 text-sm">גרף ידע</h4>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed mb-4 flex-1">מיפוי חזותי של ישויות וקשרים סמנטיים מתוך הטקסט.</p>
                      <div className="py-2 bg-slate-50 text-emerald-600 rounded-lg font-black text-[9px] text-center border border-slate-100 uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-emerald-50 transition-colors">
                        <Zap size={12} /> הפעל כלי
                      </div>
                    </div>

                    {/* Visual Analysis Card (SECOND) */}
                    <div
                      onClick={() => navigateTo('visual')}
                      className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:border-emerald-200 transition-all flex flex-col cursor-pointer group h-full relative hover:shadow-md"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-all"><Eye size={18} /></div>
                        <h4 className="font-bold text-slate-800 text-sm">פענוח חזותי</h4>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed mb-4 flex-1">סוכן (נסיוני) לניתוח תכונות הקשרים ערכים מתוך תמונות.</p>
                      <div className="py-2 bg-slate-50 text-emerald-600 rounded-lg font-black text-[9px] text-center border border-slate-100 uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-emerald-50 transition-colors">
                        <Sparkles size={12} /> דוגמה לניתוח
                      </div>
                    </div>

                    {/* Inventory Card (THIRD) */}
                    <div
                      onClick={() => navigateTo('inventory')}
                      className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:border-emerald-200 transition-all flex flex-col cursor-pointer group h-full relative hover:shadow-md"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-all"><PieChart size={18} /></div>
                        <h4 className="font-bold text-slate-800 text-sm">ניתוח אוסף</h4>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed mb-4 flex-1">פרוטוקול לניתוח רוחבי של אוסף הערכות (למשל מסקר)</p>
                      <div className="py-2 bg-slate-50 text-emerald-600 rounded-lg font-black text-[9px] text-center border border-slate-100 uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-emerald-50 transition-colors">
                        <FileText size={12} /> צפה בהנחיות
                      </div>
                    </div>

                    {/* Methodological Queries */}
                    {RESEARCH_QUERIES.map((q, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedQuery(q)}
                        className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:border-indigo-200 transition-all flex flex-col group h-full relative cursor-pointer hover:shadow-md"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-50 text-indigo-500 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-all">{q.icon}</div>
                            <h4 className="font-bold text-slate-800 text-sm">{q.title}</h4>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed mb-4 flex-1">{q.description}</p>
                        <div className="py-2 bg-slate-50 text-indigo-400 rounded-lg font-black text-[9px] text-center border border-slate-100 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                          הצג שאילתה
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="border-t border-slate-100 my-2"></div>

                {/* Consultation Advisor Section - Top of Overlay */}
                <section className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-indigo-600 text-white rounded-lg shadow-md"><TerminalSquare size={20} /></div>
                    <div>
                      <h3 className="font-black text-lg text-slate-900">בונה פנייה מותאמת (Dialogue Advisor)</h3>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">שלב הכנה: הגדרת תפקיד ומתודולוגיה</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed font-medium mb-6 max-w-3xl">הזן את המטרה המחקרית שלך (למשל: "אני רוצה לנתח את הערכים החברתיים"), והיועץ יבנה עבורך פנייה מקצועית (Prompt) המותאמת למתודולוגיה, אותה תוכל להעתיק לבוט.</p>

                  <div className="flex flex-col gap-8">
                    <div className="relative">
                      <textarea
                        className="w-full h-32 p-4 bg-white rounded-2xl border border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-sm font-medium text-slate-700 placeholder:text-slate-300 resize-none shadow-inner"
                        placeholder="למשל: 'אני רוצה להבין את הקשר בין המכונות לערך הטכנולוגי'..."
                        value={consultationInput}
                        onChange={(e) => setConsultationInput(e.target.value)}
                      ></textarea>
                      <button
                        onClick={handleConsult}
                        disabled={isConsulting || !consultationInput.trim()}
                        className="absolute bottom-4 left-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white p-2.5 rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-2 font-black text-[11px]"
                      >
                        {isConsulting ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                        <span>בנה פנייה</span>
                      </button>
                    </div>

                    {/* Consultation Result Display Area */}
                    <div className="w-full">
                      {consultationResult && (() => {
                        const [promptText, explanationText] = consultationResult.includes('---PROMPT_BOUNDARY---')
                          ? consultationResult.split('---PROMPT_BOUNDARY---')
                          : [consultationResult, ''];
                        const cleanPrompt = promptText.replace(/^```(markdown|json)?/g, '').replace(/```$/g, '').trim();

                        return (
                          <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                            <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800 text-right w-full" dir="rtl">
                              <div className="bg-slate-800/50 p-3 border-b border-white/5 flex items-center justify-between">
                                <div className="flex gap-1.5 px-2">
                                  <div className="w-2 h-2 rounded-full bg-red-400/20"></div>
                                  <div className="w-2 h-2 rounded-full bg-amber-400/20"></div>
                                  <div className="w-2 h-2 rounded-full bg-emerald-400/20"></div>
                                </div>
                                <button onClick={() => navigator.clipboard.writeText(cleanPrompt)} className="text-xs bg-white/10 hover:bg-white/20 text-indigo-200 hover:text-white px-3 py-1.5 rounded transition-all flex items-center gap-2 font-bold">
                                  <Copy size={14} /> העתק פנייה
                                </button>
                              </div>
                              <pre className="p-6 text-sm md:text-base text-indigo-50 font-mono whitespace-pre-wrap leading-relaxed selection:bg-indigo-500/30 overflow-y-auto custom-scrollbar text-right max-h-[500px]">
                                {cleanPrompt}
                              </pre>
                            </div>

                            {explanationText && (
                              <div className="bg-white p-5 rounded-xl border-l-4 border-indigo-500 shadow-sm text-sm text-slate-700 leading-relaxed">
                                <h4 className="font-bold text-slate-900 text-xs mb-2 flex items-center gap-2"><Sparkles size={14} className="text-indigo-500" /> דבר היועץ</h4>
                                {explanationText.trim()}
                              </div>
                            )}
                            <div className="flex justify-end">
                              <button onClick={() => setConsultationResult(null)} className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors">נקה תוצאות</button>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col overflow-y-auto bg-slate-50/30 animate-in fade-in duration-300 custom-scrollbar">
              <div className="max-w-xl mx-auto w-full px-6 py-2 md:py-3 space-y-6">
                <div className="text-right pt-2 md:pt-3"><h2 className="text-xl font-black text-slate-900 mb-0.5 leading-tight">משאבים לסדנת איקומוס אתר.בוט</h2><div className="w-12 h-1 bg-indigo-500 rounded-full mb-4"></div></div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <ResourceGroup title="כלי הערכה: אתר.בוט">
                      <ResourceLink
                        href="https://chatgpt.com/g/g-695d3567400c8191a402087b38c7b6b7-tr-bvt-h-rkt-mshm-vt-lshymvr"
                        icon={<Bot size={16} />}
                        label="אתר.בוט (GPTs)"
                        highlight={true}
                        colorScheme="emerald"
                      />
                      <ResourceLink
                        href="https://gemini.google.com/gem/5b822b7e1771?usp=sharing"
                        icon={<Sparkles size={16} />}
                        label="אתר.בוט (Gemini)"
                        highlight={true}
                        colorScheme="indigo"
                      />
                      <ResourceLink href="https://forms.gle/F9ZykAefJQ94n2Vc7"
                        icon={<ClipboardCheck size={16} />}
                        label="שאלון משוב" secondaryLabel="משוב לצורכי מחקר ושיפור הכלי"
                        noBorder
                        highlight={true}
                        colorScheme="amber" />
                      <ResourceLink href="https://github.com/YuvalShafriri/atar.bot-Icomos.Israel/blob/main/Bot-Brain-he.md"
                        icon={<Github size={16} />}
                        label="המוח של אתר.בוט"
                        secondaryLabel="מאגר קוד המקור והנחיות המערכת"
                        highlight={true}
                        noBorder
                        colorScheme="slate" />
                    </ResourceGroup>

                    <ResourceGroup title="מעבר לאתר.בוט - התאמה אישית">
                      <ResourceLink href="https://chatgpt.com/g/g-69492aebb530819199628bb444d024f3-svkn-lbnyyt-svkn-yqvmvs" icon={<Bot size={16} />} label="בניית סוכן (GPTs)" noBorder colorScheme="emerald" />
                      <ResourceLink
                        href="https://gemini.google.com/gem/1LbC3oHGIS83rP8uWdIEEeaU9_ixfEMh1?usp=sharing"
                        icon={<Zap size={16} />}
                        label={
                          <span className="flex items-center gap-2">
                            בניית סוכן (Gemini)
                            <span
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                window.open("https://gemini.google.com/gem/1No_FbNaQmz5khR51dl7NHFOXAFQ5x5Pu?usp=sharing", "_blank");
                              }}
                              className="text-[9.5px] text-slate-400 bg-emerald-50 px-1.5 py-0.5 rounded-md hover:bg-emerald-100 transition-colors cursor-pointer border border-emerald-200 shadow-sm"
                            >
                              דוגמה ליוצר תמונות מתיאור אדריכלי/ארכאולוגי
                            </span>
                          </span>
                        }
                        noBorder
                        colorScheme="emerald"
                      />
                    </ResourceGroup>

                    <SectionDivider label="השראה ומתודולוגיה" colorClass="text-emerald-500" bgColor="bg-slate-50/30" />

                    <div className="grid grid-cols-1 gap-2.5">
                      <ResourceLink href="https://gemini.google.com/share/673fdae83a26" icon={<PieChart size={16} />} label="ייצוג קצת אחרת" secondaryLabel="דוגמא לייצוג הערכה תרבותית כארטיפקט דיגיטלי" />

                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      <ResourceLink href="https://bit.ly/49huqGS" icon={<BookOpen size={16} />} label="אלכסון: עוד איבר של תודעה" secondaryLabel=" מאמר על חוויית המקום והתודעה בשילוב AI" colorScheme="emerald" highlight />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <footer className="bg-white border-t border-slate-200 p-2 shrink-0 flex items-center px-8 z-40 shadow-sm overflow-hidden text-slate-400" dir="rtl">
        <div className="flex-1"></div>
        <div className="text-[10px] font-bold opacity-80 whitespace-nowrap">
          אתר מידע לצרכי סדנאות אתר.בוט להערכת משמעות - בפיתוח פרופ"ח יעל אלף ויובל שפרירי
        </div>
      </footer>



      {/* [MA-RC] Inventory Instructions Modal */}
      <Modal
        isOpen={isInventoryModalOpen}
        onClose={() => { setIsInventoryModalOpen(false); window.location.hash = ''; }}
        title={
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-emerald-600 text-white rounded-lg shadow-sm"><Library size={18} /></div>
            <span className="text-lg font-black text-slate-900">{MARC_INSTRUCTIONS[inventoryModalLang].title}</span>
          </div>
        }
        maxWidth="max-w-4xl"
      >
        <div className="flex flex-col gap-4 pt-2">

          <div className={`space-y-6 ${inventoryModalLang === 'en' ? 'text-left' : 'text-right'}`} dir={inventoryModalLang === 'en' ? 'ltr' : 'rtl'}>
            <p className="text-sm font-bold text-slate-600 border-r-4 border-emerald-500 pr-4 italic leading-relaxed">
              {MARC_INSTRUCTIONS[inventoryModalLang].purpose}
            </p>

            {/* Vertical List Steps */}
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
                <pre className="px-6 pb-8 pt-0 font-mono text-sm md:text-base text-emerald-50 whitespace-pre-wrap leading-relaxed text-right overflow-y-auto max-h-[50vh] custom-scrollbar selection:bg-emerald-500/30">
                  {MARC_INSTRUCTIONS[inventoryModalLang].promptContent}
                </pre>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(MARC_INSTRUCTIONS[inventoryModalLang].promptContent || '')}
                className="absolute bottom-4 left-4 bg-white/10 hover:bg-emerald-600 text-white/70 hover:text-white backdrop-blur-sm border border-white/10 p-2 rounded-lg transition-all active:scale-95 group/btn flex items-center gap-2 font-bold text-[10px]"
                title="העתק ללוח"
              >
                <Copy size={14} className="group-hover/btn:scale-110 transition-transform" />
                <span>העתק פרומפט</span>
              </button>
            </div>

            {/* Example Link - NotebookLM */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 p-4 rounded-xl flex items-center justify-between gap-4 group cursor-pointer hover:shadow-md transition-all shadow-sm" onClick={() => window.open('https://gemini.google.com/share/7cf5304dbf7e', '_blank')}>
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
                {inventoryModalLang === 'he' ?
                  "הערה: מיני-סוכן זה מופעל רק כמשתמש מבקש 'בצע ניתוח אוסף'  אחרי שהעלה מידע על אוסף נכסים או הערכות למשל של סקר אזורי" :
                  "Note: This workflow is triggered only when atar.bot detects a collection of files (inventory) or when the user explicitly requests 'collection analysis'."
                }
              </p>
            </div>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isPromptModalOpen} onClose={() => { setIsPromptModalOpen(false); window.location.hash = ''; }} title="סדנת דיאלוג ופרומפטים חכמים" maxWidth="max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full max-h-[85vh]">
          <div className="flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-indigo-50 pb-2">
                <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-widest flex items-center gap-2"><FileCode size={12} /> שאילתה מייצגת להעתקה (Educational Prompt)</h3>
                <span className="text-[8px] bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded font-black uppercase tracking-tighter">דוגמה לדיאלוג אנושי-מכונה</span>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-0 shadow-2xl overflow-hidden flex flex-col group">
                <div className="flex items-center gap-3 p-3 bg-slate-900 border-b border-slate-800 shrink-0">
                  <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500/30"></div><div className="w-2.5 h-2.5 rounded-full bg-amber-500/30"></div><div className="w-2.5 h-2.5 rounded-full bg-emerald-500/30"></div></div>
                  <span className="text-[9px] font-mono text-slate-500 tracking-wider">workshop_sample_prompt.txt</span>
                </div>
                <div className="p-5 text-indigo-100 rounded-xl font-mono text-[11px] whitespace-pre-wrap select-all max-h-[50vh] overflow-auto custom-scrollbar leading-relaxed scroll-smooth text-right" dir="rtl">
                  {EDUCATIONAL_PROMPT}
                </div>
                <div className="p-2.5 bg-slate-900/50 flex items-center justify-center gap-3">
                  <button onClick={() => { navigator.clipboard.writeText(EDUCATIONAL_PROMPT); }} className="flex items-center gap-2 text-[9px] font-black text-slate-400 hover:text-indigo-400 transition-colors uppercase tracking-widest group/copy active:scale-95">
                    <Copy size={12} /><span>העתק שאילתה להדגמה</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-widest border-b border-indigo-50 pb-2">עקרונות דיאלוג (CBSA)</h3>
              <div className="grid grid-cols-1 gap-4">
                {DIALOGUE_PRINCIPLES.map((p, i) => (
                  <div key={i} className="flex gap-4 group bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                    <div className="shrink-0 w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 transition-all flex items-center justify-center text-xs font-black">{i + 1}</div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800 mb-0.5">{p.title}</h4>
                      <p className="text-[11px] text-slate-500 leading-tight font-medium">{p.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 flex flex-col gap-6 border border-slate-200 shadow-inner overflow-y-auto custom-scrollbar">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600 text-white rounded-lg shadow-md"><TerminalSquare size={20} /></div>
              <h3 className="font-black text-lg text-slate-900">בונה פנייה מותאמת (AI)</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">הזן את המטרה המחקרית שלך, והיועץ יבנה עבורך פנייה מקצועית המבוססת על מתודולוגיית CBSA והחוקים המופיעים בדוגמה.</p>

            <div className="relative">
              <textarea
                className="w-full h-32 p-4 bg-white rounded-2xl border border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-sm font-medium text-slate-700 placeholder:text-slate-300 resize-none shadow-sm"
                placeholder="למשל: 'אני רוצה להבין את הקשר בין המכונות לערך הטכנולוגי'..."
                value={consultationInput}
                onChange={(e) => setConsultationInput(e.target.value)}
              ></textarea>
              <button
                onClick={handleConsult}
                disabled={isConsulting || !consultationInput.trim()}
                className="absolute bottom-4 left-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white p-2.5 rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-2 font-black text-[11px]"
              >
                {isConsulting ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                <span>בנה פנייה</span>
              </button>
            </div>

            {consultationResult && (() => {
              const [promptText, explanationText] = consultationResult.includes('---PROMPT_BOUNDARY---')
                ? consultationResult.split('---PROMPT_BOUNDARY---')
                : [consultationResult, ''];

              const cleanPrompt = promptText.replace(/^```(markdown|json)?/g, '').replace(/```$/g, '').trim();

              return (
                <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                  {/* Prompt Section */}
                  <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800 text-right" dir="rtl">
                    <div className="bg-slate-800/50 p-2 border-b border-white/5 flex items-center justify-between">
                      <div className="flex gap-1.5 px-2">
                        <div className="w-2 h-2 rounded-full bg-red-400/20"></div>
                        <div className="w-2 h-2 rounded-full bg-amber-400/20"></div>
                        <div className="w-2 h-2 rounded-full bg-emerald-400/20"></div>
                      </div>
                      <button
                        onClick={() => navigator.clipboard.writeText(cleanPrompt)}
                        className="text-[10px] bg-white/10 hover:bg-white/20 text-indigo-200 hover:text-white px-2 py-1 rounded transition-all flex items-center gap-1.5 font-bold"
                      >
                        <Copy size={12} /> העתק פנייה
                      </button>
                    </div>
                    <pre className="p-4 text-xs md:text-sm text-indigo-50 font-mono whitespace-pre-wrap leading-relaxed selection:bg-indigo-500/30 max-h-60 overflow-y-auto custom-scrollbar text-right">
                      {cleanPrompt}
                    </pre>
                  </div>

                  {/* Explanation Section */}
                  {explanationText && (
                    <div className="bg-white p-4 rounded-xl border-l-4 border-indigo-500 shadow-sm text-xs text-slate-700 leading-relaxed">
                      <h4 className="font-bold text-slate-900 text-[11px] mb-1 flex items-center gap-2"><Sparkles size={12} className="text-indigo-500" /> דבר היועץ</h4>
                      {explanationText.trim()}
                    </div>
                  )}

                  <div className="flex justify-end pt-2">
                    <button onClick={() => setConsultationResult(null)} className="text-[10px] font-medium text-slate-400 hover:text-red-500 transition-colors">נקה תוצאות</button>
                  </div>
                </div>
              );
            })()}

            <div className="mt-auto pt-6 border-t border-slate-200">
              <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-4">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Info size={16} /></div>
                <p className="text-[10px] font-bold text-slate-500 leading-tight">זכרו: את הפרומפט שיווצר כאן יש להעתיק ולהדביק בממשק אתר.בוט המלא (ChatGPT/Gemini) כדי להתחיל את התהליך.</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isPrinciplesModalOpen} onClose={() => { setIsPrinciplesModalOpen(false); window.location.hash = ''; }} title="אז כיצד לעשות הערכה תרבותית בעידן שלנו?" maxWidth="max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 md:items-start text-right" dir="rtl">
          <div className="md:col-span-2 order-1 md:order-2">
            <h3 className="text-2xl font-bold text-slate-800 mb-4 md:-mt-2.5">אז כיצד לעשות הערכה תרבותית בעידן שלנו?</h3>
            <ul className="space-y-3 text-base mb-6 text-slate-700">
              <li className="flex gap-2"><span>•</span> <span>הערכת נכסי מורשת דורשת חשיבה היסטורית, ערכית וקהילתית. כלומר אנושית.</span></li>
              <li className="flex gap-2"><span>•</span> <span>AI יכול להוביל ל"מראית עין של חכמה" – ללא הבנה עמוקה.</span></li>
              <li className="flex gap-2"><span>•</span> <span>CBSA מחייבת אותך להיות נוכח – להבין הקשרים, לזהות ערכים, ולנסח משמעות.</span></li>
            </ul>
            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="p-3 font-bold uppercase bg-green-100 text-green-800 border-b border-slate-200">✅ עשה</th>
                    <th className="p-3 font-bold uppercase bg-red-100 text-red-800 border-b border-slate-200">❌ אל תעשה</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="bg-white hover:bg-slate-50 transition-colors">
                    <td className="p-4 border-b border-slate-100 border-l font-medium">השתמש בבוט כשותף קוגניטבי</td>
                    <td className="p-4 border-b border-slate-100 font-medium">אל תבקש מהבוט "לכתוב את כל ההערכה"</td>
                  </tr>
                  <tr className="bg-white hover:bg-slate-50 transition-colors">
                    <td className="p-4 border-b border-slate-100 font-medium">אל תעתיק מבלי לחשוב</td>
                  </tr>
                  <tr className="bg-white hover:bg-slate-50 transition-colors">
                    <td className="p-4 border-b border-slate-100 border-l font-medium">השתמש בו כדי לנסח שאלות חדשות</td>
                    <td className="p-4 border-b border-slate-100 font-medium">אל תדלג על שלב הניתוח שלך</td>
                  </tr>
                  <tr className="bg-white hover:bg-slate-50 transition-colors">
                    <td className="p-4 border-slate-100 border-l font-medium">היעזר ביכולות זיהוי התבניות  והניסוח של הבינה</td>
                    <td className="p-4 border-slate-100 font-medium">אך אל תוותר על ה"קול שלך"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="md:col-span-1 order-2 md:order-1 space-y-6">
            <div className="rounded-xl overflow-hidden shadow-lg border-4 border-white ring-1 ring-slate-200 bg-slate-50">
              <img src="https://alephplace.com/atar.bot/tamuz.jpg" alt="Work Principles" className="w-full h-auto object-cover" />
            </div>
            <blockquote className="bg-slate-50 p-5 rounded-2xl border-r-4 border-indigo-500 shadow-sm">
              <p className="italic text-slate-600 text-sm leading-relaxed font-medium">"סם לִשְׁכֵּחָה הוא זה, לא לִרְפוּאָה לַזִּכָּרוֹן. לא חָכְמָה אֶלָּא דְּמוּת-חָכְמָה יִרְכְּשׁו..."</p>
              <cite className="block not-italic mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">(המלך תמוז לאל תוֹת על המצאת הכתב – פיידרוס/אפלטון, 275a)</cite>
            </blockquote>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isDemoModalOpen} onClose={() => { setIsDemoModalOpen(false); window.location.hash = ''; }} title={<div className="flex items-center gap-2"><Eye size={20} className="text-indigo-600" /> <span className="mr-1">ניתוח חזותי באתר.בוט: של תמונת המצאת הכתב וה-AI</span></div>} maxWidth="max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start h-full">
          <div className="lg:col-span-5 space-y-6 order-1 lg:order-2 shrink-0">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-slate-200 bg-slate-50 flex items-center justify-center">
              <img src="https://alephplace.com/atar.bot/tamuz.jpg" alt="Detailed Visual Analysis Case" className="max-w-full max-h-[55vh] object-contain" />
            </div>
            <div className="bg-indigo-600 p-4 rounded-2xl shadow-xl border-b-4 border-indigo-800">
              <Quote size={20} className="text-indigo-400/40 mb-2" />
              <p className="italic text-white text-sm md:text-base leading-relaxed font-bold">"סם לִשְׁכֵּחָה הוא זה, לא לִרְפוּאָה לַזִּכָּרוֹן. לא חָכְמָה אֶלָּא דְּמוּת-חָכְמָה יִרְכְּשׁו..."</p>
              <div className="mt-3 pt-3 border-t border-white/20 flex justify-between items-center text-[10px] text-indigo-100 font-bold">
                <span>מתוך: המלך תמוז לאל תוֹת | פיידרוס | אפלטון</span>
                <div className="px-2 py-0.5 bg-white/20 rounded uppercase tracking-widest text-[8px]">AI Visual Decoding</div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-6 order-2 lg:order-1 flex flex-col h-full text-right">
            <div className="space-y-4">
              <p className="text-sm text-slate-600 leading-relaxed font-medium border-r-4 border-indigo-500 pr-4">להלן תוצאות הניתוח המבני שביצע אתר.בוט על הדימוי החזותי, תוך שימוש במתודולוגיית CBSA לזיהוי ערכים והקשרים.</p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-2">
                <div className="flex items-center gap-3 text-indigo-600 font-black text-sm border-b border-slate-50 pb-2"><Gem size={16} /> <span>1. ערכי מורשת שזוהו</span></div>
                <div className="space-y-2 text-sm leading-relaxed text-slate-700">
                  <p><b>ערך סמלי:</b> האיור מייצג את המתח המתמיד בין טכנולוגיה לזיכרון אנושי.</p>
                  <p><b>ערך חינוכי:</b> התמונה מנגישה דיון פילוסופי עמוק דרך הקשר מודרני של בינה מלאכותית.</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-2">
                <div className="flex items-center gap-3 text-emerald-600 font-black text-sm border-b border-slate-50 pb-2"><Layers size={16} /> <span>2. הערכת מצב חזותית</span></div>
                <div className="space-y-2 text-sm leading-relaxed text-slate-700">
                  <p><b>שכבות נראות:</b> שילוב של איקונוגרפיה מצרית עם דמות פילוסוף יווני קלאסי.</p>
                  <p><b>ניגודיות:</b> המגילה המוחשית מול מסך ה-ChatGPT מייצגת את השינוי במרקם הידע.</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-2">
                <div className="flex items-center gap-3 text-amber-600 font-black text-sm border-b border-slate-50 pb-2"><History size={16} /> <span>3. רמזי הקשר</span></div>
                <div className="space-y-2 text-sm leading-relaxed text-slate-700">
                  <p><b>הקשר תמאטי:</b> הדיאלוג עוסק ב"שכחה" (Forgetfulness) כנושא מרכזי.</p>
                  <p><b>מורשת בלתי מוחשית:</b> העברת ידע, מסורת שבעל-פה מול תיעוד חיצוני.</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-2">
                <div className="flex items-center gap-3 text-rose-600 font-black text-sm border-b border-slate-50 pb-2"><Search size={16} /> <span>4. השוואות ופערי מידע</span></div>
                <div className="space-y-2 text-sm leading-relaxed text-slate-700">
                  <p><b>השוואה:</b> התמונה מעגנת את ה-AI בתוך רצף היסטורי ארוך של חרדה טכנולוגית.</p>
                  <p className="italic text-slate-500">⚠️ <b>פערי מידע:</b> המקור המדויק אינו מופיע בדימוי (נוצר ב-AI).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {
        isGraphModalOpen && (
          <div
            className="fixed inset-0 bg-slate-900/35 backdrop-blur-sm z-[100] flex flex-col items-center justify-center p-2 animate-in fade-in duration-300"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) { setIsGraphModalOpen(false); window.location.hash = ''; }
            }}
          >
            <div className="bg-white w-full max-w-7xl h-full md:h-[95vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative border border-slate-800/20">
              <div className="p-3 md:p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-3"><Zap size={20} className="text-emerald-600" /><h2 className="text-lg font-black text-slate-900 leading-tight">גרף ידע אינטראקטיבי</h2></div>
                <button
                  onClick={() => { setIsGraphModalOpen(false); window.location.hash = ''; }}
                  className="px-2.5 py-2 hover:bg-slate-100 rounded-xl text-slate-500 transition-all flex items-center gap-2 border border-transparent hover:border-slate-200"
                  aria-label="סגור"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">סגור</span>
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 relative flex overflow-hidden">
                <div className={`w-full md:w-80 border-l border-slate-100 bg-slate-50/90 backdrop-blur-md transition-all absolute left-0 h-full z-20 overflow-y-auto ${selectedNodeDetails ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 shadow-none'}`}>
                  {selectedNodeDetails && (
                    <div className="p-5 space-y-4 text-right">
                      <div className="space-y-2">
                        <span
                          className="inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider text-slate-700"
                          style={{ backgroundColor: `${getNodeColor(selectedNodeDetails.type).background}33` }}
                        >
                          {TYPE_HE[selectedNodeDetails.type] || selectedNodeDetails.type}
                        </span>
                        <h3 className="text-xl font-black text-slate-900 leading-tight">{selectedNodeDetails.name || selectedNodeDetails.label}</h3>
                      </div>
                      <div className="h-px bg-slate-200 w-full"></div>
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 leading-none">משמעות תרבותית</h4>
                        <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm text-xs text-slate-700 leading-relaxed">
                          {selectedNodeDetails.meaning}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex-1 relative bg-slate-50/20">{isGraphLoading ? <div className="flex flex-col items-center justify-center h-full gap-2"><Loader2 size={32} className="animate-spin text-indigo-600" /><p className="text-lg font-black text-slate-900">יוצר גרף...</p></div> : <div ref={graphContainerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />}</div>
              </div>
            </div>
          </div>
        )
      }

      {
        selectedQuery && (
          <Modal
            isOpen={!!selectedQuery}
            onClose={() => setSelectedQuery(null)}
            title={selectedQuery.title}
            maxWidth="max-w-3xl"
          >
            <div className="space-y-6">
              <div className="bg-indigo-50 p-4 rounded-xl flex items-start gap-4 border border-indigo-100">
                <div className="p-2 bg-white text-indigo-600 rounded-xl shadow-sm shrink-0">
                  {selectedQuery.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{selectedQuery.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{selectedQuery.description}</p>
                </div>
              </div>

              {/* Standard Single Query Logic */}
              {!(selectedQuery as any).subQueries && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Terminal size={12} /> פרומפט להעתקה
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-slate-400 font-bold bg-slate-50 px-2 py-0.5 rounded border border-slate-100"> CBSA Methodology</span>
                    </div>
                  </div>
                  <div className="relative group/code">
                    <div className="bg-slate-950 rounded-2xl border border-slate-800 p-0 overflow-hidden shadow-xl">
                      <div className="bg-slate-900/50 p-3 border-b border-white/5 flex items-center justify-between">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20"></div>
                        </div>
                        <span className="text-[9px] font-mono text-slate-600">research_query.prompt</span>
                      </div>
                      <pre className="p-6 font-mono text-sm text-indigo-100/90 whitespace-pre-wrap leading-relaxed text-right overflow-y-auto max-h-[40vh] custom-scrollbar selection:bg-indigo-500/30">
                        {selectedQuery.prompt}
                      </pre>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(selectedQuery.prompt!);
                      }}
                      className="absolute top-4 left-4 bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 p-2 rounded-lg shadow-sm transition-all active:scale-95 group/btn flex items-center gap-2 font-bold text-[10px]"
                      title="העתק ללוח"
                    >
                      <Copy size={14} className="group-hover/btn:scale-110 transition-transform" />
                      <span>העתק</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Sub-Queries Logic (Reflective Voices) */}
              {(selectedQuery as any).subQueries && (
                <div className="space-y-8">
                  {(selectedQuery as any).subQueries.map((sub: any, idx: number) => (
                    <div key={idx} className="space-y-3">
                      <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                        <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">{sub.icon}</div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{sub.title}</h4>
                          <p className="text-[11px] text-slate-500">{sub.description}</p>
                        </div>
                      </div>

                      <div className="relative group/code">
                        <div className="bg-slate-950 rounded-xl border border-slate-800 p-0 overflow-hidden shadow-sm">
                          <div className="bg-slate-900/50 p-2.5 border-b border-white/5 flex items-center justify-between">
                            <span className="text-[9px] font-mono text-slate-600 flex items-center gap-2"><Terminal size={10} /> prompt</span>
                          </div>
                          <pre className="p-4 font-mono text-xs md:text-sm text-indigo-100/90 whitespace-pre-wrap leading-relaxed text-right overflow-y-auto max-h-[200px] custom-scrollbar selection:bg-indigo-500/30">
                            {sub.prompt}
                          </pre>
                        </div>
                        <button
                          onClick={() => navigator.clipboard.writeText(sub.prompt)}
                          className="absolute top-3 left-3 bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 p-1.5 rounded-md shadow-sm transition-all active:scale-95 group/btn flex items-center gap-1.5 font-bold text-[10px]"
                          title="העתק ללוח"
                        >
                          <Copy size={12} className="group-hover/btn:scale-110 transition-transform" />
                          <span>העתק</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 flex items-center gap-3">
                <Info size={14} className="text-slate-400" />
                <p className="text-[10px] text-slate-500 font-medium leading-tight">
                  טיפ: העתק את הפרומפט והדבק אותו בחלון השיחה שלך באתר.בוט בשלב הרלוונטי, מומלץ בעיקר לגבי שלב 2 - ניתוח ערכים, ו 5 הצהרת-המשמעות.              </p>
              </div>
            </div>
          </Modal>
        )
      }

      {/* NEW: Knowledge Graph Input Modal */}
      <Modal isOpen={isGraphInputModalOpen} onClose={() => { setIsGraphInputModalOpen(false); window.location.hash = ''; }} title="יצירת גרף ידע (Knowledge Graph)" maxWidth="max-w-2xl">
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
                onClick={() => setKgInputText(DEMO_DATA)}
                className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <FileText size={14} /> טען: תחנת הקמח
              </button>
              <button
                onClick={() => setKgInputText(ZAIRA_TEXT)}
                className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <BookOpen size={14} /> טען: העיר זאירה
              </button>
            </div>
            <textarea
              className="w-full h-48 p-4 bg-white rounded-xl border border-slate-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-sm leading-relaxed text-slate-700 placeholder:text-slate-300 resize-none shadow-inner font-sans"
              placeholder="הדבק כאן את הטקסט שברצונך לנתח..."
              value={kgInputText}
              onChange={(e) => setKgInputText(e.target.value)}
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                setIsGraphInputModalOpen(false);
                generateKnowledgeGraph();
              }}
              disabled={!kgInputText.trim()}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg hover:shadow-emerald-200 transition-all active:scale-95"
            >
              <Zap size={18} />
              <span>צור גרף ידע</span>
            </button>
          </div>
        </div>
      </Modal>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes bounce-subtle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        .animate-bounce-subtle { animation: bounce-subtle 2s infinite ease-in-out; }
        .custom-scrollbar-right::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar-right::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar-right::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}} />
    </div >
  );
};

export default App;
