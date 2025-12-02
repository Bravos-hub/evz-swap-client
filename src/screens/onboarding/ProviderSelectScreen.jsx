import React, { useEffect, useState } from "react";
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
  padding-bottom: 12px;
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
  padding-top: 12px;
  padding-bottom: 12px;
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
  box-shadow: 0 10px 22px rgba(247, 127, 0, 0.32);
}

.evz-button--primary:active {
  transform: translateY(1px);
  box-shadow: 0 6px 14px rgba(247, 127, 0, 0.28);
}

.evz-button--disabled {
  opacity: 0.5;
  cursor: default;
  box-shadow: none;
}

.evz-text-link {
  display: block;
  margin-top: 8px;
  font-size: 13px;
  font-weight: 500;
  color: var(--evz-accent);
  text-align: center;
  text-decoration: none;
}

.evz-text-link:hover {
  text-decoration: underline;
}

.evz-provider-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.evz-provider-card {
  width: 100%;
  padding: 14px 10px;
  border-radius: 14px;
  border: 1px solid var(--evz-border-subtle);
  background-color: var(--evz-surface);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  transition: border-color 0.12s ease, background-color 0.12s ease,
    box-shadow 0.12s ease, transform 0.08s ease;
}

.evz-provider-card--active {
  background-color: var(--evz-primary);
  color: #ffffff;
  border-color: var(--evz-primary);
  box-shadow: 0 8px 18px rgba(3, 205, 140, 0.35);
}

.evz-provider-card:active {
  transform: translateY(1px);
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

const PROVIDERS = [
  { id: "gogo", name: "GoGo" },
  { id: "spira", name: "Spira" },
  { id: "zembo", name: "Zembo" },
  { id: "open", name: "Open Standard" },
];

export default function ProviderSelectScreen() {
  useEvzStyles();
  const navigate = useNavigate();

  const [selected, setSelected] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      return window.localStorage.getItem("evz.providerId") || "";
    } catch {
      return "";
    }
  });

  const handlePick = (p) => {
    setSelected(p.id);
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("evz.providerId", p.id);
        window.localStorage.setItem("evz.providerName", p.name);
      }
    } catch {
      // ignore
    }
  };

  const handleContinue = () => {
    if (!selected) return;
    
    navigate(`${ROUTES.STATION_MAP_LIST}?provider=${encodeURIComponent(selected)}`);
  };

  // const handleViewPlans = () => {
  //   navigate(ROUTES.PROVIDER_PLANS);
  // }; // Reserved for future use

  const handleBack = () => {
    navigate(ROUTES.VEHICLE_SELECT);
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Choose your provider</h1>
        <p className="evz-header-subtitle">Select one network to continue</p>
      </header>

      <main className="evz-content">
        <div className="evz-provider-grid">
          {PROVIDERS.map((p) => {
            const active = selected === p.id;
            return (
              <button
                key={p.id}
                type="button"
                className={
                  "evz-provider-card" +
                  (active ? " evz-provider-card--active" : "")
                }
                onClick={() => handlePick(p)}
              >
                {p.name}
              </button>
            );
          })}
        </div>
      </main>

      <footer className="evz-footer">
        <button
          type="button"
          onClick={handleContinue}
          disabled={!selected}
          className={
            "evz-button evz-button--primary" +
            (!selected ? " evz-button--disabled" : "")
          }
        >
          Continue
        </button>
        <button
          type="button"
          onClick={handleBack}
          className="evz-text-link"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginTop: '8px' }}
        >
          Back to vehicles
        </button>
      </footer>
    </EvzScreen>
  );
}
