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

.evz-card {
  border-radius: 16px;
  background-color: var(--evz-surface-soft);
  padding: 12px 14px 10px;
}

.evz-input-label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 6px;
}

.evz-input-field {
  width: 100%;
  border-radius: 999px;
  border: 1px solid var(--evz-border-subtle);
  padding: 9px 14px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
}

.evz-input-field:focus {
  border-color: var(--evz-primary);
}

.evz-input-error {
  border-color: #ef4444;
}

.evz-helper-text {
  margin-top: 4px;
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-helper-text-error {
  color: #ef4444;
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

const SELF_NS = "evz.self.";
const SWAP_NS = "evz.swap.";

function useEvzStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("evz-mobile-styles-p27-s02")) return;
    const style = document.createElement("style");
    style.id = "evz-mobile-styles-p27-s02";
    style.innerHTML = evzStyles;
    document.head.appendChild(style);
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

function setItem(ns, key, value) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    ls.setItem(ns + key, String(value));
  } catch {
    // ignore
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

function usePhase() {
  if (typeof window === "undefined") return "return";
  const qs = new URLSearchParams(window.location.search);
  const p = (qs.get("phase") || "return").toLowerCase();
  return p === "new" ? "new" : "return";
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

export default function P27S02BatteryQrUnreadable() {
  useEvzStyles();

  const phase = usePhase();
  const [value, setValue] = useState("");

  const trimmed = useMemo(() => value.trim().toUpperCase(), [value]);
  const isValid = useMemo(
    () => /^[A-Z0-9-]{4,}$/.test(trimmed),
    [trimmed]
  );

  const title = phase === "new" ? "New battery ID" : "Returned battery ID";
  const helper =
    phase === "new"
      ? "Enter the ID printed on the new charged pack."
      : "Enter the ID printed on your used pack.";

  const nextHref = phase === "new" ? "/swap/self/done" : "/swap/self/insert-return";
  const backHref = phase === "new" ? "/swap/self/collect" : "/swap/self/scan-return";

  const onContinue = () => {
    if (!isValid) return;

    if (phase === "new") {
      setItem(SELF_NS, "newBatteryId", trimmed);
      const completedAt = Date.now();
      const returnDetectedAt = Number(
        getItem(SELF_NS, "returnDetectedAt", String(completedAt))
      );
      const duration = Math.max(0, completedAt - returnDetectedAt);
      setItem(SWAP_NS, "completedAt", completedAt);
      setItem(SWAP_NS, "durationMs", duration);
      setItem(SWAP_NS, "lastSwapAt", completedAt);
    } else {
      setItem(SELF_NS, "returnBatteryId", trimmed);
    }

    goTo(nextHref);
  };

  const showError = value.length > 0 && !isValid;

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Battery QR unreadable</h1>
        <p className="evz-header-subtitle">{helper}</p>
      </header>

      <div className="evz-divider" />

      <main className="evz-main">
        <section className="evz-card">
          <label className="evz-input-label" htmlFor="battery-id-input">
            {title}
          </label>
          <input
            id="battery-id-input"
            className={
              "evz-input-field" + (showError ? " evz-input-error" : "")
            }
            placeholder={phase === "new" ? "BAT-874A" : "BAT-215B"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div
            className={
              "evz-helper-text" + (showError ? " evz-helper-text-error" : "")
            }
          >
            {showError
              ? "Use letters/digits and hyphen, min 4 characters"
              : " "}
          </div>
        </section>
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-row">
          <button
            type="button"
            className="evz-btn-secondary"
            onClick={() => goTo(backHref)}
          >
            Back
          </button>
          <button
            type="button"
            className="evz-btn-primary"
            disabled={!isValid}
            onClick={onContinue}
          >
            Continue
          </button>
        </div>
      </footer>
    </EvzScreen>
  );
}

/**
 * Manual test cases:
 * 1) ?phase=return → entering BAT-215B enables Continue → sets evz.self.returnBatteryId and goes to /swap/self/insert-return.
 * 2) ?phase=new → entering BAT-874A enables Continue → sets evz.self.newBatteryId and stamps completedAt/duration; goes to /swap/self/done.
 * 3) Back: return-phase → /swap/self/scan-return; new-phase → /swap/self/collect.
 * 4) Mobile fit: 360x780 → no horizontal scroll.
 * 5) Entering invalid text (e.g. "***") keeps Continue disabled and shows validation helper text.
 */
