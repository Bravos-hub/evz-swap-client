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
  padding: 14px 14px 12px;
}

.evz-field {
  margin-bottom: 14px;
}

.evz-label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 4px;
}

.evz-select {
  width: 100%;
  border-radius: 12px;
  border: 1px solid var(--evz-border-subtle);
  padding: 8px 10px;
  font-size: 14px;
  box-sizing: border-box;
  background-color: #ffffff;
}

.evz-select:focus {
  outline: none;
  border-color: rgba(3, 205, 140, 0.9);
  box-shadow: 0 0 0 1px rgba(3, 205, 140, 0.08);
}

.evz-toggle-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 6px 0 4px;
}

.evz-caption {
  font-size: 11px;
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
    if (document.getElementById("evz-mobile-styles-p17-s02")) return;
    const style = document.createElement("style");
    style.id = "evz-mobile-styles-p17-s02";
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

const LANGS = [
  { code: "en", label: "English" },
  { code: "sw", label: "Kiswahili" },
  { code: "fr", label: "Français" },
  { code: "hi", label: "हिन्दी (Hindi)" },
  { code: "zh", label: "中文 (Chinese)" },
];

const REGIONS = [
  { code: "UG", label: "Uganda", currency: "UGX" },
  { code: "KE", label: "Kenya", currency: "KES" },
  { code: "TZ", label: "Tanzania", currency: "TZS" },
  { code: "RW", label: "Rwanda", currency: "RWF" },
  { code: "NG", label: "Nigeria", currency: "NGN" },
  { code: "IN", label: "India", currency: "INR" },
  { code: "CN", label: "China", currency: "CNY" },
];

function safeLocalStorage() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function getItem(key, fallback) {
  const ls = safeLocalStorage();
  if (!ls) return fallback;
  try {
    return ls.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

function setItem(key, value) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    ls.setItem(key, value);
  } catch {
    // ignore
  }
}

function goTo(path) {
  if (typeof window === "undefined") return;
  window.location.assign(path);
}

export default function P17S02LanguageRegion() {
  useEvzStyles();

  const [lang, setLang] = useState(() => getItem("evz.lang", "en"));
  const [region, setRegion] = useState(() => getItem("evz.region", "UG"));
  const [unitsMetric, setUnitsMetric] = useState(() => {
    const v = getItem("evz.units", "metric");
    return v === "metric";
  });

  const currency = useMemo(() => {
    const found = REGIONS.find((r) => r.code === region);
    return found?.currency || "UGX";
  }, [region]);

  const handleSave = () => {
    setItem("evz.lang", lang);
    setItem("evz.region", region);
    setItem("evz.currency", currency);
    setItem("evz.units", unitsMetric ? "metric" : "imperial");
    goTo("/account");
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Language &amp; region</h1>
        <p className="evz-header-subtitle">
          App language, currency, and units
        </p>
      </header>

      <div className="evz-divider" />

      <main className="evz-main">
        <section className="evz-card">
          <div className="evz-field">
            <label className="evz-label" htmlFor="evz-lang">
              Language
            </label>
            <select
              id="evz-lang"
              className="evz-select"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              {LANGS.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          <div className="evz-field">
            <label className="evz-label" htmlFor="evz-region">
              Region
            </label>
            <select
              id="evz-region"
              className="evz-select"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              {REGIONS.map((r) => (
                <option key={r.code} value={r.code}>
                  {r.label} ({r.currency})
                </option>
              ))}
            </select>
          </div>

          <div className="evz-field">
            <div className="evz-toggle-row">
              <input
                id="evz-units"
                type="checkbox"
                checked={unitsMetric}
                onChange={(e) => setUnitsMetric(e.target.checked)}
              />
              <label htmlFor="evz-units">
                {unitsMetric
                  ? "Units: Metric (km, °C)"
                  : "Units: Imperial (mi, °F)"}
              </label>
            </div>
            <div className="evz-caption">
              Currency preview: <strong>{currency}</strong>
            </div>
          </div>
        </section>
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-row">
          <button
            type="button"
            className="evz-btn-secondary"
            onClick={() => goTo("/account")}
          >
            Back
          </button>
          <button
            type="button"
            className="evz-btn-primary"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </footer>
    </EvzScreen>
  );
}
