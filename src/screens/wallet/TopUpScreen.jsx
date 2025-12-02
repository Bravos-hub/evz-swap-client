import React, { useEffect, useMemo, useState } from "react";

const evzStyles = `
:root {
  --evz-primary: #03cd8c;
  --evz-accent: #f77f00;
  --evz-bg: #f5f7fb;
  --evz-surface: #ffffff;
  --evz-surface-soft: #f2f2f2;
  --evz-text-primary: #111827;
  --evz-text-secondary: #6b7280;
  --evz-border-subtle: rgba(15, 23, 42, 0.08);
}

body {
  margin: 0;
  padding: 0;
  background: #ffffff;
}

.evz-app {
  min-height: 100vh;
  background: #ffffff;
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
}

.evz-section-title {
  font-size: 13px;
  font-weight: 800;
  margin-bottom: 4px;
}

.evz-chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.evz-chip {
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 13px;
  border: none;
  cursor: pointer;
  background-color: var(--evz-surface-soft);
  color: var(--evz-text-primary);
}

.evz-chip--active {
  background-color: var(--evz-primary);
  color: #ffffff;
}

.evz-input {
  width: 100%;
  border-radius: 12px;
  border: 1px solid var(--evz-border-subtle);
  padding: 9px 11px;
  font-size: 14px;
  margin-top: 10px;
}

.evz-input:focus {
  outline: none;
  border-color: rgba(3, 205, 140, 0.8);
  box-shadow: 0 0 0 1px rgba(3, 205, 140, 0.1);
}

.evz-divider {
  height: 1px;
  width: 100%;
  background-color: #e5e7eb;
  margin: 16px 0;
}

.evz-select {
  width: 100%;
  border-radius: 12px;
  border: 1px solid var(--evz-border-subtle);
  padding: 9px 11px;
  font-size: 14px;
}

.evz-select:focus {
  outline: none;
  border-color: rgba(3, 205, 140, 0.8);
  box-shadow: 0 0 0 1px rgba(3, 205, 140, 0.1);
}

.evz-helper-text {
  margin-top: 6px;
  font-size: 12px;
  color: var(--evz-text-secondary);
}

.evz-footer {
  margin-top: auto;
  padding-top: 18px;
}

.evz-btn-primary {
  width: 100%;
  border-radius: 999px;
  padding: 13px 16px;
  border: none;
  font-size: 15px;
  font-weight: 600;
  background-color: var(--evz-accent);
  color: #ffffff;
  cursor: pointer;
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

.evz-link-inline {
  color: var(--evz-accent);
  text-decoration: none;
}

.evz-link-inline:hover {
  text-decoration: underline;
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
    if (typeof document === "undefined") return;
    const styleId = "evz-mobile-styles-p12-s03";
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

const BAL_KEY = "evz.wallet.balance";
const LEDGER_KEY = "evz.wallet.ledger";
const METHODS_KEY = "evz.wallet.methods";
const DEFAULT_KEY = "evz.wallet.defaultMethodId";
const CURRENCY_KEY = "evz.currency";

function getNumber(key, fallback = 0) {
  if (typeof window === "undefined") return fallback;
  try {
    return Number(window.localStorage.getItem(key) || fallback);
  } catch {
    return fallback;
  }
}

function setNumber(key, value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, String(value));
  } catch {
    // ignore
  }
}

function getJSON(key, fallback = []) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setJSON(key, value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

function getCurrency() {
  if (typeof window === "undefined") return "UGX";
  try {
    return window.localStorage.getItem(CURRENCY_KEY) || "UGX";
  } catch {
    return "UGX";
  }
}

function fmt(n, curr) {
  return `${curr} ${Number(n || 0).toLocaleString("en-UG")}`;
}

const PRESETS = [5000, 10000, 20000, 50000];

export default function TopUpScreen({ nextPath = "/wallet" }) {
  useEvzStyles();

  const [amount, setAmount] = useState(10000);
  const [custom, setCustom] = useState("");
  const [methodId, setMethodId] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      return window.localStorage.getItem(DEFAULT_KEY) || "";
    } catch {
      return "";
    }
  });

  const methods = useMemo(() => getJSON(METHODS_KEY, []), []);
  const currency = getCurrency();

  const finalAmount = useMemo(() => {
    const customVal = Number(String(custom).replace(/\D+/g, "")) || 0;
    return customVal > 0 ? customVal : amount;
  }, [amount, custom]);

  const hasMethods = methods.length > 0;
  const canPay = hasMethods && finalAmount > 0 && !!methodId;

  const handlePresetClick = (value) => {
    setAmount(value);
    setCustom("");
  };

  const handleCustomChange = (e) => {
    const raw = e.target.value.replace(/\D+/g, "");
    setCustom(raw);
  };

  const handleMethodChange = (e) => {
    setMethodId(e.target.value);
  };

  const handlePrimaryClick = (e) => {
    if (!hasMethods) {
      // Navigate to methods screen
      return;
    }
    if (!canPay) {
      e.preventDefault();
      return;
    }

    const currentBal = getNumber(BAL_KEY, 0);
    const newBal = currentBal + finalAmount;
    setNumber(BAL_KEY, newBal);

    const method = methods.find((m) => m.id === methodId) || {
      label: "Unknown",
      type: "unknown",
    };

    const entry = {
      id: "tx" + Date.now(),
      ts: Date.now(),
      type: "topup",
      amount: finalAmount,
      methodId,
      methodType: method.type,
      methodLabel: method.label,
      note: "Wallet top-up",
    };

    const ledger = getJSON(LEDGER_KEY, []);
    ledger.push(entry);
    setJSON(LEDGER_KEY, ledger);
  };

  const primaryLabel = hasMethods
    ? `Pay ${fmt(finalAmount, currency)}`
    : "Add a payment method";

  const primaryHref = hasMethods ? nextPath : "/wallet/methods";

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Top up wallet</h1>
        <p className="evz-header-subtitle">Choose amount and method</p>
      </header>

      <main className="evz-content">
        <section>
          <div className="evz-section-title">Amount</div>
          <div className="evz-chip-row">
            {PRESETS.map((v) => (
              <button
                key={v}
                type="button"
                className={
                  "evz-chip" +
                  (custom
                    ? ""
                    : amount === v
                    ? " evz-chip--active"
                    : "")
                }
                onClick={() => handlePresetClick(v)}
              >
                {fmt(v, currency)}
              </button>
            ))}
          </div>
          <input
            className="evz-input"
            placeholder="25000"
            value={custom}
            onChange={handleCustomChange}
          />
          <div className="evz-helper-text">
            Custom amount ({currency})
          </div>
        </section>

        <div className="evz-divider" />

        <section>
          <div className="evz-section-title">Payment method</div>
          {hasMethods ? (
            <select
              className="evz-select"
              value={methodId}
              onChange={handleMethodChange}
            >
              <option value="" disabled>
                Select a saved method
              </option>
              {methods.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label} — {m.type}
                </option>
              ))}
            </select>
          ) : (
            <p className="evz-helper-text">
              No saved methods. {" "}
              <a href="/wallet/methods" className="evz-link-inline">
                Add one
              </a>{" "}
              to continue.
            </p>
          )}
        </section>
      </main>

      <footer className="evz-footer">
        <a
          href={primaryHref}
          onClick={handlePrimaryClick}
          className={
            "evz-btn-primary" + (canPay || !hasMethods
              ? ""
              : " evz-btn-primary--disabled")
          }
          aria-disabled={!canPay && hasMethods}
        >
          {primaryLabel}
        </a>
      </footer>
    </EvzScreen>
  );
}
