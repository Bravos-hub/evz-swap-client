import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/routes";

const evzStyles = `
:root {
  --evz-primary: #03cd8c;
  --evz-accent: #f77f00;
  --evz-bg: #ffffff;
  --evz-surface: #f5f5f7;
  --evz-surface-soft: #f2f2f2;
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

.evz-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
}

.evz-header-text h1 {
  margin: 0 0 4px;
  font-size: 24px;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.02em;
}

.evz-header-text p {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
  font-weight: 400;
}

.evz-header-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.evz-header-btn,
.evz-header-btn-secondary {
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.evz-header-btn-secondary {
  border-color: #e5e7eb;
  background-color: #ffffff;
  color: #374151;
}

.evz-header-btn-secondary:hover {
  background-color: #f9fafb;
  border-color: #d1d5db;
}

.evz-header-btn {
  border-color: transparent;
  background: none;
  color: var(--evz-accent);
  font-weight: 600;
}

.evz-header-btn:hover {
  color: #ea580c;
}

.evz-search {
  margin-bottom: 16px;
}

.evz-search-input {
  width: 100%;
  border-radius: 12px;
  border: 1.5px solid #e5e7eb;
  padding: 12px 16px;
  font-size: 15px;
  background-color: #ffffff;
  color: #111827;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.evz-search-input::placeholder {
  color: #9ca3af;
}

.evz-search-input:focus {
  outline: none;
  border-color: var(--evz-primary);
  box-shadow: 0 0 0 3px rgba(3, 205, 140, 0.1);
}

.evz-divider {
  height: 1px;
  width: 100%;
  background-color: #e5e7eb;
  margin: 0 0 12px;
}

.evz-results {
  margin-top: 4px;
  flex: 1;
  overflow-y: auto;
}

.evz-station-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.evz-station-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px solid #f3f4f6;
  text-decoration: none;
  color: inherit;
  transition: background-color 0.15s ease;
  width: 100%;
  text-align: left;
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
  cursor: pointer;
}

.evz-station-row:hover {
  background-color: #fafafa;
  margin: 0 -20px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 0;
}

.evz-station-main {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.evz-station-title {
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-size: 15px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 6px;
  line-height: 1.4;
}

.evz-station-distance {
  font-size: 13px;
  color: #6b7280;
  font-weight: 400;
}

.evz-chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.evz-chip {
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.4;
  letter-spacing: 0.01em;
}

.evz-chip--ready {
  background-color: var(--evz-primary);
  box-shadow: 0 1px 2px rgba(3, 205, 140, 0.2);
}

.evz-chip--charging {
  background-color: var(--evz-accent);
  box-shadow: 0 1px 2px rgba(247, 127, 0, 0.2);
}

.evz-chip--type {
  background-color: #6b7280;
  box-shadow: 0 1px 2px rgba(107, 114, 128, 0.2);
}

.evz-heart-btn {
  border-radius: 8px;
  width: 36px;
  height: 36px;
  border: none;
  background-color: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.evz-heart-btn:hover {
  background-color: #f3f4f6;
  transform: scale(1.05);
}

.evz-heart-btn:active {
  transform: scale(0.95);
}

.evz-heart-icon {
  font-size: 20px;
  line-height: 1;
  color: #9ca3af;
  transition: color 0.2s ease;
}

.evz-heart-icon--active {
  color: var(--evz-accent);
}

.evz-empty-primary {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 4px;
}

.evz-empty-secondary {
  font-size: 13px;
  color: #6b7280;
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
  
  .evz-header-row {
    flex-direction: column;
    gap: 10px;
    margin-bottom: 12px;
  }
  
  .evz-header-text h1 {
    font-size: 18px;
  }
  
  .evz-header-text p {
    font-size: 11px;
  }
  
  .evz-header-actions {
    width: 100%;
    justify-content: flex-start;
    gap: 6px;
  }
  
  .evz-header-btn,
  .evz-header-btn-secondary {
    padding: 6px 8px;
    font-size: 10px;
    flex: 1;
  }
  
  .evz-search {
    margin-bottom: 12px;
  }
  
  .evz-search-input {
    padding: 8px 10px;
    font-size: 12px;
    border-radius: 8px;
  }
  
  .evz-station-row {
    padding: 10px 0;
    gap: 8px;
  }
  
  .evz-station-row:hover {
    margin: 0 -12px;
    padding-left: 12px;
    padding-right: 12px;
  }
  
  .evz-station-title {
    font-size: 12px;
    gap: 4px;
    margin-bottom: 4px;
  }
  
  .evz-station-distance {
    font-size: 10px;
  }
  
  .evz-chip-row {
    gap: 4px;
    margin-top: 4px;
  }
  
  .evz-chip {
    padding: 2px 6px;
    font-size: 8px;
    border-radius: 4px;
  }
  
  .evz-heart-btn {
    width: 28px;
    height: 28px;
    border-radius: 6px;
  }
  
  .evz-heart-icon {
    font-size: 14px;
  }
  
  .evz-empty-primary {
    font-size: 13px;
  }
  
  .evz-empty-secondary {
    font-size: 11px;
  }
}
`;

function useEvzStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = "evz-mobile-styles-p14-s01";
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
const FAV_KEY = "evz.stations.favs";

const DEMO_STATIONS = [
  { id: "s1", provider: "gogo", name: "GoGo | Kira Road", area: "Kampala", distanceKm: 1.2, ready: 3, charging: 5, type: "operator" },
  { id: "s2", provider: "gogo", name: "GoGo | Ntinda Market", area: "Ntinda", distanceKm: 2.1, ready: 2, charging: 4, type: "self" },
  { id: "s3", provider: "spira", name: "Spira | Bukoto", area: "Kampala", distanceKm: 0.8, ready: 1, charging: 6, type: "operator" },
  { id: "s4", provider: "zembo", name: "Zembo | Kabalagala", area: "Kampala", distanceKm: 3.4, ready: 6, charging: 2, type: "self" },
  { id: "s5", provider: "open", name: "Open Std | Naalya", area: "Naalya", distanceKm: 4.7, ready: 0, charging: 7, type: "self" },
];

function safeLocalStorage() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function seedStations() {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    if (!ls.getItem(ST_KEY)) {
      ls.setItem(ST_KEY, JSON.stringify(DEMO_STATIONS));
    }
  } catch {
    // ignore
  }
}

function loadStations() {
  const ls = safeLocalStorage();
  if (!ls) return [];
  try {
    return JSON.parse(ls.getItem(ST_KEY) || "[]");
  } catch {
    return [];
  }
}

function loadFavs() {
  const ls = safeLocalStorage();
  if (!ls) return [];
  try {
    return JSON.parse(ls.getItem(FAV_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveFavs(arr) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    ls.setItem(FAV_KEY, JSON.stringify(arr));
  } catch {
    // ignore
  }
}

function getFilter(key, fallback) {
  const ls = safeLocalStorage();
  if (!ls) return fallback;
  try {
    const v = ls.getItem("evz.filters." + key);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

export default function SearchStationsScreen() {
  useEvzStyles();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [stations, setStations] = useState([]);
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    seedStations();
    setStations(loadStations());
    setFavs(loadFavs());
  }, []);

  const provider = getFilter("provider", "all") || "all";
  const readyMin = Number(getFilter("readyMin", "0") || "0");
  const selfOnly = getFilter("selfOnly", "false") === "true";

  const results = useMemo(() => {
    const qn = query.trim().toLowerCase();
    return stations
      .filter((s) => provider === "all" || s.provider === provider)
      .filter((s) => (s.ready || 0) >= readyMin)
      .filter((s) => !selfOnly || s.type === "self")
      .filter((s) => {
        if (!qn) return true;
        const name = (s.name || "").toLowerCase();
        const area = (s.area || "").toLowerCase();
        return name.includes(qn) || area.includes(qn);
      })
      .sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));
  }, [stations, provider, readyMin, selfOnly, query]);

  const isFav = (id) => favs.includes(id);

  const toggleFav = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setFavs((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      saveFavs(next);
      return next;
    });
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <div className="evz-header-row">
          <div className="evz-header-text">
            <h1>Search stations</h1>
            <p>Find a kiosk near you</p>
          </div>
          <div className="evz-header-actions">
            <button
              type="button"
              onClick={() => navigate(ROUTES.FILTERS)}
              className="evz-header-btn-secondary"
            >
              Filters
            </button>
            <button
              type="button"
              onClick={() => navigate(ROUTES.FAVORITES)}
              className="evz-header-btn"
            >
              Favorites
            </button>
          </div>
        </div>
        <div className="evz-search">
          <input
            className="evz-search-input"
            type="search"
            placeholder="Search by name or area"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </header>

      <div className="evz-divider" />

      <main className="evz-results">
        <ul className="evz-station-list">
          {results.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => navigate(`${ROUTES.STATION_DETAILS.replace(':id', s.id)}?stationId=${encodeURIComponent(s.id)}`)}
                className="evz-station-row"
              >
                <div className="evz-station-main">
                  <div className="evz-station-title">
                    <span>{s.name}</span>
                    <span className="evz-station-distance">
                      • {typeof s.distanceKm === "number" ? s.distanceKm.toFixed(1) : "–"} km
                    </span>
                  </div>
                  <div className="evz-chip-row">
                    <span className="evz-chip evz-chip--ready">
                      {(s.ready ?? 0)} ready
                    </span>
                    <span className="evz-chip evz-chip--charging">
                      {(s.charging ?? 0)} charging
                    </span>
                    <span className="evz-chip evz-chip--type">
                      {s.type === "self" ? "Self-service" : "Operator"}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="evz-heart-btn"
                  aria-label={isFav(s.id) ? "Remove from favorites" : "Add to favorites"}
                  onClick={(e) => toggleFav(e, s.id)}
                >
                  <span
                    className={
                      "evz-heart-icon" + (isFav(s.id) ? " evz-heart-icon--active" : "")
                    }
                  >
                    {isFav(s.id) ? "♥" : "♡"}
                  </span>
                </button>
              </button>
            </li>
          ))}

          {results.length === 0 && (
            <li className="evz-station-row" style={{ borderBottom: "none" }}>
              <div>
                <div className="evz-empty-primary">No stations found</div>
                <div className="evz-empty-secondary">
                  Try changing your search or filters
                </div>
              </div>
            </li>
          )}
        </ul>
      </main>
    </EvzScreen>
  );
}
