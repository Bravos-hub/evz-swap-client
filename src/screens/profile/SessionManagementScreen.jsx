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

.evz-card-current {
  border-radius: 16px;
  background-color: #e8fff6;
  border: 1px solid var(--evz-primary);
  padding: 12px 14px 10px;
}

.evz-card-title {
  font-size: 13px;
  font-weight: 800;
  margin-bottom: 2px;
}

.evz-card-device {
  font-size: 14px;
}

.evz-card-meta {
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-section-title {
  font-size: 13px;
  font-weight: 800;
  margin: 14px 0 6px;
}

.evz-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.evz-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid var(--evz-surface-soft);
}

.evz-list-main {
  flex: 1;
}

.evz-list-device {
  font-size: 14px;
  font-weight: 700;
}

.evz-list-meta {
  font-size: 12px;
  color: var(--evz-text-secondary);
}

.evz-list-empty-primary {
  font-size: 14px;
}

.evz-list-empty-secondary {
  font-size: 12px;
  color: var(--evz-text-secondary);
}

.evz-btn-outline {
  border-radius: 999px;
  border: 1px solid #a6a6a6;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 600;
  background-color: #ffffff;
  cursor: pointer;
}

.evz-btn-outline:hover {
  background-color: #f9fafb;
}

.evz-link-danger {
  margin-top: 4px;
  border: none;
  background: none;
  padding: 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--evz-accent);
  cursor: pointer;
}

.evz-link-danger:disabled {
  opacity: 0.5;
  cursor: default;
}

.evz-link-danger:hover:not(:disabled) {
  text-decoration: underline;
}

.evz-footer {
  margin-top: auto;
  padding-top: 18px;
}

.evz-footer-link {
  width: 100%;
  border-radius: 999px;
  border: none;
  background: none;
  padding: 11px 16px;
  font-size: 14px;
  font-weight: 600;
  color: var(--evz-accent);
  cursor: pointer;
}

.evz-footer-link:hover {
  text-decoration: underline;
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
    if (document.getElementById("evz-mobile-styles-p18-s03")) return;
    const style = document.createElement("style");
    style.id = "evz-mobile-styles-p18-s03";
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

const SESS_KEY = "evz.sec.sessions";

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

function seedCurrent() {
  const ls = safeLocalStorage();
  if (!ls) return;
  const list = getJSON(SESS_KEY, []);
  if (list.length === 0) {
    const now = Date.now();
    const ua =
      typeof navigator !== "undefined" && navigator.userAgent
        ? navigator.userAgent.slice(0, 60) + "…"
        : "Unknown";
    list.push({
      id: "sess_" + now,
      device: "This device",
      location: "Unknown",
      ua,
      current: true,
      ts: now,
    });
    setJSON(SESS_KEY, list);
  }
}

function goTo(path) {
  if (typeof window === "undefined") return;
  window.location.assign(path);
}

export default function SessionManagementScreen() {
  useEvzStyles();

  const [sessions, setSessions] = useState(() => {
    seedCurrent();
    return getJSON(SESS_KEY, []);
  });

  const current = useMemo(
    () => sessions.find((s) => s.current) || null,
    [sessions]
  );
  const others = useMemo(
    () => sessions.filter((s) => !s.current),
    [sessions]
  );

  const signOutOne = (id) => {
    const next = sessions.filter((s) => s.id !== id);
    setSessions(next);
    setJSON(SESS_KEY, next);
  };

  const signOutOthers = () => {
    const next = sessions.filter((s) => s.current);
    setSessions(next);
    setJSON(SESS_KEY, next);
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Sessions</h1>
        <p className="evz-header-subtitle">
          Manage where you are signed in
        </p>
      </header>

      <div className="evz-divider" />

      <main className="evz-main">
        {current && (
          <section className="evz-card-current">
            <div className="evz-card-title">Current session</div>
            <div className="evz-card-device">{current.device}</div>
            <div className="evz-card-meta">
              {new Date(current.ts).toLocaleString()}
            </div>
          </section>
        )}

        <h2 className="evz-section-title">Other sessions</h2>
        <ul className="evz-list">
          {others.map((s) => (
            <li key={s.id} className="evz-list-item">
              <div className="evz-list-main">
                <div className="evz-list-device">{s.device}</div>
                <div className="evz-list-meta">
                  {(s.location || "Unknown") +
                    " • " +
                    new Date(s.ts).toLocaleString()}
                </div>
              </div>
              <button
                type="button"
                className="evz-btn-outline"
                onClick={() => signOutOne(s.id)}
              >
                Sign out
              </button>
            </li>
          ))}

          {others.length === 0 && (
            <li className="evz-list-item" style={{ borderBottom: "none" }}>
              <div className="evz-list-main">
                <div className="evz-list-empty-primary">No other sessions</div>
                <div className="evz-list-empty-secondary">
                  You are only signed in here
                </div>
              </div>
            </li>
          )}
        </ul>

        <button
          type="button"
          className="evz-link-danger"
          onClick={signOutOthers}
          disabled={others.length === 0}
        >
          Sign out all other sessions
        </button>
      </main>

      <footer className="evz-footer">
        <button
          type="button"
          className="evz-footer-link"
          onClick={() => goTo("/account")}
        >
          Back to account
        </button>
      </footer>
    </EvzScreen>
  );
}
