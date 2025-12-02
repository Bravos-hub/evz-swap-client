import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/routes";

const evzStyles = `
:root {
  --evz-primary: #03cd8c;
  --evz-accent: #f77f00;
  --evz-bg: #f5f7fb;
  --evz-surface: #ffffff;
  --evz-surface-soft: #edf1f9;
  --evz-text-primary: #111827;
  --evz-text-secondary: #6b7280;
  --evz-border-subtle: rgba(15, 23, 42, 0.08);
}

body {
  margin: 0;
  padding: 0;
  background: var(--evz-bg);
}

.evz-app {
  min-height: 100vh;
  background: var(--evz-bg);
  display: flex;
  justify-content: center;
  align-items: stretch;
  color: var(--evz-text-primary);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Inter",
    "SF Pro Text", sans-serif;
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
  padding-top: 10px;
  padding-bottom: 10px;
}

.evz-footer {
  padding-top: 10px;
}

.evz-button {
  width: 100%;
  border-radius: 999px;
  padding: 14px 18px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.12s ease, box-shadow 0.12s ease,
    background-color 0.12s ease, opacity 0.12s ease;
  outline: none;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border: none;
}

.evz-button--primary {
  background-color: var(--evz-accent);
  color: #ffffff;
  box-shadow: 0 10px 22px rgba(247, 127, 0, 0.32);
}

.evz-button--primary:active {
  transform: translateY(1px);
  box-shadow: 0 6px 14px rgba(247, 127, 0, 0.28);
}

.evz-card {
  margin-top: 4px;
  padding: 14px;
  border-radius: 16px;
  background-color: var(--evz-surface-soft);
}

.evz-card-title {
  font-size: 14px;
  font-weight: 800;
  margin: 0 0 2px;
}

.evz-card-subtitle {
  font-size: 13px;
  color: var(--evz-text-secondary);
  margin: 0;
}

.evz-card-row {
  display: flex;
  gap: 16px;
  margin-top: 8px;
  font-size: 13px;
}

.evz-divider {
  height: 1px;
  width: 100%;
  background-color: var(--evz-surface-soft);
  margin: 16px 0;
}

.evz-section-heading {
  font-size: 13px;
  font-weight: 800;
  color: var(--evz-text-primary);
}

.evz-methods {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.evz-method-option {
  width: 100%;
  border-radius: 16px;
  border: 1px solid var(--evz-border-subtle);
  background-color: #ffffff;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  cursor: pointer;
}

.evz-method-option--active {
  border-color: var(--evz-primary);
  box-shadow: 0 6px 16px rgba(3, 205, 140, 0.22);
}

.evz-method-main {
  display: flex;
  align-items: center;
  gap: 10px;
}

.evz-method-radio {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  border: 2px solid var(--evz-border-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.evz-method-radio-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background-color: var(--evz-accent);
}

.evz-method-icon {
  width: 26px;
  height: 26px;
  border-radius: 8px;
  background-color: var(--evz-surface-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.evz-method-name {
  font-size: 14px;
  font-weight: 600;
}

.evz-note {
  margin-top: 10px;
  font-size: 13px;
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
    const styleId = "evz-mobile-styles-p05-s02";
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

const BOOK_NS = "evz.booking.";

function get(key, defaultValue = "") {
  if (typeof window === "undefined") return defaultValue;
  try {
    return window.localStorage.getItem(BOOK_NS + key) || defaultValue;
  } catch {
    return defaultValue;
  }
}

function fmtUGX(n) {
  return `UGX ${Number(n || 0).toLocaleString("en-UG")}`;
}

const PAYMENT_METHODS = [
  { id: "evzpay", label: "EVzone Pay", icon: "⚡" },
  { id: "card", label: "Card", icon: "💳" },
  { id: "mobile", label: "Mobile Money", icon: "📱" },
  { id: "alipay", label: "Alipay", icon: "🌐" },
  { id: "wechat", label: "WeChat Pay", icon: "🌐" },
];

export default function BookingPaymentScreen() {
  useEvzStyles();
  const navigate = useNavigate();

  const stationName = get("stationName");
  const stationArea = get("stationArea");
  const minutes = Number(get("holdMinutes", "0"));
  const fee = Number(get("holdFee", "0"));

  const [method, setMethod] = useState(() => get("method", "evzpay"));

  const handlePay = () => {
    if (!minutes || !fee) return;

    const reservationId = `RSV-${Date.now()}`;
    const expiryAt = Date.now() + minutes * 60 * 1000;

    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(BOOK_NS + "reservationId", reservationId);
        window.localStorage.setItem(BOOK_NS + "expiryAt", String(expiryAt));
        window.localStorage.setItem(BOOK_NS + "method", method);
        window.localStorage.setItem(BOOK_NS + "paid", "true");
      }
    } catch {
      // ignore
    }

    // Navigate to booking countdown on success
    // In a real app, you'd check payment status first
    navigate(ROUTES.BOOKING_COUNTDOWN);
  };


  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Booking payment</h1>
        <p className="evz-header-subtitle">Reserve your battery pack</p>
      </header>

      <main className="evz-content">
        <section className="evz-card">
          <h2 className="evz-card-title">{stationName || "Station"}</h2>
          <p className="evz-card-subtitle">{stationArea}</p>
          <div className="evz-card-row">
            <span>
              <strong>Hold</strong>: {minutes} min
            </span>
            <span>
              <strong>Fee</strong>: {fmtUGX(fee)}
            </span>
          </div>
        </section>

        <div className="evz-divider" />

        <section>
          <h2 className="evz-section-heading">Choose a payment method</h2>
          <div className="evz-methods">
            {PAYMENT_METHODS.map((m) => (
              <button
                key={m.id}
                type="button"
                className={
                  "evz-method-option" +
                  (method === m.id ? " evz-method-option--active" : "")
                }
                onClick={() => setMethod(m.id)}
              >
                <div className="evz-method-main">
                  <span className="evz-method-radio">
                    {method === m.id && <span className="evz-method-radio-dot" />}
                  </span>
                  <span className="evz-method-icon">{m.icon}</span>
                  <span className="evz-method-name">{m.label}</span>
                </div>
              </button>
            ))}
          </div>

          <p className="evz-note">
            Booking fee reserves a pack and is <strong>non-refundable</strong>.
          </p>
        </section>
      </main>

      <footer className="evz-footer">
        <button
          type="button"
          onClick={handlePay}
          className="evz-button evz-button--primary"
        >
          Pay {fmtUGX(fee)} &amp; Continue
        </button>
      </footer>
    </EvzScreen>
  );
}
