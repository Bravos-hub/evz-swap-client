import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/routes";

const evzStyles = `
:root {
  --evz-primary: #03cd8c;
  --evz-accent: #f77f00;
  --evz-bg: #f5f7fb;
  --evz-surface: #ffffff;
  --evz-surface-soft: #f2f2f2;
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
  padding-bottom: 10px;
}

.evz-header-title {
  font-size: 22px;
  font-weight: 800;
  margin: 0;
}

.evz-header-subtitle {
  font-size: 13px;
  color: var(--evz-text-secondary);
  margin: 0;
}

.evz-content {
  flex: 1;
  padding-top: 10px;
}

.evz-rating-stars {
  display: flex;
  gap: 4px;
  margin-bottom: 10px;
}

.evz-star-button {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  border: none;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  color: #fbbf24;
}

.evz-star-button--active {
  background-color: #fff7e6;
}

.evz-textarea {
  width: 100%;
  border-radius: 12px;
  border: 1px solid var(--evz-border-subtle);
  padding: 10px 12px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  min-height: 96px;
}

.evz-textarea:focus {
  outline: none;
  border-color: rgba(3, 205, 140, 0.8);
  box-shadow: 0 0 0 1px rgba(3, 205, 140, 0.1);
}

.evz-caption {
  margin-top: 6px;
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-footer {
  margin-top: auto;
  padding-top: 18px;
}

.evz-footer-row {
  display: flex;
  gap: 10px;
}

.evz-button-outline,
.evz-button-primary {
  flex: 1;
  border-radius: 999px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.evz-button-outline {
  border: 1px solid #a6a6a6;
  background-color: transparent;
  color: var(--evz-text-primary);
}

.evz-button-outline:hover {
  background-color: #f9fafb;
}

.evz-button-primary {
  border: none;
  background-color: var(--evz-primary);
  color: #ffffff;
  box-shadow: 0 10px 22px rgba(3, 205, 140, 0.32);
}

.evz-button-primary:active {
  transform: translateY(1px);
  box-shadow: 0 6px 14px rgba(3, 205, 140, 0.28);
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
    const styleId = "evz-mobile-styles-p11-s03";
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

function EvzScreen({ children }) {
  return (
    <div className="evz-app">
      <div className="evz-screen">{children}</div>
    </div>
  );
}

export default function RateExperienceScreen() {
  useEvzStyles();
  const navigate = useNavigate();

  const [stars, setStars] = useState(0);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    try {
      if (typeof window === "undefined") return;
      const entry = {
        rsv: window.localStorage.getItem("evz.booking.reservationId") || "",
        stars,
        note: note.trim(),
        ts: Date.now(),
        selfService: true,
      };
      const key = "evz.swap.ratings";
      const raw = window.localStorage.getItem(key) || "[]";
      const list = JSON.parse(raw);
      list.push(entry);
      window.localStorage.setItem(key, JSON.stringify(list));
      setSubmitted(true);
      
      // Navigate to dashboard after a brief delay to show "Thanks" message
      setTimeout(() => {
        navigate(ROUTES.DASHBOARD);
      }, 1000);
    } catch {
      // ignore
    }
  };

  const handleDone = () => {
    // Navigate to dashboard when skipping rating
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Rate your swap</h1>
        <p className="evz-header-subtitle">
          How was your self-service swap today?
        </p>
      </header>

      <main className="evz-content">
        <div className="evz-rating-stars">
          {[1, 2, 3, 4, 5].map((value) => {
            const active = value <= stars;
            return (
              <button
                key={value}
                type="button"
                className={
                  "evz-star-button" + (active ? " evz-star-button--active" : "")
                }
                onClick={() => setStars(value)}
                aria-label={`${value} star${value > 1 ? "s" : ""}`}
              >
                {active ? "★" : "☆"}
              </button>
            );
          })}
        </div>

        <textarea
          className="evz-textarea"
          placeholder="Tell us anything we should know…"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        {submitted && (
          <div className="evz-caption">Thanks for your feedback!</div>
        )}
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-row">
          <button
            type="button"
            className="evz-button-outline"
            onClick={handleSubmit}
          >
            Submit rating
          </button>
          <button
            type="button"
            className="evz-button-primary"
            onClick={handleDone}
          >
            Done
          </button>
        </div>
      </footer>
    </EvzScreen>
  );
}
