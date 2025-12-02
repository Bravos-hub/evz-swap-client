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

.evz-switch-input {
  width: 42px;
  height: 22px;
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

.evz-input {
  width: 100%;
  border-radius: 12px;
  border: 1px solid var(--evz-border-subtle);
  padding: 8px 10px;
  font-size: 14px;
  box-sizing: border-box;
}

.evz-input:focus {
  outline: none;
  border-color: rgba(3, 205, 140, 0.9);
  box-shadow: 0 0 0 1px rgba(3, 205, 140, 0.08);
}

.evz-helper {
  min-height: 16px;
  margin-top: 3px;
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-helper--error {
  color: #b91c1c;
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
    const styleId = "evz-mobile-styles-p18-s01";
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

// Lightweight hash substitute for demo (NOT cryptographically secure)
function sha1(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return String(h >>> 0);
}

function safeLocalStorage() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function getBool(key, fallback = false) {
  const ls = safeLocalStorage();
  if (!ls) return !!fallback;
  try {
    const v = ls.getItem(key);
    if (v == null) return !!fallback;
    return v === "true";
  } catch {
    return !!fallback;
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

function getStr(key, fallback = "") {
  const ls = safeLocalStorage();
  if (!ls) return fallback;
  try {
    return ls.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

function setStr(key, value) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    ls.setItem(key, value);
  } catch {
    // ignore
  }
}

function goTo(path) {
  if (typeof window === "undefined") return;
  window.location.assign(path);
}

export default function LockWalletScreen() {
  useEvzStyles();

  const [pinEnabled, setPinEnabled] = useState(() =>
    getBool("evz.sec.pinEnabled", false)
  );
  const [bioEnabled, setBioEnabled] = useState(() =>
    getBool("evz.sec.bioEnabled", false)
  );
  const [pin, setPin] = useState("");
  const [confirm, setConfirm] = useState("");

  const pinSet = useMemo(() => !!getStr("evz.sec.pinHash", ""), []);

  const match = pin.length >= 4 && pin === confirm;

  const handleSave = () => {
    setBool("evz.sec.pinEnabled", pinEnabled);
    setBool("evz.sec.bioEnabled", bioEnabled);

    if (pinEnabled && match) {
      setStr("evz.sec.pinHash", sha1(pin));
    }

    if (!pinEnabled) {
      setStr("evz.sec.pinHash", "");
    }

    goTo("/account");
  };

  const pinTooShort = pinEnabled && pin.length > 0 && pin.length < 4;
  const pinMismatch = pinEnabled && confirm.length > 0 && !match;

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Wallet lock</h1>
        <p className="evz-header-subtitle">Protect top-ups and payments</p>
      </header>

      <div className="evz-divider" />

      <main className="evz-main">
        <section className="evz-card">
          <div className="evz-switch-row">
            <span className="evz-switch-label">
              {pinEnabled
                ? "PIN required for wallet actions"
                : "PIN disabled"}
            </span>
            <input
              className="evz-switch-input"
              type="checkbox"
              checked={pinEnabled}
              onChange={(e) => setPinEnabled(e.target.checked)}
            />
          </div>

          <div className="evz-field">
            <label className="evz-label" htmlFor="evz-pin">
              {pinSet ? "New PIN (min 4 digits)" : "Set PIN (min 4 digits)"}
            </label>
            <input
              id="evz-pin"
              className="evz-input"
              type="password"
              inputMode="numeric"
              disabled={!pinEnabled}
              value={pin}
              onChange={(e) =>
                setPin(e.target.value.replace(/\D+/g, "").slice(0, 6))
              }
            />
            <div
              className={
                "evz-helper" + (pinTooShort ? " evz-helper--error" : "")
              }
            >
              {pinTooShort ? "PIN must be at least 4 digits" : " "}
            </div>
          </div>

          <div className="evz-field">
            <label className="evz-label" htmlFor="evz-pin-confirm">
              Confirm PIN
            </label>
            <input
              id="evz-pin-confirm"
              className="evz-input"
              type="password"
              inputMode="numeric"
              disabled={!pinEnabled}
              value={confirm}
              onChange={(e) =>
                setConfirm(e.target.value.replace(/\D+/g, "").slice(0, 6))
              }
            />
            <div
              className={
                "evz-helper" + (pinMismatch ? " evz-helper--error" : "")
              }
            >
              {pinMismatch ? "PINs do not match" : " "}
            </div>
          </div>

          <div className="evz-divider" style={{ margin: "6px 0 10px" }} />

          <div className="evz-switch-row">
            <span className="evz-switch-label">
              {bioEnabled
                ? "Biometric auto-approve (simulated)"
                : "Biometric off"}
            </span>
            <input
              className="evz-switch-input"
              type="checkbox"
              checked={bioEnabled}
              onChange={(e) => setBioEnabled(e.target.checked)}
            />
          </div>
          <p className="evz-caption">
            Biometric flag is stored on-device only for demo; integrate OS
            biometrics in production.
          </p>
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
