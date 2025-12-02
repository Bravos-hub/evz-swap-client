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

.evz-card {
  border-radius: 16px;
  background-color: var(--evz-surface-soft);
  padding: 14px 14px 10px;
}

.evz-field {
  margin-bottom: 12px;
}

.evz-label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 4px;
}

.evz-input {
  width: 100%;
  border-radius: 12px;
  border: 1px solid var(--evz-border-subtle);
  padding: 8px 10px;
  font-size: 14px;
  box-sizing: border-box;
}

.evz-input:focus {
  outline: none;
  border-color: rgba(3, 205, 140, 0.9);
  box-shadow: 0 0 0 1px rgba(3, 205, 140, 0.08);
}

.evz-helper {
  min-height: 16px;
  margin-top: 3px;
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-helper--error {
  color: #b91c1c;
}

.evz-toggle-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
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
    if (document.getElementById("evz-mobile-styles-p16-s02")) return;
    const style = document.createElement("style");
    style.id = "evz-mobile-styles-p16-s02";
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

const VEHICLES_KEY = "evz.vehicles";

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

export default function P16S02VehicleEdit() {
  useEvzStyles();

  const id = useQueryId();
  const [vehicles, setVehicles] = useState(() => loadVehicles());

  const vehicle = useMemo(
    () => vehicles.find((x) => x.id === id) || null,
    [vehicles, id]
  );

  const [name, setName] = useState(() => vehicle?.name || "");
  const [plate, setPlate] = useState(() => vehicle?.plate || "");
  const [swapCapable, setSwapCapable] = useState(() => !!vehicle?.swapCapable);

  const nameTrim = name.trim();
  const plateTrim = plate.trim();

  const nameError = name.length > 0 && nameTrim.length < 2;
  const plateError = plate.length > 0 && plateTrim.length < 2;
  const isValid = nameTrim.length >= 2 && plateTrim.length >= 2;

  const detailsHref = vehicle
    ? `/vehicles/details?id=${encodeURIComponent(vehicle.id)}`
    : "/vehicles/select";

  const handleCancel = () => {
    goTo(detailsHref);
  };

  const handleSave = () => {
    if (!vehicle || !isValid) return;
    const next = vehicles.map((x) =>
      x.id === id
        ? {
            ...x,
            name: nameTrim,
            plate: plateTrim.toUpperCase(),
            swapCapable,
          }
        : x
    );
    setVehicles(next);
    saveVehicles(next);
    goTo(detailsHref);
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Edit vehicle</h1>
        <p className="evz-header-subtitle">
          Update details and capability
        </p>
      </header>

      <div className="evz-divider" />

      <main className="evz-main">
        {!vehicle && (
          <div>
            <div className="evz-helper">Vehicle not found.</div>
            <a href="/vehicles/select" className="evz-inline-link">
              Back to list
            </a>
          </div>
        )}

        {vehicle && (
          <section className="evz-card">
            <div className="evz-field">
              <label className="evz-label" htmlFor="evz-name">
                Make &amp; model
              </label>
              <input
                id="evz-name"
                className="evz-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. TVS iQube"
              />
              <div
                className={
                  "evz-helper" + (nameError ? " evz-helper--error" : "")
                }
              >
                {nameError
                  ? "Enter at least 2 characters"
                  : "Make & model as shown on your logbook"}
              </div>
            </div>

            <div className="evz-field">
              <label className="evz-label" htmlFor="evz-plate">
                Plate / ID
              </label>
              <input
                id="evz-plate"
                className="evz-input"
                value={plate}
                onChange={(e) => setPlate(e.target.value.toUpperCase())}
                placeholder="e.g. UBC 123X"
              />
              <div
                className={
                  "evz-helper" + (plateError ? " evz-helper--error" : "")
                }
              >
                {plateError
                  ? "Enter at least 2 characters"
                  : "Number plate or vehicle ID"}
              </div>
            </div>

            <div className="evz-field">
              <div className="evz-toggle-row">
                <input
                  id="evz-swap-capable"
                  type="checkbox"
                  checked={swapCapable}
                  onChange={(e) => setSwapCapable(e.target.checked)}
                />
                <label htmlFor="evz-swap-capable">
                  {swapCapable ? "Swap capable" : "Not swap capable"}
                </label>
              </div>
            </div>
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
              "evz-btn-primary" + (!vehicle || !isValid ? " evz-btn-primary--disabled" : "")
            }
            onClick={handleSave}
            disabled={!vehicle || !isValid}
          >
            Save
          </button>
        </div>
      </footer>
    </EvzScreen>
  );
}
