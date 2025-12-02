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

.evz-main {
  padding-top: 4px;
}

.evz-card {
  border-radius: 16px;
  background-color: var(--evz-surface-soft);
  padding: 12px 14px 10px;
}

.evz-status-label {
  font-size: 12px;
  font-weight: 800;
}

.evz-status-text {
  font-size: 12px;
  font-weight: 800;
}

.evz-status-message {
  font-size: 13px;
  color: var(--evz-text-secondary);
  margin-top: 4px;
}

.evz-caption {
  font-size: 11px;
  color: var(--evz-text-secondary);
  margin-top: 8px;
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
  opacity: 0.6;
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

function useEvzStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("evz-mobile-styles-p22-s01")) return;
    const style = document.createElement("style");
    style.id = "evz-mobile-styles-p22-s01";
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

function setItem(key, value) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    ls.setItem(key, String(value));
  } catch {
    // ignore
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

function goTo(path) {
  if (typeof window === "undefined") return;
  window.location.assign(path);
}

function EvzScreen({ children }) {
  return (
    <div className="evz-app">
      <div className="evz-screen">{children}</div>
    </div>
  );
}

export default function P22S01LocationPermission({ nextPath = "/stations/search" }) {
  useEvzStyles();

  const [status, setStatus] = useState(() => getItem("evz.perm.location", "prompt"));
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!status) setStatus("prompt");
  }, [status]);

  const request = () => {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      setStatus("denied");
      setItem("evz.perm.location", "denied");
      setMsg("Geolocation API not available in this environment.");
      return;
    }

    setBusy(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setBusy(false);
        setStatus("granted");
        setItem("evz.perm.location", "granted");
        setItem("evz.geo.lat", pos.coords.latitude);
        setItem("evz.geo.lng", pos.coords.longitude);
        setMsg("Location captured successfully.");
      },
      (err) => {
        setBusy(false);
        setStatus("denied");
        setItem("evz.perm.location", "denied");
        setMsg(err?.message || "Permission denied or unavailable.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const statusColor = useMemo(() => {
    if (status === "granted") return "var(--evz-primary)";
    if (status === "denied") return "var(--evz-accent)";
    return "#a6a6a6";
  }, [status]);

  const effectiveMessage =
    msg || "You can continue even if you decline; results may be less accurate.";

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Allow location</h1>
        <p className="evz-header-subtitle">
          We use your location to find nearby swap stations and estimate arrival
          time.
        </p>
      </header>

      <div className="evz-divider" />

      <main className="evz-main">
        <section className="evz-card">
          <div className="evz-status-label" style={{ color: statusColor }}>
            Status: <span className="evz-status-text">{status}</span>
          </div>
          <p className="evz-status-message">{effectiveMessage}</p>
          <p className="evz-caption">
            Tip: If you blocked the prompt, enable Location for this site in
            your browser settings and try again.
          </p>
        </section>
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-row">
          <button
            type="button"
            className="evz-btn-primary"
            onClick={request}
            disabled={busy}
          >
            {busy ? "Requesting…" : "Allow location"}
          </button>
          <button
            type="button"
            className="evz-btn-secondary"
            onClick={() => goTo(nextPath)}
          >
            Continue
          </button>
        </div>
      </footer>
    </EvzScreen>
  );
}
