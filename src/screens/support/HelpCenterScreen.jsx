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
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  padding-bottom: 8px;
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

.evz-header-actions {
  display: flex;
  gap: 6px;
}

.evz-pill-btn {
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid #a6a6a6;
  background-color: #ffffff;
  cursor: pointer;
}

.evz-pill-btn:hover {
  background-color: #f9fafb;
}

.evz-pill-btn--accent {
  border-color: transparent;
  background: none;
  color: var(--evz-accent);
}

.evz-pill-btn--accent:hover {
  text-decoration: underline;
  background: none;
}

.evz-divider {
  height: 1px;
  width: 100%;
  background-color: #e5e7eb;
  margin: 12px 0 10px;
}

.evz-main {
  padding-bottom: 16px;
}

.evz-search {
  margin-bottom: 12px;
}

.evz-search-input {
  width: 100%;
  border-radius: 999px;
  border: 1px solid var(--evz-border-subtle);
  padding: 8px 12px;
  padding-left: 14px;
  font-size: 14px;
  box-sizing: border-box;
}

.evz-search-input:focus {
  outline: none;
  border-color: rgba(3, 205, 140, 0.9);
  box-shadow: 0 0 0 1px rgba(3, 205, 140, 0.08);
}

.evz-accordions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.evz-accordion {
  border-radius: 16px;
  border: 1px solid #f2f2f2;
  background-color: var(--evz-surface-soft);
  overflow: hidden;
}

.evz-accordion-summary {
  width: 100%;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  cursor: pointer;
}

.evz-accordion-summary-main {
  display: flex;
  align-items: center;
  gap: 8px;
  text-align: left;
}

.evz-chip {
  border-radius: 999px;
  padding: 2px 8px;
  font-size: 10px;
  background-color: #f2f2f2;
}

.evz-accordion-question {
  font-size: 13px;
  font-weight: 700;
}

.evz-accordion-icon {
  font-size: 16px;
  margin-left: 6px;
}

.evz-accordion-body {
  padding: 0 12px 10px;
  font-size: 13px;
  color: var(--evz-text-secondary);
}

.evz-empty-text {
  font-size: 13px;
  color: var(--evz-text-secondary);
}

.evz-link-inline {
  color: var(--evz-accent);
  text-decoration: none;
}

.evz-link-inline:hover {
  text-decoration: underline;
}

@media (max-width: 375px) {
  .evz-screen {
    padding-inline: 16px;
  }
}
`;

const FAQ = [
  {
    cat: "Booking & Payment",
    q: "Is the hold fee refundable?",
    a: "No. The booking (hold) fee reserves a charged pack for the selected time window and is non-refundable.",
  },
  {
    cat: "Booking & Payment",
    q: "How do I extend my hold?",
    a: "From the booking screen, tap Extend and choose +5 or +10 minutes. An add-on fee applies.",
  },
  {
    cat: "Swapping",
    q: "What if the QR code does not scan?",
    a: "Use the manual entry option to type the station or battery code printed on the kiosk/packs.",
  },
  {
    cat: "Stations & Map",
    q: "Why can’t I see nearby stations?",
    a: "Ensure Location permission is granted and GPS is on. You can also widen your search radius or try again online.",
  },
  {
    cat: "Wallet",
    q: "Which payment methods are supported?",
    a: "Wallet, Cash (operator sites), and region-specific options such as Mobile Money, UPI, WeChat Pay, and Alipay.",
  },
  {
    cat: "Account & Security",
    q: "How do I enable 2FA?",
    a: "Open Account → Security → Two-factor and choose SMS or Authenticator.",
  },
];

function useEvzStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("evz-mobile-styles-p20-s01")) return;
    const style = document.createElement("style");
    style.id = "evz-mobile-styles-p20-s01";
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

function goTo(path) {
  if (typeof window === "undefined") return;
  window.location.assign(path);
}

export default function HelpCenterScreen() {
  useEvzStyles();

  const [q, setQ] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return FAQ;
    return FAQ.filter(
      (x) =>
        x.q.toLowerCase().includes(t) ||
        x.a.toLowerCase().includes(t) ||
        x.cat.toLowerCase().includes(t)
    );
  }, [q]);

  return (
    <EvzScreen>
      <header className="evz-header">
        <div>
          <h1 className="evz-header-title">Help Center</h1>
          <p className="evz-header-subtitle">FAQs, guides, and support</p>
        </div>
        <div className="evz-header-actions">
          <button
            type="button"
            className="evz-pill-btn"
            onClick={() => goTo("/help/contact")}
          >
            Contact
          </button>
          <button
            type="button"
            className="evz-pill-btn evz-pill-btn--accent"
            onClick={() => goTo("/help/report")}
          >
            Report
          </button>
        </div>
      </header>

      <div className="evz-divider" />

      <main className="evz-main">
        <div className="evz-search">
          <input
            className="evz-search-input"
            placeholder="Search help…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <div className="evz-accordions">
          {results.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="evz-accordion">
                <button
                  type="button"
                  className="evz-accordion-summary"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                >
                  <div className="evz-accordion-summary-main">
                    <span className="evz-chip">{item.cat}</span>
                    <span className="evz-accordion-question">{item.q}</span>
                  </div>
                  <span className="evz-accordion-icon">
                    {isOpen ? "▴" : "▾"}
                  </span>
                </button>
                {isOpen && (
                  <div className="evz-accordion-body">{item.a}</div>
                )}
              </div>
            );
          })}

          {results.length === 0 && (
            <p className="evz-empty-text">
              No results. Try different keywords or {" "}
              <a href="/help/contact" className="evz-link-inline">
                contact support
              </a>
              .
            </p>
          )}
        </div>
      </main>
    </EvzScreen>
  );
}
