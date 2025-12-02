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

.evz-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.evz-field {
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
  font-size: 18px;
  letter-spacing: 0.3em;
  text-align: center;
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

.evz-otp-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.evz-otp-timer {
  font-size: 13px;
  color: var(--evz-text-secondary);
}

.evz-text-button {
  border: none;
  background: none;
  padding: 0;
  font-size: 13px;
  font-weight: 500;
  color: var(--evz-accent);
  cursor: pointer;
}

.evz-text-button--disabled {
  opacity: 0.4;
  cursor: default;
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

function getMsisdnFromLocation() {
  if (typeof window === "undefined") return "";
  try {
    const params = new URLSearchParams(window.location.search);
    return (
      params.get("msisdn") || window.localStorage.getItem("evz.msisdn") || ""
    );
  } catch {
    return "";
  }
}

export default function OtpVerify({ nextPath = "/auth/profile" }) {
  useEvzStyles();

  const [msisdn] = useState(() => getMsisdnFromLocation());
  const [otp, setOtp] = useState("");
  const [touched, setTouched] = useState(false);
  const [secs, setSecs] = useState(30);

  const isValid = useMemo(() => /^\d{6}$/.test(otp), [otp]);
  const nextHref = `${nextPath}?msisdn=${encodeURIComponent(msisdn)}`;

  useEffect(() => {
    const id = window.setInterval(() => {
      setSecs((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D+/g, "").slice(0, 6);
    setOtp(value);
  };

  const handleVerify = (e) => {
    if (!isValid) {
      e.preventDefault();
      setTouched(true);
      return;
    }

    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("evz.auth.verified", "true");
        window.localStorage.setItem("evz.msisdn", msisdn);
      }
    } catch {
      // ignore
    }
  };

  const handleResend = () => {
    if (secs > 0) return;
    setSecs(30);
    // In a real app, trigger resend using msisdn here
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Enter the 6-digit code</h1>
        <p className="evz-header-subtitle">
          Sent to <strong>{msisdn || "your phone"}</strong>
        </p>
      </header>

      <main className="evz-content">
        <div className="evz-form">
          <div className="evz-field">
            <label className="evz-input-label" htmlFor="evz-otp">
              One-time code
            </label>
            <input
              id="evz-otp"
              className={
                "evz-input" +
                (touched && !isValid ? " evz-input--error" : "")
              }
              inputMode="numeric"
              placeholder="••••••"
              value={otp}
              onChange={handleChange}
              onBlur={() => setTouched(true)}
            />
            <p
              className={
                "evz-helper-text" +
                (touched && !isValid ? " evz-helper-text--error" : "")
              }
            >
              {touched && !isValid ? "Enter the 6-digit code" : "\u00A0"}
            </p>
          </div>

          <div className="evz-otp-meta">
            <p className="evz-otp-timer">
              {secs > 0 ? `Resend in ${secs}s` : "Didn't get a code?"}
            </p>
            <button
              type="button"
              onClick={handleResend}
              disabled={secs > 0}
              className={
                "evz-text-button" +
                (secs > 0 ? " evz-text-button--disabled" : "")
              }
            >
              Resend code
            </button>
          </div>
        </div>
      </main>

      <footer className="evz-footer">
        <a
          href={nextHref}
          onClick={handleVerify}
          className="evz-button evz-button--primary"
        >
          Verify &amp; Continue
        </a>
      </footer>
    </EvzScreen>
  );
}
