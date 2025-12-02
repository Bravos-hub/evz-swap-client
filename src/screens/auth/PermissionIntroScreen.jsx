import React, { useEffect } from "react";
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
  background: #ffffff;
}

.evz-app {
  min-height: 100vh;
  background: #ffffff;
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
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 6px;
  color: #1e3a8a;
}

.evz-header-subtitle {
  font-size: 14px;
  color: var(--evz-text-secondary);
  margin: 0;
  font-weight: 400;
}

.evz-content {
  flex: 1;
  padding-top: 20px;
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
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.evz-permission-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px;
  border-radius: 12px;
  background-color: #f3f4f6;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.evz-permission-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: var(--evz-primary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #ffffff;
  font-weight: 600;
  flex-shrink: 0;
}

.evz-permission-text {
  flex: 1;
}

.evz-permission-title {
  display: block;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #374151;
}

.evz-permission-desc {
  display: block;
  font-size: 14px;
  color: var(--evz-text-secondary);
  line-height: 1.4;
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
  const navigate = useNavigate();

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
    navigate(ROUTES.PHONE_ENTRY);
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
