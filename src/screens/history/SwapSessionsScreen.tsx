import React, { useEffect, useMemo, useState } from "react";

const evzStyles = `
:root {
  --evz-primary: #03cd8c;
  --evz-accent: #f77f00;
  --evz-bg: #ffffff;
  --evz-surface: #f5f5f7;
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
  max-width: 420px;
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

.evz-tab-row {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.evz-tab {
  flex: 0 0 auto;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid #a6a6a6;
  background-color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.evz-tab--active {
  border-color: transparent;
  background-color: var(--evz-primary);
  color: #ffffff;
}

.evz-divider {
  height: 1px;
  width: 100%;
  background-color: #e5e7eb;
  margin: 10px 0 0;
}

.evz-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.evz-row-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid var(--evz-surface-soft);
  text-decoration: none;
  color: inherit;
}

.evz-row-main {
  display: flex;
  flex-direction: column;
}

.evz-row-title {
  display: flex;
  align-items: center;
  gap: 6px;
}

.evz-row-title-text {
  font-size: 14px;
  font-weight: 700;
}

.evz-row-area {
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-row-secondary {
  font-size: 12px;
  color: var(--evz-text-secondary);
  margin-top: 2px;
}

.evz-row-amount {
  font-size: 13px;
  font-weight: 800;
  color: var(--evz-primary);
}

.evz-tag {
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 700;
  background-color: #a6a6a6;
  color: #ffffff;
}

.evz-empty-primary {
  font-size: 14px;
}

.evz-empty-secondary {
  font-size: 12px;
  color: var(--evz-text-secondary);
}

.evz-footer {
  margin-top: auto;
  padding-top: 12px;
}

.evz-footer-link {
  width: 100%;
  border-radius: 999px;
  padding: 11px 16px;
  border: none;
  background: none;
  font-size: 14px;
  font-weight: 600;
  color: var(--evz-accent);
  cursor: pointer;
}

.evz-footer-link:hover {
  text-decoration: underline;
}

/* Responsive styles for 320px - 420px range */
@media (max-width: 420px) {
  .evz-screen {
    max-width: 100%;
    padding: 20px 16px 16px;
  }
  
  .evz-header-title {
    font-size: 20px;
  }
  
  .evz-header-subtitle {
    font-size: 12px;
  }
  
  .evz-tab {
    padding: 5px 12px;
    font-size: 12px;
  }
  
  .evz-row-link {
    padding: 9px 0;
  }
  
  .evz-row-title-text {
    font-size: 13px;
  }
  
  .evz-row-secondary {
    font-size: 11px;
  }
}

@media (max-width: 370px) {
  .evz-screen {
    padding: 18px 14px 14px;
  }
  
  .evz-header-title {
    font-size: 19px;
  }
  
  .evz-header-subtitle {
    font-size: 11px;
  }
  
  .evz-tab-row {
    gap: 6px;
  }
  
  .evz-tab {
    padding: 5px 10px;
    font-size: 11px;
  }
  
  .evz-row-link {
    padding: 8px 0;
    gap: 8px;
  }
  
  .evz-row-title {
    gap: 4px;
  }
  
  .evz-row-title-text {
    font-size: 12px;
  }
  
  .evz-row-area {
    font-size: 10px;
  }
  
  .evz-row-secondary {
    font-size: 10px;
  }
  
  .evz-row-amount {
    font-size: 12px;
  }
  
  .evz-tag {
    padding: 3px 8px;
    font-size: 10px;
  }
}

@media (max-width: 360px) {
  .evz-screen {
    padding: 16px 12px 12px;
  }
  
  .evz-header-title {
    font-size: 18px;
  }
  
  .evz-header-subtitle {
    font-size: 11px;
  }
  
  .evz-tab {
    padding: 4px 8px;
    font-size: 11px;
  }
  
  .evz-row-link {
    flex-wrap: wrap;
    padding: 8px 0;
  }
  
  .evz-row-main {
    flex: 1;
    min-width: 0;
  }
  
  .evz-row-title-text {
    font-size: 12px;
  }
  
  .evz-row-area {
    font-size: 9px;
  }
  
  .evz-row-secondary {
    font-size: 10px;
    margin-top: 1px;
  }
  
  .evz-row-amount {
    font-size: 11px;
    flex-shrink: 0;
  }
  
  .evz-tag {
    padding: 2px 6px;
    font-size: 9px;
  }
  
  .evz-footer-link {
    padding: 10px 14px;
    font-size: 13px;
  }
}

@media (max-width: 340px) {
  .evz-screen {
    padding: 16px 10px 10px;
  }
  
  .evz-header-title {
    font-size: 17px;
  }
  
  .evz-header-subtitle {
    font-size: 10px;
  }
  
  .evz-tab-row {
    gap: 4px;
  }
  
  .evz-tab {
    padding: 4px 7px;
    font-size: 10px;
  }
  
  .evz-row-link {
    padding: 7px 0;
  }
  
  .evz-row-title-text {
    font-size: 11px;
  }
  
  .evz-row-area {
    font-size: 9px;
  }
  
  .evz-row-secondary {
    font-size: 9px;
  }
  
  .evz-row-amount {
    font-size: 10px;
  }
  
  .evz-tag {
    padding: 2px 5px;
    font-size: 8px;
  }
  
  .evz-empty-primary {
    font-size: 13px;
  }
  
  .evz-empty-secondary {
    font-size: 11px;
  }
  
  .evz-footer-link {
    padding: 9px 12px;
    font-size: 12px;
  }
}

@media (max-width: 320px) {
  .evz-screen {
    padding: 14px 8px 8px;
  }
  
  .evz-header-title {
    font-size: 16px;
  }
  
  .evz-header-subtitle {
    font-size: 10px;
  }
  
  .evz-tab-row {
    gap: 4px;
  }
  
  .evz-tab {
    padding: 4px 6px;
    font-size: 10px;
    border-radius: 8px;
  }
  
  .evz-row-link {
    padding: 6px 0;
    gap: 6px;
  }
  
  .evz-row-title {
    gap: 3px;
  }
  
  .evz-row-title-text {
    font-size: 11px;
  }
  
  .evz-row-area {
    font-size: 8px;
  }
  
  .evz-row-secondary {
    font-size: 9px;
  }
  
  .evz-row-amount {
    font-size: 10px;
  }
  
  .evz-tag {
    padding: 2px 4px;
    font-size: 8px;
  }
  
  .evz-empty-primary {
    font-size: 12px;
  }
  
  .evz-empty-secondary {
    font-size: 10px;
  }
  
  .evz-footer-link {
    padding: 8px 10px;
    font-size: 11px;
  }
}
`;

function useEvzStyles(): void {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = "evz-mobile-styles-p15-s01";
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

function EvzScreen({ children }: any): JSX.Element {
  return (
    <div className="evz-app">
      <div className="evz-screen">{children}</div>
    </div>
  );
}

const SESS_KEY = "evz.swap.sessions";
const BOOK_NS = "evz.booking.";
const SWAP_NS = "evz.swap.";
const VEH_KEY = "evz.vehicles";

function safeLocalStorage(): void {
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

function get(ns, key, fallback = "") {
  const ls = safeLocalStorage();
  if (!ls) return fallback;
  try {
    return ls.getItem(ns + key) || fallback;
  } catch {
    return fallback;
  }
}

function num(ns, key, fallback = 0) {
  const ls = safeLocalStorage();
  if (!ls) return fallback;
  try {
    const v = ls.getItem(ns + key);
    return v == null ? fallback : Number(v);
  } catch {
    return fallback;
  }
}

function loadVehicles(): void {
  const ls = safeLocalStorage();
  if (!ls) return [];
  try {
    return JSON.parse(ls.getItem(VEH_KEY) || "[]");
  } catch {
    return [];
  }
}

function collectSessions(): void {
  const list = [...getJSON(SESS_KEY, [])];
  const rsvSet = new Set(list.map((s) => s.reservationId));
  const now = Date.now();

  const ls = safeLocalStorage();

  const rsv = get(BOOK_NS, "reservationId", "");
  const expiryAt = num(BOOK_NS, "expiryAt", 0);
  if (rsv && expiryAt > now && !rsvSet.has(rsv)) {
    list.push({
      reservationId: rsv,
      when: expiryAt,
      stationName: get(BOOK_NS, "stationName", "Station"),
      stationArea: get(BOOK_NS, "stationArea", ""),
      type: "upcoming",
      holdMinutes: num(BOOK_NS, "holdMinutes", 0),
      feeUGX: num(BOOK_NS, "holdFee", 0),
    });
  }

  const completedAt = num(SWAP_NS, "completedAt", 0);
  if (rsv && completedAt && !rsvSet.has(rsv)) {
    const vehicleId = ls ? ls.getItem("evz.selectedVehicleId") || "" : "";
    list.push({
      reservationId: rsv,
      when: completedAt,
      stationName: get(BOOK_NS, "stationName", "Station"),
      stationArea: get(BOOK_NS, "stationArea", ""),
      vehicleId,
      type: "completed",
      durationMs: num(SWAP_NS, "durationMs", 0),
      totalUGX: num(SWAP_NS, "totalUGX", 0),
    });
  }

  const past = list
    .filter((s) => s.type === "completed" || s.type === "canceled")
    .sort((a, b) => (b.when || 0) - (a.when || 0));

  const upcoming = list
    .filter((s) => s.type === "upcoming")
    .sort((a, b) => (a.when || 0) - (b.when || 0));

  return { past, upcoming };
}

function fmtAmount(n) {
  return `UGX ${Number(n || 0).toLocaleString("en-UG")}`;
}

function fmtWhen(ts) {
  return ts ? new Date(ts).toLocaleString() : "—";
}

export default function SwapSessionsScreen(): JSX.Element {
  useEvzStyles();

  const [tab, setTab] = useState("past");
  const { past, upcoming } = useMemo(() => collectSessions(), []);
  const vehicles = useMemo(() => loadVehicles(), []);

  const rows = tab === "past" ? past : upcoming;

  const renderSecondary = (s) => {
    if (s.type === "upcoming") {
      return `Hold: ${s.holdMinutes || 0} min • Expires: ${fmtWhen(s.when)}`;
    }
    const veh = vehicles.find((v) => v.id === s.vehicleId);
    const when = fmtWhen(s.when);
    if (!veh) return when;
    return `${when} • ${veh.name} • ${veh.plate}`;
  };

  const renderTag = (s) => {
    if (s.type !== "upcoming") return null;
    const rsv = s.reservationId || "";
    const tail = rsv.slice(-6);
    return <span className="evz-tag">RSV {tail}</span>;
  };

  const emptyPrimary =
    tab === "past" ? "No sessions yet" : "No upcoming holds";
  const emptySecondary =
    tab === "past"
      ? "Complete a swap to see it here"
      : "Book a hold to see it here";

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Swap history</h1>
        <p className="evz-header-subtitle">
          Past sessions and upcoming holds
        </p>
        <div className="evz-tab-row">
          <button
            type="button"
            className={
              "evz-tab" + (tab === "past" ? " evz-tab--active" : "")
            }
            onClick={() => setTab("past")}
          >
            Past
          </button>
          <button
            type="button"
            className={
              "evz-tab" + (tab === "upcoming" ? " evz-tab--active" : "")
            }
            onClick={() => setTab("upcoming")}
          >
            Upcoming
          </button>
        </div>
      </header>

      <div className="evz-divider" />

      <main>
        <ul className="evz-list">
          {rows.map((s) => {
            const href = `/history/details?rsv=${encodeURIComponent(
              s.reservationId || ""
            )}`;
            return (
              <li key={`${s.type}_${s.reservationId || s.when}`}>
                <a href={href} className="evz-row-link">
                  <div className="evz-row-main">
                    <div className="evz-row-title">
                      <span className="evz-row-title-text">
                        {s.stationName || "Station"}
                      </span>
                      {s.stationArea ? (
                        <span className="evz-row-area">
                          • {s.stationArea}
                        </span>
                      ) : null}
                    </div>
                    <div className="evz-row-secondary">
                      {renderSecondary(s)}
                    </div>
                  </div>

                  {s.type === "completed" && (
                    <span className="evz-row-amount">
                      {fmtAmount(s.totalUGX)}
                    </span>
                  )}

                  {s.type === "upcoming" && renderTag(s)}
                </a>
              </li>
            );
          })}

          {rows.length === 0 && (
            <li className="evz-row-link" style={{ borderBottom: "none" }}>
              <div>
                <div className="evz-empty-primary">{emptyPrimary}</div>
                <div className="evz-empty-secondary">{emptySecondary}</div>
              </div>
            </li>
          )}
        </ul>
      </main>

      <footer className="evz-footer">
        <a href="/history/export" className="evz-footer-link">
          Export history
        </a>
      </footer>
    </EvzScreen>
  );
}
