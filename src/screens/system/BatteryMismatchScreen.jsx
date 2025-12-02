import React, { useEffect } from "react";

const evzStyles = `
:root {
  --evz-primary: #03cd8c;
  --evz-accent: #f77f00;
  --evz-bg: #ffffff;
  --evz-surface-soft: #f2f2f2;
  --evz-text-primary: #111827;
  --evz-text-secondary: #6b7280;
  --evz-border-subtle: rgba(15, 23, 42, 0.08);
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--evz-bg);
}

.evz-app {
  min-height: 100vh;
  background-color: var(--evz-bg);
  display: flex;
  justify-content: center;
  align-items: stretch;
  color: var(--evz-text-primary);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Inter", "SF Pro Text", sans-serif;
}

.evz-screen {
  width: 100%;
  max-width: 420px;
  min-height: 100vh;
  padding: 24px 20px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.evz-header {
  padding-bottom: 4px;
}

.evz-header-title {
  font-size: 22px;
  font-weight: 800;
  margin: 0 0 2px;
}

.evz-header-subtitle {
  font-size: 13px;
  color: var(--evz-text-secondary);
  margin: 0;
}

.evz-divider {
  height: 1px;
  width: 100%;
  background-color: #e5e7eb;
  margin: 12px 0 10px;
}

.evz-main {
  padding-top: 4px;
}

.evz-card-warning {
  border-radius: 16px;
  background-color: #fff7f0;
  border: 1px solid var(--evz-accent);
  padding: 12px 14px 10px;
}

.evz-card-title {
  font-size: 13px;
  font-weight: 800;
}

.evz-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}

.evz-row-label {
  font-size: 13px;
  color: var(--evz-text-secondary);
}

.evz-row-value {
  font-size: 13px;
  text-align: right;
}

.evz-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 2px 10px;
  font-size: 12px;
  font-weight: 600;
  min-width: 0;
}

.evz-chip-expected {
  background-color: #a6a6a6;
  color: #ffffff;
}

.evz-chip-scanned {
  background-color: var(--evz-accent);
  color: #ffffff;
}

.evz-caption {
  font-size: 11px;
  color: var(--evz-text-secondary);
  margin-top: 8px;
}

.evz-footer {
  margin-top: auto;
  padding-top: 18px;
}

.evz-footer-row {
  display: flex;
  gap: 8px;
}

.evz-btn-primary,
.evz-btn-secondary,
.evz-btn-ghost {
  border-radius: 999px;
  padding: 11px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
}

.evz-btn-primary {
  flex: 1;
  background-color: var(--evz-accent);
  color: #ffffff;
  box-shadow: 0 10px 22px rgba(247, 127, 0, 0.32);
}

.evz-btn-primary:active {
  transform: translateY(1px);
  box-shadow: 0 6px 14px rgba(247, 127, 0, 0.28);
}

.evz-btn-secondary {
  flex: 1;
  background-color: #ffffff;
  color: var(--evz-text-primary);
  border-color: #a6a6a6;
}

.evz-btn-secondary:hover {
  background-color: #f9fafb;
}

.evz-btn-ghost {
  flex: 1;
  background: none;
  color: var(--evz-accent);
}

.evz-btn-ghost:hover {
  text-decoration: underline;
}

/* Responsive styles for 320px - 420px range */
@media (max-width: 420px) {
  .evz-screen {
    max-width: 100%;
    padding: 20px 16px 16px;
  }
  
  .evz-header-title {
    font-size: 20px;
  }
  
  .evz-header-subtitle {
    font-size: 12px;
  }
}

@media (max-width: 370px) {
  .evz-screen {
    padding: 18px 14px 14px;
  }
  
  .evz-header-title {
    font-size: 19px;
  }
  
  .evz-header-subtitle {
    font-size: 11px;
  }
}

@media (max-width: 360px) {
  .evz-screen {
    padding: 16px 12px 12px;
  }
  
  .evz-header-title {
    font-size: 18px;
  }
  
  .evz-header-subtitle {
    font-size: 11px;
  }
}

@media (max-width: 340px) {
  .evz-screen {
    padding: 16px 10px 10px;
  }
  
  .evz-header-title {
    font-size: 17px;
  }
  
  .evz-header-subtitle {
    font-size: 10px;
  }
}

@media (max-width: 320px) {
  .evz-screen {
    padding: 14px 8px 8px;
  }
  
  .evz-header-title {
    font-size: 16px;
  }
  
  .evz-header-subtitle {
    font-size: 10px;
  }
}
  
  .evz-header-title {
    font-size: 16px;
  }
  
  .evz-header-subtitle {
    font-size: 10px;
  }
}
`;

const SELF_NS = "evz.self.";

function useEvzStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = "evz-mobile-styles-p27-s03";
    // Remove existing style element if it exists
    const existing = document.getElementById(styleId);
    if (existing) {
      existing.remove();
    }
    
    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = evzStyles;
    document.head.appendChild(style);
    
    // Cleanup: remove styles when component unmounts
    return () => {
      const styleEl = document.getElementById(styleId);
      if (styleEl) {
        styleEl.remove();
      }
    };
  }, []);
}

function safeLocalStorage() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function getItem(ns, key, d = "") {
  const ls = safeLocalStorage();
  if (!ls) return d;
  try {
    return ls.getItem(ns + key) || d;
  } catch {
    return d;
  }
}

function useParams() {
  if (typeof window === "undefined") {
    return { phase: "return", expected: "", scanned: "" };
  }
  const qs = new URLSearchParams(window.location.search);
  const phaseRaw = (qs.get("phase") || "return").toLowerCase();
  const phase = phaseRaw === "new" ? "new" : "return";
  const expected = qs.get("expected") || "";
  const scanned = qs.get("scanned") || "";
  return { phase, expected, scanned };
}

function goTo(path) {
  if (typeof window === "undefined") return;
  window.location.assign(path);
}

function EvzScreen({ children }) {
  return (
    <div className="evz-app">
      <div className="evz-screen">{children}</div>
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div className="evz-row">
      <span className="evz-row-label">{label}</span>
      <span className="evz-row-value">{children}</span>
    </div>
  );
}

export default function BatteryMismatchScreen() {
  useEvzStyles();

  const { phase, expected: pExp, scanned: pScn } = useParams();

  const fallbackExpected =
    phase === "new" ? "" : getItem(SELF_NS, "returnBatteryId", "");
  const fallbackScanned =
    phase === "new" ? getItem(SELF_NS, "newBatteryId", "") : "";

  const expected = pExp || fallbackExpected || "—";
  const scanned = pScn || fallbackScanned || "—";

  const title =
    phase === "new" ? "New battery mismatch" : "Returned battery mismatch";
  const rescanHref =
    phase === "new" ? "/swap/self/scan-new" : "/swap/self/scan-return";
  const manualHref =
    phase === "new"
      ? "/swap/self/battery-unreadable?phase=new"
      : "/swap/self/battery-unreadable?phase=return";
  const backHref =
    phase === "new" ? "/swap/self/collect" : "/swap/self/insert-return";

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">{title}</h1>
        <p className="evz-header-subtitle">
          The scanned ID doesn&apos;t match what we expected for this step.
        </p>
      </header>

      <div className="evz-divider" />

      <main className="evz-main">
        <section className="evz-card-warning">
          <div className="evz-card-title">Details</div>
          <Row label="Expected">
            <span className="evz-chip evz-chip-expected">{expected}</span>
          </Row>
          <Row label="Scanned">
            <span className="evz-chip evz-chip-scanned">{scanned}</span>
          </Row>
          <p className="evz-caption">
            Make sure you scanned the correct pack. If the label is damaged,
            enter the ID manually.
          </p>
        </section>
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-row">
          <a href={rescanHref} className="evz-btn-primary">
            Rescan
          </a>
          <a href={manualHref} className="evz-btn-secondary">
            Enter manually
          </a>
        </div>
        <div className="evz-footer-row" style={{ marginTop: 8 }}>
          <a href="/help/contact" className="evz-btn-secondary">
            Get help
          </a>
          <button
            type="button"
            className="evz-btn-ghost"
            onClick={() => goTo("/booking/cancel")}
          >
            Cancel swap
          </button>
        </div>
        <a
          href={backHref}
          className="evz-btn-ghost"
          style={{ marginTop: 8 }}
        >
          Back
        </a>
      </footer>
    </EvzScreen>
  );
}

/**
 * Manual test cases:
 * 1) ?phase=return&expected=BAT-215B&scanned=BAT-999X → mismatch shows; Rescan → /swap/self/scan-return; Enter manually → /swap/self/battery-unreadable?phase=return.
 * 2) ?phase=new&scanned=BAT-874A → mismatch shows with Expected blank; Rescan → /swap/self/scan-new; Enter manually → /swap/self/battery-unreadable?phase=new.
 * 3) Back: return-phase → /swap/self/insert-return; new-phase → /swap/self/collect. Get help / Cancel swap act accordingly.
 * 4) Mobile fit: 360x780 → no horizontal scroll.
 * 5) Without query params but with localStorage set: evz.self.returnBatteryId / evz.self.newBatteryId are used as fallbacks for Expected/Scanned respectively.
 */
