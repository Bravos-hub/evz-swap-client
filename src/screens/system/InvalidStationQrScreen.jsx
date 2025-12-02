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

.evz-card-list {
  margin: 6px 0 0 18px;
  padding: 0;
}

.evz-card-list-item {
  margin-bottom: 2px;
}

.evz-card-text {
  font-size: 13px;
  color: var(--evz-text-secondary);
}

.evz-payload-label {
  display: block;
  margin-top: 10px;
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-payload-box {
  margin-top: 4px;
  padding: 6px 8px;
  border-radius: 8px;
  background-color: var(--evz-surface-soft);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 12px;
  word-break: break-all;
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
  width: 100%;
  margin-top: 8px;
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

function useEvzStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = "evz-mobile-styles-p27-s01";
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

function useQueryRaw() {
  if (typeof window === "undefined") return "";
  const qs = new URLSearchParams(window.location.search);
  return qs.get("raw") || "";
}

function EvzScreen({ children }) {
  return (
    <div className="evz-app">
      <div className="evz-screen">{children}</div>
    </div>
  );
}

export default function InvalidStationQrScreen() {
  useEvzStyles();
  const raw = useQueryRaw();

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Invalid station QR</h1>
        <p className="evz-header-subtitle">
          We couldn&apos;t read that code. Try again or enter the station code.
        </p>
      </header>

      <div className="evz-divider" />

      <main className="evz-main">
        <section className="evz-card-warning">
          <div className="evz-card-title">What to do</div>
          <ul className="evz-card-list">
            <li className="evz-card-list-item">
              <span className="evz-card-text">Clean the QR label and try again.</span>
            </li>
            <li className="evz-card-list-item">
              <span className="evz-card-text">
                Ensure good lighting and hold the camera steady.
              </span>
            </li>
            <li className="evz-card-list-item">
              <span className="evz-card-text">
                If it still fails, enter the station code printed on the kiosk panel.
              </span>
            </li>
          </ul>
          {raw && (
            <>
              <span className="evz-payload-label">Scanned payload</span>
              <div className="evz-payload-box">{raw}</div>
            </>
          )}
        </section>
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-row">
          <a
            href="/swap/self/station-scan"
            className="evz-btn-primary"
          >
            Rescan
          </a>
          <a
            href="/swap/self/station-code"
            className="evz-btn-secondary"
          >
            Enter code
          </a>
        </div>
        <a href="/swap/self/safety" className="evz-btn-ghost">
          Back
        </a>
      </footer>
    </EvzScreen>
  );
}

/**
 * Manual test cases:
 * 1) With ?raw=badcontent → payload box shows the raw value.
 * 2) Rescan → /swap/self/station-scan; Enter code → /swap/self/station-code; Back → /swap/self/safety.
 * 3) Mobile fit: 360x780 → no horizontal scroll.
 * 4) Without ?raw= → no "Scanned payload" section rendered.
 */
