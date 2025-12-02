import React, { useEffect, useState } from "react";

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
  padding-top: 12px;
}

.evz-toggle-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.evz-toggle-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.evz-toggle-input {
  width: 40px;
  height: 22px;
  appearance: none;
  position: relative;
  border-radius: 999px;
  background-color: #e5e7eb;
  outline: none;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.evz-toggle-input::before {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.25);
  transition: transform 0.15s ease;
}

.evz-toggle-input:checked {
  background-color: var(--evz-primary);
}

.evz-toggle-input:checked::before {
  transform: translateX(18px);
}

.evz-toggle-label {
  font-size: 14px;
}

.evz-helper-text {
  margin-top: 6px;
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-footer-row {
  display: flex;
  gap: 8px;
}

.evz-button {
  flex: 1;
  border-radius: 999px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.evz-button--secondary {
  background-color: transparent;
  color: var(--evz-accent);
}

.evz-button--secondary:hover {
  text-decoration: underline;
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
  opacity: 0.45;
  cursor: default;
  pointer-events: none;
  box-shadow: none;
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
    if (document.getElementById("evz-mobile-styles-p08-s01")) return;
    const style = document.createElement("style");
    style.id = "evz-mobile-styles-p08-s01";
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

export default function SafetyChecklistScreen({ nextPath = "/swap/self/station-scan" }) {
  useEvzStyles();

  const [vehicleOff, setVehicleOff] = useState(false);
  const [glovesOn, setGlovesOn] = useState(false);

  const canContinue = vehicleOff && glovesOn;

  const handleContinue = (e) => {
    if (!canContinue) {
      e.preventDefault();
      return;
    }

    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          "evz.self.safety.vehicleOff",
          String(vehicleOff)
        );
        window.localStorage.setItem(
          "evz.self.safety.glovesOn",
          String(glovesOn)
        );
        window.localStorage.setItem("evz.self.safety.ok", "true");
      }
    } catch {
      // ignore
    }
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Prepare for swap</h1>
        <p className="evz-header-subtitle">
          Confirm these quick safety steps before continuing
        </p>
      </header>

      <main className="evz-content">
        <div className="evz-toggle-list">
          <label className="evz-toggle-item">
            <input
              type="checkbox"
              className="evz-toggle-input"
              checked={vehicleOff}
              onChange={(e) => setVehicleOff(e.target.checked)}
            />
            <span className="evz-toggle-label">
              Vehicle is <strong>powered off</strong> and secured
            </span>
          </label>

          <label className="evz-toggle-item">
            <input
              type="checkbox"
              className="evz-toggle-input"
              checked={glovesOn}
              onChange={(e) => setGlovesOn(e.target.checked)}
            />
            <span className="evz-toggle-label">
              Safety gloves are worn and area is clear
            </span>
          </label>

          <p className="evz-helper-text">
            Tip: keep bystanders away and follow the kiosk instructions.
          </p>
        </div>
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-row">
          <a href="/booking/confirmed" className="evz-button evz-button--secondary">
            Back
          </a>

          <a
            href={canContinue ? nextPath : "#"}
            onClick={handleContinue}
            aria-disabled={!canContinue}
            className={
              "evz-button evz-button--primary" +
              (!canContinue ? " evz-button--disabled" : "")
            }
          >
            Continue
          </a>
        </div>
      </footer>
    </EvzScreen>
  );
}
