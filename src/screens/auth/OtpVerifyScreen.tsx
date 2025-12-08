import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  max-width: 420px;
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
}

.evz-footer {
  padding-top: 10px;
}

.evz-button {
  width: 100%;
  border: none;
  border-radius: 12px;
  padding: 14px 18px;
  font-size: 16px;
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
  box-shadow: 0 4px 12px rgba(247, 127, 0, 0.3);
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
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #374151;
}

.evz-input {
  width: 100%;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 14px 16px;
  font-size: 20px;
  letter-spacing: 0.4em;
  text-align: center;
  background-color: #ffffff;
  color: var(--evz-text-primary);
  font-family: monospace;
}

.evz-input::placeholder {
  color: #d1d5db;
  letter-spacing: 0.4em;
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
  font-size: 14px;
  color: #374151;
  font-weight: 400;
}

.evz-text-button {
  border: none;
  background: none;
  padding: 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--evz-accent);
  cursor: pointer;
  text-decoration: none;
}

.evz-text-button--disabled {
  opacity: 0.4;
  cursor: default;
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
    const styleId = "evz-mobile-styles";
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

function getMsisdnFromLocation(): string {
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

export default function OtpVerifyScreen(): JSX.Element {
  useEvzStyles();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [msisdn] = useState(() => {
    const paramMsisdn = searchParams.get("msisdn");
    if (paramMsisdn) return paramMsisdn;
    return getMsisdnFromLocation();
  });
  const [otp, setOtp] = useState("");
  const [touched, setTouched] = useState(false);
  const [secs, setSecs] = useState(30);

  const isValid = useMemo(() => /^\d{6}$/.test(otp), [otp]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSecs((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.replace(/\D+/g, "").slice(0, 6);
    setOtp(value);
  };

  const handleVerify = (): void => {
    if (!isValid) {
      setTouched(true);
      return;
    }

    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("evz.auth.verified", "true");
        window.localStorage.setItem("evz.msisdn", msisdn);
        window.localStorage.setItem("evz.session", "active");
      }
    } catch {
      // ignore
    }

    // Check if user already has profile setup
    const hasProfile = typeof window !== "undefined" && 
      window.localStorage.getItem("evz.profile.name");
    
    if (hasProfile) {
      navigate(ROUTES.DASHBOARD);
    } else {
      navigate(`${ROUTES.PROFILE_SETUP}?msisdn=${encodeURIComponent(msisdn)}`);
    }
  };

  const handleResend = (): void => {
    if (secs > 0) return;
    setSecs(30);
    // In a real app, trigger resend using msisdn here
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Enter the 6-digit code</h1>
        <p className="evz-header-subtitle">
          Sent to your phone
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
        <button
          type="button"
          onClick={handleVerify}
          className="evz-button evz-button--primary"
        >
          Verify &amp; Continue
        </button>
      </footer>
    </EvzScreen>
  );
}
