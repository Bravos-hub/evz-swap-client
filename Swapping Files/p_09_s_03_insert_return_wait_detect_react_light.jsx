import React, { useEffect, useState } from "react";

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

.evz-status-text {
  font-size: 13px;
  color: var(--evz-text-secondary);
}

.evz-detected-extra {
  margin-top: 6px;
  font-size: 13px;
}

.evz-caption {
  margin-top: 4px;
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-simulate-btn {
  margin-top: 10px;
  border-radius: 999px;
  border: 1px solid #a6a6a6;
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 500;
  background-color: transparent;
  color: var(--evz-text-primary);
  cursor: pointer;
}

.evz-simulate-btn:hover {
  background-color: #f9fafb;
}

.evz-footer {
  margin-top: auto;
  padding-top: 18px;
}

.evz-footer-row-main {
  display: flex;
  gap: 8px;
}

.evz-footer-row-secondary {
  display: flex;
  gap: 16px;
  margin-top: 10px;
}

.evz-btn-text,
.evz-btn-primary {
  flex: 1;
  border-radius: 999px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.evz-btn-text {
  border: none;
  background: none;
  color: var(--evz-accent);
}

.evz-btn-text:hover {
  text-decoration: underline;
}

.evz-btn-primary {
  border: none;
  background-color: var(--evz-primary);
  color: #ffffff;
  box-shadow: 0 10px 22px rgba(3, 205, 140, 0.32);
}

.evz-btn-primary--disabled {
  background-color: #a6a6a6;
  box-shadow: none;
  cursor: default;
}

.evz-btn-primary:active:not(.evz-btn-primary--disabled) {
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
    if (typeof document === "undefined") return;
    if (document.getElementById("evz-mobile-styles-p09-s03")) return;
    const style = document.createElement("style");
    style.id = "evz-mobile-styles-p09-s03";
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

const SELF_NS = "evz.self.";
const SWAP_NS = "evz.swap.";

function getSelf(key, fallback = "") {
  if (typeof window === "undefined") return fallback;
  try {
    return window.localStorage.getItem(SELF_NS + key) || fallback;
  } catch {
    return fallback;
  }
}

function setSelf(key, value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SELF_NS + key, String(value));
  } catch {
    // ignore
  }
}

function setSwap(key, value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SWAP_NS + key, String(value));
  } catch {
    // ignore
  }
}

export default function P09S03InsertReturnWaitDetect({
  nextPath = "/swap/self/return-detected",
}) {
  useEvzStyles();

  const lockerId = getSelf("locker.id", "A07");
  const batteryId = getSelf("returnBatteryId", "");

  const [waiting, setWaiting] = useState(true);
  const [detectedAt, setDetectedAt] = useState(0);

  useEffect(() => {
    // auto-simulate detection after ~2s in preview if batteryId exists
    const id = window.setTimeout(() => {
      if (batteryId) simulateDetect();
    }, 2000);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const simulateDetect = () => {
    setWaiting(false);
    const ts = Date.now();
    setDetectedAt(ts);
    setSelf("returnDetectedAt", ts);
    // Example energy used since last swap; can be replaced by station telemetry
    setSwap("energyKWh", 2.4);
  };

  const handleBack = () => {
    if (typeof window !== "undefined") {
      window.location.assign("/swap/self/scan-return");
    }
  };

  const handleContinue = () => {
    if (!waiting && typeof window !== "undefined") {
      window.location.assign(nextPath);
    }
  };

  const handleNeedHelp = () => {
    if (typeof window !== "undefined") {
      window.location.assign("/help/contact");
    }
  };

  const handleCancelSwap = () => {
    if (typeof window !== "undefined") {
      window.location.assign("/booking/cancel");
    }
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Insert battery</h1>
        <p className="evz-header-subtitle">
          Use slot <strong>{lockerId}</strong> and close the door firmly.
        </p>
      </header>

      <main className="evz-content">
        <section className="evz-card">
          {waiting ? (
            <>
              <p className="evz-status-text">
                Waiting for station to detect battery…
              </p>
              <button
                type="button"
                className="evz-simulate-btn"
                onClick={simulateDetect}
              >
                Simulate detection
              </button>
            </>
          ) : (
            <>
              <p className="evz-status-text">
                Battery detected • {" "}
                {new Date(detectedAt).toLocaleTimeString()}
              </p>
              <p className="evz-detected-extra">
                System check complete — energy usage and ID verified.
              </p>
              <p className="evz-caption">
                Battery ID: {batteryId || "—"}
              </p>
            </>
          )}
        </section>
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-row-main">
          <button
            type="button"
            className="evz-btn-text"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            type="button"
            className={
              "evz-btn-primary" +
              (waiting ? " evz-btn-primary--disabled" : "")
            }
            onClick={handleContinue}
            disabled={waiting}
          >
            Continue to payment
          </button>
        </div>
        <div className="evz-footer-row-secondary">
          <button
            type="button"
            className="evz-btn-text"
            onClick={handleNeedHelp}
          >
            Need assistance?
          </button>
          <button
            type="button"
            className="evz-btn-text"
            onClick={handleCancelSwap}
          >
            Cancel swap
          </button>
        </div>
      </footer>
    </EvzScreen>
  );
}
