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
}

.evz-card {
  border-radius: 16px;
  background-color: var(--evz-surface-soft);
  padding: 14px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.04);
}

.evz-card-title {
  font-size: 13px;
  font-weight: 800;
}

.evz-balance-value {
  font-size: 32px;
  font-weight: 900;
  margin-top: 4px;
  color: var(--evz-primary);
}

.evz-actions-row {
  margin-top: 12px;
  display: flex;
  gap: 10px;
}

.evz-button,
.evz-button-secondary,
.evz-link-text {
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.evz-button {
  flex: 1;
  padding: 11px 16px;
  border: none;
  background-color: var(--evz-accent);
  color: #ffffff;
  box-shadow: 0 10px 22px rgba(247, 127, 0, 0.32);
}

.evz-button:active {
  transform: translateY(1px);
  box-shadow: 0 6px 14px rgba(247, 127, 0, 0.28);
}

.evz-button-secondary {
  flex: 1;
  padding: 11px 16px;
  border-radius: 999px;
  border: 1px solid #a6a6a6;
  background-color: #ffffff;
  color: var(--evz-text-primary);
}

.evz-divider {
  height: 1px;
  width: 100%;
  background-color: #e5e7eb;
  margin: 16px 0 10px;
}

.evz-list-title {
  font-size: 13px;
  font-weight: 800;
  margin-bottom: 4px;
}

.evz-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.evz-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid var(--evz-surface-soft);
}

.evz-list-item-main {
  display: flex;
  flex-direction: column;
}

.evz-list-primary {
  font-size: 14px;
  font-weight: 700;
}

.evz-list-secondary {
  font-size: 12px;
  color: var(--evz-text-secondary);
}

.evz-amount-pos {
  font-size: 13px;
  font-weight: 800;
  color: var(--evz-primary);
}

.evz-amount-neg {
  font-size: 13px;
  font-weight: 800;
  color: var(--evz-accent);
}

.evz-empty-primary {
  font-size: 14px;
}

.evz-empty-secondary {
  font-size: 12px;
  color: var(--evz-text-secondary);
}

.evz-footer {
  padding-top: 12px;
}

.evz-link-text {
  width: 100%;
  justify-content: center;
  padding: 10px 16px;
  border: none;
  background: none;
  color: var(--evz-accent);
}

.evz-link-text:hover {
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
    const styleId = "evz-mobile-styles-p12-s01";
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

const WALLET_BAL_KEY = "evz.wallet.balance";
const WALLET_LEDGER_KEY = "evz.wallet.ledger";
const CURRENCY_KEY = "evz.currency";

function getNumber(key, fallback = 0) {
  if (typeof window === "undefined") return fallback;
  try {
    return Number(window.localStorage.getItem(key) || fallback);
  } catch {
    return fallback;
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

function fmtAmount(n, curr) {
  return `${curr} ${Number(n || 0).toLocaleString("en-UG")}`;
}

export default function WalletHomeScreen() {
  useEvzStyles();

  const [balance] = useState(() => getNumber(WALLET_BAL_KEY, 0));
  const [ledger, setLedger] = useState(() => getJSON(WALLET_LEDGER_KEY, []));
  const currency = getCurrency();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const existing = getJSON(WALLET_LEDGER_KEY, []);
    if (!existing || existing.length === 0) {
      const demo = [
        {
          id: "tx" + Date.now(),
          ts: Date.now(),
          type: "topup",
          amount: 0,
          note: "Wallet created",
        },
      ];
      setLedger(demo);
      setJSON(WALLET_LEDGER_KEY, demo);
    }
  }, []);

  const recent = useMemo(
    () => (Array.isArray(ledger) ? ledger.slice(-3).reverse() : []),
    [ledger]
  );

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Wallet</h1>
        <p className="evz-header-subtitle">Manage balance and methods</p>
      </header>

      <main className="evz-content">
        <section className="evz-card">
          <div className="evz-card-title">Current balance</div>
          <div className="evz-balance-value">
            {fmtAmount(balance, currency)}
          </div>
          <div className="evz-actions-row">
            <a href="/wallet/topup" className="evz-button">
              Top up
            </a>
            <a href="/wallet/methods" className="evz-button-secondary">
              Payment methods
            </a>
          </div>
        </section>

        <div className="evz-divider" />

        <section>
          <div className="evz-list-title">Recent activity</div>
          <ul className="evz-list">
            {recent.length > 0 ? (
              recent.map((tx) => {
                const isPositive = (tx.amount || 0) >= 0;
                const label =
                  tx.type === "topup" ? "Wallet top-up" : tx.note || "Transaction";
                return (
                  <li key={tx.id} className="evz-list-item">
                    <div className="evz-list-item-main">
                      <span className="evz-list-primary">{label}</span>
                      <span className="evz-list-secondary">
                        {new Date(tx.ts).toLocaleString()}
                      </span>
                    </div>
                    <span
                      className={
                        isPositive ? "evz-amount-pos" : "evz-amount-neg"
                      }
                    >
                      {isPositive ? "+" : ""}
                      {fmtAmount(tx.amount, currency)}
                    </span>
                  </li>
                );
              })
            ) : (
              <li className="evz-list-item">
                <div>
                  <div className="evz-empty-primary">No transactions yet</div>
                  <div className="evz-empty-secondary">
                    Top up to get started
                  </div>
                </div>
              </li>
            )}
          </ul>
        </section>
      </main>

      <footer className="evz-footer">
        <a href="/wallet/transactions" className="evz-link-text">
          View all transactions
        </a>
      </footer>
    </EvzScreen>
  );
}
