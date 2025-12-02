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
  padding-bottom: 12px;
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
  padding-top: 12px;
  padding-bottom: 12px;
  overflow-y: auto;
}

.evz-footer {
  padding-top: 10px;
}

.evz-button {
  width: 100%;
  border: none;
  border-radius: 999px;
  padding: 14px 18px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.12s ease, box-shadow 0.12s ease,
    background-color 0.12s ease, opacity 0.12s ease;
  outline: none;
}

.evz-button--primary {
  background-color: var(--evz-accent);
  color: #ffffff;
  box-shadow: 0 10px 22px rgba(247, 127, 0, 0.35);
}

.evz-button--primary:active {
  transform: translateY(1px);
  box-shadow: 0 6px 14px rgba(247, 127, 0, 0.3);
}

.evz-permission-list {
  list-style: none;
  padding: 0;
  margin: 6px 0 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.evz-permission-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 14px;
  background-color: var(--evz-surface);
  border: 1px solid var(--evz-border-subtle);
  box-shadow: 0 6px 14px rgba(15, 23, 42, 0.04);
}

.evz-permission-icon {
  width: 24px;
  height: 24px;
  border-radius: 999px;
  background: radial-gradient(circle at 30% 0, #03cd8c, #02a671);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #ffffff;
  margin-top: 1px;
}

.evz-permission-text {
  flex: 1;
}

.evz-permission-title {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 2px;
}

.evz-permission-desc {
  display: block;
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
    if (document.getElementById("evz-mobile-styles")) return;
    const style = document.createElement("style");
    style.id = "evz-mobile-styles";
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

export default function PermissionIntroScreen() {
  useEvzStyles();

  const items = [
    {
      title: "Location",
      desc: "Find stations near you and estimate arrival time.",
    },
    {
      title: "Camera",
      desc: "Scan station and battery QR codes during swaps.",
    },
    {
      title: "Notifications",
      desc: "Get booking countdowns and payment confirmations.",
    },
  ];

  const handleContinue = () => {
    // Replace this with your routing logic
    // window.location.assign("/auth/phone");
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Enable essentials</h1>
        <p className="evz-header-subtitle">
          We only use these to power your swapping experience.
        </p>
      </header>

      <main className="evz-content">
        <ul className="evz-permission-list">
          {items.map((item) => (
            <li key={item.title} className="evz-permission-item">
              <span className="evz-permission-icon" aria-hidden="true">
                ✓
              </span>
              <div className="evz-permission-text">
                <span className="evz-permission-title">{item.title}</span>
                <span className="evz-permission-desc">{item.desc}</span>
              </div>
            </li>
          ))}
        </ul>
      </main>

      <footer className="evz-footer">
        <button
          type="button"
          className="evz-button evz-button--primary"
          onClick={handleContinue}
        >
          Continue
        </button>
      </footer>
    </EvzScreen>
  );
}
