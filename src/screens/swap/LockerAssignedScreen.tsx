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
  max-width: 420px;
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

.evz-timer-shell {
  padding: 14px 12px;
  border-radius: 14px;
  text-align: center;
  border: 1px solid transparent;
}

.evz-timer-shell--ok {
  background-color: #e8fff6;
  border-color: var(--evz-primary);
}

.evz-timer-shell--danger {
  background-color: #fff2f2;
  border-color: var(--evz-accent);
}

.evz-timer-value {
  font-size: 30px;
  font-weight: 800;
}

.evz-timer-label {
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-steps {
  margin-top: 12px;
  font-size: 13px;
}

.evz-step-text {
  margin: 4px 0;
}

.evz-inline-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.evz-btn-secondary {
  flex: 1;
  border-radius: 999px;
  padding: 10px 12px;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid #a6a6a6;
  background-color: transparent;
  color: var(--evz-text-primary);
  cursor: pointer;
}

.evz-btn-secondary:hover {
  background-color: #f9fafb;
}

.evz-footer {
  margin-top: 16px;
}

.evz-btn-primary {
  width: 100%;
  border-radius: 999px;
  padding: 13px 16px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  background-color: var(--evz-primary);
  color: #ffffff;
  cursor: pointer;
  box-shadow: 0 10px 22px rgba(3, 205, 140, 0.32);
}

.evz-btn-primary:active {
  transform: translateY(1px);
  box-shadow: 0 6px 14px rgba(3, 205, 140, 0.28);
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

function useEvzStyles(): void {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = "evz-mobile-styles-p09-s01";
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

function EvzScreen({ children }: any): JSX.Element {
  return (
    <div className="evz-app">
      <div className="evz-screen">{children}</div>
    </div>
  );
}

const SELF_NS = "evz.self.";

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

function msToClock(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

export default function LockerAssignedScreen({
  nextPath = "/swap/self/scan-return",
}) {
  useEvzStyles();

  const [lockerId] = useState(() => getSelf("locker.id") || "A07");
  const [unlockAt, setUnlockAt] = useState(() => {
    const saved = Number(getSelf("locker.unlockAt", "0"));
    return saved || Date.now() + 60 * 1000;
  });

  // Seed values if missing
  useEffect(() => {
    if (!getSelf("locker.id")) setSelf("locker.id", lockerId);
    if (!getSelf("locker.unlockAt")) setSelf("locker.unlockAt", unlockAt);
  }, [lockerId, unlockAt]);

  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const remainingMs = Math.max(0, unlockAt - now);
  const danger = remainingMs <= 60 * 1000;

  const handleReUnlock = (): void => {
    const newUnlock = Date.now() + 60 * 1000;
    setUnlockAt(newUnlock);
    setSelf("locker.unlockAt", newUnlock);
  };

  const handleCancel = (): void => {
    if (typeof window !== "undefined") {
      window.location.assign("/booking/confirmed");
    }
  };

  const handleContinue = (): void => {
    if (typeof window !== "undefined") {
      window.location.assign(nextPath);
    }
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Please open locker</h1>
        <p className="evz-header-subtitle">
          Locker ID: <strong>{lockerId}</strong>
        </p>
      </header>

      <main className="evz-content">
        <section className="evz-card">
          <div
            className={
              "evz-timer-shell " +
              (danger ? "evz-timer-shell--danger" : "evz-timer-shell--ok")
            }
          >
            <div
              className="evz-timer-value"
              style={{ color: danger ? "#f77f00" : "#03cd8c" }}
            >
              {msToClock(remainingMs)}
            </div>
            <div className="evz-timer-label">Unlock window remaining</div>
          </div>

          <div className="evz-steps">
            <p className="evz-step-text">
              1) <strong>Return your battery:</strong> open <strong>{lockerId}</strong> and
              place the discharged pack inside.
            </p>
            <p className="evz-step-text">
              2) <strong>Collect new battery:</strong> take the fully charged pack
              from the same slot.
            </p>
            <p className="evz-step-text">
              3) <strong>Confirm &amp; secure:</strong> close the door firmly until it
              clicks.
            </p>
          </div>

          <div className="evz-inline-actions">
            <button
              type="button"
              className="evz-btn-secondary"
              onClick={handleReUnlock}
            >
              Re-unlock
            </button>
            <button
              type="button"
              className="evz-btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>

          <div className="evz-footer">
            <button
              type="button"
              className="evz-btn-primary"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </section>
      </main>
    </EvzScreen>
  );
}
