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

.evz-header {
  margin-bottom: 10px;
}

.evz-header-title {
  margin: 0 0 4px;
  font-size: 22px;
  font-weight: 800;
}

.evz-header-subtitle {
  margin: 0;
  font-size: 13px;
  color: var(--evz-text-secondary);
}

.evz-divider {
  height: 1px;
  width: 100%;
  background-color: #e5e7eb;
  margin: 10px 0 0;
}

.evz-list {
  list-style: none;
  margin: 8px 0 0;
  padding: 0;
  flex: 1;
}

.evz-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 0;
  border-bottom: 1px solid var(--evz-surface-soft);
  text-decoration: none;
  color: inherit;
}

.evz-main {
  display: flex;
  flex-direction: column;
}

.evz-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 700;
}

.evz-distance {
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
  background-color: #fff7ed;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.evz-heart-icon {
  font-size: 18px;
  color: var(--evz-accent);
}

.evz-empty-primary {
  font-size: 14px;
}

.evz-empty-secondary {
  font-size: 12px;
  color: var(--evz-text-secondary);
}

.evz-footer {
  margin-top: auto;
  padding-top: 18px;
}

.evz-footer-link {
  width: 100%;
  border-radius: 999px;
  padding: 11px 16px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  background: none;
  color: var(--evz-accent);
  cursor: pointer;
}

.evz-footer-link:hover {
  text-decoration: underline;
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
    const styleId = "evz-mobile-styles-p14-s03";
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

function safeLocalStorage() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
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

export default function FavoritesStationsScreen() {
  useEvzStyles();

  const [stations, setStations] = useState([]);
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    setStations(loadStations());
    setFavs(loadFavs());
  }, []);

  const rows = useMemo(() => {
    return stations
      .filter((s) => favs.includes(s.id))
      .sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));
  }, [stations, favs]);

  const removeFav = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setFavs((prev) => {
      const next = prev.filter((x) => x !== id);
      saveFavs(next);
      return next;
    });
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(ROUTES.SEARCH_STATIONS);
  };

  const handleStationClick = (stationId) => {
    navigate(`${ROUTES.STATION_DETAILS.replace(':id', stationId)}?stationId=${encodeURIComponent(stationId)}`);
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Favorite stations</h1>
        <p className="evz-header-subtitle">
          Quick access to your saved kiosks
        </p>
      </header>

      <div className="evz-divider" />

      <main>
        <ul className="evz-list">
          {rows.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => handleStationClick(s.id)}
                className="evz-row"
                style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <div className="evz-main">
                  <div className="evz-title">
                    <span>{s.name}</span>
                    <span className="evz-distance">
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
                  aria-label="Remove from favorites"
                  onClick={(e) => removeFav(e, s.id)}
                >
                  <span className="evz-heart-icon">♥</span>
                </button>
              </button>
            </li>
          ))}

          {rows.length === 0 && (
            <li className="evz-row" style={{ borderBottom: "none" }}>
              <div>
                <div className="evz-empty-primary">No favorites yet</div>
                <div className="evz-empty-secondary">
                  Add favorites from Search
                </div>
              </div>
            </li>
          )}
        </ul>
      </main>

      <footer className="evz-footer">
        <button
          type="button"
          className="evz-footer-link"
          onClick={handleBack}
        >
          Back to search
        </button>
      </footer>
    </EvzScreen>
  );
}
