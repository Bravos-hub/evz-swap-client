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
  margin: 10px 0 0;
}

.evz-main {
  padding-top: 10px;
}

.evz-card-danger {
  border-radius: 16px;
  background-color: #fff7f0;
  border: 1px solid var(--evz-accent);
  padding: 14px 14px 10px;
}

.evz-card-title {
  font-size: 13px;
  font-weight: 800;
}

.evz-vehicle-name {
  font-size: 18px;
  font-weight: 800;
  margin-top: 2px;
}

.evz-vehicle-meta {
  font-size: 13px;
  color: var(--evz-text-secondary);
}

.evz-note {
  display: block;
  margin-top: 6px;
  font-size: 11px;
  color: var(--evz-text-secondary);
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

.evz-btn-primary--disabled {
  background-color: #a6a6a6;
  box-shadow: none;
  cursor: default;
}

.evz-btn-primary:active:not(.evz-btn-primary--disabled) {
  transform: translateY(1px);
  box-shadow: 0 6px 14px rgba(247, 127, 0, 0.28);
}

.evz-inline-link {
  color: var(--evz-accent);
  text-decoration: none;
}

.evz-inline-link:hover {
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
    const styleId = "evz-mobile-styles-p16-s03";
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

const VEHICLES_KEY = "evz.vehicles";
const SELECTED_KEY = "evz.selectedVehicleId";

function safeLocalStorage() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function loadVehicles() {
  const ls = safeLocalStorage();
  if (!ls) return [];
  try {
    return JSON.parse(ls.getItem(VEHICLES_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveVehicles(list) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    ls.setItem(VEHICLES_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

function getSelectedId() {
  const ls = safeLocalStorage();
  if (!ls) return "";
  try {
    return ls.getItem(SELECTED_KEY) || "";
  } catch {
    return "";
  }
}

function setSelectedId(id) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    if (id) ls.setItem(SELECTED_KEY, id);
    else ls.removeItem(SELECTED_KEY);
  } catch {
    // ignore
  }
}

function useQueryId() {
  if (typeof window === "undefined") return "";
  try {
    const qs = new URLSearchParams(window.location.search);
    return qs.get("id") || "";
  } catch {
    return "";
  }
}

function goTo(path) {
  if (typeof window === "undefined") return;
  window.location.assign(path);
}

export default function VehicleRemoveConfirmScreen() {
  useEvzStyles();

  const id = useQueryId();
  const [vehicles, setVehicles] = useState(() => loadVehicles());

  const vehicle = useMemo(
    () => vehicles.find((v) => v.id === id) || null,
    [vehicles, id]
  );

  const isDefault = getSelectedId() === id;

  const backHref = vehicle
    ? `/vehicles/details?id=${encodeURIComponent(vehicle.id)}`
    : "/vehicles/select";

  const handleCancel = () => {
    goTo(backHref);
  };

  const handleRemove = () => {
    if (!vehicle) return;
    const next = vehicles.filter((v) => v.id !== id);
    setVehicles(next);
    saveVehicles(next);

    if (isDefault) {
      const fallback = next[0]?.id || "";
      setSelectedId(fallback || "");
    }

    goTo("/vehicles/select");
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Remove vehicle</h1>
        <p className="evz-header-subtitle">This action cannot be undone</p>
      </header>

      <div className="evz-divider" />

      <main className="evz-main">
        {!vehicle && (
          <div>
            <div className="evz-empty-primary">Vehicle not found</div>
            <div className="evz-empty-secondary">
              <a href="/vehicles/select" className="evz-inline-link">
                Back to list
              </a>
            </div>
          </div>
        )}

        {vehicle && (
          <section className="evz-card-danger">
            <div className="evz-card-title">You are removing:</div>
            <div className="evz-vehicle-name">{vehicle.name}</div>
            <div className="evz-vehicle-meta">
              {vehicle.type === "car" ? "Car" : "Bike"} • {vehicle.plate}
            </div>
            {isDefault && (
              <span className="evz-note">
                Note: this is your <b>default</b> vehicle. Another will be selected
                automatically if available.
              </span>
            )}
          </section>
        )}
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-row">
          <button
            type="button"
            className="evz-btn-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className={
              "evz-btn-primary" + (!vehicle ? " evz-btn-primary--disabled" : "")
            }
            onClick={handleRemove}
            disabled={!vehicle}
          >
            Remove
          </button>
        </div>
      </footer>
    </EvzScreen>
  );
}
