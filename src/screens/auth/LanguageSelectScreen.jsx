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
  padding-bottom: 12px;
}

.evz-header-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 6px;
  color: #374151;
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

.evz-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.evz-pill {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid var(--evz-border-subtle);
  background-color: var(--evz-surface);
  color: var(--evz-text-primary);
  font-size: 15px;
  cursor: pointer;
  outline: none;
  transition: border-color 0.12s ease, background-color 0.12s ease;
  text-align: left;
}

.evz-pill-label {
  flex: 1;
}

.evz-pill-indicator {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid var(--evz-primary);
  background-color: var(--evz-primary);
  flex-shrink: 0;
}

.evz-pill--active {
  border-color: var(--evz-primary);
  background-color: rgba(3, 205, 140, 0.1);
}

.evz-pill:active {
  opacity: 0.8;
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

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "sw", label: "Kiswahili" },
  { code: "fr", label: "Français" },
  { code: "hi", label: "हिन्दी (Hindi)" },
  { code: "zh", label: "中文 (Chinese)" },
];

export default function LanguageSelectScreen() {
  useEvzStyles();
  const navigate = useNavigate();
  const [selected, setSelected] = useState("en");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("evz.lang");
      if (stored) setSelected(stored);
    } catch {
      // ignore
    }
  }, []);

  const handleContinue = () => {
    try {
      window.localStorage.setItem("evz.lang", selected);
    } catch {
      // ignore
    }

    navigate(ROUTES.PERMISSION_INTRO);
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Choose your language</h1>
        <p className="evz-header-subtitle">
          You can change this later in Settings.
        </p>
      </header>

      <main className="evz-content">
        <div className="evz-list">
          {LANGUAGES.map((lang) => {
            const isActive = selected === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                className={"evz-pill" + (isActive ? " evz-pill--active" : "")}
                onClick={() => setSelected(lang.code)}
                aria-pressed={isActive}
              >
                <span className="evz-pill-label">{lang.label}</span>
                {isActive && (
                  <span className="evz-pill-indicator" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
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
