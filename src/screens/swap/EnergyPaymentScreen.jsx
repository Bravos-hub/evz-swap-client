import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/routes";

const evzEnergyPayStyles = `
:root {
  --evz-primary: #03cd8c;
  --evz-accent: #f77f00;
  --evz-bg: #f5f7fb;
  --evz-surface: #ffffff;
  --evz-text-primary: #111827;
  --evz-text-secondary: #6b7280;
  --evz-border-subtle: rgba(15, 23, 42, 0.08);
}

body {
  margin: 0;
  padding: 0;
  background: var(--evz-bg);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Inter",
    "SF Pro Text", sans-serif;
}

.evz-app {
  min-height: 100vh;
  background: var(--evz-bg);
  display: flex;
  justify-content: center;
  align-items: stretch;
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
  font-size: 20px;
  font-weight: 800;
  margin: 0;
}

.evz-header-subtitle {
  font-size: 13px;
  color: var(--evz-text-secondary);
  margin: 4px 0 0;
}

.evz-content {
  flex: 1;
  padding-top: 16px;
  padding-bottom: 10px;
}

.evz-section-title {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 8px;
}

.evz-payment-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.evz-pay-option {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: var(--evz-surface);
  border-radius: 16px;
  padding: 10px 12px;
  border: 1.5px solid transparent;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.04);
  cursor: pointer;
  transition: border-color 0.16s ease, box-shadow 0.16s ease,
    background-color 0.16s ease;
}

.evz-pay-option--selected {
  border-color: var(--evz-primary);
  box-shadow: 0 10px 30px rgba(3, 205, 140, 0.2);
  background-color: #f9fffd;
}

.evz-pay-radio {
  width: 20px;
  height: 20px;
  border-radius: 999px;
  border: 1.5px solid #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: #ffffff;
}

.evz-pay-radio-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--evz-accent);
}

.evz-pay-icon {
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: #e5f5ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.evz-pay-icon--evz {
  background: rgba(3, 205, 140, 0.08);
  color: var(--evz-primary);
}

.evz-pay-label-main {
  font-size: 14px;
  font-weight: 600;
}

.evz-pay-label-sub {
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-pay-text {
  display: flex;
  flex-direction: column;
}

.evz-summary-card {
  margin-top: 16px;
  padding: 14px 16px;
  border-radius: 16px;
  background: #eef2ff;
  font-size: 13px;
  display: flex;
  flex-direction: column;
}

.evz-summary-label {
  color: var(--evz-text-secondary);
}

.evz-summary-heading {
  font-weight: 700;
  color: var(--evz-text-primary);
  margin-bottom: 2px;
}

.evz-summary-sub {
  color: var(--evz-text-secondary);
  margin-bottom: 8px;
}

.evz-summary-row {
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
}

.evz-summary-row-label {
  color: var(--evz-text-secondary);
}

.evz-summary-row-amount {
  font-weight: 600;
}

.evz-summary-total {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-weight: 800;
  color: var(--evz-text-primary);
}

.evz-footer {
  padding-top: 10px;
}

.evz-primary-cta {
  width: 100%;
  border: none;
  border-radius: 999px;
  padding: 12px 16px;
  background: var(--evz-accent);
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 12px 30px rgba(247, 127, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.evz-primary-cta:disabled {
  opacity: 0.5;
  box-shadow: none;
  cursor: default;
}

.evz-secondary-cta {
  margin-top: 8px;
  width: 100%;
  border: none;
  background: transparent;
  color: var(--evz-text-secondary);
  font-size: 13px;
  font-weight: 500;
  text-decoration: underline;
  cursor: pointer;
}
`;

function useEvzEnergyPayStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = "evz-energy-pay-styles";
    // Remove existing style element if it exists
    const existing = document.getElementById(styleId);
    if (existing) {
      existing.remove();
    }
    
    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = evzEnergyPayStyles;
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

const PAYMENT_METHODS = [
  { id: "evz", label: "EVzone Pay", sub: "Recommended • Low fees", iconType: "bolt" },
  { id: "card", label: "Card", sub: "Visa, Mastercard", iconType: "card" },
  {
    id: "mobile",
    label: "Mobile Money",
    sub: "MTN, Airtel & more",
    iconType: "wallet",
  },
  { id: "alipay", label: "Alipay", iconType: "globe" },
  { id: "wechat", label: "WeChat Pay", iconType: "globe" },
];

function fmtUGX(n) {
  return `UGX ${Number(n || 0).toLocaleString("en-UG")}`;
}

function EnergyPaymentScreen({
  amountDue,
  energyKWh = 2.4,
  ratePerKWh = 3500,
}) {
  useEvzEnergyPayStyles();
  const navigate = useNavigate();

  const [selectedId, setSelectedId] = useState("evz");

  const energyFee = energyKWh * ratePerKWh;
  const total =
    typeof amountDue === "number" && amountDue > 0 ? amountDue : energyFee;

  const handleConfirm = () => {
    if (typeof window !== "undefined") {
      // In a real app, you would process the payment here
      try {
        // Save payment info to localStorage if needed
        window.localStorage.setItem("evz.swap.energy.payment.completed", "true");
        window.localStorage.setItem("evz.swap.energy.payment.amount", String(total));
        window.localStorage.setItem("evz.swap.energy.payment.method", selectedId);
      } catch {
        // ignore
      }
      
      // Navigate to collect battery screen after payment
      navigate(ROUTES.COLLECT_NEW_BATTERY_SELF);
    }
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Energy payment</h1>
        <p className="evz-header-subtitle">
          Choose how you’d like to pay for this swap.
        </p>
      </header>

      <main className="evz-content">
        <section>
          <p className="evz-section-title">Choose a payment method</p>
          <div className="evz-payment-list">
            {PAYMENT_METHODS.map((m) => {
              const selected = m.id === selectedId;
              return (
                <button
                  key={m.id}
                  type="button"
                  className={
                    "evz-pay-option" +
                    (selected ? " evz-pay-option--selected" : "")
                  }
                  onClick={() => setSelectedId(m.id)}
                >
                  <div className="evz-pay-radio">
                    {selected && <div className="evz-pay-radio-dot" />}
                  </div>

                  <div
                    className={
                      "evz-pay-icon" +
                      (m.id === "evz" ? " evz-pay-icon--evz" : "")
                    }
                  >
                    {m.iconType === "bolt" && "⚡"}
                    {m.iconType === "card" && "💳"}
                    {m.iconType === "wallet" && "📱"}
                    {m.iconType === "globe" && "🌐"}
                  </div>

                  <div className="evz-pay-text">
                    <span className="evz-pay-label-main">{m.label}</span>
                    {m.sub && (
                      <span className="evz-pay-label-sub">{m.sub}</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="evz-summary-card">
          <div className="evz-summary-heading">Payment summary</div>
          <div className="evz-summary-sub">
            Review the energy charge before confirming payment.
          </div>

          <div className="evz-summary-row">
            <span className="evz-summary-row-label">
              Energy ({energyKWh.toFixed(2)} kWh × UGX {ratePerKWh.toLocaleString(
                "en-UG"
              )}
              /kWh)
            </span>
            <span className="evz-summary-row-amount">{fmtUGX(energyFee)}</span>
          </div>

          <div className="evz-summary-total">
            <span>Total</span>
            <span>{fmtUGX(total)}</span>
          </div>

          <div className="evz-summary-label" style={{ marginTop: 8 }}>
            Billed via {PAYMENT_METHODS.find((m) => m.id === selectedId)?.label}
          </div>
        </section>
      </main>

      <footer className="evz-footer">
        <button
          type="button"
          className="evz-primary-cta"
          disabled={!total}
          onClick={handleConfirm}
        >
          Confirm &amp; pay {fmtUGX(total)}
        </button>
        <button
          type="button"
          className="evz-secondary-cta"
          onClick={() => {
            if (typeof window !== "undefined") window.history.back();
          }}
        >
          Cancel
        </button>
      </footer>
    </EvzScreen>
  );
}

export default EnergyPaymentScreen;

/**
 * Manual test cases:
 * 1) Default props (no overrides):
 *    - Energy 2.40 kWh × UGX 3,500 → Total UGX 8,400.
 *    - Summary rows match these values and CTA shows "Confirm & pay UGX 8,400".
 * 2) Pass amountDue={10000} → total row & CTA show UGX 10,000 (override breakdown sum).
 * 3) amountDue=0 but custom energyKWh/ratePerKWh → total computed from breakdown and CTA enabled.
 * 4) Tapping different methods updates "Billed via ..." text.
 * 5) Mobile viewport 360x780: no horizontal scroll; list & summary fill width.
 */
