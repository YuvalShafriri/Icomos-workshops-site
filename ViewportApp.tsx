import React from "react";
import App from "./App";
import { useViewportMode } from "./hooks/useViewportMode";
import MobileLibraryMode from "./components/mobile/MobileLibraryMode";

export default function ViewportApp() {
  const { mode, preference, setPreference, resetPreference } = useViewportMode();

  if (mode === "mobile") {
    return (
      <MobileLibraryMode
        preference={preference}
        onOpenDesktop={() => setPreference("desktop")}
        onBackToAuto={resetPreference}
      />
    );
  }

  return <App />;
}
