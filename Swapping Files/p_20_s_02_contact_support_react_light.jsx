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

.evz-divider {
  height: 1px;
  width: 100%;
  background-color: #e5e7eb;
  margin: 12px 0 10px;
}

.evz-main-card,
.evz-secondary-card {
  border-radius: 16px;
  padding: 12px 14px 12px;
}

.evz-main-card {
  background-color: var(--evz-surface-soft);
}

.evz-secondary-card {
  background-color: #e8fff6;
  border: 1px solid var(--evz-primary);
  margin-top: 12px;
}

.evz-card-title {
  font-size: 13px;
  font-weight: 800;
}

.evz-textarea {
  width: 100%;
  border-radius: 12px;
  border: 1px solid var(--evz-border-subtle);
  padding: 8px 10px;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
  box-sizing: border-box;
  margin-top: 6px;
}

.evz-textarea:focus {
  outline: none;
  border-color: rgba(3, 205, 140, 0.9);
  box-shadow: 0 0 0 1px rgba(3, 205, 140, 0.08);
}

.evz-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.evz-btn-secondary,
.evz-btn-primary,
.evz-btn-text {
  border-radius: 999px;
  padding: 8px 12px;
  font-size: 13px;
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
  box-shadow: 0 8px 18px rgba(247, 127, 0, 0.3);
}

.evz-btn-primary:active {
  transform: translateY(1px);
  box-shadow: 0 4px 10px rgba(247, 127, 0, 0.28);
}

.evz-btn-text {
  border: none;
  background: none;
  color: var(--evz-accent);
  padding-left: 0;
}

.evz-btn-text:hover {
  text-decoration: underline;
}

.evz-caption {
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-footer {
  margin-top: auto;
  padding-top: 20px;
}

.evz-footer-btn {
  width: 100%;
  border-radius: 999px;
  border: none;
  background: none;
  padding: 10px 12px;
  font-size: 14px;
  font-weight: 600;
  color: var(--evz-accent);
  cursor: pointer;
}

.evz-footer-btn:hover {
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
    if (document.getElementById("evz-mobile-styles-p20-s02")) return;
    const style = document.createElement("style");
    style.id = "evz-mobile-styles-p20-s02";
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

function safeLocalStorage() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function buildLogs() {
  try {
    const ls = safeLocalStorage();
    const take = (k) => (ls ? ls.getItem(k) : null);
    const keys = [
      "evz.msisdn",
      "evz.lang",
      "evz.region",
      "evz.currency",
      "evz.units",
      "evz.selectedVehicleId",
      "evz.booking.stationId",
      "evz.booking.reservationId",
      "evz.swap.totalUGX",
      "evz.swap.energyKWh",
      "evz.wallet.balance",
    ];
    const data = {
      ts: Date.now(),
      ua:
        typeof navigator !== "undefined" && navigator.userAgent
          ? navigator.userAgent
          : "",
      env: "web",
      values: {},
    };
    keys.forEach((k) => {
      data.values[k] = take(k) ?? null;
    });
    return JSON.stringify(data, null, 2);
  } catch {
    return "{}";
  }
}

function download(filename, text) {
  if (typeof document === "undefined") return;
  try {
    const blob = new Blob([text], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  } catch {
    // ignore
  }
}

function goTo(path) {
  if (typeof window === "undefined") return;
  window.location.assign(path);
}

export default function P20S02ContactSupport() {
  useEvzStyles();

  const [message, setMessage] = useState("");
  const logs = useMemo(() => buildLogs(), []);

  const mailto = useMemo(() => {
    const subject = encodeURIComponent("EVzone Support");
    const body = encodeURIComponent(`${message}\n\nLogs:\n${logs}`);
    return `mailto:support@evzone.example?subject=${subject}&body=${body}`;
  }, [message, logs]);

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Contact support</h1>
        <p className="evz-header-subtitle">We’ll help you get back on track</p>
      </header>

      <div className="evz-divider" />

      <main>
        <section className="evz-main-card">
          <div className="evz-card-title">Message</div>
          <textarea
            className="evz-textarea"
            placeholder="Describe the issue…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="evz-row">
            <button
              type="button"
              className="evz-btn-secondary"
              onClick={() => goTo("/help/chat")}
            >
              Open chat
            </button>
            <a
              href="tel:+256000000000"
              className="evz-btn-secondary"
              style={{ textDecoration: "none", textAlign: "center" }}
            >
              Call
            </a>
            <a
              href={mailto}
              className="evz-btn-primary"
              style={{ textDecoration: "none", textAlign: "center" }}
            >
              Email
            </a>
          </div>
        </section>

        <section className="evz-secondary-card">
          <div className="evz-card-title">Diagnostics</div>
          <p className="evz-caption">
            Attach logs to help us resolve faster.
          </p>
          <button
            type="button"
            className="evz-btn-text"
            onClick={() => download("EVZ-diagnostics.json", logs)}
          >
            Download logs
          </button>
        </section>
      </main>

      <footer className="evz-footer">
        <button
          type="button"
          className="evz-footer-btn"
          onClick={() => goTo("/help")}
        >
          Back to Help
        </button>
      </footer>
    </EvzScreen>
  );
}
