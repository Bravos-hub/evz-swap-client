import React, { useEffect, useMemo, useState } from "react";

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
  max-width: 430px;
  min-height: 100vh;
  padding: 24px 20px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.evz-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.evz-header-text h1 {
  margin: 0 0 2px;
  font-size: 22px;
  font-weight: 800;
}

.evz-header-text p {
  margin: 0;
  font-size: 13px;
  color: var(--evz-text-secondary);
}

.evz-header-actions {
  display: flex;
  gap: 6px;
}

.evz-header-btn,
.evz-header-btn-secondary {
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid transparent;
}

.evz-header-btn-secondary {
  border-color: #a6a6a6;
  background-color: #ffffff;
  color: var(--evz-text-primary);
}

.evz-header-btn {
  border-color: transparent;
  background: none;
  color: var(--evz-accent);
}

.evz-search {
  margin-bottom: 10px;
}

.evz-search-input {
  width: 100%;
  border-radius: 999px;
  border: 1px solid var(--evz-border-subtle);
  padding: 9px 12px;
  font-size: 14px;
}

.evz-search-input:focus {
  outline: none;
  border-color: rgba(3, 205, 140, 0.9);
  box-shadow: 0 0 0 1px rgba(3, 205, 140, 0.08);
}

.evz-divider {
  height: 1px;
  width: 100%;
  background-color: #e5e7eb;
  margin: 8px 0 0;
}

.evz-results {
  margin-top: 8px;
  flex: 1;
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
  gap: 8px;
  padding: 10px 0;
  border-bottom: 1px solid var(--evz-surface-soft);
  text-decoration: none;
  color: inherit;
}

.evz-station-main {
  display: flex;
  flex-direction: column;
}

.evz-station-title {
  display: flex;
  align-items: center;
  gap: 6px;
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
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 600;
  color: #ffffff;
}

.evz-chip--ready {
  background-color: var(--evz-primary);
}

.evz-chip--charging {
  background-color: var(--evz-accent);
}

.evz-chip--type {
  background-color: #a6a6a6;
}

.evz-heart-btn {
  border-radius: 999px;
  width: 32px;
  height: 32px;
  border: none;
  background-color: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.evz-heart-icon {
  font-size: 18px;
  line-height: 1;
}

.evz-heart-icon--active {
  color: var(--evz-accent);
}

.evz-empty-primary {
  font-size: 14px;
}

.evz-empty-secondary {
  font-size: 12px;
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
    if (typeof document === "undefined") return;
    if (document.getElementById("evz-mobile-styles-p14-s01")) return;
    const style = document.createElement("style");
    style.id = "evz-mobile-styles-p14-s01";
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

export default function P14S01SearchStations() {
  useEvzStyles();

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
            <a href="/stations/filters" className="evz-header-btn-secondary">
              Filters
            </a>
            <a href="/stations/favorites" className="evz-header-btn">
              Favorites
            </a>
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
              <a
                href={`/stations/details?stationId=${encodeURIComponent(s.id)}`}
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
              </a>
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
