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

.evz-card-maint {
  border-radius: 16px;
  background-color: #fff7f0;
  border: 1px solid var(--evz-accent);
  padding: 12px 14px 10px;
}

.evz-card-title {
  font-size: 13px;
  font-weight: 800;
}

.evz-card-body {
  margin-top: 4px;
  font-size: 13px;
  color: var(--evz-text-secondary);
}

.evz-schedule-row {
  display: flex;
  gap: 16px;
  margin-top: 10px;
}

.evz-schedule-col {
  min-width: 0;
}

.evz-schedule-label {
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-schedule-value {
  font-size: 13px;
  font-weight: 700;
}

.evz-countdown-box {
  margin-top: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  background-color: #e8fff6;
  border: 1px solid var(--evz-primary);
  text-align: center;
}

.evz-countdown-label {
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-countdown-value {
  font-size: 22px;
  font-weight: 900;
  color: var(--evz-primary);
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

const SYS_KEY = "evz.system.maintenance";

function useEvzStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("evz-mobile-styles-p23-s03")) return;
    const style = document.createElement("style");
    style.id = "evz-mobile-styles-p23-s03";
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

function getJSON(key, fallback = {}) {
  const ls = safeLocalStorage();
  if (!ls) return fallback;
  try {
    const raw = ls.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function fmt(dt) {
  return dt ? new Date(dt).toLocaleString() : "—";
}

function fmtCountdown(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}

function EvzScreen({ children }) {
  return (
    <div className="evz-app">
      <div className="evz-screen">{children}</div>
    </div>
  );
}

export default function P23S03Maintenance() {
  useEvzStyles();

  const data = getJSON(SYS_KEY, {});
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const endMs = Number(data.end || 0);
  const until = useMemo(() => (endMs > now ? endMs - now : 0), [endMs, now]);

  const handleDismiss = () => {
    const ls = safeLocalStorage();
    try {
      ls?.removeItem(SYS_KEY);
    } catch {
      // ignore
    }
    if (typeof window !== "undefined") {
      window.location.assign("/");
    }
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Maintenance</h1>
        <p className="evz-header-subtitle">We’re improving your experience</p>
      </header>

      <div className="evz-divider" />

      <main className="evz-main">
        <section className="evz-card-maint">
          <div className="evz-card-title">
            {data.title || "Scheduled maintenance"}
          </div>
          <p className="evz-card-body">
            {data.message ||
              "Some features may be unavailable for a short time."}
          </p>

          <div className="evz-schedule-row">
            <div className="evz-schedule-col">
              <div className="evz-schedule-label">Start</div>
              <div className="evz-schedule-value">{fmt(data.start)}</div>
            </div>
            <div className="evz-schedule-col">
              <div className="evz-schedule-label">End</div>
              <div className="evz-schedule-value">{fmt(data.end)}</div>
            </div>
          </div>

          {until > 0 && (
            <div className="evz-countdown-box">
              <div className="evz-countdown-label">
                Estimated time remaining
              </div>
              <div className="evz-countdown-value">{fmtCountdown(until)}</div>
            </div>
          )}
        </section>
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-row">
          <button
            type="button"
            className="evz-btn-secondary"
            onClick={() => {
              if (typeof window === "undefined") return;
              window.location.assign("/");
            }}
          >
            Home
          </button>
          <button
            type="button"
            className="evz-btn-primary"
            onClick={handleDismiss}
          >
            Dismiss
          </button>
        </div>
      </footer>
    </EvzScreen>
  );
}
