
import React from 'react';
import {
  ShieldCheck,
  Network,
  Gem,
  Puzzle,
  Scale,
  Scroll,
  SearchCheck,
  Box,
  Zap,
  MessageSquare,
  BookOpen,
  Library
} from 'lucide-react';
import { AgentConfig, SupportAgent } from './types';

export const MODEL_NAME = 'gemini-3-flash-preview';

export const DIALOGUE_PRINCIPLES = [
  {
    title: "הגדרת זהות ומטרה",
    description: "בכל פנייה, הגדירו לבוט תפקיד מקצועי (למשל: יועץ שימור או חוקר היסטורי). אל תשאלו שאלות כלליות, אלא הגדירו משימה ברורה מול נתוני האתר."
  },
  {
    title: "הזרקת הקשר מבוסס ראיות",
    description: "העבירו לבוט רק עובדות שמצאתם בתיעוד (מאפיינים פיזיים, ציר זמן). אל תתנו לו 'להשלים פערים' מהידע הכללי שלו - כוונו אותו להשתמש במידע שהזרקתם."
  },
  {
    title: "מנגנון בקרה ועצירה",
    description: "דרשו מהבוט לתאר מה הבין מההנחיה ולחכות לאישורכם לפני תחילת העבודה. זהו הכלל החשוב ביותר למניעת הזיות נתונים (Hallucinations)."
  }
];

export const PROMPT_ADVISOR_SYSTEM = `
אתה 'ארכיטקט דיאלוג' (Dialogue Architect) מומחה למורשת תרבותית. תפקידך לסייע לחוקר לנסח פנייה (Prompt) מקצועית עבור אתר.בוט המלא.

עקרונות חובה:
1. **ביקורתיות ומקצועיות**: אם המשתמש מבקש "המלצות", "שימור", "תוכנית עבודה" או החלטות סופיות על סמך מידע חלקי (כמו בדמו), **אסור** לספק פנייה שמבטיחה זאת. זה לא מקצועי. במקום זאת, נסח פנייה שמבקשת "זיהוי ערכים", "מיפוי רגישויות", "ניתוח משמעויות" או "העלאת דילמות" כתמיכה בקבלת החלטות.
2. **מבנה הפלט**: הפלט שלך חייב להיות מופרד לשני חלקים בדיוק כך (השתמש במפריד המדויק):

[תוכן הפרומפט להעתקה בלבד]
---PROMPT_BOUNDARY---
[הסבר קצר למשתמש (בעברית) על הבחירה המקצועית שעשית בפרומפט, ומדוע]

3. **הפרומפט להעתקה**: חייב להיות קצר, מקצועי, ללא כותרות, פונה לבוט בגוף שני ("פעל כיועץ..."), ומסתיים בשאלת עצירה.
`;

export const DEMO_DATA = `שם האתר: תחנת הקמח "הטוחן הישן" (The Old Miller's Flour Mill)
מיקום: גדת נחל הירקון, תל אביב.
שנת הקמה משוערת: 1922.

תיאור פיזי:
מבנה תעשייתי בן 3 קומות עשוי לבני סיליקט וכורכר. הגג קרס בחלקו הדרומי. בתוך המבנה נותרו שרידים של מכונות גריסה גרמניות מקוריות (חברת 'Amme, Giesecke & Konegen'). החלונות המקומרים אטומים בבלוקים משנות ה-70. בחצר המבנה צומחים עצי אקליפטוס עתיקים ששורשיהם מאיימים על היסודות.

היסטוריה ידועה:
הוקמה על ידי יצחק גרינברג כחלק מהניסיון לתיעוש עברי בשנות ה-20. 
בשנות ה-40 שימשה התחנה כסליק נשק של ההגנה (יש שמועות על מרתף נסתר, אך לא נמצאו ראיות).
בשנות ה-50 המקום ננטש והפך למחסן חומרי בניין.
כיום המקום נטוש ומגודר, אך משמש כמקום מפגש לא רשמי לאמני גרפיטי.

סוגיות חברתיות:
השכונה החדשה שנבנית מסביב (מגדלי יוקרה) לוחצת להרוס את המבנה לטובת "ריאה ירוקה" או חניון.
מצד שני, קבוצת תושבים ותיקים טוענת שזהו השריד האחרון לתעשייה המוקדמת באזור.`;

export const ZAIRA_TEXT = `רק לשווא, הו קובלאי רחב־הלב, אנסה לתאר באוזניך את העיר זאָירָה שחומותיה נשגבות. יכולתי לספר לך כמה מדרגות מרכיבות את הרחובות העשויים כסולמות, באי־אלו לוחות־אבץ מכוסים הגגות; אלא שכבר ידעתי שיהיה זה כמו לא לומר לך דבר. לא מאלה עשויה העיר, אלא מהיחסים בין מידות־חֲלָלָה לבין אירועי־עֲבָרָה: המרחק מהקרקע אל הפנס ואל רגליו של גזלן שנִתְלָה; החוט המתוח מהפנס אל מעקה־המרפסת שממול והסרטים אשר קישטו את הדרך בה עברה תהלוכת־הנישואין של המלכה; גובה המעקה וקפיצתו של המאהב שמדלג עליו עם שחר; נטייתו של מרזב ועליו צעידתו של חתול המִשְׁתָחֵל לתוך אותו חלון; מסלולי־הירי של ספינת־התותחים שהופיעה לפתע והפגז ההורס את המרזב; הקרעים ברשתות־הדיג ושלושת הזקנים היושבים על הרציף ומתקנים את הרשתות ובו־בזמן מספרים זה לזה בפעם המאה את סיפור ספינת־התותחים של הגזלן, שעליו אומרים כי היה בן־נאפופיה של המלכה עם מאהבה, ושננטש, בחיתוליו, שם על הרציף.
הלאה מִגַל־הזיכרונות הזורם הזה נושמת העיר כמו ספוג ותופחת. תיאור של זאָירָה כפי שהיא כיום חייב היה להכיל בתוכו את כל עברה. אולם העיר אינה אומרת את עברה, אלא מכילה אותו כאילו היה רשת קווים של כף־יד, והוא כתוב בְקַרְנוֹת־הרחוב, בסורגי־החלונות, במעקות גרמי־המדרגות, במוטות קוֹלְטֵי־הבְּרָקים, בניסי־הדגלים, וכל קטע מחורט כל כולו בבוא תורו, בִשְׂריטות, בְנִיסורים, בחיתוכים, בִפְסִיקים.`;

export const GRAPH_PROMPT = (input: string, cumulative: string) => `
Analyze the provided text to generate a Knowledge Graph based on the Context-Based Significance Assessment (CBSA) methodology.
Input: ${input}
Cumulative Context: ${cumulative}

OBJECTIVE:
Map the complex web of significance by identifying key entities, values, and context anchors.

RULES:
1. Return ONLY a valid JSON object.
2. Structure: { "nodes": [ { "id": "string", "name": "Hebrew Display Name", "type": "English Type Token", "meaning": "Hebrew explanation (5-12 words)" } ], "edges": [ { "from": "id", "to": "id", "label": "relationship_verb" } ] }
3. SELECTION LOGIC: Select 10-15 key nodes. Prioritize:
   - Entities carrying values (Value Carriers)
   - Major places/structures/events
   - Context anchors (Geographic, Social, Political)
   - Social actors
   - Up to 3 abstract cultural values
4. "type" MUST be one of:
   - Physical/Spatial: "place", "structure", "architectural_element", "natural_phenomenon"
   - Human/Social: "person", "social_group", "religion"
   - Temporal/Events: "event", "historical_period", "collective_memory"
   - Cultural/Abstract: "cultural_value", "narrative", "tradition", "artwork"
5. "meaning": Use Hebrew to explain the entity's heritage significance in this specific context.
6. "label": Relationships should use lowercase English verbs (e.g., "located_in", "expresses", "commemorates").
`;

export const PROMPT_TEMPLATES: Record<number, (input: any) => string> = {
  0: (input) => `SYSTEM PROMPT: CBSA Stage 0 — Pre-check. 
Identify gaps in the data provided. 
MANDATORY: End with "האם לעבור לשלב 1 - מחלץ ההקשרים?"
Input: ${input}`,
  1: (input) => `Stage 1: Context Extractor. Build timeline and context reciprocity. 
MANDATORY: End with "האם לעבור לשלב 2 - מזקק הערכים?"
Raw: ${input.raw}, Cumulative: ${input.cumulative}`,
  2: (input) => `Stage 2: Value Purifier. Extract heritage values and attributes. 
MANDATORY: End with "האם לעבור לשלב 3 - בוחן השלמות?"
Raw: ${input.raw}, Cumulative: ${input.cumulative}`,
  3: (input) => `Stage 3: Integrity Examiner. Analyze authenticity and integrity via Nara Grid. 
MANDATORY: End with "האם לעבור לשלב 4 - שוקל ומשווה?"
Raw: ${input.raw}, Cumulative: ${input.cumulative}`,
  4: (input) => `Stage 4: Comparative Balancer. Perform comparative evaluation. 
MANDATORY: End with "האם לעבור לשלב 5 - סינתיסייזר המשמעויות?"
Raw: ${input.raw}, Cumulative: ${input.cumulative}`,
  5: (input) => `Stage 5: Significance Synthesizer. Formulate the Statement of Significance. 
MANDATORY: End with "האם לעבור לשלב 6 - מבקר האיכות?"
Raw: ${input.raw}, Cumulative: ${input.cumulative}`,
  6: (input) => `Stage 6: Quality Auditor. Final audit and assessment wrap. 
MANDATORY: Summarize the process and suggest the next professional action in the field.
Raw: ${input.raw}, Cumulative: ${input.cumulative}`
};

export const PROMPT_PREVIEWS_EN: Record<number, string> = {
  0: `SYSTEM PROMPT: Stage 0 — Pre-check & Data Inventory
PERSONA: 'The Gatekeeper'.
PURPOSE: Confirm asset-specific evidence exists before proceeding to evaluation.
STRUCTURE:
1. Summary (≤120 words): describe uploaded material scope and period.
2. Checklist (6 rows): Location & Setting, Function, Evolution, Contexts, Physicality, Finds.
3. Gap List: Bullets on missing/ambiguous data. Label source as Asset-specific vs General.
4. Data Suggestions: 2-4 concrete asks for completion.
5. Timeline Rule: MANDATORY - Flag every dated event for Stage 1.
6. Stop Question: Approve moving to Stage 1?`,

  1: `SYSTEM PROMPT: Stage 1 — Contexts & Asset Description
PERSONA: 'The Context Extractor'.
STRUCTURE:
1. Narrative Task (~280 words): founders, original function, evolution summary.
2. Attribute & Condition Dossier: Form, structure, materials, technology, stability/defects.
3. Timeline Table: Date/Range | Functional Change | Fabric Change | Source (CRITICAL).
4. Context Paragraphs: Apply Context Reciprocity (Evaluative Two-Way).
   - Geographic, Landscape, Urban, Historical, Social, Political, Technological, Environmental, Intangible, Thematic.
5. Context Summary Bullets: ≤9-word site-specific qualifiers.`,

  2: `SYSTEM PROMPT: Stage 2 — Value Analysis
PERSONA: 'The Value Purifier'.
STRUCTURE:
1. Values Analysis (4-6 bullets, ~400 words):
   - Format: [Value Type] — [Value Meaning-Title].
   - Mystery & Enigma Rule: Distinguish routine gaps from uncertainty that sustains meaning.
   - Value Dynamics: Identify Cohesion or Tension between identified values.
2. Unified Attribute-Value-Meaning-Consequence Table:
   - Mandatory Traceability: Every value from 2.0 must appear here.
   - Consequence: Clear impact on Significance.
3. Workshop Challenge: Questions on value tensions or stakeholder viewpoints.`,

  3: `SYSTEM PROMPT: Stage 3 — Authenticity & Integrity
PERSONA: 'The Integrity Examiner'.
STRUCTURE:
1. Nara Grid (MANDATORY):
   - Aspects: Form & Design, Material & Substance, Use & Function, Location & Setting.
   - Grading: High / Medium / Low / Lost independently per row.
   - Value Expression: Link each row back to Stage 2 values.
2. Integrity Narrative: Analysis of dilemmas, losses, or reinforcing factors.
3. Regional Note: Local frameworks and authenticity priorities.`,

  4: `SYSTEM PROMPT: Stage 4 — Comparative Evaluation
PERSONA: 'The Comparative Balancer'.
STRUCTURE:
1. Comparative Set: Minimum 2 comparable sites (geographic, typologic, or thematic).
2. Criteria Analysis: Period, Rarity, Documentation, Ensemble, Condition, Research Potential.
3. Synthesis Paragraph: Distinctiveness relative to comparanda.
4. Stop Question: Proceed to Stage 5?`,

  5: `SYSTEM PROMPT: Stage 5 — Cultural Significance Statement
PERSONA: 'The Significance Synthesizer'.
STRUCTURE:
1. Significance Statement (3-5 paragraphs, ≤300 words):
   - MANDATORY OPENING: Weave together Contexts (S1), Values (S2), Integrity (S3), and Distinctiveness (S4).
   - Coherence Analysis: How these elements form a unified cultural interpretation.
2. Optional Tracks Menu:
   - Knowledge Graph (KG): Interactive entity mapping.
   - Semiotic Reading: Symbols, metaphors, and cultural codes.
   - Educational/Community Ideas.
   - Alternative Narrative Framings.`,

  6: `SYSTEM PROMPT: Stage 6 — Assessment Wrap (Audit)
PERSONA: 'The Quality Auditor'.
STRUCTURE:
1. Strengths: 2-3 sentences on confirmed core values.
2. Boost Table (≤3 rows): Small tweaks for impact (Quick Wins).
3. Next Steps: Concrete actions to complete/refine the study.
4. Professional Practice Note: Offer region-specific framework review.
5. Workshop Challenge: Questions on collaboration and standards navigation.`
};

export const PROMPT_TRANSLATIONS: Record<number, string> = {
  0: `פרומפט מערכת: שלב 0 — בדיקה מקדימה של פערי המידע
פרסונה: 'מנהל הדאטא של האינוונטר'.
מבנה פלט חובה:
1. סיכום (עד 120 מילים): תיאור החומרים, היקף וסוג הנכס.
2. טבלת בדיקה (6 שורות): מיקום, תפקוד, אבולוציה, הקשרים, פיזיקה, ממצאים.
3. רשימת פערים: פירוט מידע חסר או מעורפל. סיווג מקורות לנכס ספציפי מול כללי.
4. הצעות לנתונים: 2-4 בקשות קונקרטיות להשלמה (תמונות, תוכניות, ראיונות).
5. כלל ציר הזמן: חובה לסמן כל אירוע מתוארך לקראת שלב 1.
6. שאלת עצירה: אישור מעבר לשלב 1?`,

  1: `פרומפט מערכת: שלב 1 — תיאור והקשרים
פרסונה: 'המתכנן והחוקרים (מתעד /ארכאולוג) '.
מבנה פלט חובה:
1. משימה נרטיבית (~280 מילים): מייסדים, תפקוד מקורי, סיכום אבולוציה.
2. דוסייר מאפיינים ומצב: צורה, מבנה, חומרים, טכנולוגיה, יציבות ופגמים.
3. טבלת ציר זמן: תאריך | שינוי תפקודי | שינוי פיזי | מקור.
4. פסקאות הקשר: יישום 'אפקט ההקשר' (Context Reciprocity) דו-כיווני.
   - גאוגרפי, נופי, אורבני, היסטורי, חברתי, פוליטי, טכנולוגי, סביבתי, בלתי-מוחשי.
5. סיכום הקשרים: הגדרות תמציתיות של עד 9 מילים.
6. שאלה למחשבה: העמקה בנושא ההקשרים במיוחד עבור הקשרים לא מובנים מאליהם`
  ,

  2: `פרומפט מערכת: שלב 2 — ניתו הערכים
פרסונה: 'מומחה הערכה תרבותית ומנהל נכסי מורשת'.
מבנה פלט חובה:
1. ניתוח ערכים (4-6 בולטים, כ-400 מילים):
   - פורמט: [סוג הערך] — [משמעות הערך באתר].
   - כלל מסתורין (Mystery & Enigma): הבחנה בין פערי מידע טכניים לבין אי-וודאות המזינה את המשמעות התרבותית.
   - דינמיקת ערכים: זיהוי לכידות (Cohesion) או מתח (Tension) בין הערכים.
2. טבלה מאוחדת (מאפיין-ערך-משמעות-השלכה):
   - עקיבות חובה: כל ערך מסעיף 2.0 חייב להופיע בטבלה.
   - קישור מאפיינים לסוגי שינוי (חומר, שימוש, הקשר וכו').
3. שאלות למחשבה:המצא שאלות למשל על מתחי ערכים או נקודות מבט של מחזיקי עניין.`,

  3: `פרומפט מערכת: שלב 3 — מבחן האותנטיות והשלמות
פרסונה: 'משמר מומחה ואדריכל'.
מבנה פלט חובה:
1. טבלת נארה (Nara Grid - חובה):
   - היבטים: צורה ועיצוב, חומר ומהות, שימוש ותפקוד, מיקום והקשר.
   - דירוג: גבוה / בינוני / נמוך / אבוד לכל שורה בנפרד.
   - ביטוי ערכי: קישור כל שורה לערכים משלב 2.
2. נרטיב שלמות: ניתוח דילמות, אובדן משמעותי או גורמים מחזקים.
3. הערה אזורית: סקירת עקרונות אותנטיות לפי מסגרות עבודה מקומיות.
4. שאלות למחשבה:המצא שאלות למשל על דילמות שימוריות בין שלבים שונים.`,



  4: `פרומפט מערכת: שלב 4 — השוואה לנכסים אחרים
פרסונה: 'חוקר טיפולוגיות אדריכליות ומנהל מורשת'.
מטרה: השוואה לנכסים דומים ברמה מקומית ובינלאומית תוך שימוש בקריטריוני השוואה.
מבנה פלט חובה:
1. סט השוואתי: לפחות 2 אתרים דומים (גאוגרפית, טיפולוגית או תמטית).
2. ניתוח קריטריונים: תקופה, נדירות, תיעוד, קשר למכלול, מצב פיזי, פוטנציאל מחקרי.
3. פסקת סינתזה: הגדרות ייחודיות ביחס לקבוצת ההשוואה.
4. שאלות למחשבה:המצא שאלות למשל על ייחוד הנכס לעומת היותו מייצג בטיפולוגיה.`
  ,


  5: `פרומפט מערכת: שלב 5 — סיתנזה והצהרת משמעות
פרסונה: 'מתכנן השימור + הארכאולוג/המתעד'.
מבנה פלט חובה (נאמנות מלאה לפרוטוקול):
1. הצהרת משמעות (3-5 פסקאות, עד 300 מילים):
   - פסקת פתיחה מנדטורית: שזירה מפורשת של הקשרים (S1), ערכים (S2), שלמות (S3) וייחודיות (S4).
   - ניתוח הלכידות: כיצד המרכיבים מתגבשים לפרשנות תרבותית מאוחדת ורציפה.
2. שאלות למחשבה - אודות נרטיבים חלופיים, מהם המשמעויות הבולטות ואיך ההקשרים קבעו אותם   
3. תפריט מסלולים אופציונליים:
   - גרף ידע (KG): מיפוי אינטראקטיבי של ישויות וקשרים.
   - קריאה סמיוטית: ניתוח סמלים, מטאפורות וקודים תרבותיים.
   - רעיונות לחינוך וקהילה.
   - נרטיבים חלופיים.`,

  6: `פרומפט מערכת: שלב 6 — בקרת איכות התהליך
פרסונה: 'איש הדאטה, מנהל המורשת וכל הפרסונות בתהליך'.
מבנה פלט חובה:
1. סיכום הערכה: תמצית נקודות החוזק שאוששו (2-3 משפטים).
2. טבלת שדרוג (Boost Table): שינויים קטנים בעלי השפעה משמעותית (ניצחונות מהירים).
3. צעדים הבאים: פעולות קונקרטיות להשלמת או טיוב המחקר.
4. הערה מקצועית: סקירת מסגרות עבודה ספציפיות לאזור המקצועי.
5.  שאלות מחשבה:  בעיקר בהקשר ליכולת המסמך לתמוך בהחלטה.`,
};

export const CORE_AGENTS: AgentConfig[] = [
  { id: 0, name: "0 - בדיקת מידע מקדימה", role: "בדיקת פערי המידע שהועלה", color: "slate", icon: <ShieldCheck size={20} /> },
  { id: 1, name: "1 - תיאור והקשרים", role: "תיאור, ציר זמן וניתוח הקשרים", color: "blue", icon: <Network size={20} /> },
  { id: 2, name: "2 - ניתוח הערכים", role: "זיהוי משמעות וערכי מורשת", color: "amber", icon: <Gem size={20} /> },
  { id: 3, name: "3 - מבחן האותנטיות והשלמות", role: "אותנטיות ומצב פיזי", color: "emerald", icon: <Puzzle size={20} /> },
  { id: 4, name: "4 - השוואה לנכסים אחרים", role: "קריטריוני השוואה ביחס לנכסים אחרים", color: "indigo", icon: <Scale size={20} /> },
  { id: 5, name: "5 - סינתזה והצהרת משמעות", role: "גיבוש הצהרת משמעות", color: "purple", icon: <Scroll size={20} /> },
  { id: 6, name: "6 - בקרת איכות התהליך ", role: "ביקורת לוגית וסיכום פערים", color: "rose", icon: <SearchCheck size={20} /> }
];

export const SUPPORT_AGENTS: SupportAgent[] = [
  { id: 'img', name: "ניתוח חזותי", icon: <Box size={16} /> },
  { id: 'know', name: "גרף ידע", icon: <Zap size={16} /> },
  { id: 'narr', name: "נרטיבים חלופיים", icon: <BookOpen size={16} /> },
  { id: 'coll', name: "ניתוח אוסף", icon: <Library size={16} /> },
  { id: 'sent', name: "ערכי קהילה וסנטימנט", icon: <MessageSquare size={16} /> },
];

export const STEP_DETAILS: Record<number, {
  whyImportant: string;
  whatHappens: string[];
  cognitiveLink: string;
  promptSummary: string;
  extensions?: { name: string; url: string; description: string }[];
}> = {
  0: {
    whyImportant: "שלב זה משמש כ'שער כניסה' - מוודא שיש מספיק מידע לפני שמתחילים בניתוח. מניעת ניתוח על בסיס מידע חסר או לא מבוסס.",
    whatHappens: [
      "סריקת החומרים שהועלו לזיהוי סוג ומקור",
      "רשימת בדיקה של 6 נקודות: מיקום, תפקוד, ציר זמן, הקשרים, תיאור פיזי, ממצאים",
      "זיהוי פערי מידע ספציפיים וסיווגם",
      "הצעות קונקרטיות להשלמת מידע חסר"
    ],
    cognitiveLink: "נקודת פתיחה - אין שלבים קודמים. פערים שמזוהים כאן יסומנו לאורך כל התהליך.",
    promptSummary: "סרוק את החומרים, בדוק 6 קטגוריות חובה, רשום פערים ספציפיים, והצע מקורות להשלמה."
  },
  1: {
    whyImportant: "בונה את המסגרת הפרשנית - איפה, מתי, ובאילו יחסים הנכס קיים. זהו הבסיס לכל הניתוח שיבוא.",
    whatHappens: [
      "תיאור נרטיבי של הנכס (~280 מילים)",
      "בניית ציר זמן מפורט עם מקורות",
      "זיהוי הקשרים חשובים (למשל: גאוגרפי, היסטורי, חברתי, טכנולוגי)",
      "הפעלת עקרון 'אפקט ההקשר' - איך ההקשר מסגר משמעות ולהיפך"
    ],
    cognitiveLink: "בונה על שלב 0: משתמש בחומרים שנסרקו, מסמן פערים שזוהו בציר הזמן.",
    promptSummary: "תאר את הנכס, בנה ציר זמן, נתח הקשרים דו-כיווניים והגדר קשרים ספציפיים לאתר."
  },
  2: {
    whyImportant: "הליבה של הערכת המשמעות - מתרגם את ההקשרים והמאפיינים הפיזיים למשמעויות תרבותיות מוגדרות.",
    whatHappens: [
      "זיהוי ערכי האתר המשמעותיים (למשל: היסטורי, אסתטי, חברתי, טכנולוגי)",
      "לכל ערך: ראיות (מאפיינים) → הקשר → ערך → משמעות",
      "בניית טבלת מאפיין-ערך-משמעות-השלכה (מה יקרה אם הערך ייפגע)",
      "זיהוי דינמיקת ערכים: לכידות או מתח?"
    ],
    cognitiveLink: "הקשרים משלב 1 הופכים ל'עדשות' דרכן מזהים ערכים. ציר הזמן מזין ערכים היסטוריים.",
    promptSummary: "זהה ערכי מורשת, בנה טבלת מאפיינים-ערכים, ונתח דינמיקה בין הערכים השונים."
  },
  3: {
    whyImportant: "בודק את מצב העדויות בשטח - שלמותן (אינטגריטי) ואותנטיות (קרבה למקור). האם המאפיינים עדיין קיימים ויכולים לבטא את הערכים?",
    whatHappens: [
      "טבלת NARA: צורה, חומר, שימוש, סביבה",
      "דירוג לכל היבט: גבוה / בינוני / נמוך / אבוד",
      "קישור כל היבט לערכים משלב 2",
      "זיהוי מה נשמר, מה השתנה, מה אבד"
    ],
    cognitiveLink: "שואל: האם העדויות הפיזיות עדיין מאפשרות לבטא את הערכים משלב 2? ציר הזמן משלב 1 מסביר מתי התרחשו שינויים.",
    promptSummary: "בנה טבלת נארה, דרג אותנטיות לכל היבט, וקשר בחזרה לערכים שזוהו."
  },
  4: {
    whyImportant: "מכייל את המשמעות - האם הנכס ייחודי או נציג? באיזה קנה מידה: מקומי, אזורי, לאומי?",
    whatHappens: [
      "זיהוי נכסי השוואה רלוונטיים (לפחות 2)",
      "מטריצת השוואה: תקופה, נדירות, תיעוד, מצב",
      "ניתוח מה מייחד את הנכס ביחס להשוואות",
      "כיול רמת המשמעות: מקומית, אזורית, לאומית"
    ],
    cognitiveLink: "האם הערכים משלב 2 מתבטאים כאן יותר/פחות מבנכסים דומים? האם האותנטיות משלב 3 מייחדת?",
    promptSummary: "השווה לנכסים דומים, נתח קריטריונים, והגדר את הייחודיות של הנכס."
  },
  5: {
    whyImportant: "מאחד את כל הניתוח לנרטיב משמעות קוהרנטי - התשובה לשאלה 'למה ומה לשמר?'",
    whatHappens: [
      "הצהרת משמעות של 3-5 פסקאות (~300 מילים)",
      "שזירת הקשרים, ערכים, אותנטיות וייחודיות",
      "ניתוח לכידות - כיצד המרכיבים יוצרים משמעות ביחד",
      "הצעת מסלולים אופציונליים להעמקה"
    ],
    cognitiveLink: "נקודת המפגש של שלבים 1-4. לא סיכום - אלא סינתזה שמראה איך האלמנטים יוצרים משמעות ביחד.",
    promptSummary: "כתוב הצהרת משמעות שמשלבת את כל השלבים הקודמים לנרטיב אחד קוהרנטי.",
    extensions: [
      { name: "גרף ידע", url: "graph-create", description: "מיפוי ישויות וקשרים" },
      { name: "קריאה סמיוטית", url: "q-semiotics", description: "סמלים וקודים תרבותיים" },
      { name: "נרטיבים חלופיים", url: "q-narratives", description: "פרשנויות ונקודות מבט" },
      { name: "רעיונות חינוכיים", url: "q-education", description: "הנגשה ותוכן קהילתי" },
      { name: "ערכי קהילה", url: "q-sentiment", description: "סנטימנט ומחזיקי עניין" },
      { name: "ליצן החצר", url: "q-jester", description: "אתגור הנחות יסוד" }
    ]
  },
  6: {
    whyImportant: "וידוא שההערכה הייתה קפדנית ושקופה. זיהוי חוזקות ופערים - לא המלצות לשימור!",
    whatHappens: [
      "סיכום חוזקות ההערכה (2-3 משפטים)",
      "טבלת שיפורים קטנים (עד 3 שורות)",
      "צעדים הבאים קונקרטיים (1-2)",
      "הערת פרקטיקה מקצועית"
    ],
    cognitiveLink: "בודק: האם הסינתזה משלב 5 נתמכת? האם היינו קפדניים לאורך כל השלבים? האם צריך לחזור?",
    promptSummary: "בצע ביקורת על התהליך, זהה נקודות חוזק וחולשה, והצע צעדים הבאים."
  }
};
