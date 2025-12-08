import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/routes";

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
  gap: 10px;
}

.evz-card {
  border-radius: 16px;
  background-color: var(--evz-surface-soft);
  padding: 12px 14px 10px;
}

.evz-card--clickable {
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.evz-card--clickable:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.evz-card--clickable:active {
  transform: translateY(0);
}

.evz-card--impact {
  background-color: #e8fff6;
  border: 1px solid var(--evz-primary);
}

.evz-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.evz-card-title {
  font-size: 13px;
  font-weight: 800;
}

.evz-chip {
  padding: 2px 10px;
  border-radius: 999px;
  background-color: #a6a6a6;
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
}

.evz-kpi-value-main {
  font-size: 26px;
  font-weight: 900;
}

.evz-kpi-value-main--green {
  color: var(--evz-primary);
}

.evz-kpi-caption {
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-footer {
  padding-top: 20px;
}

.evz-footer-row {
  display: flex;
  gap: 8px;
}

.evz-btn-secondary,
.evz-btn-primary {
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
}
  
  .evz-header-title {
    font-size: 16px;
  }
  
  .evz-header-subtitle {
    font-size: 10px;
  }
}
`;

const KWH_KEY = "evz.analytics.kwhLog";
const CO2F_KEY = "evz.analytics.co2PerKWh";
const SESS_KEY = "evz.swap.sessions";

function useEvzStyles(): void {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = "evz-mobile-styles-p19-s01";
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

function setJSON(key, value) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    ls.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

function getNumber(key, fallback = 0.4) {
  const ls = safeLocalStorage();
  if (!ls) return fallback;
  try {
    const raw = ls.getItem(key);
    return raw == null ? fallback : Number(raw);
  } catch {
    return fallback;
  }
}

function seedKwh(): void {
  const ls = safeLocalStorage();
  if (!ls) return;
  const existing = getJSON(KWH_KEY, []);
  if (existing.length > 0) return;
  const now = Date.now();
  const demo = Array.from({ length: 10 }).map((_, i) => ({
    ts: now - i * 24 * 3600 * 1000,
    kwh: Number((Math.random() * 3).toFixed(2)),
  }));
  setJSON(KWH_KEY, demo);
}

function lastDays(arr, days) {
  const cut = Date.now() - days * 24 * 3600 * 1000;
  return arr.filter((x) => {
    const t = x.ts != null ? x.ts : x.when; // support older session schema
    return (t || 0) >= cut;
  });
}

function goTo(path) {
  if (typeof window === "undefined") return;
  window.location.assign(path);
}

export default function DashboardOverviewScreen(): JSX.Element {
  useEvzStyles();
  const navigate = useNavigate();

  const [kwhLog, setKwhLog] = useState(() => getJSON(KWH_KEY, []));
  const [co2Factor] = useState(() => getNumber(CO2F_KEY, 0.4));
  const [sessions, setSessions] = useState(() => getJSON(SESS_KEY, []));

  useEffect(() => {
    seedKwh();
    // Refresh data when component mounts or when navigating to dashboard
    setKwhLog(getJSON(KWH_KEY, []));
    setSessions(getJSON(SESS_KEY, []));
  }, []);

  const kwh7 = useMemo(
    () => lastDays(kwhLog, 7).reduce((sum, it) => sum + Number(it.kwh || 0), 0),
    [kwhLog]
  );

  const swaps7 = useMemo(
    () => lastDays(sessions.filter((s) => s.type === "completed"), 7).length,
    [sessions]
  );

  const co2kg7 = useMemo(() => kwh7 * co2Factor, [kwh7, co2Factor]);

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Dashboard</h1>
        <p className="evz-header-subtitle">Energy &amp; impact (last 7 days)</p>
        <div className="evz-divider" />
      </header>

      <main className="evz-main">
        <div className="evz-stack">
          <section className="evz-card">
            <div className="evz-card-header">
              <div>
                <div className="evz-card-title">Energy used</div>
                <div className="evz-kpi-value-main evz-kpi-value-main--green">
                  {kwh7.toFixed(2)} kWh
                </div>
              </div>
              <span className="evz-chip">7 days</span>
            </div>
          </section>

          <section 
            className="evz-card evz-card--clickable"
            onClick={() => navigate(ROUTES.SWAP_SESSIONS)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate(ROUTES.SWAP_SESSIONS);
              }
            }}
            aria-label="View swap history"
          >
            <div className="evz-card-title">Swaps completed</div>
            <div className="evz-kpi-value-main">{swaps7}</div>
          </section>

          <section className="evz-card evz-card--impact">
            <div className="evz-card-title">CO₂ impact (estimate)</div>
            <div className="evz-kpi-caption">
              Factor: {co2Factor.toFixed(2)} kg CO₂ / kWh
            </div>
            <div
              className="evz-kpi-value-main evz-kpi-value-main--green"
              style={{ marginTop: 4 }}
            >
              {co2kg7.toFixed(2)} kg
            </div>
            <div className="evz-kpi-caption">
              Adjust factor in Carbon savings
            </div>
          </section>
        </div>
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-row">
          <button
            type="button"
            className="evz-btn-secondary"
            onClick={() => goTo("/dashboard/carbon")}
          >
            Carbon savings
          </button>
          <button
            type="button"
            className="evz-btn-primary"
            onClick={() => goTo("/dashboard/battery")}
          >
            Battery health
          </button>
        </div>
      </footer>
    </EvzScreen>
  );
}
