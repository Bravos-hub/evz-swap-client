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
  background-color: var(--evz-bg);
}

.evz-app {
  min-height: 100vh;
  background-color: var(--evz-bg);
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

.evz-header {
  padding-bottom: 4px;
}

.evz-header-title {
  font-size: 22px;
  font-weight: 800;
  margin: 0 0 2px;
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
  margin: 12px 0 10px;
}

.evz-main {
  padding-top: 4px;
}

.evz-card {
  border-radius: 16px;
  background-color: var(--evz-surface-soft);
  padding: 12px 14px 10px;
}

.evz-radio-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.evz-radio-option {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.evz-radio-option input[type="radio"] {
  accent-color: var(--evz-primary);
}

.evz-caption {
  font-size: 11px;
  color: var(--evz-text-secondary);
  margin-top: 8px;
}

.evz-footer {
  margin-top: auto;
  padding-top: 18px;
}

.evz-footer-row {
  display: flex;
  gap: 8px;
}

.evz-btn-primary,
.evz-btn-secondary {
  flex: 1;
  border-radius: 999px;
  padding: 11px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
}

.evz-btn-primary {
  background-color: var(--evz-accent);
  color: #ffffff;
  box-shadow: 0 10px 22px rgba(247, 127, 0, 0.32);
}

.evz-btn-primary:active {
  transform: translateY(1px);
  box-shadow: 0 6px 14px rgba(247, 127, 0, 0.28);
}

.evz-btn-secondary {
  background-color: #ffffff;
  color: var(--evz-text-primary);
  border-color: #a6a6a6;
}

.evz-btn-secondary:hover {
  background-color: #f9fafb;
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

function useEvzStyles(): void {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = "evz-mobile-styles-p25-s02";
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

function safeLocalStorage(): void {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function getItem(key, fallback = "google") {
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
    ls.setItem(key, String(value));
  } catch {
    // ignore
  }
}

function EvzScreen({ children }: any): JSX.Element {
  return (
    <div className="evz-app">
      <div className="evz-screen">{children}</div>
    </div>
  );
}

export default function MapProviderUnavailableScreen({ mapKey = "evz.map.provider" }) {
  useEvzStyles();
  const navigate = useNavigate();

  const [provider, setProvider] = useState(() => getItem(mapKey, "google"));

  const desc = useMemo(() => {
    switch (provider) {
      case "gaode":
        return "Gaode (Amap) is widely used in mainland China.";
      case "baidu":
        return "Baidu Maps is a popular alternative in China.";
      case "osm":
        return "OpenStreetMap (OSM) is an open, community map.";
      default:
        return "Google Maps is common globally, but may be blocked in some regions.";
    }
  }, [provider]);

  const handleSaveRetry = (): void => {
    setItem(mapKey, provider);
    if (typeof window === "undefined") return;
    window.location.reload();
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Map unavailable</h1>
        <p className="evz-header-subtitle">Switch to a different provider</p>
      </header>

      <div className="evz-divider" />

      <main className="evz-main">
        <section className="evz-card">
          <div className="evz-radio-group">
            <label className="evz-radio-option">
              <input
                type="radio"
                name="evz-map-provider"
                value="google"
                checked={provider === "google"}
                onChange={(e) => setProvider(e.target.value)}
              />
              <span>Google Maps</span>
            </label>
            <label className="evz-radio-option">
              <input
                type="radio"
                name="evz-map-provider"
                value="gaode"
                checked={provider === "gaode"}
                onChange={(e) => setProvider(e.target.value)}
              />
              <span>Gaode (Amap)</span>
            </label>
            <label className="evz-radio-option">
              <input
                type="radio"
                name="evz-map-provider"
                value="baidu"
                checked={provider === "baidu"}
                onChange={(e) => setProvider(e.target.value)}
              />
              <span>Baidu Maps</span>
            </label>
            <label className="evz-radio-option">
              <input
                type="radio"
                name="evz-map-provider"
                value="osm"
                checked={provider === "osm"}
                onChange={(e) => setProvider(e.target.value)}
              />
              <span>OpenStreetMap</span>
            </label>
          </div>
          <p className="evz-caption">{desc}</p>
        </section>
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-row">
          <button
            type="button"
            className="evz-btn-primary"
            onClick={handleSaveRetry}
          >
            Save & Retry
          </button>
          <button
            type="button"
            className="evz-btn-secondary"
            onClick={() => navigate(ROUTES.STATION_MAP_LIST)}
          >
            Back to Map
          </button>
        </div>
      </footer>
    </EvzScreen>
  );
}
