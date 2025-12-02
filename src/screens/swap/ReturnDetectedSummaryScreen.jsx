import React, { useEffect, useMemo } from "react";

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
}

.evz-card {
  border-radius: 16px;
  background-color: var(--evz-surface-soft);
  padding: 14px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.04);
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

.evz-verified-box {
  margin-top: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  background-color: #e8fff6;
  border: 1px solid var(--evz-primary);
  font-size: 13px;
  color: var(--evz-primary);
}

.evz-footer {
  margin-top: auto;
  padding-top: 18px;
}

.evz-footer-row {
  display: flex;
  gap: 10px;
}

.evz-button {
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

.evz-button--secondary {
  border: 1px solid #a6a6a6;
  background-color: transparent;
  color: var(--evz-text-primary);
}

.evz-button--secondary:hover {
  background-color: #f9fafb;
}

.evz-button--primary {
  border: none;
  background-color: var(--evz-primary);
  color: #ffffff;
  box-shadow: 0 10px 22px rgba(3, 205, 140, 0.32);
}

.evz-button--primary:active {
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
    if (document.getElementById("evz-mobile-styles-p10-s01")) return;
    const style = document.createElement("style");
    style.id = "evz-mobile-styles-p10-s01";
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

const SELF_NS = "evz.self.";
const SWAP_NS = "evz.swap.";
const BOOK_NS = "evz.booking.";

function get(ns, key, fallback = "") {
  if (typeof window === "undefined") return fallback;
  try {
    return window.localStorage.getItem(ns + key) || fallback;
  } catch {
    return fallback;
  }
}

export default function ReturnDetectedSummaryScreen({
  nextPath = "/swap/self/pay",
}) {
  useEvzStyles();

  const stationName = get(BOOK_NS, "stationName");
  const lockerId = get(SELF_NS, "locker.id", "A07");
  const batteryId = get(SELF_NS, "returnBatteryId", "");
  const energyKWh = Number(get(SWAP_NS, "energyKWh", "2.40"));
  const lastSwapAt = Number(get(SWAP_NS, "lastSwapAt", ""));

  const lastSwapTxt = useMemo(
    () => (lastSwapAt ? new Date(lastSwapAt).toLocaleString() : "—"),
    [lastSwapAt]
  );

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Return detected</h1>
        <p className="evz-header-subtitle">{stationName || "Station"}</p>
      </header>

      <main className="evz-content">
        <section className="evz-card">
          <div className="evz-row">
            <span className="evz-row-label">Battery ID</span>
            <span className="evz-row-value">{batteryId || "—"}</span>
          </div>
          <div className="evz-row">
            <span className="evz-row-label">Slot</span>
            <span className="evz-row-value">{lockerId}</span>
          </div>
          <div className="evz-row">
            <span className="evz-row-label">Energy used</span>
            <span className="evz-row-value">
              {energyKWh.toFixed(2)} kWh
            </span>
          </div>
          <div className="evz-row">
            <span className="evz-row-label">Last swap</span>
            <span className="evz-row-value">{lastSwapTxt}</span>
          </div>

          <div className="evz-verified-box">
            System check complete — energy usage and ID verified.
          </div>
        </section>
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-row">
          <a
            href="/swap/self/insert-return"
            className="evz-button evz-button--secondary"
          >
            Back
          </a>
          <a
            href={nextPath}
            className="evz-button evz-button--primary"
          >
            Continue to payment
          </a>
        </div>
      </footer>
    </EvzScreen>
  );
}
