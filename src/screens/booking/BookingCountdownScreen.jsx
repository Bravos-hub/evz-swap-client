import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/routes";

const evzStyles = `
:root {
  --evz-primary: #03cd8c;
  --evz-accent: #f77f00;
  --evz-bg: #f5f7fb;
  --evz-surface: #ffffff;
  --evz-surface-soft: #edf1f9;
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
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Inter",
    "SF Pro Text", sans-serif;
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
  padding-bottom: 10px;
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

.evz-content {
  flex: 1;
  padding-top: 10px;
  padding-bottom: 10px;
}

.evz-card {
  padding: 16px;
  border-radius: 16px;
  background-color: var(--evz-surface-soft);
}

.evz-card-title {
  font-size: 14px;
  font-weight: 800;
  margin: 0 0 2px;
}

.evz-card-subtitle {
  font-size: 13px;
  color: var(--evz-text-secondary);
  margin: 0;
}

.evz-timer-shell {
  margin-top: 12px;
  padding: 12px;
  border-radius: 12px;
  text-align: center;
  border: 1px solid transparent;
}

.evz-timer-shell--ok {
  background-color: #e8fff6;
  border-color: var(--evz-primary);
}

.evz-timer-shell--danger {
  background-color: #fff2f2;
  border-color: var(--evz-accent);
}

.evz-timer-value {
  font-size: 32px;
  font-weight: 800;
}

.evz-timer-label {
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-actions-row {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.evz-chip-button {
  flex: 1;
  border-radius: 999px;
  border: 1px solid var(--evz-border-subtle);
  padding: 8px 10px;
  font-size: 13px;
  font-weight: 500;
  background-color: #ffffff;
  color: var(--evz-text-primary);
  text-align: center;
  text-decoration: none;
}

.evz-button-main {
  margin-top: 12px;
  width: 100%;
  display: block;
  border-radius: 999px;
  border: none;
  padding: 14px 18px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  background-color: var(--evz-accent);
  color: #ffffff;
  box-shadow: 0 10px 22px rgba(247, 127, 0, 0.32);
}

.evz-footer-note {
  margin-top: 12px;
  font-size: 11px;
  color: var(--evz-text-secondary);
}

@media (max-width: 375px) {
  .evz-screen {
    padding-inline: 16px;
  }
}
`;

function useEvzStyles() {
  useEffect(() => {
    if (document.getElementById("evz-mobile-styles")) return;
    const style = document.createElement("style");
    style.id = "evz-mobile-styles";
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

const BOOK_NS = "evz.booking.";
const ST_KEY = "evz.stations";

function get(key, defaultValue = "") {
  if (typeof window === "undefined") return defaultValue;
  try {
    return window.localStorage.getItem(BOOK_NS + key) || defaultValue;
  } catch {
    return defaultValue;
  }
}

function loadStation(id) {
  if (!id || typeof window === "undefined") return null;
  try {
    const all = JSON.parse(window.localStorage.getItem(ST_KEY) || "[]");
    return all.find((s) => s.id === id) || null;
  } catch {
    return null;
  }
}

function msToClock(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

export default function BookingCountdownScreen() {
  useEvzStyles();
  const navigate = useNavigate();

  const stationId = get("stationId");
  const stationName = get("stationName");
  const stationArea = get("stationArea");
  const fee = Number(get("holdFee", "0"));
  const reservationId = get("reservationId");
  const expiryAt = Number(get("expiryAt", "0"));

  const station = useMemo(() => loadStation(stationId), [stationId]);

  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const remainingMs = Math.max(0, expiryAt - now);
  const danger = remainingMs <= 60 * 1000;

  // Auto-navigate to expired screen when timer hits 0
  useEffect(() => {
    if (remainingMs === 0) {
      navigate(ROUTES.BOOKING_EXPIRED);
    }
  }, [remainingMs, navigate]);

  const mapsHref = useMemo(() => {
    const q = encodeURIComponent(
      `${stationName || ""} ${stationArea || ""}`.trim()
    );
    return q ? `https://www.google.com/maps/search/?api=1&query=${q}` : "#";
  }, [stationName, stationArea]);

  const handleNavigate = () => {
    if (mapsHref !== "#") {
      window.open(mapsHref, '_blank');
    }
  };

  const handleExtend = () => {
    navigate(ROUTES.EXTEND_HOLD);
  };

  const handleCancel = () => {
    navigate(ROUTES.BOOKING_CANCEL);
  };

  const handleArrived = () => {
    if (station?.type === "self") {
      navigate(ROUTES.SAFETY_CHECKLIST);
    } else {
      navigate(ROUTES.ARRIVED_SHOW_QR);
    }
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Swap booked</h1>
        <p className="evz-header-subtitle">
          Reservation ID: {reservationId || "—"}
        </p>
      </header>

      <main className="evz-content">
        <section className="evz-card">
          <h2 className="evz-card-title">{stationName || "Station"}</h2>
          <p className="evz-card-subtitle">{stationArea}</p>

          <div
            className={
              "evz-timer-shell " +
              (danger ? "evz-timer-shell--danger" : "evz-timer-shell--ok")
            }
          >
            <div
              className="evz-timer-value"
              style={{ color: danger ? "#f77f00" : "#03cd8c" }}
            >
              {msToClock(remainingMs)}
            </div>
            <div className="evz-timer-label">
              Arrive before the timer hits 00:00
            </div>
          </div>

          <div className="evz-actions-row">
            <button
              type="button"
              onClick={handleNavigate}
              className="evz-chip-button"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Navigate
            </button>
            <button
              type="button"
              onClick={handleExtend}
              className="evz-chip-button"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Extend
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="evz-chip-button"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Cancel
            </button>
          </div>

          <button
            type="button"
            onClick={handleArrived}
            className="evz-button-main"
            style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            I have arrived
          </button>

          <p className="evz-footer-note">
            Total booking fee: UGX {fee.toLocaleString("en-UG")}
          </p>
        </section>
      </main>
    </EvzScreen>
  );
}
