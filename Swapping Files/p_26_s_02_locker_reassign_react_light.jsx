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

.evz-card {
  border-radius: 16px;
  background-color: var(--evz-surface-soft);
  padding: 12px 14px 10px;
}

.evz-locker-rows {
  display: flex;
  gap: 16px;
}

.evz-locker-col {
  min-width: 0;
}

.evz-locker-label {
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-locker-value {
  font-size: 13px;
  font-weight: 700;
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

const SELF_NS = "evz.self.";

function useEvzStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("evz-mobile-styles-p26-s02")) return;
    const style = document.createElement("style");
    style.id = "evz-mobile-styles-p26-s02";
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

function getSelf(key, fallback = "") {
  const ls = safeLocalStorage();
  if (!ls) return fallback;
  try {
    return ls.getItem(SELF_NS + key) || fallback;
  } catch {
    return fallback;
  }
}

function setSelf(key, value) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    ls.setItem(SELF_NS + key, String(value));
  } catch {
    // ignore
  }
}

function nextLocker(current) {
  const fallback = "A01";
  // Expect IDs like "A07", "B12" etc. One letter + two digits.
  const m = String(current || fallback).match(/^([A-Z])(\d{2})$/i);
  if (!m) return fallback;
  const letter = m[1].toUpperCase();
  const num = parseInt(m[2], 10);
  const next = num >= 99 ? 1 : num + 1;
  return `${letter}${String(next).padStart(2, "0")}`;
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

export default function P26S02LockerReassign({ nextPath = "/swap/self/locker" }) {
  useEvzStyles();

  const [oldId] = useState(() => getSelf("locker.id", "A07"));
  const [newId] = useState(() => nextLocker(oldId));

  const handleReassign = () => {
    setSelf("locker.id", newId);
    setSelf("locker.unlockAt", Date.now() + 60 * 1000);
    goTo(nextPath);
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Locker reassigned</h1>
        <p className="evz-header-subtitle">
          Your assigned locker is unavailable. We can reassign you.
        </p>
      </header>

      <div className="evz-divider" />

      <main className="evz-main">
        <section className="evz-card">
          <div className="evz-locker-rows">
            <div className="evz-locker-col">
              <div className="evz-locker-label">Previous</div>
              <div className="evz-locker-value">{oldId}</div>
            </div>
            <div className="evz-locker-col">
              <div className="evz-locker-label">New</div>
              <div className="evz-locker-value">{newId}</div>
            </div>
          </div>
          <p className="evz-caption">
            The new locker will be unlocked for 60 seconds.
          </p>
        </section>
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-row">
          <button
            type="button"
            className="evz-btn-primary"
            onClick={handleReassign}
          >
            Reassign locker
          </button>
          <button
            type="button"
            className="evz-btn-secondary"
            onClick={() => goTo("/help/contact")}
          >
            Need help
          </button>
        </div>
      </footer>
    </EvzScreen>
  );
}
