import React, { useEffect, useMemo } from "react";

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

.evz-content {
  flex: 1;
}

.evz-card {
  border-radius: 18px;
  background-color: var(--evz-surface-soft);
  padding: 16px 16px 14px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.04);
}

.evz-card-title {
  font-size: 14px;
  font-weight: 800;
  margin-bottom: 2px;
}

.evz-card-subtitle {
  font-size: 13px;
  color: var(--evz-text-secondary);
}

.evz-qr-wrap {
  margin-top: 14px;
  display: flex;
  justify-content: center;
}

.evz-qr-img {
  width: 220px;
  height: 220px;
  border-radius: 12px;
  border: 1px solid #e5e5e5;
  background-color: #ffffff;
}

.evz-qr-helper {
  margin-top: 8px;
  font-size: 13px;
  text-align: center;
}

.evz-divider {
  height: 1px;
  width: 100%;
  background-color: #e5e5e5;
  margin: 14px 0 8px;
}

.evz-fallback {
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-footer {
  margin-top: auto;
  padding-top: 16px;
}

.evz-footer-row {
  display: flex;
  gap: 10px;
}

.evz-button {
  flex: 1;
  border-radius: 999px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.evz-button--secondary {
  background-color: transparent;
  color: var(--evz-text-primary);
  border: 1px solid #a6a6a6;
}

.evz-button--primary {
  background-color: var(--evz-primary);
  color: #ffffff;
  box-shadow: 0 10px 22px rgba(3, 205, 140, 0.32);
}

.evz-button--primary:active {
  transform: translateY(1px);
  box-shadow: 0 6px 14px rgba(3, 205, 140, 0.28);
}

@media (max-width: 375px) {
  .evz-screen {
    padding-inline: 16px;
  }
}
`;

function useEvzStyles() {
  useEffect(() => {
    const styleId = "evz-mobile-styles-p07-s01";
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

function getBookingItem(key, fallback = "") {
  if (typeof window === "undefined") return fallback;
  try {
    return window.localStorage.getItem(BOOK_NS + key) || fallback;
  } catch {
    return fallback;
  }
}

export default function ArrivedShowQrScreen({ backPath = "/booking/confirmed", payPath = "/swap/operator/pay" }) {
  useEvzStyles();

  const reservationId = getBookingItem("reservationId");
  const stationId = getBookingItem("stationId");
  const stationName = getBookingItem("stationName");
  const stationArea = getBookingItem("stationArea");

  const payload = useMemo(
    () => JSON.stringify({ type: "arrival", rsv: reservationId, stationId }),
    [reservationId, stationId]
  );

  const qrSrc = useMemo(
    () =>
      `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
        payload
      )}`,
    [payload]
  );

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Show to operator</h1>
        <p className="evz-header-subtitle">
          Reservation ID: {reservationId || "—"}
        </p>
      </header>

      <main className="evz-content">
        <section className="evz-card">
          <div>
            <div className="evz-card-title">{stationName || "Station"}</div>
            <div className="evz-card-subtitle">{stationArea}</div>
          </div>

          <div className="evz-qr-wrap">
            <img
              src={qrSrc}
              alt="Reservation QR"
              className="evz-qr-img"
            />
          </div>

          <p className="evz-qr-helper">
            Show this QR code to the operator to start the swap.
          </p>

          <div className="evz-divider" />

          <p className="evz-fallback">
            Fallback code (if scanner fails): <strong>{reservationId || "—"}</strong>
          </p>
        </section>
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-row">
          <a href={backPath} className="evz-button evz-button--secondary">
            Back
          </a>
          <a href={payPath} className="evz-button evz-button--primary">
            Continue to payment
          </a>
        </div>
      </footer>
    </EvzScreen>
  );
}
