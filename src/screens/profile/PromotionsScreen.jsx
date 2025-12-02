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

.evz-card-applied {
  border-radius: 16px;
  background-color: #e8fff6;
  border: 1px solid var(--evz-primary);
  padding: 10px 12px 8px;
  margin-bottom: 10px;
}

.evz-card-title {
  font-size: 13px;
  font-weight: 800;
}

.evz-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 2px 10px;
  font-size: 11px;
  font-weight: 600;
}

.evz-chip-code {
  background-color: #a6a6a6;
  color: #ffffff;
}

.evz-chip-applied {
  background-color: var(--evz-primary);
  color: #ffffff;
}

.evz-applied-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
  font-size: 13px;
}

.evz-link-button {
  background: none;
  border: none;
  padding: 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--evz-accent);
  cursor: pointer;
}

.evz-link-button:hover {
  text-decoration: underline;
}

.evz-select-group {
  margin-top: 4px;
}

.evz-select-label {
  display: block;
  font-size: 12px;
  margin-bottom: 4px;
  color: var(--evz-text-secondary);
}

.evz-select {
  width: 100%;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid var(--evz-border-subtle);
  background-color: #ffffff;
  font-size: 14px;
}

.evz-select:focus {
  outline: none;
  border-color: var(--evz-primary);
}

.evz-promos-title {
  margin-top: 14px;
  font-size: 13px;
  font-weight: 800;
}

.evz-promos-list {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.evz-promo-card {
  border-radius: 14px;
  border: 1px solid #f2f2f2;
  background-color: #ffffff;
  padding: 10px 12px 8px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}

.evz-promo-main {
  min-width: 0;
}

.evz-promo-title-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.evz-promo-title {
  font-size: 14px;
  font-weight: 800;
}

.evz-promo-desc {
  margin-top: 2px;
  font-size: 13px;
  color: var(--evz-text-secondary);
}

.evz-promo-meta {
  margin-top: 3px;
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-radio-wrap {
  padding-left: 4px;
}

.evz-radio {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  border: 2px solid var(--evz-border-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
}

.evz-radio-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background-color: var(--evz-accent);
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

const AVAIL_KEY = "evz.promos.available";
const APPLIED_KEY = "evz.promos.applied";
const CURR_KEY = "evz.currency";

function useEvzStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = "evz-mobile-styles-p29-s01";
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

function getJSON(key, fallback) {
  const ls = safeLocalStorage();
  if (!ls) return fallback;
  try {
    const raw = ls.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function setJSON(key, value) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    ls.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

function removeKey(key) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    ls.removeItem(key);
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

function seedPromos() {
  const existing = getJSON(AVAIL_KEY, []);
  if (existing && existing.length > 0) return;
  const now = Date.now();
  const demo = [
    {
      code: "EVZ150",
      title: "UGX 150 off",
      desc: "Small discount on fees",
      type: "amount",
      value: 150,
      expiresAt: now + 7 * 86400000,
    },
    {
      code: "GREEN5",
      title: "5% off",
      desc: "Eco saver promo",
      type: "percent",
      value: 5,
      expiresAt: now + 14 * 86400000,
    },
    {
      code: "WELCOME",
      title: "UGX 500 wallet credit",
      desc: "For first top-up",
      type: "amount",
      value: 500,
      context: "wallet",
      expiresAt: now + 30 * 86400000,
    },
  ];
  setJSON(AVAIL_KEY, demo);
}

function fmt(curr, n) {
  return `${curr} ${Number(n || 0).toLocaleString("en-UG")}`;
}

function getApplied() {
  return getJSON(APPLIED_KEY, null);
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

export default function PromotionsScreen({ nextPath = "/wallet/transactions" }) {
  useEvzStyles();

  const curr = currency();
  const [promos, setPromos] = useState(() => getJSON(AVAIL_KEY, []));
  const [ctx, setCtx] = useState("booking");
  const [selected, setSelected] = useState("");
  const [applied, setApplied] = useState(() => getApplied());

  useEffect(() => {
    seedPromos();
    setPromos(getJSON(AVAIL_KEY, []));
    setApplied(getApplied());
  }, []);

  const onApply = () => {
    if (!selected) return;
    const p = promos.find((x) => x.code === selected);
    if (!p) return;
    const payload = {
      code: p.code,
      type: p.type,
      value: Number(p.value || 0),
      context: ctx,
      appliedAt: Date.now(),
    };
    setJSON(APPLIED_KEY, payload);
    setApplied(payload);
  };

  const onRemove = () => {
    removeKey(APPLIED_KEY);
    setApplied(null);
  };

  const handleBack = () => {
    goTo(nextPath);
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Promotions</h1>
        <p className="evz-header-subtitle">
          Choose a promo code and where to apply it
        </p>
      </header>

      <div className="evz-divider" />

      <main className="evz-main">
        {applied && (
          <section className="evz-card-applied">
            <div className="evz-card-title">Applied</div>
            <div className="evz-applied-row">
              <span className="evz-chip evz-chip-applied">{applied.code}</span>
              <span>
                to <strong>{applied.context}</strong>
              </span>
              <button
                type="button"
                className="evz-link-button"
                onClick={onRemove}
              >
                Remove
              </button>
            </div>
          </section>
        )}

        <section className="evz-card">
          <div className="evz-card-title">Apply to</div>
          <div className="evz-select-group">
            <label className="evz-select-label" htmlFor="evz-promo-context">
              Context
            </label>
            <select
              id="evz-promo-context"
              className="evz-select"
              value={ctx}
              onChange={(e) => setCtx(e.target.value)}
            >
              <option value="booking">Booking hold</option>
              <option value="extend">Hold extension</option>
              <option value="swap">Swap payment</option>
              <option value="wallet">Wallet top-up</option>
            </select>
          </div>
        </section>

        <div className="evz-promos-title">Available promos</div>
        <div className="evz-promos-list">
          {promos.map((p) => (
            <article key={p.code} className="evz-promo-card">
              <div className="evz-promo-main">
                <div className="evz-promo-title-row">
                  <span className="evz-chip evz-chip-code">{p.code}</span>
                  <span className="evz-promo-title">{p.title}</span>
                </div>
                <p className="evz-promo-desc">{p.desc}</p>
                <p className="evz-promo-meta">
                  {p.type === "amount"
                    ? `Value: ${fmt(curr, p.value)}`
                    : `Value: ${p.value}%`}
                  {" "}
                  • Expires {new Date(p.expiresAt).toLocaleDateString()}
                </p>
              </div>
              <label className="evz-radio-wrap">
                <input
                  type="radio"
                  name="evz-promo-code"
                  value={p.code}
                  checked={selected === p.code}
                  onChange={(e) => setSelected(e.target.value)}
                  style={{ display: "none" }}
                />
                <span className="evz-radio">
                  {selected === p.code && <span className="evz-radio-dot" />}
                </span>
              </label>
            </article>
          ))}
          {promos.length === 0 && (
            <p className="evz-promo-desc">No promos available.</p>
          )}
        </div>
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-row">
          <button
            type="button"
            className="evz-btn-secondary"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            type="button"
            className="evz-btn-primary"
            disabled={!selected}
            onClick={onApply}
          >
            Apply promo
          </button>
        </div>
      </footer>
    </EvzScreen>
  );
}

/**
 * Manual test cases:
 * 1) First open → seeds three demo promos; list renders with codes and expiry dates.
 * 2) Choose context Wallet + select WELCOME → Apply → localStorage('evz.promos.applied') reflects
 *    {code:'WELCOME', context:'wallet', type, value, appliedAt}.
 * 3) Remove applied promo → clears evz.promos.applied and hides the Applied card.
 * 4) Back → navigates to nextPath (default '/wallet/transactions').
 * 5) Mobile fit: ~360x780 → no horizontal scroll; works even if localStorage is unavailable.
 */
