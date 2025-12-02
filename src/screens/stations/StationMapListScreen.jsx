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
  font-size: 20px;
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

.evz-map-shell {
  margin-top: 6px;
}

.evz-map-card {
  height: 160px;
  border-radius: 16px;
  background-color: var(--evz-surface-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: #a6a6a6;
}

.evz-map-actions {
  margin-top: 4px;
  text-align: right;
}

.evz-map-link {
  border: none;
  background: none;
  padding: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--evz-accent);
  cursor: pointer;
}

.evz-divider {
  height: 1px;
  width: 100%;
  background-color: var(--evz-surface-soft);
  margin: 12px 0 4px;
}

.evz-station-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.evz-station-item {
  width: 100%;
  border: none;
  background: transparent;
  padding: 10px 0;
  text-align: left;
  border-bottom: 1px solid var(--evz-surface-soft);
}

.evz-station-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}

.evz-station-title {
  font-size: 14px;
  font-weight: 700;
}

.evz-station-distance {
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
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

function useEvzStyles() {
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

function EvzScreen({ children }) {
  return (
    <div className="evz-app">
      <div className="evz-screen">{children}</div>
    </div>
  );
}

const ST_KEY = "evz.stations";

const DEMO_STATIONS = [
  { id: "s1", provider: "gogo", name: "GoGo | Kira Road", area: "Kampala", distanceKm: 1.2, ready: 3, charging: 5, type: "operator" },
  { id: "s2", provider: "gogo", name: "GoGo | Ntinda Market", area: "Ntinda", distanceKm: 2.1, ready: 2, charging: 4, type: "self" },
  { id: "s3", provider: "spira", name: "Spira | Bukoto", area: "Kampala", distanceKm: 0.8, ready: 1, charging: 6, type: "operator" },
  { id: "s4", provider: "zembo", name: "Zembo | Kabalagala", area: "Kampala", distanceKm: 3.4, ready: 6, charging: 2, type: "self" },
  { id: "s5", provider: "open", name: "Open Std | Naalya", area: "Naalya", distanceKm: 4.7, ready: 0, charging: 7, type: "self" },
];

function getProviderFromLocation() {
  if (typeof window === "undefined") return { id: "", name: "" };
  try {
    const params = new URLSearchParams(window.location.search);
    const id =
      params.get("provider") ||
      window.localStorage.getItem("evz.providerId") ||
      "";
    const name =
      window.localStorage.getItem("evz.providerName") ||
      (id ? id.toUpperCase() : "");
    return { id, name };
  } catch {
    return { id: "", name: "" };
  }
}

function seedStations() {
  if (typeof window === "undefined") return;
  try {
    const existing = window.localStorage.getItem(ST_KEY);
    if (!existing) {
      window.localStorage.setItem(ST_KEY, JSON.stringify(DEMO_STATIONS));
    }
  } catch {
    // ignore
  }
}

function loadStations(providerId) {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ST_KEY) || "[]";
    const all = JSON.parse(raw);
    return all
      .filter((s) => s.provider === providerId)
      .sort((a, b) => a.distanceKm - b.distanceKm);
  } catch {
    return [];
  }
}

export default function StationMapListScreen() {
  useEvzStyles();
  const navigate = useNavigate();

  const [{ id: providerId, name: providerName }] = useState(
    () => getProviderFromLocation()
  );

  const [selectedId, setSelectedId] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      return window.localStorage.getItem("evz.selectedStationId") || "";
    } catch {
      return "";
    }
  });

  const [stations, setStations] = useState([]);

  useEffect(() => {
    seedStations();
    setStations(loadStations(providerId));
  }, [providerId]);

  const selected = useMemo(
    () => stations.find((s) => s.id === selectedId) || null,
    [stations, selectedId]
  );

  const handlePick = (id) => {
    setSelectedId(id);
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("evz.selectedStationId", id);
      }
    } catch {
      // ignore
    }
  };

  const handleViewDetails = () => {
    if (!selected) return;
    navigate(`${ROUTES.STATION_DETAILS.replace(':id', selected.id)}?stationId=${encodeURIComponent(selected.id)}`);
  };

  // const handleSearch = () => {
  //   navigate(ROUTES.SEARCH_STATIONS);
  // }; // Reserved for future use

  // const handleFilters = () => {
  //   navigate(ROUTES.FILTERS);
  // }; // Reserved for future use

  // const handleFavorites = () => {
  //   navigate(ROUTES.FAVORITES);
  // }; // Reserved for future use

  const title = providerName || "Stations";

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">{title}</h1>
        <p className="evz-header-subtitle">
          Nearby battery swap stations
        </p>
      </header>

      <section className="evz-map-shell">
        <div className="evz-map-card">Map preview (provider pins)</div>
        <div className="evz-map-actions">
          <button type="button" className="evz-map-link">
            View larger map
          </button>
        </div>
      </section>

      <div className="evz-divider" />

      <main className="evz-content">
        <ul className="evz-station-list">
          {stations.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                className="evz-station-item"
                onClick={() => handlePick(s.id)}
              >
                <div className="evz-station-main">
                  <span className="evz-station-title">{s.name}</span>
                  <span className="evz-station-distance">
                    {s.distanceKm.toFixed(1)} km
                  </span>
                </div>
                <div className="evz-chip-row">
                  <span className="evz-chip evz-chip--green">
                    {s.ready} ready
                  </span>
                  <span className="evz-chip evz-chip--orange">
                    {s.charging} charging
                  </span>
                  <span className="evz-chip evz-chip--grey">
                    {s.type === "self" ? "Self-service" : "Operator"}
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </main>

      <footer className="evz-footer">
        <button
          type="button"
          onClick={handleViewDetails}
          disabled={!selected}
          className={
            "evz-button evz-button--primary" +
            (!selected ? " evz-button--disabled" : "")
          }
        >
          Continue — choose hold &amp; price
        </button>
        <button
          type="button"
          onClick={() => navigate(ROUTES.PROVIDER_SELECT)}
          className="evz-text-link"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginTop: '8px' }}
        >
          Change provider
        </button>
      </footer>
    </EvzScreen>
  );
}
