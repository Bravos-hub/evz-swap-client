import React, { useEffect } from "react";

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
  background: radial-gradient(circle at top, #ffffff 0, #f5f7fb 55%, #e5e9f2 100%);
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

.evz-screen--center {
  justify-content: center;
  align-items: center;
}

.evz-splash {
  text-align: center;
}

.evz-splash-logo {
  display: inline-flex;
  padding: 4px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    rgba(3, 205, 140, 0.15),
    rgba(247, 127, 0, 0.18)
  );
  margin-bottom: 16px;
}

.evz-splash-logo-mark {
  width: 88px;
  height: 88px;
  border-radius: 24px;
  background: radial-gradient(circle at 20% 0, #03cd8c, #02a671);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 28px;
  letter-spacing: 0.08em;
  color: #ffffff;
  box-shadow: 0 14px 28px rgba(3, 205, 140, 0.35);
}

.evz-splash-title {
  font-size: 28px;
  font-weight: 800;
  margin: 4px 0 4px;
}

.evz-splash-tagline {
  font-size: 14px;
  color: var(--evz-text-secondary);
  margin-bottom: 24px;
}

.evz-button {
  border: none;
  border-radius: 999px;
  padding: 12px 20px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.12s ease, box-shadow 0.12s ease,
    background-color 0.12s ease, opacity 0.12s ease, color 0.12s ease;
  outline: none;
}

.evz-button--ghost {
  background: transparent;
  color: var(--evz-accent);
  border-radius: 999px;
  border: 1px solid rgba(247, 127, 0, 0.45);
  box-shadow: none;
}

.evz-button--ghost:hover {
  background: rgba(247, 127, 0, 0.06);
}

@media (max-width: 375px) {
  .evz-screen {
    padding-inline: 16px;
  }

  .evz-splash-logo-mark {
    width: 78px;
    height: 78px;
    border-radius: 22px;
    font-size: 24px;
  }
}
`;

function useEvzStyles() {
  useEffect(() => {
    if (document.getElementById("evz-mobile-styles")) return;
    const style = document.createElement("style");
    style.id = "evz-mobile-styles";
    style.innerHTML = evzStyles;
    document.head.appendChild(style);
  }, []);
}

function EvzScreen({ children, alignCenter = false }) {
  return (
    <div className="evz-app">
      <div className={"evz-screen" + (alignCenter ? " evz-screen--center" : "")}>
        {children}
      </div>
    </div>
  );
}

export default function SplashScreen() {
  useEvzStyles();

  useEffect(() => {
    const t = setTimeout(() => {
      // Replace with your routing logic
      // window.location.assign("/start/language");
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  const handleContinue = () => {
    // Replace with your routing logic
    // window.location.assign("/start/language");
  };

  return (
    <EvzScreen alignCenter>
      <div className="evz-splash">
        <div className="evz-splash-logo">
          <div className="evz-splash-logo-mark">EV</div>
        </div>

        <h1 className="evz-splash-title">EVzone</h1>
        <p className="evz-splash-tagline">Battery swapping made effortless.</p>

        <button
          type="button"
          className="evz-button evz-button--ghost"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </EvzScreen>
  );
}
