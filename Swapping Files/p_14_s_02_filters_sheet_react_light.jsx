import React, { useEffect, useState } from "react";

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
  margin: 10px 0 14px;
}

.evz-content {
  flex: 1;
}

.evz-field {
  margin-bottom: 16px;
}

.evz-label {
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 4px;
}

.evz-select,
.evz-range {
  width: 100%;
  border-radius: 12px;
  border: 1px solid var(--evz-border-subtle);
  padding: 8px 10px;
  font-size: 14px;
  box-sizing: border-box;
}

.evz-select:focus,
.evz-range:focus {
  outline: none;
  border-color: rgba(3, 205, 140, 0.9);
  box-shadow: 0 0 0 1px rgba(3, 205, 140, 0.08);
}

.evz-range {
  padding: 0;
}

.evz-caption {
  margin-top: 4px;
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-switch-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}

.evz-switch-row label {
  font-size: 14px;
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

.evz-btn-primary:active {
  transform: translateY(1px);
  box-shadow: 0 6px 14px rgba(247, 127, 0, 0.28);
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
    if (document.getElementById("evz-mobile-styles-p14-s02")) return;
    const style = document.createElement("style");
    style.id = "evz-mobile-styles-p14-s02";
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

function safeLocalStorage() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
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

function setFilter(key, value) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    ls.setItem("evz.filters." + key, String(value));
  } catch {
    // ignore
  }
}

function clearFilters() {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    ["provider", "readyMin", "selfOnly"].forEach((k) =>
      ls.removeItem("evz.filters." + k)
    );
  } catch {
    // ignore
  }
}

export default function P14S02FiltersSheet() {
  useEvzStyles();

  const [provider, setProvider] = useState(
    getFilter("provider", "all") || "all"
  );
  const [readyMin, setReadyMin] = useState(
    Number(getFilter("readyMin", "0") || 0)
  );
  const [selfOnly, setSelfOnly] = useState(
    getFilter("selfOnly", "false") === "true"
  );

  const handleApply = () => {
    setFilter("provider", provider);
    setFilter("readyMin", readyMin);
    setFilter("selfOnly", selfOnly);
    if (typeof window !== "undefined") {
      window.location.assign("/stations/search");
    }
  };

  const handleClear = () => {
    clearFilters();
    setProvider("all");
    setReadyMin(0);
    setSelfOnly(false);
    if (typeof window !== "undefined") {
      window.location.assign("/stations/search");
    }
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Filters</h1>
        <p className="evz-header-subtitle">Refine your station results</p>
      </header>

      <div className="evz-divider" />

      <main className="evz-content">
        <div className="evz-field">
          <div className="evz-label">Provider</div>
          <select
            className="evz-select"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
          >
            <option value="all">All</option>
            <option value="gogo">GoGo</option>
            <option value="spira">Spira</option>
            <option value="zembo">Zembo</option>
            <option value="open">Open Standard</option>
          </select>
        </div>

        <div className="evz-field">
          <div className="evz-label">Minimum ready batteries</div>
          <input
            className="evz-range"
            type="range"
            min={0}
            max={10}
            step={1}
            value={readyMin}
            onChange={(e) => setReadyMin(Number(e.target.value))}
          />
          <div className="evz-caption">
            Show stations with at least {readyMin} ready packs
          </div>
        </div>

        <div className="evz-field">
          <div className="evz-switch-row">
            <input
              id="self-only"
              type="checkbox"
              checked={selfOnly}
              onChange={(e) => setSelfOnly(e.target.checked)}
            />
            <label htmlFor="self-only">Self-service only</label>
          </div>
        </div>
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-row">
          <button
            type="button"
            className="evz-btn-secondary"
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            type="button"
            className="evz-btn-primary"
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </footer>
    </EvzScreen>
  );
}
