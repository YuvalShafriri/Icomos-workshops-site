import React, { useMemo, useState } from "react";
import { MOBILE_SECTIONS, MobileItem, MobileSection } from "./mobileLibraryData";

function useHash(): string {
  const [h, setH] = React.useState<string>(() =>
    typeof window === "undefined" ? "" : window.location.hash
  );

  React.useEffect(() => {
    const onChange = () => setH(window.location.hash);
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return h || "";
}

function fullUrl(): string {
  if (typeof window === "undefined") return "";
  // Build a safe URL using sanitized hash to avoid DOM-XSS flows
  try {
    const h = window.location.hash || "";
    const safeHash = sanitizeHash(h);
    return `${window.location.origin}${window.location.pathname}${safeHash}`;
  } catch {
    return window.location.href;
  }
}

function sanitizeHash(h: string) {
  if (!h) return "";
  // Allow only URL-safe characters in the hash fragment to mitigate DOM-based XSS
  return "#" + h.replace(/^#/, "").replace(/[^A-Za-z0-9-_.~!$&'()*+,;=:@%/?#\[\]]+/g, "");
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function matchItem(q: string, s: MobileSection, it: MobileItem) {
  if (!q) return true;
  const hay = `${s.title} ${it.title} ${it.description ?? ""}`.toLowerCase();
  return hay.includes(q.toLowerCase());
}

type Props = {
  onOpenDesktop: () => void;
  onBackToAuto: () => void;
  preference: "auto" | "mobile" | "desktop";
};

export default function MobileLibraryMode(props: Props) {
  const hash = useHash();
  const [q, setQ] = useState("");
  const [copied, setCopied] = useState<"ok" | "fail" | "">("");

  const filtered = useMemo(() => {
    return MOBILE_SECTIONS
      .map((s) => ({
        ...s,
        items: s.items.filter((it) => matchItem(q, s, it)),
      }))
      .filter((s) => s.items.length > 0);
  }, [q]);

  const isDeepLink = hash.length > 1;

  if (isDeepLink) {
    const safeHash = sanitizeHash(hash);

    return (
      <div className="min-h-screen bg-white text-slate-900" dir="rtl">
        <div className="max-w-xl mx-auto px-4 py-6 space-y-4">
          <div className="space-y-1">
            <h1 className="text-xl font-semibold">תצוגת מובייל (שער)</h1>
            <p className="text-sm text-slate-600">
              פתחת קישור ישיר למסך <span className="font-mono">{safeHash}</span>. למסכים המלאים מומלץ דסקטופ.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 p-4 space-y-3">
            <button
              className="w-full rounded-lg bg-slate-900 text-white py-3 text-base"
              onClick={props.onOpenDesktop}
            >
              פתח תצוגת דסקטופ למסך הזה
            </button>

            <button
              className="w-full rounded-lg border border-slate-300 py-3 text-base"
              onClick={async () => {
                const ok = await copyText(fullUrl());
                setCopied(ok ? "ok" : "fail");
                window.setTimeout(() => setCopied(""), 1500);
              }}
            >
              העתק קישור להמשך במחשב
            </button>

            <button
              className="w-full rounded-lg border border-slate-300 py-3 text-base"
              onClick={() => {
                window.location.hash = "";
              }}
            >
              חזור לספריית המשאבים
            </button>

            {copied === "ok" && <div className="text-sm text-emerald-700">הקישור הועתק</div>}
            {copied === "fail" && (
              <div className="text-sm text-rose-700">לא הצלחתי להעתיק. אפשר להעתיק ידנית משורת הכתובת.</div>
            )}
          </div>

          <button className="text-sm text-slate-600 underline" onClick={props.onBackToAuto}>
            חזרה למצב אוטומטי
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900" dir="rtl">
      <div className="max-w-xl mx-auto px-4 py-6 space-y-4">
        <header className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold">מאגר משאבים לסדנה</h1>
              <p className="text-sm text-slate-600">מובייל מציג גרסת ספרייה. לעבודה מעמיקה עדיף מחשב.</p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                className="rounded-lg bg-slate-900 text-white px-3 py-2 text-sm"
                onClick={props.onOpenDesktop}
              >
                תצוגת דסקטופ
              </button>

              <button
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                onClick={props.onBackToAuto}
              >
                אוטומטי
              </button>
            </div>
          </div>

          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="חיפוש מהיר במשאבים ובשאילתות"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base"
          />
        </header>

        <main className="space-y-3">
          {filtered.map((section) => (
            <details key={section.title} className="rounded-xl border border-slate-200 p-3" open>
              <summary className="cursor-pointer select-none text-base font-semibold">{section.title}</summary>

              <div className="mt-3 space-y-2">
                {section.items.map((it) => (
                  <a
                    key={it.title}
                    href={it.href}
                    className="block rounded-lg border border-slate-200 p-3 active:scale-[0.99]"
                  >
                    <div className="text-base font-medium">{it.title}</div>
                    {it.description && <div className="text-sm text-slate-600 mt-1">{it.description}</div>}

                    <div className="text-xs text-slate-500 mt-2">
                      {it.kind === "hash" ? "מסך פנימי (מומלץ דסקטופ)" : "קישור חיצוני"}
                    </div>
                  </a>
                ))}
              </div>
            </details>
          ))}
        </main>

        <footer className="pt-2 text-xs text-slate-500">טיפ: אפשר לפתוח במובייל, להעתיק קישור, ולהמשיך במחשב.</footer>
      </div>
    </div>
  );
}
