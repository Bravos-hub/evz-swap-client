import React, { useEffect, useMemo } from "react";

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

.evz-card {
  border-radius: 16px;
  background-color: var(--evz-surface-soft);
  padding: 12px 14px;
}

.evz-card-actions {
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
  text-align: center;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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

.evz-btn-secondary {
  border: 1px solid #a6a6a6;
  background-color: #ffffff;
  color: var(--evz-text-primary);
}

.evz-btn-secondary:hover {
  background-color: #f9fafb;
}

.evz-divider {
  height: 1px;
  width: 100%;
  background-color: #e5e7eb;
  margin: 18px 0 10px;
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

.evz-list-main {
  display: flex;
  flex-direction: column;
}

.evz-list-label {
  font-size: 14px;
  font-weight: 700;
}

.evz-list-date {
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

.evz-list-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.evz-download-link {
  border: none;
  background: none;
  padding: 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--evz-accent);
  cursor: pointer;
}

.evz-download-link:hover {
  text-decoration: underline;
}

.evz-empty-primary {
  font-size: 14px;
}

.evz-empty-secondary {
  font-size: 12px;
  color: var(--evz-text-secondary);
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
    const styleId = "evz-mobile-styles-p13-s03";
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

function downloadCSV(filename, rows) {
  try {
    const header = [
      "id",
      "type",
      "label",
      "timestamp",
      "amount",
      "sign",
      "currency",
    ];
    const csv = [
      header.join(","),
      ...rows.map((r) =>
        [
          r.id,
          r.type,
          JSON.stringify(r.label),
          new Date(r.ts).toISOString(),
          r.amount,
          r.sign,
          r.currency,
        ].join(",")
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
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

export default function InvoicesScreen() {
  useEvzStyles();

  const rows = useMemo(() => collectTransactions(), []);
  const curr = getCurrency();

  const handleDownloadCsv = () => {
    downloadCSV("EVZ-transactions.csv", rows);
  };

  const handleBack = () => {
    if (typeof window !== "undefined") {
      window.location.assign("/wallet/transactions");
    }
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Invoices &amp; exports</h1>
        <p className="evz-header-subtitle">
          Download receipts or export CSV
        </p>
      </header>

      <section className="evz-card">
        <div className="evz-card-actions">
          <button
            type="button"
            className="evz-btn-primary"
            onClick={handleDownloadCsv}
          >
            Download CSV
          </button>
          <button
            type="button"
            className="evz-btn-secondary"
            onClick={handleBack}
          >
            Back to transactions
          </button>
        </div>
      </section>

      <div className="evz-divider" />

      <main>
        <ul className="evz-list">
          {rows.map((r) => {
            const dateText = new Date(r.ts).toLocaleString();
            const amountClass =
              r.sign > 0 ? "evz-amount-pos" : "evz-amount-neg";
            const amountText = `${r.sign > 0 ? "+" : "-"}${fmtAmt(
              r.amount,
              curr
            )}`;
            return (
              <li key={r.id} className="evz-list-item">
                <div className="evz-list-main">
                  <span className="evz-list-label">{r.label}</span>
                  <span className="evz-list-date">{dateText}</span>
                </div>
                <div className="evz-list-actions">
                  <span className={amountClass}>{amountText}</span>
                  <button
                    type="button"
                    className="evz-download-link"
                    onClick={() => downloadJSON(`EVZ-${r.id}.json`, r)}
                  >
                    Download
                  </button>
                </div>
              </li>
            );
          })}

          {rows.length === 0 && (
            <li className="evz-list-item" style={{ borderBottom: "none" }}>
              <div>
                <div className="evz-empty-primary">No transactions yet</div>
                <div className="evz-empty-secondary">
                  Make a top-up or payment to generate invoices
                </div>
              </div>
            </li>
          )}
        </ul>
      </main>
    </EvzScreen>
  );
}
