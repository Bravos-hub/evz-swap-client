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

.evz-card-text {
  font-size: 13px;
  color: var(--evz-text-secondary);
  margin-top: 4px;
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
  width: 100%;
  margin-top: 8px;
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

const REGIONS = {
  UG: "Uganda",
  KE: "Kenya",
  TZ: "Tanzania",
  RW: "Rwanda",
  NG: "Nigeria",
  IN: "India",
  CN: "China",
};

function useEvzStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("evz-mobile-styles-p25-s03")) return;
    const style = document.createElement("style");
    style.id = "evz-mobile-styles-p25-s03";
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

function getItem(key, fallback = "UG") {
  const ls = safeLocalStorage();
  if (!ls) return fallback;
  try {
    return ls.getItem(key) || fallback;
  } catch {
    return fallback;
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

export default function P25S03LocationOutOfBounds() {
  useEvzStyles();

  const region = getItem("evz.region", "UG");
  const regionName = useMemo(
    () => REGIONS[region] || region,
    [region]
  );

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Outside service area</h1>
        <p className="evz-header-subtitle">
          Your current location may be outside your selected region
        </p>
      </header>

      <div className="evz-divider" />

      <main className="evz-main">
        <section className="evz-card">
          <div className="evz-card-title">Current region</div>
          <p className="evz-card-text">
            {region} — {regionName}
          </p>
          <p className="evz-caption">
            You can still browse stations, but availability and pricing may
            differ.
          </p>
        </section>
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-row">
          <button
            type="button"
            className="evz-btn-secondary"
            onClick={() => goTo("/account/language")}
          >
            Change region
          </button>
          <button
            type="button"
            className="evz-btn-primary"
            onClick={() => goTo("/stations/search")}
          >
            Search anyway
          </button>
        </div>
        <button
          type="button"
          className="evz-btn-ghost"
          onClick={() => goTo("/system/offline")}
        >
          Use cached stations
        </button>
      </footer>
    </EvzScreen>
  );
}
