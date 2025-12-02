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
  margin-top: 10px;
}

.evz-main {
  padding-top: 12px;
}

.evz-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.evz-field {
  margin-bottom: 4px;
}

.evz-label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 4px;
}

.evz-select,
.evz-input {
  width: 100%;
  border-radius: 12px;
  border: 1px solid var(--evz-border-subtle);
  padding: 8px 10px;
  font-size: 14px;
  box-sizing: border-box;
  background-color: #ffffff;
}

.evz-select:focus,
.evz-input:focus {
  outline: none;
  border-color: rgba(3, 205, 140, 0.9);
  box-shadow: 0 0 0 1px rgba(3, 205, 140, 0.08);
}

.evz-card {
  border-radius: 16px;
  background-color: var(--evz-surface-soft);
  padding: 12px 14px 10px;
}

.evz-card--factor {
  background-color: #e8fff6;
  border: 1px solid var(--evz-primary);
}

.evz-card-title {
  font-size: 13px;
  font-weight: 800;
}

.evz-card-row {
  display: flex;
  flex-direction: row;
  gap: 24px;
  margin-top: 8px;
}

.evz-kpi-label {
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-kpi-value-main {
  font-size: 20px;
  font-weight: 900;
}

.evz-kpi-value-main--green {
  color: var(--evz-primary);
}

.evz-caption {
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-row-inline {
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-top: 8px;
}

.evz-footer {
  margin-top: auto;
  padding-top: 20px;
}

.evz-footer-row {
  display: flex;
  gap: 8px;
}

.evz-btn-secondary,
.evz-btn-primary,
.evz-btn-text {
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

.evz-btn-text {
  border: none;
  background: none;
  color: var(--evz-accent);
}

.evz-btn-text:hover {
  text-decoration: underline;
}

@media (max-width: 375px) {
  .evz-screen {
    padding-inline: 16px;
  }
}
`;

const KWH_KEY = "evz.analytics.kwhLog";
const CO2F_KEY = "evz.analytics.co2PerKWh";

function useEvzStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = "evz-mobile-styles-p19-s02";
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

function getNum(key, fallback = 0.4) {
  const ls = safeLocalStorage();
  if (!ls) return fallback;
  try {
    const raw = ls.getItem(key);
    return raw == null ? fallback : Number(raw);
  } catch {
    return fallback;
  }
}

function setNum(key, value) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    ls.setItem(key, String(value));
  } catch {
    // ignore
  }
}

function lastDays(arr, days) {
  const cut = Date.now() - days * 24 * 3600 * 1000;
  return arr.filter((x) => (x.ts || 0) >= cut);
}

function downloadCSV(filename, rows) {
  try {
    const header = ["timestamp_iso", "kwh"];
    const lines = [header.join(",")].concat(
      rows.map((r) => [new Date(r.ts).toISOString(), r.kwh].join(","))
    );
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  } catch {
    // ignore
  }
}

function goTo(path) {
  if (typeof window === "undefined") return;
  window.location.assign(path);
}

export default function CarbonSavingsDetailScreen() {
  useEvzStyles();

  const [period, setPeriod] = useState(7);
  const [factor, setFactor] = useState(() => getNum(CO2F_KEY, 0.4));
  const [kwhLog, setKwhLog] = useState(() => getJSON(KWH_KEY, []));

  useEffect(() => {
    setKwhLog(getJSON(KWH_KEY, []));
  }, []);

  const windowLog = useMemo(
    () => lastDays(kwhLog, period),
    [kwhLog, period]
  );

  const kwh = useMemo(
    () => windowLog.reduce((sum, it) => sum + Number(it.kwh || 0), 0),
    [windowLog]
  );

  const co2 = useMemo(() => kwh * factor, [kwh, factor]);

  const handleSaveFactor = () => {
    setNum(CO2F_KEY, factor);
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Carbon savings</h1>
        <p className="evz-header-subtitle">Estimate based on energy usage</p>
        <div className="evz-divider" />
      </header>

      <main className="evz-main">
        <div className="evz-stack">
          <section>
            <div className="evz-field">
              <label className="evz-label" htmlFor="evz-period">
                Period
              </label>
              <select
                id="evz-period"
                className="evz-select"
                value={period}
                onChange={(e) => setPeriod(Number(e.target.value))}
              >
                <option value={7}>Last 7 days</option>
                <option value={30}>Last 30 days</option>
                <option value={90}>Last 90 days</option>
              </select>
            </div>
          </section>

          <section className="evz-card">
            <div className="evz-card-title">Totals</div>
            <div className="evz-card-row">
              <div>
                <div className="evz-kpi-label">Energy</div>
                <div className="evz-kpi-value-main evz-kpi-value-main--green">
                  {kwh.toFixed(2)} kWh
                </div>
              </div>
              <div>
                <div className="evz-kpi-label">CO₂ (kg)</div>
                <div className="evz-kpi-value-main">{co2.toFixed(2)}</div>
              </div>
            </div>
          </section>

          <section className="evz-card evz-card--factor">
            <div className="evz-card-title">Factor</div>
            <p className="evz-caption">
              kg CO₂ per kWh (adjust to reflect your grid mix)
            </p>
            <div className="evz-row-inline">
              <input
                className="evz-input"
                inputMode="decimal"
                value={factor}
                onChange={(e) =>
                  setFactor(Number(e.target.value || "0"))
                }
              />
              <button
                type="button"
                className="evz-btn-primary"
                style={{ flex: "0 0 120px" }}
                onClick={handleSaveFactor}
              >
                Save
              </button>
            </div>
          </section>

          <section>
            <div className="evz-footer-row">
              <button
                type="button"
                className="evz-btn-secondary"
                onClick={() => downloadCSV("EVZ-kwh-log.csv", windowLog)}
              >
                Export CSV
              </button>
              <button
                type="button"
                className="evz-btn-text"
                onClick={() => goTo("/dashboard")}
              >
                Back
              </button>
            </div>
          </section>
        </div>
      </main>
    </EvzScreen>
  );
}
