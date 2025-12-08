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

.evz-card {
  border-radius: 16px;
  background-color: var(--evz-surface-soft);
  padding: 12px 14px 10px;
}

.evz-card + .evz-card {
  margin-top: 10px;
}

.evz-card--highlight {
  background-color: #e8fff6;
  border: 1px solid var(--evz-primary);
}

.evz-card--tips {
  background-color: #fff7f0;
  border: 1px solid var(--evz-accent);
}

.evz-card-title {
  font-size: 13px;
  font-weight: 800;
}

.evz-gauge-box {
  margin-top: 10px;
  padding: 12px;
  border-radius: 12px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  text-align: center;
}

.evz-gauge-value {
  font-size: 30px;
  font-weight: 900;
}

.evz-gauge-caption {
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-slider {
  width: 100%;
  margin-top: 10px;
}

.evz-slider input[type="range"] {
  width: 100%;
}

.evz-kpi-box {
  margin-top: 10px;
  padding: 12px;
  border-radius: 12px;
  background-color: #ffffff;
  border: 1px solid #eeeeee;
  text-align: center;
}

.evz-kpi-main {
  font-size: 20px;
  font-weight: 900;
}

.evz-kpi-caption {
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-tips-list {
  margin: 6px 0 0 18px;
  padding: 0;
}

.evz-tips-list li {
  margin-bottom: 4px;
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

function useEvzStyles(): void {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = "evz-mobile-styles-p19-s03";
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

function getNum(key, fallback = 0) {
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

export default function BatteryHealthDetailScreen(): JSX.Element {
  useEvzStyles();
  const navigate = useNavigate();

  const [soh, setSoh] = useState(() => getNum("evz.battery.soh", 95));
  const [cycles, setCycles] = useState(() => getNum("evz.battery.cycles", 120));
  const lastKwh = getNum("evz.swap.energyKWh", 0);

  const bandColor = useMemo(() => {
    if (soh >= 85) return "var(--evz-primary)";
    if (soh >= 70) return "var(--evz-accent)";
    return "#e53935";
  }, [soh]);

  const handleSave = (): void => {
    setNum("evz.battery.soh", soh);
    setNum("evz.battery.cycles", cycles);
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Battery health</h1>
        <p className="evz-header-subtitle">State of Health (estimate)</p>
        <div className="evz-divider" />
      </header>

      <main className="evz-main">
        <section className="evz-card">
          <div className="evz-card-title">State of Health</div>
          <div
            className="evz-gauge-box"
            style={{ borderColor: bandColor }}
          >
            <div
              className="evz-gauge-value"
              style={{ color: bandColor }}
            >
              {soh.toFixed(0)}%
            </div>
            <div className="evz-gauge-caption">Higher is better</div>
          </div>
          <div className="evz-slider">
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={soh}
              onChange={(e) => setSoh(Number(e.target.value))}
            />
          </div>
        </section>

        <section className="evz-card">
          <div className="evz-card-title">Cycles</div>
          <div className="evz-kpi-box">
            <div className="evz-kpi-main">{cycles}</div>
            <div className="evz-kpi-caption">Approximate charge cycles</div>
          </div>
          <div className="evz-slider">
            <input
              type="range"
              min={0}
              max={1000}
              step={1}
              value={cycles}
              onChange={(e) => setCycles(Number(e.target.value))}
            />
          </div>
        </section>

        <section className="evz-card evz-card--highlight">
          <div className="evz-card-title">Last swap</div>
          <div className="evz-kpi-caption">Energy used</div>
          <div
            className="evz-kpi-main"
            style={{ color: "var(--evz-primary)", marginTop: 4 }}
          >
            {lastKwh.toFixed(2)} kWh
          </div>
        </section>

        <section className="evz-card evz-card--tips">
          <div className="evz-card-title">Tips</div>
          <ul className="evz-tips-list">
            <li>
              <span> Avoid frequent deep discharges (0–10%).</span>
            </li>
            <li>
              <span> Prefer moderate charge levels for storage (40–70%).</span>
            </li>
            <li>
              <span> Keep the pack cool; avoid prolonged heat exposure.</span>
            </li>
          </ul>
        </section>
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-row">
          <button
            type="button"
            className="evz-btn-secondary"
            onClick={() => navigate(ROUTES.DASHBOARD)}
          >
            Back
          </button>
          <button
            type="button"
            className="evz-btn-primary"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </footer>
    </EvzScreen>
  );
}
