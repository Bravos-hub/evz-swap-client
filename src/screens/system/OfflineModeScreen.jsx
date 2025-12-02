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

.evz-card-body {
  margin-top: 4px;
  font-size: 13px;
  color: var(--evz-text-secondary);
}

.evz-caption {
  font-size: 11px;
  color: var(--evz-text-secondary);
  margin-top: 6px;
}

.evz-section-title {
  font-size: 13px;
  font-weight: 800;
  margin-top: 16px;
  margin-bottom: 4px;
}

.evz-stations-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.evz-station-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f2f2f2;
  text-decoration: none;
  color: inherit;
}

.evz-station-main {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.evz-station-name {
  font-size: 14px;
  font-weight: 700;
}

.evz-station-area {
  font-size: 12px;
  color: var(--evz-text-secondary);
}

.evz-station-distance {
  font-size: 12px;
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

const ST_KEY = "evz.stations";

function useEvzStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = "evz-mobile-styles-p23-s01";
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

function EvzScreen({ children }) {
  return (
    <div className="evz-app">
      <div className="evz-screen">{children}</div>
    </div>
  );
}

export default function OfflineModeScreen() {
  useEvzStyles();

  const [now, setNow] = useState(() => new Date());
  const stations = useMemo(() => getJSON(ST_KEY, []), []);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  const handleRetry = () => {
    if (typeof window === "undefined") return;
    window.location.reload();
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">You’re offline</h1>
        <p className="evz-header-subtitle">
          Some features need internet. Cached data is shown below.
        </p>
      </header>

      <div className="evz-divider" />

      <main className="evz-main">
        <section className="evz-card-warning">
          <div className="evz-card-title">Tips</div>
          <ul style={{ margin: "6px 0 0 18px", padding: 0 }}>
            <li className="evz-card-body">
              Turn on mobile data or connect to Wi‑Fi.
            </li>
            <li className="evz-card-body">Disable airplane mode.</li>
            <li className="evz-card-body">Try again after a moment.</li>
          </ul>
          <p className="evz-caption">
            Last checked: {now.toLocaleString()}
          </p>
        </section>

        <h2 className="evz-section-title">Cached stations</h2>
        <ul className="evz-stations-list">
          {stations.map((s) => (
            <li key={s.id}>
              <a
                href={
                  "/stations/details?stationId=" +
                  encodeURIComponent(String(s.id))
                }
                className="evz-station-item"
              >
                <div className="evz-station-main">
                  <div className="evz-station-name">{s.name}</div>
                  <div className="evz-station-area">
                    {s.area || "—"}
                  </div>
                </div>
                <div className="evz-station-distance">
                  {Number(s.distanceKm || 0).toFixed(1)} km
                </div>
              </a>
            </li>
          ))}

          {stations.length === 0 && (
            <li className="evz-station-item" style={{ borderBottom: "none" }}>
              <div className="evz-station-main">
                <div className="evz-station-name">No cached stations</div>
                <div className="evz-station-area">
                  Open the app online to cache data.
                </div>
              </div>
            </li>
          )}
        </ul>
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-row">
          <button
            type="button"
            className="evz-btn-primary"
            onClick={handleRetry}
          >
            Retry
          </button>
          <button
            type="button"
            className="evz-btn-secondary"
            onClick={() => {
              if (typeof window === "undefined") return;
              window.location.assign("/stations/search");
            }}
          >
            Go to Search
          </button>
        </div>
      </footer>
    </EvzScreen>
  );
}
