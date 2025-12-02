import React, { useEffect, useState } from "react";

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

.evz-card-summary {
  border-radius: 16px;
  background-color: var(--evz-surface-soft);
  padding: 12px 14px 10px;
}

.evz-card-title {
  font-size: 13px;
  font-weight: 800;
}

.evz-card-summary ul {
  margin: 6px 0 0 18px;
  padding: 0;
}

.evz-card-summary li {
  margin-bottom: 2px;
}

.evz-card-text {
  font-size: 13px;
  color: var(--evz-text-secondary);
}

.evz-card-links {
  margin-top: 8px;
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-card-links a {
  color: var(--evz-accent);
  text-decoration: none;
}

.evz-card-links a:hover {
  text-decoration: underline;
}

.evz-consent-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 8px;
}

.evz-checkbox {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 1px solid var(--evz-border-subtle);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
}

.evz-checkbox input {
  width: 0;
  height: 0;
  opacity: 0;
  position: absolute;
}

.evz-checkbox-mark {
  width: 12px;
  height: 12px;
  border-radius: 3px;
  background-color: var(--evz-accent);
  opacity: 0;
}

.evz-checkbox--checked .evz-checkbox-mark {
  opacity: 1;
}

.evz-consent-label {
  font-size: 13px;
}

.evz-footer {
  margin-top: auto;
  padding-top: 18px;
}

.evz-footer-row {
  display: flex;
  gap: 8px;
}

.evz-btn-primary,
.evz-btn-secondary {
  flex: 1;
  border-radius: 999px;
  padding: 11px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
}

.evz-btn-primary {
  background-color: var(--evz-accent);
  color: #ffffff;
  box-shadow: 0 10px 22px rgba(247, 127, 0, 0.32);
}

.evz-btn-primary:disabled {
  opacity: 0.55;
  cursor: default;
  box-shadow: none;
}

.evz-btn-primary:active:not(:disabled) {
  transform: translateY(1px);
  box-shadow: 0 6px 14px rgba(247, 127, 0, 0.28);
}

.evz-btn-secondary {
  background-color: #ffffff;
  color: var(--evz-text-primary);
  border-color: #a6a6a6;
}

.evz-btn-secondary:hover {
  background-color: #f9fafb;
}

@media (max-width: 375px) {
  .evz-screen {
    padding-inline: 16px;
  }
}
`;

const ACCEPT_KEY = "evz.legal.acceptedAt";

function useEvzStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("evz-mobile-styles-p28-s01")) return;
    const style = document.createElement("style");
    style.id = "evz-mobile-styles-p28-s01";
    style.innerHTML = evzStyles;
    document.head.appendChild(style);
  }, []);
}

function safeLocalStorage() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function setAccepted(ts) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    ls.setItem(ACCEPT_KEY, String(ts));
  } catch {
    // ignore
  }
}

function goTo(href) {
  if (typeof window === "undefined") return;
  window.location.assign(href);
}

function EvzScreen({ children }) {
  return (
    <div className="evz-app">
      <div className="evz-screen">{children}</div>
    </div>
  );
}

export default function TermsPrivacy({ nextPath = "/" }) {
  useEvzStyles();

  const [checked, setChecked] = useState(false);

  const onAccept = () => {
    if (!checked) return;
    setAccepted(Date.now());
    goTo(nextPath);
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Terms &amp; Privacy</h1>
        <p className="evz-header-subtitle">
          Please review and accept to continue
        </p>
      </header>

      <div className="evz-divider" />

      <main className="evz-main">
        <section className="evz-card-summary">
          <div className="evz-card-title">Summary</div>
          <ul>
            <li>
              <span className="evz-card-text">
                We process necessary data to provide battery swapping services.
              </span>
            </li>
            <li>
              <span className="evz-card-text">
                We never sell personal data. See Privacy for details on
                retention &amp; rights.
              </span>
            </li>
            <li>
              <span className="evz-card-text">
                By using the app, you agree to the Terms of Service.
              </span>
            </li>
          </ul>
          <div className="evz-card-links">
            Full documents: {" "}
            <a href="#">Terms of Service</a> • {" "}
            <a href="#">Privacy Policy</a>
          </div>
        </section>

        <label className="evz-consent-row">
          <span
            className={
              "evz-checkbox" + (checked ? " evz-checkbox--checked" : "")
            }
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <span className="evz-checkbox-mark" />
          </span>
          <span className="evz-consent-label">
            I have read and agree to the Terms &amp; Privacy
          </span>
        </label>
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-row">
          <button
            type="button"
            className="evz-btn-secondary"
            onClick={() => goTo("/account")}
          >
            Back
          </button>
          <button
            type="button"
            className="evz-btn-primary"
            disabled={!checked}
            onClick={onAccept}
          >
            Accept
          </button>
        </div>
      </footer>
    </EvzScreen>
  );
}

/**
 * Manual test cases:
 * 1) Initially the checkbox is unchecked → Accept is disabled.
 * 2) Check the box → Accept becomes enabled; clicking Accept stores
 *    localStorage('evz.legal.acceptedAt') as a timestamp and routes to '/'.
 * 3) Back navigates to '/account'.
 * 4) Mobile view ~360x780 shows no horizontal scroll.
 * 5) Run in an environment with localStorage disabled → screen still
 *    renders and navigation works without throwing errors.
 */
