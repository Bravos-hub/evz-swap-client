import React, { useEffect, useState } from "react";

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
  max-width: 430px;
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

.evz-card-text {
  font-size: 13px;
  color: var(--evz-text-secondary);
  margin-top: 4px;
}

.evz-card-caption {
  font-size: 11px;
  color: var(--evz-text-secondary);
  margin-top: 8px;
}

.evz-card-confirm {
  border-radius: 16px;
  background-color: var(--evz-surface-soft);
  padding: 12px 14px 10px;
  margin-top: 12px;
}

.evz-input-label {
  font-size: 13px;
  font-weight: 700;
}

.evz-input-field {
  width: 100%;
  margin-top: 6px;
  border-radius: 999px;
  border: 1px solid var(--evz-border-subtle);
  padding: 9px 14px;
  font-size: 14px;
  box-sizing: border-box;
  outline: none;
}

.evz-input-field:focus {
  border-color: var(--evz-primary);
}

.evz-actions-row {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

.evz-footer {
  margin-top: auto;
  padding-top: 18px;
}

.evz-btn-primary,
.evz-btn-secondary,
.evz-btn-text {
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

.evz-btn-primary:disabled {
  opacity: 0.6;
  cursor: default;
  box-shadow: none;
}

.evz-btn-primary:active:not(:disabled) {
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

.evz-btn-text {
  width: 100%;
  margin-top: 8px;
  background: none;
  color: var(--evz-accent);
}

.evz-btn-text:hover {
  text-decoration: underline;
}

.evz-export-note {
  font-size: 11px;
  color: var(--evz-text-secondary);
  margin-top: 6px;
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
    const styleId = "evz-mobile-styles-p28-s03";
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

function snapshot(prefix = "evz.") {
  const out = { ts: Date.now(), keys: {} };
  const ls = safeLocalStorage();
  if (!ls) return out;
  try {
    for (let i = 0; i < ls.length; i += 1) {
      const k = ls.key(i);
      if (k && k.startsWith(prefix)) {
        out.keys[k] = ls.getItem(k);
      }
    }
  } catch {
    // ignore
  }
  return out;
}

function download(filename, data) {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  try {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch {
    // ignore
  }
}

function purge(prefix = "evz.") {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    const toDel = [];
    for (let i = 0; i < ls.length; i += 1) {
      const k = ls.key(i);
      if (k && k.startsWith(prefix)) toDel.push(k);
    }
    toDel.forEach((k) => ls.removeItem(k));
  } catch {
    // ignore
  }
}

function goTo(href) {
  if (typeof window === "undefined") return;
  window.location.assign(href);
}

function EvzScreen({ children }) {
  return (
    <div className="evz-app">
      <div className="evz-screen">{children}</div>
    </div>
  );
}

export default function DeleteAccountScreen({ afterHref = "/start/language" }) {
  useEvzStyles();

  const [typed, setTyped] = useState("");
  const [exported, setExported] = useState(false);

  const ok = typed.trim().toUpperCase() === "DELETE";

  const onExport = () => {
    const data = snapshot();
    download("EVZ-your-data.json", data);
    setExported(true);
  };

  const onDelete = () => {
    if (!ok) return;
    purge();
    goTo(afterHref);
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Delete account</h1>
        <p className="evz-header-subtitle">
          This removes app data on this device
        </p>
      </header>

      <div className="evz-divider" />

      <main className="evz-main">
        <section className="evz-card-warning">
          <div className="evz-card-title">Warning</div>
          <p className="evz-card-text">
            This action deletes your local EVzone data (profile, vehicles,
            wallet, bookings, sessions, preferences). You may still have data
            on the server if you linked an account.
          </p>
          <p className="evz-card-caption">
            For a server-side deletion request, please contact support.
          </p>
        </section>

        <section className="evz-card-confirm">
          <div className="evz-input-label">Type DELETE to confirm</div>
          <input
            className="evz-input-field"
            placeholder="DELETE"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
          />
          <div className="evz-actions-row">
            <button
              type="button"
              className="evz-btn-secondary"
              onClick={onExport}
            >
              Export data
            </button>
            <button
              type="button"
              className="evz-btn-primary"
              disabled={!ok}
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
          {exported && (
            <div className="evz-export-note">Data export downloaded.</div>
          )}
        </section>
      </main>

      <footer className="evz-footer">
        <button
          type="button"
          className="evz-btn-text"
          onClick={() => goTo("/account")}
        >
          Cancel
        </button>
      </footer>
    </EvzScreen>
  );
}

/**
 * Manual test cases:
 * 1) Type anything other than DELETE → Delete button remains disabled.
 * 2) Click Export data → a JSON file 'EVZ-your-data.json' downloads with a
 *    snapshot of localStorage keys prefixed by 'evz.'; info text appears
 *    under the buttons.
 * 3) Type DELETE (any case) → Delete enabled; clicking deletes all
 *    localStorage keys starting with 'evz.' and routes to '/start/language'.
 * 4) Cancel → navigates back to '/account'.
 * 5) Mobile view ~360x780 → no horizontal scroll; if localStorage or
 *    download APIs are unavailable the screen still renders without
 *    throwing errors (export/delete may no-op).
 */
