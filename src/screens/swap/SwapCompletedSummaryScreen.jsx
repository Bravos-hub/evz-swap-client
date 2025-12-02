import React, { useEffect, useMemo, useState } from "react";

const evzStyles = `
:root {
  --evz-primary: #03cd8c;
  --evz-accent: #f77f00;
  --evz-bg: #f5f7fb;
  --evz-surface: #ffffff;
  --evz-surface-soft: #f2f2f2;
  --evz-text-primary: #111827;
  --evz-text-secondary: #6b7280;
  --evz-border-subtle: rgba(15, 23, 42, 0.08);
}

body {
  margin: 0;
  padding: 0;
  background: #ffffff;
}

.evz-app {
  min-height: 100vh;
  background: #ffffff;
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

.evz-header-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.evz-success-avatar {
  width: 64px;
  height: 64px;
  border-radius: 999px;
  background-color: var(--evz-primary);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 28px;
}

.evz-header-title {
  font-size: 22px;
  font-weight: 800;
  margin: 0;
}

.evz-header-subtitle {
  font-size: 13px;
  color: var(--evz-text-secondary);
  margin: 0;
}

.evz-content {
  flex: 1;
}

.evz-card {
  border-radius: 16px;
  background-color: var(--evz-surface-soft);
  padding: 14px;
}

.evz-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  margin-bottom: 4px;
}

.evz-row-label {
  color: var(--evz-text-secondary);
}

.evz-row-value {
  font-weight: 500;
}

.evz-row--strong .evz-row-label,
.evz-row--strong .evz-row-value {
  font-weight: 800;
}

.evz-footer {
  margin-top: auto;
  padding-top: 18px;
}

.evz-footer-row {
  display: flex;
  gap: 10px;
}

.evz-button-outline,
.evz-button-primary {
  flex: 1;
  border-radius: 999px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.evz-button-outline {
  border: 1px solid #a6a6a6;
  background-color: transparent;
  color: var(--evz-text-primary);
}

.evz-button-outline:hover {
  background-color: #f9fafb;
}

.evz-button-primary {
  border: none;
  background-color: var(--evz-primary);
  color: #ffffff;
  box-shadow: 0 10px 22px rgba(3, 205, 140, 0.32);
}

.evz-button-primary:active {
  transform: translateY(1px);
  box-shadow: 0 6px 14px rgba(3, 205, 140, 0.28);
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
    const styleId = "evz-mobile-styles-p11-s02";
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

function EvzScreen({ children }) {
  return (
    <div className="evz-app">
      <div className="evz-screen">{children}</div>
    </div>
  );
}

const BOOK_NS = "evz.booking.";
const SWAP_NS = "evz.swap.";
const SELF_NS = "evz.self.";
const VEH_KEY = "evz.vehicles";

function get(ns, key, fallback = "") {
  if (typeof window === "undefined") return fallback;
  try {
    return window.localStorage.getItem(ns + key) || fallback;
  } catch {
    return fallback;
  }
}

function fmtUGX(n) {
  return `UGX ${Number(n || 0).toLocaleString("en-UG")}`;
}

function loadVehicles() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(VEH_KEY) || "[]");
  } catch {
    return [];
  }
}

function fmtDuration(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m} min ${r} s`;
}

export default function SwapCompletedSummaryScreen({
  nextPath = "/swap/self/rate",
}) {
  useEvzStyles();

  const stationName = get(BOOK_NS, "stationName");
  const reservationId = get(BOOK_NS, "reservationId");
  const totalUGX = Number(get(SWAP_NS, "totalUGX", "0"));
  const completedAt = Number(
    get(SWAP_NS, "completedAt", String(Date.now()))
  );
  const durationMs = Number(get(SWAP_NS, "durationMs", "0"));
  const newBatteryId = get(SELF_NS, "newBatteryId", "");

  const [vehicles] = useState(() => loadVehicles());

  const selectedVehicleId =
    typeof window !== "undefined"
      ? window.localStorage.getItem("evz.selectedVehicleId") || ""
      : "";

  const vehicle = useMemo(
    () => vehicles.find((v) => v.id === selectedVehicleId) || null,
    [vehicles, selectedVehicleId]
  );

  return (
    <EvzScreen>
      <header className="evz-header">
        <div className="evz-header-center">
          <div className="evz-success-avatar">✔</div>
          <h1 className="evz-header-title">Swap completed</h1>
          <p className="evz-header-subtitle">
            Your battery has been successfully swapped.
          </p>
        </div>
      </header>

      <main className="evz-content">
        <section className="evz-card">
          <div className="evz-row">
            <span className="evz-row-label">Station</span>
            <span className="evz-row-value">{stationName || "—"}</span>
          </div>
          <div className="evz-row">
            <span className="evz-row-label">Reservation</span>
            <span className="evz-row-value">{reservationId || "—"}</span>
          </div>
          <div className="evz-row">
            <span className="evz-row-label">Vehicle</span>
            <span className="evz-row-value">
              {vehicle ? `${vehicle.name} • ${vehicle.plate}` : "—"}
            </span>
          </div>
          <div className="evz-row">
            <span className="evz-row-label">New Battery</span>
            <span className="evz-row-value">{newBatteryId || "—"}</span>
          </div>
          <div className="evz-row">
            <span className="evz-row-label">Date &amp; time</span>
            <span className="evz-row-value">
              {new Date(completedAt).toLocaleString()}
            </span>
          </div>
          <div className="evz-row evz-row--strong">
            <span className="evz-row-label">Total</span>
            <span className="evz-row-value">{fmtUGX(totalUGX)}</span>
          </div>
          <div className="evz-row">
            <span className="evz-row-label">Duration</span>
            <span className="evz-row-value">{fmtDuration(durationMs)}</span>
          </div>
        </section>
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-row">
          <a
            href="/vehicles/select"
            className="evz-button-outline"
          >
            Skip
          </a>
          <a href={nextPath} className="evz-button-primary">
            Rate experience
          </a>
        </div>
      </footer>
    </EvzScreen>
  );
}
