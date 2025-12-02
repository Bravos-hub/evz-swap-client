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

.evz-footer {
  margin-top: auto;
  padding-top: 18px;
}

.evz-footer-row {
  display: flex;
  gap: 8px;
}

.evz-btn-secondary,
.evz-btn-primary,
.evz-btn-ghost {
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

.evz-btn-ghost {
  margin-top: 8px;
  width: 100%;
  border: none;
  background: none;
  color: var(--evz-accent);
}

.evz-btn-ghost:hover {
  text-decoration: underline;
}

@media (max-width: 375px) {
  .evz-screen {
    padding-inline: 16px;
  }
}
`;

const BOOK_NS = "evz.booking.";

function useEvzStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("evz-mobile-styles-p21-s01")) return;
    const style = document.createElement("style");
    style.id = "evz-mobile-styles-p21-s01";
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

function getBooking(key, fallback = "") {
  const ls = safeLocalStorage();
  if (!ls) return fallback;
  try {
    return ls.getItem(BOOK_NS + key) || fallback;
  } catch {
    return fallback;
  }
}

function goTo(path) {
  if (typeof window === "undefined") return;
  window.location.assign(path);
}

export default function P21S01BookingExpired() {
  useEvzStyles();

  const stationName = getBooking("stationName", "");
  const stationArea = getBooking("stationArea", "");
  const stationId = getBooking("stationId", "");
  const rsv = getBooking("reservationId", "");

  const rebookHref = useMemo(() => {
    return stationId
      ? `/booking/hold?stationId=${encodeURIComponent(stationId)}`
      : "/stations/map-list";
  }, [stationId]);

  const where = [stationName, stationArea].filter(Boolean).join(" • ");

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Booking required</h1>
        <p className="evz-header-subtitle">Your previous hold has expired</p>
      </header>

      <div className="evz-divider" />

      <main className="evz-main">
        <section className="evz-card-warning">
          <div className="evz-card-title">What happened?</div>
          <p className="evz-card-body">
            Your held pack
            {where ? ` at ${where}` : ""}
            {rsv ? ` (RSV ${rsv})` : ""} was released because the booking
            window ended.
          </p>
          <p className="evz-card-body" style={{ marginTop: 6 }}>
            You can rebook at the same station (if packs are available) or
            pick another kiosk nearby.
          </p>
        </section>
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-row">
          <button
            type="button"
            className="evz-btn-primary"
            onClick={() => goTo(rebookHref)}
          >
            Rebook now
          </button>
          <button
            type="button"
            className="evz-btn-secondary"
            onClick={() => goTo("/stations/search")}
          >
            Find another kiosk
          </button>
        </div>
        <button
          type="button"
          className="evz-btn-ghost"
          onClick={() => goTo("/stations/map-list")}
        >
          Open map
        </button>
      </footer>
    </EvzScreen>
  );
}
