import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  max-width: 420px;
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

.evz-button--secondary {
  background-color: transparent;
  color: var(--evz-accent);
  border-radius: 999px;
  border: none;
  padding: 10px 12px;
}

.evz-button--secondary:hover {
  text-decoration: underline;
}

.evz-button--disabled {
  opacity: 0.5;
  cursor: default;
  box-shadow: none;
}

.evz-footer-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.evz-hold-list {
  list-style: none;
  padding: 0;
  margin: 0;
  border-radius: 16px;
  background-color: var(--evz-surface);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.04);
  overflow: hidden;
}

.evz-hold-item {
  border-bottom: 1px solid var(--evz-surface-soft);
}

.evz-hold-item:last-child {
  border-bottom: none;
}

.evz-hold-button {
  width: 100%;
  padding: 10px 14px;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  cursor: pointer;
}

.evz-hold-main {
  display: flex;
  flex-direction: column;
}

.evz-hold-label-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.evz-hold-label {
  font-size: 14px;
  font-weight: 700;
}

.evz-hold-desc {
  font-size: 12px;
  color: var(--evz-text-secondary);
}

.evz-hold-price {
  font-size: 14px;
  font-weight: 700;
}

.evz-chip-reco {
  border-radius: 999px;
  padding: 2px 8px;
  font-size: 10px;
  font-weight: 600;
  background-color: var(--evz-accent);
  color: #ffffff;
}

.evz-fee-note {
  margin-top: 8px;
  font-size: 11px;
  color: var(--evz-text-secondary);
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
    const styleId = "evz-mobile-styles";
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

const ST_KEY = "evz.stations";
const BOOK_NS = "evz.booking.";

const HOLD_OPTIONS = [
  { minutes: 0, label: "At station", fee: 3000 },
  { minutes: 5, label: "5 minutes", fee: 3200 },
  { minutes: 10, label: "10 minutes", fee: 3350 },
  { minutes: 15, label: "15 minutes", fee: 3500 },
];

function getStationId(): void {
  if (typeof window === "undefined") return "";
  const qs = new URLSearchParams(window.location.search);
  try {
    return (
      qs.get("stationId") ||
      window.localStorage.getItem("evz.selectedStationId") ||
      ""
    );
  } catch {
    return "";
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

function fmtUGX(n) {
  return `UGX ${Number(n || 0).toLocaleString("en-UG")}`;
}

export default function HoldSelectScreen(): JSX.Element {
  useEvzStyles();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [stationId] = useState(() => {
    const paramId = searchParams.get("stationId");
    if (paramId) return paramId;
    return getStationId();
  });
  const station = useMemo(() => loadStation(stationId), [stationId]);

  // ETA rough estimate using distance (km) * 6 → minutes (~10 km/h urban).
  const etaMin = useMemo(() => {
    const d = station?.distanceKm ?? 1.0;
    return Math.max(1, Math.ceil(d * 6));
  }, [station]);

  const recommended = useMemo(() => {
    const idx = HOLD_OPTIONS.findIndex((o) => o.minutes >= etaMin);
    return idx === -1 ? HOLD_OPTIONS.length - 1 : idx;
  }, [etaMin]);

  const [selectedIdx, setSelectedIdx] = useState(recommended);

  useEffect(() => {
    setSelectedIdx(recommended);
  }, [recommended]);

  const selected = HOLD_OPTIONS[selectedIdx];

  const handleContinue = (): void => {
    if (!station) return;

    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(BOOK_NS + "stationId", station.id);
        window.localStorage.setItem(BOOK_NS + "stationName", station.name);
        window.localStorage.setItem(
          BOOK_NS + "stationArea",
          station.area || ""
        );
        window.localStorage.setItem(
          BOOK_NS + "holdMinutes",
          String(selected.minutes)
        );
        window.localStorage.setItem(
          BOOK_NS + "holdFee",
          String(selected.fee)
        );
        window.localStorage.setItem(BOOK_NS + "eta", String(etaMin));
      }
    } catch {
      // ignore
    }

    navigate(ROUTES.BOOKING_PAYMENT);
  };

  const headerSubtitle = station
    ? `${station.name} • Estimated arrival ~${etaMin} min • ${
        station.ready ?? 0
      } ready / ${station.charging ?? 0} charging`
    : "No station selected";

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Book a swap</h1>
        <p className="evz-header-subtitle">{headerSubtitle}</p>
      </header>

      <main className="evz-content">
        <ul className="evz-hold-list">
          {HOLD_OPTIONS.map((o, idx) => {
            const isReco = idx === recommended;
            return (
              <li key={o.minutes} className="evz-hold-item">
                <button
                  type="button"
                  className="evz-hold-button"
                  onClick={() => setSelectedIdx(idx)}
                >
                  <div className="evz-hold-main">
                    <div className="evz-hold-label-row">
                      <span className="evz-hold-label">{o.label}</span>
                      {isReco && (
                        <span className="evz-chip-reco">Recommended</span>
                      )}
                    </div>
                    <span className="evz-hold-desc">
                      Holds a charged pack for {o.minutes} min
                    </span>
                  </div>
                  <span className="evz-hold-price">{fmtUGX(o.fee)}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <p className="evz-fee-note">
          Booking fee reserves a pack for the chosen time and is non-refundable.
        </p>
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-actions">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!station}
            className={
              "evz-button evz-button--primary" +
              (!station ? " evz-button--disabled" : "")
            }
          >
            Confirm booking — {fmtUGX(selected.fee)}
          </button>

          <button
            type="button"
            onClick={() => navigate(ROUTES.STATION_MAP_LIST)}
            className="evz-button evz-button--secondary"
          >
            Change station
          </button>
        </div>
      </footer>
    </EvzScreen>
  );
}
