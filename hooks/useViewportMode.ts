import { useCallback, useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "./useMediaQuery";

export type ViewMode = "mobile" | "desktop";
export type ViewPreference = "auto" | ViewMode;

const STORAGE_KEY = "icomos_view_preference";
const MOBILE_QUERY = "(max-width: 640px)";

function readQueryPreference(): ViewPreference | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const v = p.get("view"); // view=mobile|desktop|auto
  if (v === "mobile" || v === "desktop" || v === "auto") return v;
  return null;
}

function readStoredPreference(): ViewPreference {
  if (typeof window === "undefined") return "auto";
  const v = window.localStorage.getItem(STORAGE_KEY);
  if (v === "mobile" || v === "desktop" || v === "auto") return v;
  return "auto";
}

export function useViewportMode() {
  const isNarrow = useMediaQuery(MOBILE_QUERY);

  const [preference, setPreferenceState] = useState<ViewPreference>(() => {
    return readQueryPreference() ?? readStoredPreference();
  });

  const mode: ViewMode = useMemo(() => {
    if (preference === "mobile") return "mobile";
    if (preference === "desktop") return "desktop";
    return isNarrow ? "mobile" : "desktop";
  }, [preference, isNarrow]);

  const setPreference = useCallback((p: ViewPreference) => {
    setPreferenceState(p);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, p);
    }
  }, []);

  const resetPreference = useCallback(() => {
    setPreferenceState("auto");
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "auto");
    }
  }, []);

  // Query param override on load
  useEffect(() => {
    const qp = readQueryPreference();
    if (qp) setPreferenceState(qp);
  }, []);

  return { mode, preference, setPreference, resetPreference, isNarrow };
}
