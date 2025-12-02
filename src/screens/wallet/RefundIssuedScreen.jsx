import React, { useEffect, useMemo } from 'react';

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
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Text', sans-serif;
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

.evz-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-top: 3px;
}

.evz-row-label {
  font-size: 13px;
  color: var(--evz-text-secondary);
}

.evz-row-value {
  font-size: 13px;
  text-align: right;
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

@media (max-width: 375px) {
  .evz-screen {
    padding-inline: 16px;
  }
}
`;

const BAL_KEY = 'evz.wallet.balance';
const LEDGER_KEY = 'evz.wallet.ledger';
const CURR_KEY = 'evz.currency';

function useEvzStyles() {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const styleId = 'evz-mobile-styles-p24-s03';
    // Remove existing style element if it exists
    const existing = document.getElementById(styleId);
    if (existing) {
      existing.remove();
    }
    
    const style = document.createElement('style');
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
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function getNumber(key, d = 0) {
  const ls = safeLocalStorage();
  if (!ls) return d;
  try {
    return Number(ls.getItem(key) || d);
  } catch {
    return d;
  }
}

function setNumber(key, v) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    ls.setItem(key, String(v));
  } catch {
    // ignore
  }
}

function getJSON(key, d = []) {
  const ls = safeLocalStorage();
  if (!ls) return d;
  try {
    return JSON.parse(ls.getItem(key) || JSON.stringify(d));
  } catch {
    return d;
  }
}

function setJSON(key, v) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    ls.setItem(key, JSON.stringify(v));
  } catch {
    // ignore
  }
}

function currency() {
  const ls = safeLocalStorage();
  if (!ls) return 'UGX';
  try {
    return ls.getItem(CURR_KEY) || 'UGX';
  } catch {
    return 'UGX';
  }
}

function useQuery() {
  if (typeof window === 'undefined') {
    return { amount: 0, ref: '', credit: 'original', ctx: '' };
  }
  const qs = new URLSearchParams(window.location.search);
  return {
    amount: Number(qs.get('amount') || 0),
    ref: qs.get('ref') || '',
    credit: (qs.get('credit') || 'original').toLowerCase(),
    ctx: (qs.get('ctx') || '').toLowerCase()
  };
}

function goTo(path) {
  if (typeof window === 'undefined') return;
  window.location.assign(path);
}

function Row({ label, value }) {
  return (
    <div className='evz-row'>
      <span className='evz-row-label'>{label}</span>
      <span className='evz-row-value'>{value}</span>
    </div>
  );
}

function EvzScreen({ children }) {
  return (
    <div className='evz-app'>
      <div className='evz-screen'>{children}</div>
    </div>
  );
}

export default function RefundIssuedScreen({ afterHref = '/wallet/transactions' }) {
  useEvzStyles();

  const q = useQuery();
  const curr = currency();

  const prettyAmount = useMemo(
    () => `${curr} ${Number(q.amount || 0).toLocaleString('en-UG')}`,
    [q.amount, curr]
  );

  const applyWalletCredit = () => {
    if (q.credit !== 'wallet' || !q.amount) return;
    const bal = getNumber(BAL_KEY, 0) + q.amount;
    setNumber(BAL_KEY, bal);
    const ledger = getJSON(LEDGER_KEY, []);
    ledger.push({
      id: 'rf_' + Date.now(),
      ts: Date.now(),
      type: 'refund',
      amount: q.amount,
      note: `Refund ${q.ref || ''}`
    });
    setJSON(LEDGER_KEY, ledger);
  };

  const handleAcknowledge = () => {
    applyWalletCredit();
    goTo(afterHref);
  };

  const handleBack = () => {
    goTo(afterHref);
  };

  const ctxText = q.ctx ? q.ctx[0].toUpperCase() + q.ctx.slice(1) : 'Payment';

  return (
    <EvzScreen>
      <header className='evz-header'>
        <h1 className='evz-header-title'>Refund issued</h1>
        <p className='evz-header-subtitle'>
          Your {ctxText.toLowerCase()} has been refunded
        </p>
      </header>

      <div className='evz-divider' />

      <main className='evz-main'>
        <section className='evz-card'>
          <Row label='Amount' value={prettyAmount} />
          <Row label='Reference' value={q.ref || '—'} />
          <Row
            label='Credit'
            value={
              q.credit === 'wallet' ? 'In-app wallet' : 'Original payment method'
            }
          />
          <p className='evz-caption'>
            It may take time to appear on your bank statement.
          </p>
        </section>
      </main>

      <footer className='evz-footer'>
        <div className='evz-footer-row'>
          <button
            type='button'
            className='evz-btn-secondary'
            onClick={handleBack}
          >
            Back to transactions
          </button>
          <button
            type='button'
            className='evz-btn-primary'
            onClick={handleAcknowledge}
          >
            Acknowledge
          </button>
        </div>
      </footer>
    </EvzScreen>
  );
}
