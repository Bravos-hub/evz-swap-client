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
  padding-bottom: 8px;
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

.evz-divider {
  height: 1px;
  width: 100%;
  background-color: #e5e7eb;
  margin: 10px 0 0;
}

.evz-main {
  padding-top: 10px;
}

.evz-card {
  border-radius: 16px;
  background-color: var(--evz-surface-soft);
  padding: 14px 14px 12px;
}

.evz-switch-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
}

.evz-switch-label {
  font-size: 14px;
}

.evz-caption {
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-footer {
  margin-top: auto;
  padding-top: 18px;
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

.evz-btn-primary:active {
  transform: translateY(1px);
  box-shadow: 0 6px 14px rgba(247, 127, 0, 0.28);
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
    const styleId = "evz-mobile-styles-p17-s03";
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

function getBool(key, defaultValue) {
  const ls = safeLocalStorage();
  if (!ls) return !!defaultValue;
  try {
    const v = ls.getItem(key);
    if (v == null) return !!defaultValue;
    return v === "true";
  } catch {
    return !!defaultValue;
  }
}

function setBool(key, value) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    ls.setItem(key, value ? "true" : "false");
  } catch {
    // ignore
  }
}

function goTo(path) {
  if (typeof window === "undefined") return;
  window.location.assign(path);
}

export default function NotificationSettingsScreen() {
  useEvzStyles();

  const [booking, setBooking] = useState(() =>
    getBool("evz.notif.booking", true)
  );
  const [payments, setPayments] = useState(() =>
    getBool("evz.notif.payments", true)
  );
  const [promos, setPromos] = useState(() =>
    getBool("evz.notif.promos", false)
  );

  const handleSave = () => {
    setBool("evz.notif.booking", booking);
    setBool("evz.notif.payments", payments);
    setBool("evz.notif.promos", promos);
    goTo("/account");
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Notifications</h1>
        <p className="evz-header-subtitle">
          Choose which alerts to receive
        </p>
      </header>

      <div className="evz-divider" />

      <main className="evz-main">
        <section className="evz-card">
          <div className="evz-switch-row">
            <span className="evz-switch-label">
              Booking timers &amp; reminders
            </span>
            <input
              type="checkbox"
              checked={booking}
              onChange={(e) => setBooking(e.target.checked)}
            />
          </div>

          <div className="evz-switch-row">
            <span className="evz-switch-label">
              Payment receipts &amp; confirmations
            </span>
            <input
              type="checkbox"
              checked={payments}
              onChange={(e) => setPayments(e.target.checked)}
            />
          </div>

          <div className="evz-switch-row">
            <span className="evz-switch-label">Promotions &amp; offers</span>
            <input
              type="checkbox"
              checked={promos}
              onChange={(e) => setPromos(e.target.checked)}
            />
          </div>

          <div className="evz-caption">
            Note: System permission prompts (push notifications) appear when
            features need them.
          </div>
        </section>
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-row">
          <button
            type="button"
            className="evz-btn-secondary"
            onClick={() => goTo("/account")}
          >
            Back
          </button>
          <button
            type="button"
            className="evz-btn-primary"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </footer>
    </EvzScreen>
  );
}
