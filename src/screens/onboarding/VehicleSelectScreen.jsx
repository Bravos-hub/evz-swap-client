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
  background-color: var(--evz-accent);
  color: #ffffff;
  box-shadow: 0 10px 22px rgba(247, 127, 0, 0.35);
}

.evz-button--primary:active {
  transform: translateY(1px);
  box-shadow: 0 6px 14px rgba(247, 127, 0, 0.3);
}

.evz-button--secondary {
  background-color: transparent;
  color: var(--evz-text-primary);
  border: 1px solid var(--evz-border-subtle);
  box-shadow: none;
}

.evz-button--secondary:active {
  transform: translateY(1px);
}

.evz-button--disabled {
  opacity: 0.55;
  cursor: default;
}

.evz-footer-row {
  display: flex;
  gap: 8px;
}

.evz-footer-hint {
  margin-top: 8px;
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-filter-group {
  margin-top: 14px;
  background-color: var(--evz-surface);
  border-radius: 999px;
  padding: 3px;
  border: 1px solid var(--evz-border-subtle);
  display: flex;
  gap: 4px;
}

.evz-filter-pill {
  flex: 1;
  border-radius: 999px;
  border: none;
  background: transparent;
  padding: 8px 10px;
  font-size: 13px;
  font-weight: 500;
  color: var(--evz-text-secondary);
  cursor: pointer;
}

.evz-filter-pill--active {
  background: var(--evz-primary);
  color: #ffffff;
  box-shadow: 0 6px 14px rgba(3, 205, 140, 0.3);
}

.evz-vehicle-list {
  list-style: none;
  padding: 0;
  margin: 10px 0 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.evz-vehicle-item {
  width: 100%;
  border-radius: 14px;
  border: 1px solid var(--evz-border-subtle);
  background-color: var(--evz-surface);
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
}

.evz-vehicle-item--active {
  border-color: rgba(3, 205, 140, 0.9);
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.08);
}

.evz-vehicle-main {
  display: flex;
  align-items: center;
  gap: 6px;
}

.evz-vehicle-name {
  font-size: 14px;
  font-weight: 600;
}

.evz-vehicle-type {
  font-size: 12px;
  color: var(--evz-text-secondary);
  text-transform: capitalize;
}

.evz-vehicle-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.evz-vehicle-plate {
  font-size: 13px;
  color: var(--evz-text-secondary);
}

.evz-chip {
  border-radius: 999px;
  padding: 3px 9px;
  font-size: 11px;
  font-weight: 500;
}

.evz-chip--success {
  background-color: var(--evz-primary);
  color: #ffffff;
}

.evz-chip--muted {
  background-color: #a6a6a6;
  color: #ffffff;
}

.evz-vehicle-empty {
  margin-top: 12px;
  font-size: 13px;
  color: var(--evz-text-secondary);
  text-align: center;
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

const LS_KEY = "evz.vehicles";

function seedIfEmpty() {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) {
      const demo = [
        { id: "v1", name: "Zembo e‑Bike", type: "bike", plate: "UBF‑902K", swapCapable: true },
        { id: "v2", name: "Neta V", type: "car", plate: "UAX‑123X", swapCapable: false },
        { id: "v3", name: "Gogoro Viva", type: "bike", plate: "KDA‑221A", swapCapable: true },
      ];
      window.localStorage.setItem(LS_KEY, JSON.stringify(demo));
    }
  } catch {
    // ignore
  }
}

function loadVehicles() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(LS_KEY) || "[]");
  } catch {
    return [];
  }
}

export default function VehicleSelectScreen() {
  useEvzStyles();
  const navigate = useNavigate();

  const [filter, setFilter] = useState("all");
  const [vehicles, setVehicles] = useState([]);
  const [selectedId, setSelectedId] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      return window.localStorage.getItem("evz.selectedVehicleId") || "";
    } catch {
      return "";
    }
  });

  useEffect(() => {
    seedIfEmpty();
    setVehicles(loadVehicles());
  }, []);

  const filtered = useMemo(
    () => (filter === "all" ? vehicles : vehicles.filter((v) => v.type === filter)),
    [vehicles, filter]
  );

  const selected = useMemo(
    () => vehicles.find((v) => v.id === selectedId) || null,
    [vehicles, selectedId]
  );

  const canContinue = !!(selected && selected.swapCapable);

  const handleSelect = (id) => {
    setSelectedId(id);
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("evz.selectedVehicleId", id);
      }
    } catch {
      // ignore
    }
  };

  const handleContinue = () => {
    if (!canContinue || !selected) return;
    
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("evz.selectedVehicleId", selected.id);
      }
    } catch {
      // ignore
    }

    navigate(`${ROUTES.PROVIDER_SELECT}?vehicleId=${encodeURIComponent(selected.id)}`);
  };

  const handleAddVehicle = () => {
    // Navigate to vehicle add/edit screen (if exists) or stay on this screen
    navigate(ROUTES.VEHICLE_DETAILS.replace(':id', 'new'));
  };


  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Select a vehicle</h1>
        <p className="evz-header-subtitle">Choose the vehicle to swap for</p>

        <div className="evz-filter-group" role="tablist" aria-label="Vehicle type">
          {[
            { key: "all", label: "All" },
            { key: "car", label: "Car" },
            { key: "bike", label: "Bike" },
          ].map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                role="tab"
                aria-selected={active}
                className={
                  "evz-filter-pill" + (active ? " evz-filter-pill--active" : "")
                }
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </header>

      <main className="evz-content">
        <ul className="evz-vehicle-list">
          {filtered.map((v) => {
            const active = v.id === selectedId;
            return (
              <li key={v.id}>
                <button
                  type="button"
                  className={
                    "evz-vehicle-item" +
                    (active ? " evz-vehicle-item--active" : "")
                  }
                  onClick={() => handleSelect(v.id)}
                >
                  <div className="evz-vehicle-main">
                    <span className="evz-vehicle-name">{v.name}</span>
                    <span className="evz-vehicle-type">
                      · {v.type === "car" ? "Car" : "Bike"}
                    </span>
                  </div>
                  <div className="evz-vehicle-meta">
                    <span className="evz-vehicle-plate">{v.plate}</span>
                    <span
                      className={
                        "evz-chip " +
                        (v.swapCapable ? "evz-chip--success" : "evz-chip--muted")
                      }
                    >
                      {v.swapCapable ? "Swap ready" : "Not swap capable"}
                    </span>
                  </div>
                </button>
              </li>
            );
          })}

          {filtered.length === 0 && (
            <li className="evz-vehicle-empty">No vehicles found for this filter.</li>
          )}
        </ul>
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-row">
          <button
            type="button"
            onClick={handleAddVehicle}
            className="evz-button evz-button--secondary"
          >
            Add vehicle
          </button>

          <button
            type="button"
            onClick={handleContinue}
            disabled={!canContinue}
            className={
              "evz-button evz-button--primary" +
              (!canContinue ? " evz-button--disabled" : "")
            }
          >
            {selected ? `Continue as ${selected.name}` : "Continue"}
          </button>
        </div>

        {selected && !canContinue && (
          <p className="evz-footer-hint">
            Selected vehicle is not swap-capable.
          </p>
        )}
      </footer>
    </EvzScreen>
  );
}
