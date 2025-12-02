import React, { useEffect, useMemo, useState } from "react";

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

.evz-divider {
  height: 1px;
  width: 100%;
  background-color: #e5e7eb;
  margin: 10px 0 0;
}

.evz-main {
  padding-top: 10px;
}

.evz-card {
  border-radius: 16px;
  background-color: var(--evz-surface-soft);
  padding: 16px 14px 14px;
}

.evz-avatar {
  width: 72px;
  height: 72px;
  border-radius: 999px;
  background-color: var(--evz-primary);
  color: #ffffff;
  font-weight: 800;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
}

.evz-field {
  margin-bottom: 12px;
}

.evz-label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 4px;
}

.evz-input {
  width: 100%;
  border-radius: 12px;
  border: 1px solid var(--evz-border-subtle);
  padding: 8px 10px;
  font-size: 14px;
  box-sizing: border-box;
}

.evz-input:focus {
  outline: none;
  border-color: rgba(3, 205, 140, 0.9);
  box-shadow: 0 0 0 1px rgba(3, 205, 140, 0.08);
}

.evz-input[readonly] {
  background-color: #f9fafb;
  color: var(--evz-text-secondary);
}

.evz-helper {
  min-height: 16px;
  margin-top: 3px;
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-helper--error {
  color: #b91c1c;
}

.evz-inline-links {
  margin-top: 20px;
  display: flex;
  gap: 8px;
}

.evz-inline-btn {
  flex: 1;
  border-radius: 999px;
  border: 1px solid #a6a6a6;
  padding: 9px 12px;
  font-size: 13px;
  font-weight: 600;
  background-color: #ffffff;
  color: var(--evz-text-primary);
  text-align: center;
  text-decoration: none;
}

.evz-inline-btn:hover {
  background-color: #f9fafb;
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

.evz-btn-primary--disabled {
  background-color: #a6a6a6;
  box-shadow: none;
  cursor: default;
}

.evz-btn-primary:active:not(.evz-btn-primary--disabled) {
  transform: translateY(1px);
  box-shadow: 0 6px 14px rgba(247, 127, 0, 0.28);
}

.evz-signout {
  width: 100%;
  margin-top: 8px;
  border: none;
  background: none;
  padding: 10px 4px;
  font-size: 14px;
  font-weight: 600;
  color: var(--evz-accent);
  cursor: pointer;
  text-align: center;
}

.evz-signout:hover {
  text-decoration: underline;
}

.evz-empty-primary {
  font-size: 14px;
}

.evz-empty-secondary {
  font-size: 12px;
  color: var(--evz-text-secondary);
}

.evz-inline-link {
  color: var(--evz-accent);
  text-decoration: none;
}

.evz-inline-link:hover {
  text-decoration: underline;
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
    if (document.getElementById("evz-mobile-styles-p17-s01")) return;
    const style = document.createElement("style");
    style.id = "evz-mobile-styles-p17-s01";
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

const NAME_KEY = "evz.profile.name";
const EMAIL_KEY = "evz.profile.email";
const PHONE_KEY = "evz.msisdn";
const AUTH_KEY = "evz.auth.verified";

function safeLocalStorage() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function getItem(key, fallback = "") {
  const ls = safeLocalStorage();
  if (!ls) return fallback;
  try {
    return ls.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

function setItem(key, value) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    ls.setItem(key, value);
  } catch {
    // ignore
  }
}

function removeItem(key) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    ls.removeItem(key);
  } catch {
    // ignore
  }
}

function goTo(path) {
  if (typeof window === "undefined") return;
  window.location.assign(path);
}

function initials(name) {
  const trimmed = (name || "").trim();
  if (!trimmed) return "EV";
  const parts = trimmed.split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() || "").join("") || "EV";
}

export default function ProfileScreen() {
  useEvzStyles();

  const [name, setName] = useState(() => getItem(NAME_KEY, ""));
  const [email, setEmail] = useState(() => getItem(EMAIL_KEY, ""));
  const msisdn = getItem(PHONE_KEY, "");

  const avatarText = useMemo(() => initials(name || "EV"), [name]);

  const isNameValid = name.trim().length >= 2;
  const isEmailValid =
    !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const nameError = name.length > 0 && !isNameValid;
  const emailError = !!email && !isEmailValid;
  const canSave = isNameValid && isEmailValid;

  const handleSave = () => {
    if (!canSave) return;
    setItem(NAME_KEY, name.trim());
    setItem(EMAIL_KEY, email.trim());
    goTo("/account");
  };

  const handleSignOut = () => {
    removeItem(AUTH_KEY);
    goTo("/auth/phone");
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Account</h1>
        <p className="evz-header-subtitle">Profile &amp; preferences</p>
      </header>

      <div className="evz-divider" />

      <main className="evz-main">
        <section className="evz-card">
          <div className="evz-avatar" aria-hidden="true">
            {avatarText}
          </div>

          <div className="evz-field">
            <label className="evz-label" htmlFor="evz-profile-name">
              Display name
            </label>
            <input
              id="evz-profile-name"
              className="evz-input"
              type="text"
              placeholder="e.g., Amina N."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div
              className={
                "evz-helper" + (nameError ? " evz-helper--error" : "")
              }
            >
              {nameError
                ? "Enter at least 2 characters"
                : " "}
            </div>
          </div>

          <div className="evz-field">
            <label className="evz-label" htmlFor="evz-profile-email">
              Email (optional)
            </label>
            <input
              id="evz-profile-email"
              className="evz-input"
              type="email"
              placeholder="amina@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div
              className={
                "evz-helper" + (emailError ? " evz-helper--error" : "")
              }
            >
              {emailError ? "Enter a valid email" : " "}
            </div>
          </div>

          <div className="evz-field">
            <label className="evz-label" htmlFor="evz-profile-phone">
              Phone
            </label>
            <input
              id="evz-profile-phone"
              className="evz-input"
              type="tel"
              value={msisdn}
              readOnly
            />
            <div className="evz-helper">
              Phone is managed via OTP login
            </div>
          </div>
        </section>

        <div className="evz-inline-links">
          <a href="/account/language" className="evz-inline-btn">
            Language &amp; region
          </a>
          <a href="/account/notifications" className="evz-inline-btn">
            Notifications
          </a>
        </div>
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-row">
          <button
            type="button"
            className="evz-btn-secondary"
            onClick={() => goTo("/vehicles/select")}
          >
            Back
          </button>
          <button
            type="button"
            className={
              "evz-btn-primary" + (!canSave ? " evz-btn-primary--disabled" : "")
            }
            onClick={handleSave}
            disabled={!canSave}
          >
            Save
          </button>
        </div>
        <button
          type="button"
          className="evz-signout"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </footer>
    </EvzScreen>
  );
}
