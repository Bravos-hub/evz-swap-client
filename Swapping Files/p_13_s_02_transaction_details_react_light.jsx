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

.evz-card {
  margin-top: 10px;
  border-radius: 16px;
  background-color: var(--evz-surface-soft);
  padding: 14px 14px 10px;
}

.evz-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  margin-bottom: 6px;
}

.evz-row-label {
  color: var(--evz-text-secondary);
  margin-right: 8px;
}

.evz-row-value {
  text-align: right;
  word-break: break-all;
}

.evz-footer {
  margin-top: auto;
  padding-top: 18px;
}

.evz-footer-row {
  display: flex;
  gap: 10px;
}

.evz-btn-secondary,
.evz-btn-primary {
  flex: 1;
  border-radius: 999px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.evz-btn-secondary {
  border: 1px solid #a6a6a6;
  background-color: #ffffff;
  color: var(--evz-text-primary);
}

.evz-btn-secondary:hover {
  background-color: #f9fafb;
}

.evz-btn-primary {
  border: none;
  background-color: var(--evz-accent);
  color: #ffffff;
  box-shadow: 0 10px 22px rgba(247, 127, 0, 0.32);
}

.evz-btn-primary:active {
  transform: translateY(1px);
  box-shadow: 0 6px 14px rgba(247, 127, 0, 0.28);
}

.evz-print-link {
  margin-top: 10px;
  width: 100%;
  border: none;
  background: none;
  padding: 10px 16px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--evz-accent);
  cursor: pointer;
}

.evz-print-link:hover {
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
    if (document.getElementById("evz-mobile-styles-p13-s02")) return;
    const style = document.createElement("style");
    style.id = "evz-mobile-styles-p13-s02";
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

function useQueryId() {
  if (typeof window === "undefined") return "";
  try {
    const q = new URLSearchParams(window.location.search);
    return q.get("id") || "";
  } catch {
    return "";
  }
}

function downloadJSON(filename, data) {
  try {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  } catch {
    // ignore
  }
}

export default function P13S02TransactionDetails() {
  useEvzStyles();

  const id = useQueryId();
  const rows = useMemo(() => collectTransactions(), []);
  const [tx] = useState(() => rows.find((r) => String(r.id) === String(id)));
  const curr = getCurrency();

  const subtitle = tx
    ? new Date(tx.ts).toLocaleString()
    : "No transaction with that ID";

  const signedAmount = tx
    ? `${tx.sign > 0 ? "+" : "-"}${fmtAmt(tx.amount, curr)}`
    : "—";

  const methodLabel = tx
    ? tx.meta?.method || tx.meta?.methodLabel || "—"
    : "—";

  const handleBack = () => {
    if (typeof window !== "undefined") {
      window.location.assign("/wallet/transactions");
    }
  };

  const handleDownload = () => {
    if (!tx) return;
    downloadJSON(`EVZ-${tx.id}.json`, tx);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Transaction details</h1>
        <p className="evz-header-subtitle">{subtitle}</p>
      </header>

      {tx ? (
        <main className="evz-card">
          <div className="evz-row">
            <span className="evz-row-label">ID</span>
            <span className="evz-row-value">{tx.id}</span>
          </div>
          <div className="evz-row">
            <span className="evz-row-label">Type</span>
            <span className="evz-row-value">{tx.type}</span>
          </div>
          <div className="evz-row">
            <span className="evz-row-label">Label</span>
            <span className="evz-row-value">{tx.label}</span>
          </div>
          <div className="evz-row">
            <span className="evz-row-label">Amount</span>
            <span className="evz-row-value">{signedAmount}</span>
          </div>
          <div className="evz-row">
            <span className="evz-row-label">Method</span>
            <span className="evz-row-value">{methodLabel}</span>
          </div>
          <div className="evz-row">
            <span className="evz-row-label">When</span>
            <span className="evz-row-value">
              {new Date(tx.ts).toLocaleString()}
            </span>
          </div>
        </main>
      ) : (
        <main className="evz-card">
          <p className="evz-row-value">
            No transaction with that ID.
          </p>
        </main>
      )}

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
            onClick={handleDownload}
            disabled={!tx}
          >
            Download receipt
          </button>
        </div>
        <button
          type="button"
          className="evz-print-link"
          onClick={handlePrint}
        >
          Print
        </button>
      </footer>
    </EvzScreen>
  );
}
