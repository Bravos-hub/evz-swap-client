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

.evz-header-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 6px;
}

.evz-avatar {
  width: 64px;
  height: 64px;
  border-radius: 999px;
  background-color: var(--evz-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
}

.evz-header-title {
  font-size: 22px;
  font-weight: 800;
  margin: 4px 0 0;
}

.evz-header-subtitle {
  font-size: 13px;
  color: var(--evz-text-secondary);
  margin: 0;
}

.evz-card {
  margin-top: 14px;
  border-radius: 16px;
  background-color: var(--evz-surface-soft);
  padding: 14px 14px 10px;
}

.evz-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  margin-bottom: 6px;
}

.evz-row-label {
  color: var(--evz-text-secondary);
  margin-right: 8px;
}

.evz-row-value {
  text-align: right;
  word-break: break-all;
}

.evz-footer {
  margin-top: auto;
  padding-top: 20px;
}

.evz-footer-row {
  display: flex;
  gap: 8px;
}

.evz-btn-secondary,
.evz-btn-ghost,
.evz-btn-primary {
  flex: 1;
  border-radius: 999px;
  padding: 11px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
}

.evz-btn-secondary {
  border: 1px solid #a6a6a6;
  background-color: #ffffff;
  color: var(--evz-text-primary);
}

.evz-btn-secondary:hover {
  background-color: #f9fafb;
}

.evz-btn-ghost {
  border: none;
  background: none;
  color: var(--evz-accent);
}

.evz-btn-ghost:hover {
  text-decoration: underline;
}

.evz-btn-primary {
  width: 100%;
  margin-top: 10px;
  border: none;
  background-color: var(--evz-accent);
  color: #ffffff;
  box-shadow: 0 10px 22px rgba(247, 127, 0, 0.32);
}

.evz-btn-primary:disabled {
  background-color: #a6a6a6;
  box-shadow: none;
  cursor: default;
}

.evz-btn-primary:active:not(:disabled) {
  transform: translateY(1px);
  box-shadow: 0 6px 14px rgba(247, 127, 0, 0.28);
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
    if (document.getElementById("evz-mobile-styles-p15-s02")) return;
    const style = document.createElement("style");
    style.id = "evz-mobile-styles-p15-s02";
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

const SESS_KEY = "evz.swap.sessions";
const BOOK_NS = "evz.booking.";
const SWAP_NS = "evz.swap.";
const VEH_KEY = "evz.vehicles";

function safeLocalStorage() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function getJSON(key, fallback = []) {
  const ls = safeLocalStorage();
  if (!ls) return fallback;
  try {
    const raw = ls.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setJSON(key, value) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    ls.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

function get(ns, key, fallback = "") {
  const ls = safeLocalStorage();
  if (!ls) return fallback;
  try {
    return ls.getItem(ns + key) || fallback;
  } catch {
    return fallback;
  }
}

function num(ns, key, fallback = 0) {
  const ls = safeLocalStorage();
  if (!ls) return fallback;
  try {
    const v = ls.getItem(ns + key);
    return v == null ? fallback : Number(v);
  } catch {
    return fallback;
  }
}

function loadVehicles() {
  const ls = safeLocalStorage();
  if (!ls) return [];
  try {
    return JSON.parse(ls.getItem(VEH_KEY) || "[]");
  } catch {
    return [];
  }
}

function useQueryRSV() {
  if (typeof window === "undefined") return "";
  try {
    const q = new URLSearchParams(window.location.search);
    return q.get("rsv") || "";
  } catch {
    return "";
  }
}

function fmtAmount(n) {
  return `UGX ${Number(n || 0).toLocaleString("en-UG")}`;
}

function fmtWhen(ts) {
  return ts ? new Date(ts).toLocaleString() : "—";
}

function fmtDuration(ms) {
  const s = Math.max(0, Math.floor((ms || 0) / 1000));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m} min ${r} s`;
}

function Row({ label, value }) {
  return (
    <div className="evz-row">
      <span className="evz-row-label">{label}</span>
      <span className="evz-row-value">{value}</span>
    </div>
  );
}

export default function SwapSessionDetailsScreen() {
  useEvzStyles();

  const rsv = useQueryRSV();
  const saved = useMemo(() => getJSON(SESS_KEY, []), []);
  const [session, setSession] = useState(() =>
    saved.find((s) => s.reservationId === rsv) || null
  );
  const vehicles = useMemo(() => loadVehicles(), []);

  useEffect(() => {
    if (session || !rsv) return;

    const completedAt = num(SWAP_NS, "completedAt", 0);
    const type = completedAt ? "completed" : "upcoming";
    const ls = safeLocalStorage();
    const vehicleId = ls ? ls.getItem("evz.selectedVehicleId") || "" : "";

    const s = {
      reservationId: rsv,
      when: completedAt || num(BOOK_NS, "expiryAt", Date.now()),
      stationName: get(BOOK_NS, "stationName", "Station"),
      stationArea: get(BOOK_NS, "stationArea", ""),
      vehicleId,
      type,
      durationMs: num(SWAP_NS, "durationMs", 0),
      totalUGX: num(SWAP_NS, "totalUGX", 0),
      holdMinutes: num(BOOK_NS, "holdMinutes", 0),
      feeUGX: num(BOOK_NS, "holdFee", 0),
    };
    setSession(s);
  }, [rsv, session]);

  const veh = vehicles.find((v) => v.id === session?.vehicleId);

  const handleBack = () => {
    if (typeof window !== "undefined") {
      window.location.assign("/history");
    }
  };

  const handleDownload = () => {
    if (!session) return;
    try {
      const blob = new Blob([JSON.stringify(session, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `EVZ-session-${session.reservationId || Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // ignore
    }
  };

  const handleSaveHistory = () => {
    if (!session) return;
    const list = getJSON(SESS_KEY, []);
    if (!list.find((s) => s.reservationId === session.reservationId)) {
      list.push(session);
      setJSON(SESS_KEY, list);
    }
  };

  const subtitle = session
    ? `Reservation ${rsv || "—"}`
    : "No session found for that reservation.";

  return (
    <EvzScreen>
      <header className="evz-header-center">
        <div className="evz-avatar" aria-hidden="true">
          🧾
        </div>
        <h1 className="evz-header-title">Session details</h1>
        <p className="evz-header-subtitle">{subtitle}</p>
      </header>

      {session && (
        <main className="evz-card">
          <Row
            label="Station"
            value={`${session.stationName || "Station"}$
              {session.stationArea ? " • " + session.stationArea : ""}
            `}
          />
          <Row
            label="Status"
            value={session.type === "upcoming" ? "Upcoming hold" : "Completed"}
          />
          <Row label="When" value={fmtWhen(session.when)} />

          {session.type === "completed" && (
            <>
              <Row label="Duration" value={fmtDuration(session.durationMs)} />
              <Row label="Total" value={fmtAmount(session.totalUGX)} />
              <Row
                label="Vehicle"
                value={veh ? `${veh.name} • ${veh.plate}` : "—"}
              />
            </>
          )}

          {session.type === "upcoming" && (
            <>
              <Row
                label="Hold minutes"
                value={`${session.holdMinutes || 0} min`}
              />
              <Row label="Fee" value={fmtAmount(session.feeUGX)} />
            </>
          )}
        </main>
      )}

      <footer className="evz-footer">
        <div className="evz-footer-row">
          <button
            type="button"
            className="evz-btn-secondary"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            type="button"
            className="evz-btn-ghost"
            onClick={handleDownload}
            disabled={!session}
          >
            Download
          </button>
        </div>
        <button
          type="button"
          className="evz-btn-primary"
          onClick={handleSaveHistory}
          disabled={!session}
        >
          Save to history
        </button>
      </footer>
    </EvzScreen>
  );
}
