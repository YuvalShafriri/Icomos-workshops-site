export type MobileItem = {
  title: string;
  description?: string;
  href: string; // external URL or "#hash"
  kind?: "external" | "hash";
};

export type MobileSection = {
  title: string;
  items: MobileItem[];
};

export const MOBILE_SECTIONS: MobileSection[] = [
  {
    title: "עיקרי הדברים",
    items: [
      { title: "שלבי CBSA (0-6)", description: "מסגרת השלבים", href: "#step-0", kind: "hash" },
      { title: "כלים", description: "מסך כלים", href: "#tools", kind: "hash" },
    ],
  },
  {
    title: "שאילתות לדוגמה",
    items: [
      { title: "נרטיבים חלופיים", href: "#q-narratives", kind: "hash" },
      { title: "סנטימנט קהילתי", href: "#q-sentiment", kind: "hash" },
      { title: "חינוך והמסרה", href: "#q-education", kind: "hash" },
      { title: "ניתוח סמיוטי", href: "#q-semiotics", kind: "hash" },
      { title: "ליצן החצר", href: "#q-jester", kind: "hash" },
      { title: "מקהלה יוונית", href: "#q-chorus", kind: "hash" },
      { title: "ליצן החצר + מקהלה יוונית", href: "#q-jester-chorus", kind: "hash" },
    ],
  },
  {
    title: "גרף ידע וויזואל",
    items: [
      { title: "יצירת גרף ידע", href: "#graph-create", kind: "hash" },
      { title: "תצוגת גרף", href: "#graph", kind: "hash" },
      { title: "ויזואל", href: "#visual", kind: "hash" },
    ],
  },
];
