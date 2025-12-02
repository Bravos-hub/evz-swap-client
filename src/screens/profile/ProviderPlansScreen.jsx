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

.evz-plan-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.evz-plan-card {
  border-radius: 16px;
  background-color: #ffffff;
  border: 1px solid #f2f2f2;
  padding: 12px 14px 10px;
}

.evz-plan-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.evz-chip-selected {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 2px 10px;
  font-size: 11px;
  font-weight: 600;
  background-color: var(--evz-primary);
  color: #ffffff;
}

.evz-plan-name {
  font-size: 16px;
  font-weight: 800;
}

.evz-plan-perks {
  margin-top: 4px;
  font-size: 13px;
  color: var(--evz-text-secondary);
}

.evz-plan-price {
  margin-top: 3px;
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-plan-actions {
  display: flex;
  gap: 6px;
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

.evz-btn-primary:disabled {
  opacity: 0.55;
  cursor: default;
  box-shadow: none;
}

.evz-btn-primary:active:not(:disabled) {
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

.evz-btn-outline {
  border-radius: 999px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  background-color: #ffffff;
  border: 1px solid #a6a6a6;
  color: var(--evz-text-primary);
}

.evz-btn-outline-selected {
  border-color: var(--evz-primary);
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

const CURR_KEY = "evz.currency";

const DEMO_PLANS = {
  default: [
    {
      id: "basic",
      name: "Basic",
      price: 0,
      period: "/mo",
      perks: ["Access to network", "Standard support"],
    },
    {
      id: "plus",
      name: "Plus",
      price: 5000,
      period: "/mo",
      perks: ["Priority support", "Small swap discount"],
    },
    {
      id: "pro",
      name: "Pro",
      price: 15000,
      period: "/mo",
      perks: ["Best rates", "Faster resolution", "Early access"],
    },
  ],
};

function useEvzStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = "evz-mobile-styles-p29-s03";
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

function safeLocalStorage() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function get(key, fallback = "") {
  const ls = safeLocalStorage();
  if (!ls) return fallback;
  try {
    return ls.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

function set(key, value) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    ls.setItem(key, String(value));
  } catch {
    // ignore
  }
}

function currency() {
  const ls = safeLocalStorage();
  if (!ls) return "UGX";
  try {
    return ls.getItem(CURR_KEY) || "UGX";
  } catch {
    return "UGX";
  }
}

function plansFor(providerId) {
  return DEMO_PLANS[providerId] || DEMO_PLANS.default;
}

function fmt(curr, n, period) {
  if (!n) return "Free";
  return `${curr} ${Number(n || 0).toLocaleString("en-UG")}${period || ""}`;
}

function goTo(href) {
  if (typeof window === "undefined") return;
  window.location.assign(href);
}

function EvzScreen({ children }) {
  return (
    <div className="evz-app">
      <div className="evz-screen">{children}</div>
    </div>
  );
}

export default function ProviderPlansScreen({ nextPath = "/providers/plans" }) {
  useEvzStyles();

  const providerId = get("evz.providerId", "default");
  const providerName = get("evz.providerName", "Provider");
  const curr = currency();

  const [selected, setSelected] = useState(() => get("evz.provider.planId", ""));

  const plans = useMemo(() => plansFor(providerId), [providerId]);

  const onSelect = (planId) => {
    setSelected(planId);
  };

  const onSubscribe = () => {
    const plan = plans.find((p) => p.id === selected);
    if (!plan) return;
    set("evz.provider.planId", plan.id);
    set("evz.provider.planName", plan.name);
    set("evz.provider.planSince", Date.now());
    if (typeof window !== "undefined" && window.alert) {
      window.alert(`Subscribed to ${plan.name}`);
    }
    // Stay on screen, as in original implementation. Consumers can
    // navigate using nextPath if desired.
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">{providerName} plans</h1>
        <p className="evz-header-subtitle">
          Choose a membership for better rates &amp; perks
        </p>
      </header>

      <div className="evz-divider" />

      <main className="evz-main">
        <div className="evz-plan-list">
          {plans.map((p) => (
            <article key={p.id} className="evz-plan-card">
              <div className="evz-plan-header">
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    {selected === p.id && (
                      <span className="evz-chip-selected">Selected</span>
                    )}
                    <span className="evz-plan-name">{p.name}</span>
                  </div>
                  <p className="evz-plan-perks">{p.perks.join(" • ")}</p>
                  <p className="evz-plan-price">
                    {fmt(curr, p.price, p.period)}
                  </p>
                </div>
                <div className="evz-plan-actions">
                  <button
                    type="button"
                    className={
                      "evz-btn-outline" +
                      (selected === p.id ? " evz-btn-outline-selected" : "")
                    }
                    onClick={() => onSelect(p.id)}
                  >
                    {selected === p.id ? "Selected" : "Select"}
                  </button>
                </div>
              </div>
            </article>
          ))}
          {plans.length === 0 && (
            <p className="evz-plan-perks">
              No plans available for this provider.
            </p>
          )}
        </div>
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-row">
          <button
            type="button"
            className="evz-btn-secondary"
            onClick={() => goTo("/providers/select")}
          >
            Change provider
          </button>
          <button
            type="button"
            className="evz-btn-primary"
            disabled={!selected}
            onClick={onSubscribe}
          >
            Subscribe
          </button>
        </div>
      </footer>
    </EvzScreen>
  );
}

/**
 * Manual test cases:
 * 1) With no saved plan → select Plus → Subscribe → alert shows and
 *    localStorage('evz.provider.planId'/'planName'/'planSince') are set.
 * 2) Reopen → initial state preselects previously saved plan; Selected
 *    chip appears.
 * 3) Change provider → navigates to '/providers/select'.
 * 4) Subscribe button uses orange CTA color and is disabled until a
 *    plan is selected.
 * 5) Mobile fit: ~360x780 → no horizontal scroll; works even if
 *    localStorage is unavailable.
 */
