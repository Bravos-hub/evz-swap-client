import React, { useEffect, useMemo, useState } from "react";

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
  padding-bottom: 8px;
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

.evz-card {
  border-radius: 16px;
  background-color: var(--evz-surface-soft);
  padding: 12px 14px 12px;
}

.evz-field {
  margin-bottom: 10px;
}

.evz-label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 4px;
}

.evz-select,
.evz-input,
.evz-textarea {
  width: 100%;
  border-radius: 12px;
  border: 1px solid var(--evz-border-subtle);
  padding: 8px 10px;
  font-size: 14px;
  box-sizing: border-box;
}

.evz-textarea {
  resize: vertical;
  min-height: 96px;
}

.evz-select:focus,
.evz-input:focus,
.evz-textarea:focus {
  outline: none;
  border-color: rgba(3, 205, 140, 0.9);
  box-shadow: 0 0 0 1px rgba(3, 205, 140, 0.08);
}

.evz-helper {
  margin-top: 3px;
  font-size: 11px;
  min-height: 14px;
  color: var(--evz-text-secondary);
}

.evz-helper--error {
  color: #b91c1c;
}

.evz-footer {
  margin-top: auto;
  padding-top: 20px;
}

.evz-footer-row {
  display: flex;
  gap: 8px;
}

.evz-btn-secondary,
.evz-btn-primary {
  flex: 1;
  border-radius: 999px;
  padding: 11px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
}

.evz-btn-secondary {
  border-color: #a6a6a6;
  background-color: #ffffff;
  color: var(--evz-text-primary);
}

.evz-btn-secondary:hover {
  background-color: #f9fafb;
}

.evz-btn-primary {
  border-color: transparent;
  background-color: var(--evz-accent);
  color: #ffffff;
  box-shadow: 0 10px 22px rgba(247, 127, 0, 0.32);
}

.evz-btn-primary--disabled {
  background-color: #a6a6a6;
  box-shadow: none;
  cursor: default;
}

.evz-btn-primary:active:not(.evz-btn-primary--disabled) {
  transform: translateY(1px);
  box-shadow: 0 6px 14px rgba(247, 127, 0, 0.28);
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

const TICKETS_KEY = "evz.support.tickets";

function useEvzStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = "evz-mobile-styles-p20-s03";
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

function safeLocalStorage() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function getJSON(key, fallback = []) {
  const ls = safeLocalStorage();
  if (!ls) return fallback;
  try {
    const raw = ls.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setJSON(key, value) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    ls.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

function getStr(key, fallback = "") {
  const ls = safeLocalStorage();
  if (!ls) return fallback;
  try {
    return ls.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

function goTo(path) {
  if (typeof window === "undefined") return;
  window.location.assign(path);
}

export default function ReportIssueScreen() {
  useEvzStyles();

  const [cat, setCat] = useState("station");
  const [stationCode, setStationCode] = useState("");
  const [desc, setDesc] = useState("");
  const [email, setEmail] = useState(() => getStr("evz.profile.email", ""));

  const canSubmit = useMemo(
    () => !!cat && desc.trim().length >= 10,
    [cat, desc]
  );

  const descTooShort = desc.length > 0 && desc.trim().length < 10;

  const handleSubmit = () => {
    if (!canSubmit) return;

    const ticket = {
      id: "TKT-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
      ts: Date.now(),
      category: cat,
      stationCode: stationCode.trim() || null,
      desc: desc.trim(),
      email: email.trim() || null,
    };

    const list = getJSON(TICKETS_KEY, []);
    list.push(ticket);
    setJSON(TICKETS_KEY, list);

    if (typeof window !== "undefined") {
      window.alert(`Ticket created: ${ticket.id}`);
    }

    goTo("/help");
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Report an issue</h1>
        <p className="evz-header-subtitle">We’ll use this to investigate</p>
      </header>

      <div className="evz-divider" />

      <main>
        <section className="evz-card">
          <div className="evz-field">
            <label className="evz-label" htmlFor="evz-report-cat">
              Category
            </label>
            <select
              id="evz-report-cat"
              className="evz-select"
              value={cat}
              onChange={(e) => setCat(e.target.value)}
            >
              <option value="station">Station hardware</option>
              <option value="payment">Payment</option>
              <option value="app">App bug</option>
              <option value="account">Account</option>
            </select>
          </div>

          <div className="evz-field">
            <label className="evz-label" htmlFor="evz-report-station">
              Station code (optional)
            </label>
            <input
              id="evz-report-station"
              className="evz-input"
              placeholder="EVSP05"
              value={stationCode}
              onChange={(e) => setStationCode(e.target.value)}
            />
          </div>

          <div className="evz-field">
            <label className="evz-label" htmlFor="evz-report-desc">
              Describe the issue
            </label>
            <textarea
              id="evz-report-desc"
              className="evz-textarea"
              placeholder="What happened, where, and any error codes…"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <div
              className={
                "evz-helper" + (descTooShort ? " evz-helper--error" : "")
              }
            >
              {descTooShort
                ? "Please add at least 10 characters"
                : " "}
            </div>
          </div>

          <div className="evz-field">
            <label className="evz-label" htmlFor="evz-report-email">
              Your email (optional)
            </label>
            <input
              id="evz-report-email"
              className="evz-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </section>
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-row">
          <button
            type="button"
            className="evz-btn-secondary"
            onClick={() => goTo("/help")}
          >
            Back
          </button>
          <button
            type="button"
            className={
              "evz-btn-primary" + (!canSubmit ? " evz-btn-primary--disabled" : "")
            }
            disabled={!canSubmit}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </footer>
    </EvzScreen>
  );
}
