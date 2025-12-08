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

.evz-card {
  border-radius: 16px;
  background-color: var(--evz-surface-soft);
  padding: 12px 14px 10px;
}

.evz-card-text {
  font-size: 13px;
  color: var(--evz-text-secondary);
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

function useEvzStyles(): void {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const styleId = 'evz-mobile-styles-p24-s02';
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

function safeLocalStorage(): void {
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

function useQuery(): void {
  if (typeof window === 'undefined') {
    return { ctx: '', hint: '' };
  }
  const qs = new URLSearchParams(window.location.search);
  return {
    ctx: (qs.get('ctx') || '').toLowerCase(),
    hint: qs.get('hint') || ''
  };
}

function resolveRoutes(ctx) {
  const stationId = getBooking('stationId');
  const st = stationId ? loadStation(stationId) : null;
  const isOperator = st?.type === 'operator';

  switch ((ctx || '').toLowerCase()) {
    case 'booking':
    case 'extend':
      return { change: '/wallet/methods', back: '/booking/confirmed' };
    case 'swap':
      return {
        change: '/wallet/methods',
        back: isOperator ? '/swap/operator/qr' : '/swap/self/insert-return'
      };
    default:
      return { change: '/wallet/methods', back: '/' };
  }
}

function goTo(path) {
  if (typeof window === 'undefined') return;
  window.location.assign(path);
}

function EvzScreen({ children }: any): JSX.Element {
  return (
    <div className='evz-app'>
      <div className='evz-screen'>{children}</div>
    </div>
  );
}

export default function PaymentPendingScreen(): JSX.Element {
  useEvzStyles();

  const q = useQuery();
  const routes = useMemo(() => resolveRoutes(q.ctx), [q.ctx]);

  const hintText =
    q.hint ||
    "The payment is processing with your provider. This can take a moment. We'll update the status automatically.";

  const handleRefresh = (): void => {
    if (typeof window === 'undefined') return;
    window.location.reload();
  };

  return (
    <EvzScreen>
      <header className='evz-header'>
        <h1 className='evz-header-title'>Payment pending</h1>
        <p className='evz-header-subtitle'>We’re waiting for confirmation</p>
      </header>

      <div className='evz-divider' />

      <main className='evz-main'>
        <section className='evz-card'>
          <p className='evz-card-text'>{hintText}</p>
          <p className='evz-caption'>
            Tip: Don’t pay twice if your provider shows a debit. If it doesn’t confirm shortly, change method or retry later.
          </p>
        </section>
      </main>

      <footer className='evz-footer'>
        <div className='evz-footer-row'>
          <button
            type='button'
            className='evz-btn-primary'
            onClick={handleRefresh}
          >
            Refresh status
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
