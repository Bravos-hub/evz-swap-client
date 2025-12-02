import React, { useEffect, useMemo } from "react";

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

.evz-card-title {
  font-size: 13px;
  font-weight: 800;
}

.evz-card-station-name {
  font-size: 14px;
  font-weight: 700;
}

.evz-card-station-area {
  font-size: 13px;
  color: var(--evz-text-secondary);
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
.evz-btn-secondary,
.evz-btn-ghost {
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

.evz-btn-primary:active {
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

.evz-btn-ghost {
  flex: 1;
  background: none;
  color: var(--evz-accent);
}

.evz-btn-ghost:hover {
  text-decoration: underline;
}

.evz-footer-col {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

@media (max-width: 375px) {
  .evz-screen {
    padding-inline: 16px;
  }
}
`;

const BOOK_NS = "evz.booking.";
const ST_KEY = "evz.stations";

function useEvzStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = "evz-mobile-styles-p26-s03";
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

function getBooking(key, fallback = "") {
  const ls = safeLocalStorage();
  if (!ls) return fallback;
  try {
    return ls.getItem(BOOK_NS + key) || fallback;
  } catch {
    return fallback;
  }
}

function getStations() {
  const ls = safeLocalStorage();
  if (!ls) return [];
  try {
    return JSON.parse(ls.getItem(ST_KEY) || "[]");
  } catch {
    return [];
  }
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

export default function EscalateToOperatorScreen() {
  useEvzStyles();

  const stationId = getBooking("stationId", "");
  const stationName = getBooking("stationName", "Station");
  const stationArea = getBooking("stationArea", "");
  const stationPhone = getBooking("stationPhone", "");

  const stations = getStations();
  const station = useMemo(
    () => stations.find((s) => String(s.id) === String(stationId)) || null,
    [stations, stationId]
  );

  const backHref = station?.type === "operator"
    ? "/swap/operator/qr"
    : "/swap/self/insert-return";

  const supportTel = "+256000000000";
  const stationTelHref = stationPhone ? `tel:${stationPhone}` : "";

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Need operator assistance</h1>
        <p className="evz-header-subtitle">
          We can connect you to a person for help
        </p>
      </header>

      <div className="evz-divider" />

      <main className="evz-main">
        <section className="evz-card">
          <div className="evz-card-title">Station</div>
          <div className="evz-card-station-name">{stationName || "Station"}</div>
          {stationArea && (
            <div className="evz-card-station-area">{stationArea}</div>
          )}
          <p className="evz-caption">
            Share your reservation ID with the operator if asked.
          </p>
        </section>
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-col">
          <div className="evz-footer-row">
            <button
              type="button"
              className="evz-btn-primary"
              onClick={() => goTo("/help/chat")}
            >
              Open chat
            </button>
            <button
              type="button"
              className="evz-btn-secondary"
              onClick={() => goTo(`tel:${supportTel}`)}
            >
              Call support
            </button>
          </div>

          <div className="evz-footer-row">
            <button
              type="button"
              className="evz-btn-secondary"
              onClick={() => goTo("/stations/map-list")}
            >
              Open map
            </button>
            <button
              type="button"
              className="evz-btn-ghost"
              onClick={() => goTo(backHref)}
            >
              Back
            </button>
          </div>

          {stationPhone ? (
            <button
              type="button"
              className="evz-btn-ghost"
              onClick={() => goTo(stationTelHref)}
            >
              Call station
            </button>
          ) : (
            <span className="evz-caption">
              Station phone not available.
            </span>
          )}
        </div>
      </footer>
    </EvzScreen>
  );
}
