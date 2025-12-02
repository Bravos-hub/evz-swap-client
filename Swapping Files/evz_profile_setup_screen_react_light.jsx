import React, { useEffect, useMemo, useState } from "react";

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
  text-align: center;
  text-decoration: none;
  display: inline-block;
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

.evz-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.evz-avatar {
  width: 80px;
  height: 80px;
  border-radius: 999px;
  background: radial-gradient(circle at 20% 0, #03cd8c, #02a671);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 800;
  font-size: 26px;
  box-shadow: 0 14px 28px rgba(3, 205, 140, 0.35);
}

.evz-field {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.evz-input-label {
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 4px;
  color: var(--evz-text-secondary);
}

.evz-input {
  width: 100%;
  border-radius: 12px;
  border: 1px solid var(--evz-border-subtle);
  padding: 10px 12px;
  font-size: 14px;
  background-color: var(--evz-surface);
  color: var(--evz-text-primary);
}

.evz-input::placeholder {
  color: rgba(156, 163, 175, 0.85);
}

.evz-input:focus {
  outline: none;
  border-color: rgba(3, 205, 140, 0.9);
  box-shadow: 0 0 0 1px rgba(3, 205, 140, 0.1);
}

.evz-input--error {
  border-color: #ef4444;
}

.evz-helper-text {
  margin-top: 4px;
  font-size: 11px;
  color: var(--evz-text-secondary);
  min-height: 14px;
}

.evz-helper-text--error {
  color: #b91c1c;
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

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((s) => (s[0] ? s[0].toUpperCase() : ""))
    .join("");
}

export default function ProfileSetup({ nextPath = "/vehicles/select" }) {
  useEvzStyles();

  const [name, setName] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      return window.localStorage.getItem("evz.profile.name") || "";
    } catch {
      return "";
    }
  });

  const initials = useMemo(() => (name ? getInitials(name) : "EV"), [name]);
  const isValid = name.trim().length >= 2;

  const handleContinue = (e) => {
    if (!isValid) {
      e.preventDefault();
      return;
    }

    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("evz.profile.name", name.trim());
      }
    } catch {
      // ignore
    }
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Set up your profile</h1>
        <p className="evz-header-subtitle">
          Add your display name (you can change it later)
        </p>
      </header>

      <main className="evz-content">
        <div className="evz-profile">
          <div className="evz-avatar">{initials}</div>

          <div className="evz-field">
            <label className="evz-input-label" htmlFor="evz-name">
              Your name
            </label>
            <input
              id="evz-name"
              className={
                "evz-input" +
                (!isValid && name.length > 0 ? " evz-input--error" : "")
              }
              placeholder="e.g., Amina N."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p
              className={
                "evz-helper-text" +
                (!isValid && name.length > 0
                  ? " evz-helper-text--error"
                  : "")
              }
            >
              {!isValid && name.length > 0
                ? "Please enter at least 2 characters"
                : "\u00A0"}
            </p>
          </div>
        </div>
      </main>

      <footer className="evz-footer">
        <a
          href={nextPath}
          onClick={handleContinue}
          className="evz-button evz-button--primary"
        >
          Continue
        </a>
      </footer>
    </EvzScreen>
  );
}
