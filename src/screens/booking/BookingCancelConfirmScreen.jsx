import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/routes";

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

.evz-card-title {
  font-size: 13px;
  font-weight: 800;
}

.evz-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
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
  margin-top: 8px;
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-footer {
  margin-top: auto;
  padding-top: 18px;
}

.evz-footer-row {
  display: flex;
  gap: 8px;
}

.evz-btn-secondary,
.evz-btn-primary {
  flex: 1;
  border-radius: 999px;
  padding: 11px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
}

.evz-btn-secondary {
  border-color: #a6a6a6;
  background-color: #ffffff;
  color: var(--evz-text-primary);
}

.evz-btn-secondary:hover {
  background-color: #f9fafb;
}

.evz-btn-primary {
  border-color: transparent;
  background-color: var(--evz-accent);
  color: #ffffff;
  box-shadow: 0 10px 22px rgba(247, 127, 0, 0.32);
}

.evz-btn-primary:active {
  transform: translateY(1px);
  box-shadow: 0 6px 14px rgba(247, 127, 0, 0.28);
}

@media (max-width: 375px) {
  .evz-screen {
    padding-inline: 16px;
  }
}
`;

const BOOK_NS = "evz.booking.";

function useEvzStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = "evz-mobile-styles-p21-s02";
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

function safeLocalStorage() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function getBooking(key, fallback = "") {
  const ls = safeLocalStorage();
  if (!ls) return fallback;
  try {
    return ls.getItem(BOOK_NS + key) || fallback;
  } catch {
    return fallback;
  }
}

function setBooking(key, value) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    ls.setItem(BOOK_NS + key, String(value));
  } catch {
    // ignore
  }
}

function delBooking(key) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    ls.removeItem(BOOK_NS + key);
  } catch {
    // ignore
  }
}

export default function BookingCancelConfirmScreen() {
  useEvzStyles();
  const navigate = useNavigate();

  const stationName = getBooking("stationName", "");
  const stationArea = getBooking("stationArea", "");
  const minutes = Number(getBooking("holdMinutes", "0"));
  const fee = Number(getBooking("holdFee", "0"));
  const rsv = getBooking("reservationId", "");

  const feeLabel = useMemo(() => {
    const amt = Number.isFinite(fee) ? fee : 0;
    return `UGX ${amt.toLocaleString("en-UG")}`;
  }, [fee]);

  const handleCancel = () => {
    ["reservationId", "expiryAt", "method", "paid"].forEach(delBooking);
    setBooking("status", "canceled");
    navigate(ROUTES.DASHBOARD);
  };

  const handleKeep = () => {
    navigate(ROUTES.BOOKING_COUNTDOWN);
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Cancel booking?</h1>
        <p className="evz-header-subtitle">Hold fee is non-refundable</p>
      </header>

      <div className="evz-divider" />

      <main className="evz-main">
        <section className="evz-card">
          <div className="evz-card-title">Booking summary</div>
          <div className="evz-row">
            <span className="evz-row-label">Station</span>
            <span className="evz-row-value">
              {stationName || "—"}
              {stationArea ? ` • ${stationArea}` : ""}
            </span>
          </div>
          <div className="evz-row">
            <span className="evz-row-label">Reservation</span>
            <span className="evz-row-value">{rsv || "—"}</span>
          </div>
          <div className="evz-row">
            <span className="evz-row-label">Hold</span>
            <span className="evz-row-value">{(minutes || 0) + " min"}</span>
          </div>
          <div className="evz-row">
            <span className="evz-row-label">Fee</span>
            <span className="evz-row-value">{feeLabel}</span>
          </div>
          <p className="evz-caption">
            Canceling releases your held pack immediately. Fees already paid are
            not refunded.
          </p>
        </section>
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-row">
          <button
            type="button"
            className="evz-btn-secondary"
            onClick={handleKeep}
          >
            Keep booking
          </button>
          <button
            type="button"
            className="evz-btn-primary"
            onClick={handleCancel}
          >
            Cancel booking
          </button>
        </div>
      </footer>
    </EvzScreen>
  );
}
