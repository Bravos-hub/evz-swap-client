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

.evz-field {
  margin-bottom: 14px;
}

.evz-label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 4px;
}

.evz-select,
.evz-input {
  width: 100%;
  border-radius: 12px;
  border: 1px solid var(--evz-border-subtle);
  padding: 8px 10px;
  font-size: 14px;
  box-sizing: border-box;
  background-color: #ffffff;
}

.evz-select:focus,
.evz-input:focus {
  outline: none;
  border-color: rgba(3, 205, 140, 0.9);
  box-shadow: 0 0 0 1px rgba(3, 205, 140, 0.08);
}

.evz-secret-box {
  padding: 8px 10px;
  border-radius: 8px;
  background-color: #ffffff;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  font-size: 13px;
}

.evz-caption {
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-subtitle {
  font-size: 13px;
  font-weight: 800;
  margin-bottom: 4px;
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
    if (document.getElementById("evz-mobile-styles-p18-s02")) return;
    const style = document.createElement("style");
    style.id = "evz-mobile-styles-p18-s02";
    style.innerHTML = evzStyles;
    document.head.appendChild(style);
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

function getItem(key, fallback = "") {
  const ls = safeLocalStorage();
  if (!ls) return fallback;
  try {
    const v = ls.getItem(key);
    return v == null || v === "" ? fallback : v;
  } catch {
    return fallback;
  }
}

function setItem(key, value) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    ls.setItem(key, value);
  } catch {
    // ignore
  }
}

function randomSecret(len = 16) {
  const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let s = "";
  for (let i = 0; i < len; i++) {
    s += abc[Math.floor(Math.random() * abc.length)];
  }
  return s;
}

function goTo(path) {
  if (typeof window === "undefined") return;
  window.location.assign(path);
}

export default function TwoFactorSetupScreen() {
  useEvzStyles();

  const [mode, setMode] = useState(() => getItem("evz.sec.2fa.mode", "sms"));

  const [phone, setPhone] = useState(() => {
    const ls = safeLocalStorage();
    if (!ls) return "";
    try {
      const stored = ls.getItem("evz.sec.2fa.phone");
      if (stored) return stored;
      return ls.getItem("evz.msisdn") || "";
    } catch {
      return "";
    }
  });

  const [secret, setSecret] = useState(() => {
    const existing = getItem("evz.sec.2fa.secret", "");
    return existing || randomSecret();
  });

  const recovery = useMemo(
    () => getItem("evz.sec.2fa.recovery", ""),
    []
  );

  const handleSave = () => {
    setItem("evz.sec.2fa.mode", mode);
    setItem("evz.sec.2fa.phone", phone);
    setItem("evz.sec.2fa.secret", secret);

    if (!recovery) {
      const code = `RCV-${Math.random()
        .toString(36)
        .slice(2, 8)
        .toUpperCase()}`;
      setItem("evz.sec.2fa.recovery", code);
    }

    goTo("/account");
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Two-factor authentication</h1>
        <p className="evz-header-subtitle">
          Add a second step to protect your account
        </p>
      </header>

      <div className="evz-divider" />

      <main className="evz-main">
        <section className="evz-card">
          <div className="evz-field">
            <label className="evz-label" htmlFor="evz-2fa-mode">
              Method
            </label>
            <select
              id="evz-2fa-mode"
              className="evz-select"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="sms">SMS (OTP to phone)</option>
              <option value="totp">Authenticator app (TOTP)</option>
            </select>
          </div>

          {mode === "sms" && (
            <div className="evz-field">
              <label className="evz-label" htmlFor="evz-2fa-phone">
                Phone for OTP
              </label>
              <input
                id="evz-2fa-phone"
                className="evz-input"
                type="tel"
                placeholder="+256712345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          )}

          {mode === "totp" && (
            <div className="evz-field">
              <div className="evz-subtitle">Authenticator secret</div>
              <div className="evz-secret-box">{secret}</div>
              <p className="evz-caption">
                Add this secret to your authenticator app.
              </p>
            </div>
          )}

          {recovery && (
            <>
              <div className="evz-divider" style={{ margin: "4px 0 10px" }} />
              <div className="evz-field">
                <div className="evz-subtitle">Recovery code</div>
                <div className="evz-secret-box">{recovery}</div>
                <p className="evz-caption">
                  Store this securely to regain access.
                </p>
              </div>
            </>
          )}
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
