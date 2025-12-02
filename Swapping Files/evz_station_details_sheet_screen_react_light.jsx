import React, { useEffect, useMemo, useState } from "react";

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

.evz-footer {
  padding-top: 10px;
}

.evz-button {
  width: 100%;
  border-radius: 999px;
  padding: 14px 18px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.12s ease, box-shadow 0.12s ease,
    background-color 0.12s ease, opacity 0.12s ease;
  outline: none;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border: none;
}

.evz-button--primary {
  background-color: var(--evz-primary);
  color: #ffffff;
  box-shadow: 0 10px 22px rgba(3, 205, 140, 0.32);
}

.evz-button--primary:active {
  transform: translateY(1px);
  box-shadow: 0 6px 14px rgba(3, 205, 140, 0.28);
}

.evz-button--disabled {
  opacity: 0.5;
  cursor: default;
  box-shadow: none;
}

.evz-text-link {
  display: block;
  margin-top: 8px;
  font-size: 13px;
  font-weight: 500;
  color: var(--evz-accent);
  text-align: center;
  text-decoration: none;
}

.evz-text-link:hover {
  text-decoration: underline;
}

.evz-divider {
  height: 1px;
  width: 100%;
  background-color: var(--evz-surface-soft);
  margin: 8px 0 12px;
}

.evz-card {
  padding: 16px;
  border-radius: 16px;
  background-color: var(--evz-surface-soft);
}

.evz-card-title {
  font-size: 18px;
  font-weight: 800;
  margin: 0 0 2px;
}

.evz-card-subtitle {
  font-size: 13px;
  color: var(--evz-text-secondary);
  margin: 0;
}

.evz-chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}

.evz-chip {
  border-radius: 999px;
  padding: 3px 8px;
  font-size: 11px;
  font-weight: 500;
}

.evz-chip--green {
  background-color: var(--evz-primary);
  color: #ffffff;
}

.evz-chip--orange {
  background-color: var(--evz-accent);
  color: #ffffff;
}

.evz-chip--grey {
  background-color: #a6a6a6;
  color: #ffffff;
}

.evz-notes-block {
  margin-top: 14px;
}

.evz-notes-title {
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 2px;
}

.evz-notes-text {
  font-size: 13px;
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

const ST_KEY = "evz.stations";

function getStationIdFromLocation() {
  if (typeof window === "undefined") return "";
  try {
    const params = new URLSearchParams(window.location.search);
    return (
      params.get("stationId") ||
      window.localStorage.getItem("evz.selectedStationId") ||
      ""
    );
  } catch {
    return "";
  }
}

function loadStationById(id) {
  if (!id || typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(ST_KEY) || "[]";
    const all = JSON.parse(raw);
    return all.find((s) => s.id === id) || null;
  } catch {
    return null;
  }
}

export default function StationDetailsSheet({ nextPath = "/booking/hold" }) {
  useEvzStyles();

  const [stationId] = useState(() => getStationIdFromLocation());

  const station = useMemo(() => loadStationById(stationId), [stationId]);

  const canContinue = !!station;
  const href = canContinue
    ? `${nextPath}?stationId=${encodeURIComponent(station.id)}`
    : "#";

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Station details</h1>
        <p className="evz-header-subtitle">
          Review station info and continue
        </p>
      </header>

      <div className="evz-divider" />

      <main className="evz-content">
        {!station && (
          <p className="evz-notes-text">
            No station selected. {" "}
            <a href="/stations/map-list" className="evz-text-link">
              Go back
            </a>
            .
          </p>
        )}

        {station && (
          <section className="evz-card">
            <h2 className="evz-card-title">{station.name}</h2>
            <p className="evz-card-subtitle">{station.area}</p>

            <div className="evz-chip-row">
              <span className="evz-chip evz-chip--green">
                {station.ready} ready
              </span>
              <span className="evz-chip evz-chip--orange">
                {station.charging} charging
              </span>
              <span className="evz-chip evz-chip--grey">
                {station.type === "self" ? "Self-service" : "Operator"}
              </span>
            </div>

            <div className="evz-notes-block">
              <div className="evz-notes-title">Notes</div>
              <p className="evz-notes-text">
                Show this station on arrival to navigate, extend, or cancel
                your booking.
              </p>
            </div>
          </section>
        )}
      </main>

      <footer className="evz-footer">
        <a
          href={href}
          aria-disabled={!canContinue}
          className={
            "evz-button evz-button--primary" +
            (!canContinue ? " evz-button--disabled" : "")
          }
        >
          Continue — choose hold &amp; price
        </a>
        <a href="/stations/map-list" className="evz-text-link">
          Back to list
        </a>
      </footer>
    </EvzScreen>
  );
}
