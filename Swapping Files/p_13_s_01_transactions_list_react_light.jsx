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

.evz-chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}

.evz-chip {
  border-radius: 999px;
  border: none;
  padding: 6px 11px;
  font-size: 12px;
  font-weight: 600;
  background-color: var(--evz-surface-soft);
  color: var(--evz-text-primary);
  cursor: pointer;
}

.evz-chip--active {
  background-color: var(--evz-primary);
  color: #ffffff;
}

.evz-divider {
  height: 1px;
  width: 100%;
  background-color: #e5e7eb;
  margin: 10px 0 0;
}

.evz-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.evz-tx-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  text-decoration: none;
  color: inherit;
  border-bottom: 1px solid var(--evz-surface-soft);
}

.evz-tx-main {
  display: flex;
  flex-direction: column;
}

.evz-tx-label {
  font-size: 14px;
  font-weight: 700;
}

.evz-tx-date {
  font-size: 12px;
  color: var(--evz-text-secondary);
}

.evz-tx-amount-pos {
  font-size: 13px;
  font-weight: 800;
  color: var(--evz-primary);
}

.evz-tx-amount-neg {
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
  margin-top: auto;
  padding-top: 12px;
}

.evz-footer-link {
  width: 100%;
  border-radius: 999px;
  border: none;
  padding: 11px 16px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  background: none;
  color: var(--evz-accent);
  cursor: pointer;
}

.evz-footer-link:hover {
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
    if (document.getElementById("evz-mobile-styles-p13-s01")) return;
    const style = document.createElement("style");
    style.id = "evz-mobile-styles-p13-s01";
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

const WALLET_LEDGER_KEY = "evz.wallet.ledger";
const CURRENCY_KEY = "evz.currency";
const BOOK_NS = "evz.booking.";
const SWAP_NS = "evz.swap.";

function safeLocalStorage() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function getJSON(key, fallback = []) {
  const ls = safeLocalStorage();
  if (!ls) return fallback;
  try {
    const raw = ls.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function get(ns, key, fallback = "") {
  const ls = safeLocalStorage();
  if (!ls) return fallback;
  try {
    return ls.getItem(ns + key) || fallback;
  } catch {
    return fallback;
  }
}

function num(ns, key, fallback = 0) {
  const ls = safeLocalStorage();
  if (!ls) return fallback;
  try {
    const v = ls.getItem(ns + key);
    return v == null ? fallback : Number(v);
  } catch {
    return fallback;
  }
}

function getCurrency() {
  const ls = safeLocalStorage();
  if (!ls) return "UGX";
  try {
    return ls.getItem(CURRENCY_KEY) || "UGX";
  } catch {
    return "UGX";
  }
}

function fmtAmt(n, curr) {
  return `${curr} ${Number(n || 0).toLocaleString("en-UG")}`;
}

function collectTransactions() {
  const curr = getCurrency();
  const rows = [];

  const ledger = getJSON(WALLET_LEDGER_KEY, []);
  for (const tx of ledger) {
    rows.push({
      id: tx.id,
      ts: tx.ts || Date.now(),
      type: "topup",
      label: "Wallet top-up",
      amount: Math.abs(Number(tx.amount || 0)),
      sign: +1,
      currency: curr,
      meta: {
        methodLabel: tx.methodLabel,
        methodType: tx.methodType,
      },
    });
  }

  const paid = (get(BOOK_NS, "paid") || "").toString() === "true";
  if (paid) {
    const rsv = get(BOOK_NS, "reservationId");
    const fee = num(BOOK_NS, "holdFee", 0);
    const mins = num(BOOK_NS, "holdMinutes", 0);
    const expiryAt = num(BOOK_NS, "expiryAt", Date.now());
    const paidAt = num(
      BOOK_NS,
      "paidAt",
      expiryAt - mins * 60 * 1000
    );
    rows.push({
      id: "hold_" + (rsv || paidAt),
      ts: paidAt,
      type: "hold",
      label: `Hold fee ${rsv ? `(${rsv})` : ""}`.trim(),
      amount: Math.abs(fee),
      sign: -1,
      currency: curr,
      meta: { method: get(BOOK_NS, "method", "wallet") },
    });
  }

  const addOn = num(
    BOOK_NS,
    "extendLastAddOn",
    num(BOOK_NS, "extendAddOnFee", 0)
  );
  if (addOn > 0) {
    rows.push({
      id: "extend_" + Date.now(),
      ts: num(BOOK_NS, "expiryAt", Date.now()),
      type: "extend",
      label: "Hold extension add-on",
      amount: Math.abs(addOn),
      sign: -1,
      currency: curr,
      meta: { method: get(BOOK_NS, "extendMethod", "wallet") },
    });
  }

  const swapPaid = (get(SWAP_NS, "paid") || "").toString() === "true";
  if (swapPaid) {
    const total = num(SWAP_NS, "totalUGX", 0);
    const paidAt = num(SWAP_NS, "paidAt", Date.now());
    rows.push({
      id: "swap_" + paidAt,
      ts: paidAt,
      type: "swap",
      label: "Swap energy payment",
      amount: Math.abs(total),
      sign: -1,
      currency: curr,
      meta: { method: get(SWAP_NS, "method", "wallet") },
    });
  }

  rows.sort((a, b) => b.ts - a.ts);
  return rows;
}

export default function P13S01TransactionsList() {
  useEvzStyles();

  const [filter, setFilter] = useState("all");
  const rows = useMemo(() => collectTransactions(), []);
  const filtered = useMemo(() => {
    if (filter === "all") return rows;
    return rows.filter((r) => r.type === filter);
  }, [rows, filter]);

  const filters = [
    { key: "all", label: "All" },
    { key: "topup", label: "Top-ups" },
    { key: "hold", label: "Hold" },
    { key: "extend", label: "Extend" },
    { key: "swap", label: "Swap" },
  ];

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Transactions</h1>
        <p className="evz-header-subtitle">Top-ups and charges</p>

        <div className="evz-chip-row">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              className={
                "evz-chip" + (filter === f.key ? " evz-chip--active" : "")
              }
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </header>

      <div className="evz-divider" />

      <main>
        <ul className="evz-list">
          {filtered.map((r) => {
            const dateText = new Date(r.ts).toLocaleString();
            const amountText = `${r.sign > 0 ? "+" : "-"}${fmtAmt(
              r.amount,
              r.currency
            )}`;
            const amountClass =
              r.sign > 0 ? "evz-tx-amount-pos" : "evz-tx-amount-neg";
            return (
              <li key={r.id}>
                <a
                  href={`/wallet/transactions/details?id=${encodeURIComponent(
                    r.id
                  )}`}
                  className="evz-tx-row"
                >
                  <div className="evz-tx-main">
                    <span className="evz-tx-label">{r.label}</span>
                    <span className="evz-tx-date">{dateText}</span>
                  </div>
                  <span className={amountClass}>{amountText}</span>
                </a>
              </li>
            );
          })}

          {filtered.length === 0 && (
            <li className="evz-tx-row" style={{ borderBottom: "none" }}>
              <div>
                <div className="evz-empty-primary">No transactions</div>
                <div className="evz-empty-secondary">
                  Try changing the filter
                </div>
              </div>
            </li>
          )}
        </ul>
      </main>

      <footer className="evz-footer">
        <a href="/wallet/invoices" className="evz-footer-link">
          Invoices &amp; exports
        </a>
      </footer>
    </EvzScreen>
  );
}
