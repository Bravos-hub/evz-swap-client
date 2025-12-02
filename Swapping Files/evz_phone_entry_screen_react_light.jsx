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

.evz-field-row {
  display: flex;
  gap: 12px;
}

.evz-field {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.evz-field--select {
  max-width: 160px;
}

.evz-input-label {
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 4px;
  color: var(--evz-text-secondary);
}

.evz-select-wrap {
  border-radius: 12px;
  border: 1px solid var(--evz-border-subtle);
  background-color: var(--evz-surface);
  padding: 6px 10px;
}

.evz-select {
  width: 100%;
  border: none;
  background: transparent;
  font-size: 14px;
  color: var(--evz-text-primary);
  outline: none;
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

.evz-footer-disclaimer {
  margin-top: 12px;
  font-size: 11px;
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

const COUNTRIES = [
  { cc: "+256", label: "Uganda (+256)" },
  { cc: "+254", label: "Kenya (+254)" },
  { cc: "+255", label: "Tanzania (+255)" },
  { cc: "+250", label: "Rwanda (+250)" },
  { cc: "+234", label: "Nigeria (+234)" },
  { cc: "+91", label: "India (+91)" },
  { cc: "+86", label: "China (+86)" },
];

export default function PhoneEntry({ nextPath = "/auth/otp" }) {
  useEvzStyles();

  const [cc, setCc] = useState(() => {
    if (typeof window === "undefined") return "+256";
    try {
      return window.localStorage.getItem("evz.cc") || "+256";
    } catch {
      return "+256";
    }
  });

  const [local, setLocal] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      return window.localStorage.getItem("evz.local") || "";
    } catch {
      return "";
    }
  });

  const [touched, setTouched] = useState(false);

  const digitsOnly = (s) => s.replace(/\D+/g, "");

  const msisdn = useMemo(() => {
    const num = digitsOnly(local);
    return `${cc}${num}`;
  }, [cc, local]);

  const isValid = useMemo(() => digitsOnly(local).length >= 6, [local]);
  const nextHref = `${nextPath}?msisdn=${encodeURIComponent(msisdn)}`;

  const handleContinue = (e) => {
    if (!isValid) {
      e.preventDefault();
      setTouched(true);
      return;
    }

    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("evz.cc", cc);
        window.localStorage.setItem("evz.local", digitsOnly(local));
        window.localStorage.setItem("evz.msisdn", msisdn);
      }
    } catch {
      // ignore
    }
  };

  const handleLocalChange = (e) => {
    const value = e.target.value.replace(/\D+/g, "");
    setLocal(value);
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Sign in with your phone</h1>
        <p className="evz-header-subtitle">
          We'll send a one-time code to verify
        </p>
      </header>

      <main className="evz-content">
        <div className="evz-field-row">
          <div className="evz-field evz-field--select">
            <label className="evz-input-label" htmlFor="evz-country">
              Country
            </label>
            <div className="evz-select-wrap">
              <select
                id="evz-country"
                className="evz-select"
                value={cc}
                onChange={(e) => setCc(e.target.value)}
              >
                {COUNTRIES.map((c) => (
                  <option key={c.cc} value={c.cc}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="evz-field">
            <label className="evz-input-label" htmlFor="evz-phone">
              Phone number
            </label>
            <input
              id="evz-phone"
              className={
                "evz-input" +
                (touched && !isValid ? " evz-input--error" : "")
              }
              placeholder="712345678"
              inputMode="numeric"
              value={local}
              onChange={handleLocalChange}
              onBlur={() => setTouched(true)}
            />
            <p
              className={
                "evz-helper-text" +
                (touched && !isValid ? " evz-helper-text--error" : "")
              }
            >
              {touched && !isValid ? "Enter at least 6 digits" : "\u00A0"}
            </p>
          </div>
        </div>
      </main>

      <footer className="evz-footer">
        <a
          href={nextHref}
          onClick={handleContinue}
          className="evz-button evz-button--primary"
        >
          Continue
        </a>
        <p className="evz-footer-disclaimer">
          By continuing you agree to our Terms & Privacy.
        </p>
      </footer>
    </EvzScreen>
  );
}
