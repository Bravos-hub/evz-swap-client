import React, { useEffect, useMemo, useState } from "react";

const evzStyles = `
:root {
  --evz-primary: #03cd8c;
  --evz-accent: #f77f00;
  --evz-bg: #f5f7fb;
  --evz-surface: #ffffff;
  --evz-surface-soft: #edf1f9;
  --evz-text-primary: #111827;
  --evz-text-secondary: #6b7280;
  --evz-border-subtle: rgba(15, 23, 42, 0.08);
}

body {
  margin: 0;
  padding: 0;
  background: var(--evz-bg);
}

.evz-app {
  min-height: 100vh;
  background: var(--evz-bg);
  display: flex;
  justify-content: center;
  align-items: stretch;
  color: var(--evz-text-primary);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Inter", "SF Pro Text", sans-serif;
}

.evz-screen {
  width: 100%;
  max-width: 430px;
  min-height: 100vh;
  padding: 24px 20px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.evz-header {
  padding-bottom: 10px;
}

.evz-header-title {
  font-size: 22px;
  font-weight: 800;
  margin: 0 0 4px;
}

.evz-header-subtitle {
  font-size: 13px;
  color: var(--evz-text-secondary);
  margin: 0;
}

.evz-content {
  flex: 1;
  padding-top: 10px;
  padding-bottom: 10px;
}

.evz-footer {
  padding-top: 12px;
}

.evz-field-stack {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.evz-label {
  font-size: 13px;
  font-weight: 600;
}

.evz-input {
  border-radius: 12px;
  border: 1px solid var(--evz-border-subtle);
  padding: 10px 12px;
  font-size: 14px;
}

.evz-input:focus {
  outline: none;
  border-color: rgba(3, 205, 140, 0.8);
  box-shadow: 0 0 0 1px rgba(3, 205, 140, 0.1);
}

.evz-helper {
  min-height: 16px;
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-helper--error {
  color: #dc2626;
}

.evz-footer-row {
  display: flex;
  gap: 8px;
}

.evz-button {
  flex: 1;
  border-radius: 999px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.evz-button--secondary {
  background-color: transparent;
  color: var(--evz-accent);
}

.evz-button--secondary:hover {
  text-decoration: underline;
}

.evz-button--primary {
  background-color: var(--evz-primary);
  color: #ffffff;
  box-shadow: 0 10px 22px rgba(3, 205, 140, 0.32);
}

.evz-button--primary:active {
  transform: translateY(1px);
  box-shadow: 0 6px 14px rgba(3, 205, 140, 0.28);
}

.evz-button--disabled {
  opacity: 0.45;
  cursor: default;
  pointer-events: none;
  box-shadow: none;
}

@media (max-width: 375px) {
  .evz-screen {
    padding-inline: 16px;
  }
}
`;

function useEvzStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = "evz-mobile-styles-p08-s03";
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

function EvzScreen({ children }) {
  return (
    <div className="evz-app">
      <div className="evz-screen">{children}</div>
    </div>
  );
}

export default function StationIdentifyCodeScreen({ nextPath = "/swap/self/locker" }) {
  useEvzStyles();

  const [code, setCode] = useState("");
  const trimmed = useMemo(() => code.trim().toUpperCase(), [code]);
  const isValid = useMemo(
    () => /^[A-Z0-9-]{4,}$/.test(trimmed),
    [trimmed]
  );

  const handleContinue = (e) => {
    if (!isValid) {
      e.preventDefault();
      return;
    }

    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("evz.self.stationCode", trimmed);
        window.localStorage.setItem("evz.self.identMethod", "code");
        window.localStorage.setItem("evz.self.verified", "true");
      }
    } catch {
      // ignore
    }
  };

  const helperText =
    code.length > 0 && !isValid
      ? "Use letters/digits, min 4 chars"
      : "";

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Enter station code</h1>
        <p className="evz-header-subtitle">
          The code is printed on the kiosk panel (e.g., EVSP05)
        </p>
      </header>

      <main className="evz-content">
        <div className="evz-field-stack">
          <label className="evz-label" htmlFor="station-code">
            Station code
          </label>
          <input
            id="station-code"
            className="evz-input"
            placeholder="EVSP05"
            value={code}
            maxLength={16}
            onChange={(e) => setCode(e.target.value)}
          />
          <div
            className={
              "evz-helper" +
              (code.length > 0 && !isValid ? " evz-helper--error" : "")
            }
          >
            {helperText || "\u00a0"}
          </div>
        </div>
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-row">
          <a
            href="/swap/self/station-scan"
            className="evz-button evz-button--secondary"
          >
            Back to scan
          </a>
          <a
            href={isValid ? nextPath : "#"}
            onClick={handleContinue}
            aria-disabled={!isValid}
            className={
              "evz-button evz-button--primary" +
              (!isValid ? " evz-button--disabled" : "")
            }
          >
            Continue
          </a>
        </div>
      </footer>
    </EvzScreen>
  );
}
