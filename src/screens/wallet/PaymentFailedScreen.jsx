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

.evz-card-warning {
  border-radius: 16px;
  background-color: #fff7f0;
  border: 1px solid var(--evz-accent);
  padding: 12px 14px 10px;
}

.evz-card-title {
  font-size: 13px;
  font-weight: 800;
}

.evz-card-rows {
  margin-top: 6px;
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
.evz-btn-secondary,
.evz-btn-ghost {
  border-radius: 999px;
  padding: 11px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
}

.evz-btn-primary {
  flex: 1;
  background-color: var(--evz-accent);
  color: #ffffff;
  box-shadow: 0 10px 22px rgba(247, 127, 0, 0.32);
}

.evz-btn-primary:active {
  transform: translateY(1px);
  box-shadow: 0 6px 14px rgba(247, 127, 0, 0.28);
}

.evz-btn-secondary {
  flex: 1;
  background-color: #ffffff;
  color: var(--evz-text-primary);
  border-color: #a6a6a6;
}

.evz-btn-secondary:hover {
  background-color: #f9fafb;
}

.evz-btn-ghost {
  width: 100%;
  margin-top: 8px;
  background: none;
  color: var(--evz-accent);
}

.evz-btn-ghost:hover {
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

const BOOK_NS = 'evz.booking.';
const ST_KEY = 'evz.stations';

function useEvzStyles() {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const styleId = 'evz-mobile-styles-p24-s01';
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

function getBooking(key, fallback = '') {
  const ls = safeLocalStorage();
  if (!ls) return fallback;
  try {
    return ls.getItem(BOOK_NS + key) || fallback;
  } catch {
    return fallback;
  }
}

function loadStation(id) {
  const ls = safeLocalStorage();
  if (!ls) return null;
  try {
    const all = JSON.parse(ls.getItem(ST_KEY) || '[]');
    return all.find((s) => String(s.id) === String(id)) || null;
  } catch {
    return null;
  }
}

function useQuery() {
  if (typeof window === 'undefined') {
    return { ctx: '', code: '', message: '', amount: '', method: '' };
  }
  const qs = new URLSearchParams(window.location.search);
  return {
    ctx: (qs.get('ctx') || '').toLowerCase(),
    code: qs.get('code') || '',
    message: qs.get('message') || '',
    amount: qs.get('amount') || '',
    method: qs.get('method') || ''
  };
}

function resolveRoutes(ctx) {
  const stationId = getBooking('stationId');
  const st = stationId ? loadStation(stationId) : null;
  const isOperator = st?.type === 'operator';

  switch ((ctx || '').toLowerCase()) {
    case 'booking':
      return { retry: '/booking/pay', change: '/wallet/methods', back: '/booking/hold' };
    case 'extend':
      return { retry: '/booking/extend/pay', change: '/wallet/methods', back: '/booking/extend' };
    case 'swap':
      return {
        retry: isOperator ? '/swap/operator/pay' : '/swap/self/pay',
        change: '/wallet/methods',
        back: isOperator ? '/swap/operator/qr' : '/swap/self/insert-return'
      };
    default:
      return { retry: '/wallet/transactions', change: '/wallet/methods', back: '/' };
  }
}

function goTo(path) {
  if (typeof window === 'undefined') return;
  window.location.assign(path);
}

function EvzScreen({ children }) {
  return (
    <div className='evz-app'>
      <div className='evz-screen'>{children}</div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className='evz-row'>
      <span className='evz-row-label'>{label}</span>
      <span className='evz-row-value'>{value}</span>
    </div>
  );
}

export default function PaymentFailedScreen() {
  useEvzStyles();

  const q = useQuery();
  const routes = useMemo(() => resolveRoutes(q.ctx), [q.ctx]);

  const pretty = useMemo(() => {
    if (q.message) return q.message;
    if (q.code === 'insufficient_funds') return 'Your payment method has insufficient funds.';
    if (q.code === 'issuer_declined') return 'Your bank declined this transaction.';
    if (q.code === 'network_error') return 'We could not reach the payment network.';
    return 'The payment did not go through.';
  }, [q]);

  const amountLabel = q.amount
    ? 'UGX ' + Number(q.amount).toLocaleString('en-UG')
    : '—';

  const methodLabel = q.method || getBooking('method', '—');

  return (
    <EvzScreen>
      <header className='evz-header'>
        <h1 className='evz-header-title'>Payment failed</h1>
        <p className='evz-header-subtitle'>Please try again or use a different method</p>
      </header>

      <div className='evz-divider' />

      <main className='evz-main'>
        <section className='evz-card-warning'>
          <div className='evz-card-title'>Details</div>
          <div className='evz-card-rows'>
            <Row label='Context' value={q.ctx || '—'} />
            <Row label='Amount' value={amountLabel} />
            <Row label='Method' value={methodLabel} />
            <Row label='Message' value={pretty} />
            {q.code ? <Row label='Code' value={q.code} /> : null}
          </div>
          <p className='evz-caption'>
            Tip: If the card charge might have been held by your bank, it usually auto-releases shortly.
          </p>
        </section>
      </main>

      <footer className='evz-footer'>
        <div className='evz-footer-row'>
          <button
            type='button'
            className='evz-btn-primary'
            onClick={() => goTo(routes.retry)}
          >
            Retry
          </button>
          <button
            type='button'
            className='evz-btn-secondary'
            onClick={() => goTo(routes.change)}
          >
            Change method
          </button>
        </div>
        <button
          type='button'
          className='evz-btn-ghost'
          onClick={() => goTo(routes.back)}
        >
          Back
        </button>
      </footer>
    </EvzScreen>
  );
}
