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

.evz-card-consent {
  border-radius: 16px;
  background-color: var(--evz-surface-soft);
  padding: 12px 14px 10px;
}

.evz-toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
}

.evz-toggle-label {
  font-size: 14px;
}

.evz-toggle-helper {
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-toggle-switch {
  position: relative;
  width: 44px;
  height: 24px;
  border-radius: 999px;
  background-color: #e5e7eb;
  cursor: pointer;
  flex-shrink: 0;
}

.evz-toggle-knob {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.25);
  transition: transform 0.18s ease;
}

.evz-toggle-switch--on {
  background-color: rgba(3, 205, 140, 0.85);
}

.evz-toggle-switch--on .evz-toggle-knob {
  transform: translateX(20px);
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
.evz-btn-secondary {
  flex: 1;
  border-radius: 999px;
  padding: 11px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
}

.evz-btn-primary {
  background-color: var(--evz-accent);
  color: #ffffff;
  box-shadow: 0 10px 22px rgba(247, 127, 0, 0.32);
}

.evz-btn-primary:active {
  transform: translateY(1px);
  box-shadow: 0 6px 14px rgba(247, 127, 0, 0.28);
}

.evz-btn-secondary {
  background-color: #ffffff;
  color: var(--evz-text-primary);
  border-color: #a6a6a6;
}

.evz-btn-secondary:hover {
  background-color: #f9fafb;
}

@media (max-width: 375px) {
  .evz-screen {
    padding-inline: 16px;
  }
}
`;

const CONSENT_ANALYTICS = "evz.consent.analytics";
const CONSENT_CRASH = "evz.consent.crash";

function useEvzStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = "evz-mobile-styles-p28-s02";
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

function getBool(key, defaultValue = false) {
  const ls = safeLocalStorage();
  if (!ls) return !!defaultValue;
  try {
    const raw = ls.getItem(key);
    if (raw == null) return !!defaultValue;
    return raw === "true";
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

function Toggle({ label, checked, onChange }) {
  return (
    <div className="evz-toggle-row">
      <div>
        <div className="evz-toggle-label">{label}</div>
      </div>
      <button
        type="button"
        className={
          "evz-toggle-switch" + (checked ? " evz-toggle-switch--on" : "")
        }
        onClick={() => onChange(!checked)}
        aria-pressed={checked}
      >
        <span className="evz-toggle-knob" />
      </button>
    </div>
  );
}

export default function DataConsentScreen() {
  useEvzStyles();

  const [analytics, setAnalytics] = useState(() => getBool(CONSENT_ANALYTICS, true));
  const [crash, setCrash] = useState(() => getBool(CONSENT_CRASH, true));

  const onSave = () => {
    setBool(CONSENT_ANALYTICS, analytics);
    setBool(CONSENT_CRASH, crash);
    goTo("/account");
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Data consent</h1>
        <p className="evz-header-subtitle">
          Choose how we can use usage data
        </p>
      </header>

      <div className="evz-divider" />

      <main className="evz-main">
        <section className="evz-card-consent">
          <Toggle
            label="Anonymous analytics (helps improve features)"
            checked={analytics}
            onChange={setAnalytics}
          />
          <Toggle
            label="Crash reports (helps fix bugs)"
            checked={crash}
            onChange={setCrash}
          />
          <div className="evz-caption">
            You can change these anytime in Settings.
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
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </footer>
    </EvzScreen>
  );
}

/**
 * Manual test cases:
 * 1) Initial load → both toggles default to on (true) when no localStorage
 *    values are present.
 * 2) Toggle Analytics/Crash off and click Save → localStorage flags
 *    'evz.consent.analytics' / 'evz.consent.crash' update to 'false',
 *    and navigation goes to '/account'.
 * 3) Toggle values, refresh the page → previous choices are restored
 *    from localStorage.
 * 4) Back → navigates to '/account'.
 * 5) Mobile view ~360x780 shows no horizontal scroll; works even when
 *    localStorage is unavailable (no crashes).
 */
