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

.evz-card {
  border-radius: 16px;
  background-color: var(--evz-surface-soft);
  padding: 12px 14px 10px;
}

.evz-card + .evz-card {
  margin-top: 12px;
}

.evz-card-title {
  font-size: 13px;
  font-weight: 800;
}

.evz-code-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.evz-input-code {
  flex: 1;
  border-radius: 999px;
  border: 1px solid var(--evz-border-subtle);
  padding: 8px 12px;
  font-size: 14px;
  box-sizing: border-box;
}

.evz-input-code:focus {
  outline: none;
  border-color: var(--evz-primary);
}

.evz-input-code[readonly] {
  background-color: #ffffff;
}

.evz-stats-row {
  display: flex;
  gap: 16px;
  margin-top: 8px;
}

.evz-stat-block {
  min-width: 0;
}

.evz-stat-label {
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-stat-value {
  font-size: 18px;
  font-weight: 900;
}

.evz-stat-value-accent {
  color: var(--evz-primary);
}

.evz-sim-row {
  display: flex;
  gap: 6px;
  margin-top: 8px;
}

.evz-caption {
  font-size: 11px;
  color: var(--evz-text-secondary);
  margin-top: 6px;
}

.evz-footer {
  margin-top: auto;
  padding-top: 18px;
}

.evz-btn-primary,
.evz-btn-secondary,
.evz-btn-text,
.evz-btn-small {
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

.evz-btn-primary:active {
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

.evz-btn-text {
  width: 100%;
  background: none;
  color: var(--evz-accent);
}

.evz-btn-text:hover {
  text-decoration: underline;
}

.evz-btn-small {
  padding: 6px 10px;
  font-size: 12px;
}

.evz-btn-small-secondary {
  background-color: #ffffff;
  color: var(--evz-text-primary);
  border-color: #a6a6a6;
}

.evz-btn-small-text {
  background: none;
  color: var(--evz-accent);
}

.evz-footer-inner {
  max-width: 430px;
  margin: 0 auto;
}

@media (max-width: 375px) {
  .evz-screen {
    padding-inline: 16px;
  }
}
`;

const CODE_KEY = "evz.referral.code";
const INV_KEY = "evz.referral.invites";
const SGN_KEY = "evz.referral.signups";
const RWD_KEY = "evz.referral.rewards";
const BAL_KEY = "evz.wallet.balance";
const CURR_KEY = "evz.currency";

function useEvzStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("evz-mobile-styles-p29-s02")) return;
    const style = document.createElement("style");
    style.id = "evz-mobile-styles-p29-s02";
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

function getNumber(key, fallback = 0) {
  const ls = safeLocalStorage();
  if (!ls) return fallback;
  try {
    return Number(ls.getItem(key) || fallback);
  } catch {
    return fallback;
  }
}

function setNumber(key, value) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    ls.setItem(key, String(value));
  } catch {
    // ignore
  }
}

function getStr(key, fallback = "") {
  const ls = safeLocalStorage();
  if (!ls) return fallback;
  try {
    return ls.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

function setStr(key, value) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    ls.setItem(key, value);
  } catch {
    // ignore
  }
}

function currency() {
  const ls = safeLocalStorage();
  if (!ls) return "UGX";
  try {
    return ls.getItem(CURR_KEY) || "UGX";
  } catch {
    return "UGX";
  }
}

function ensureCode() {
  let c = getStr(CODE_KEY, "");
  if (!c) {
    const random = Math.random().toString(36).slice(2, 8).toUpperCase();
    c = `EVZ-${random}`;
    setStr(CODE_KEY, c);
  }
  return c;
}

function fmt(curr, n) {
  return `${curr} ${Number(n || 0).toLocaleString("en-UG")}`;
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

export default function ReferralsScreen() {
  useEvzStyles();

  const curr = currency();
  const [code] = useState(() => ensureCode());
  const [invites, setInvites] = useState(() => getNumber(INV_KEY, 0));
  const [signups, setSignups] = useState(() => getNumber(SGN_KEY, 0));
  const [rewards, setRewards] = useState(() => getNumber(RWD_KEY, 0));

  const shareText = useMemo(
    () => `Join me on EVzone! Use my code ${code} to get a discount.`,
    [code]
  );

  const copy = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(code);
      if (typeof window !== "undefined" && window.alert) {
        window.alert("Copied!");
      }
    } catch {
      // ignore
    }
  };

  const share = async () => {
    if (typeof navigator === "undefined") return;
    try {
      if (navigator.share) {
        await navigator.share({ title: "EVzone", text: shareText });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);
        if (typeof window !== "undefined" && window.alert) {
          window.alert("Copied text to share!");
        }
      }
    } catch {
      // ignore
    }
  };

  const withdraw = () => {
    if (rewards <= 0) return;
    const bal = getNumber(BAL_KEY, 0) + rewards;
    setNumber(BAL_KEY, bal);
    setNumber(RWD_KEY, 0);
    setRewards(0);
    if (typeof window !== "undefined" && window.alert) {
      window.alert(`Added ${fmt(curr, rewards)} to wallet`);
    }
  };

  const simulateInvite = () => {
    const n = invites + 1;
    setInvites(n);
    setNumber(INV_KEY, n);
  };

  const simulateSignup = () => {
    const s = signups + 1;
    setSignups(s);
    setNumber(SGN_KEY, s);
    const r = rewards + 500;
    setRewards(r);
    setNumber(RWD_KEY, r);
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Referrals</h1>
        <p className="evz-header-subtitle">
          Share your code and earn rewards
        </p>
      </header>

      <div className="evz-divider" />

      <main className="evz-main">
        <section className="evz-card">
          <div className="evz-card-title">Your code</div>
          <div className="evz-code-row">
            <input
              className="evz-input-code"
              value={code}
              readOnly
            />
            <button
              type="button"
              className="evz-btn-secondary evz-btn-small evz-btn-small-secondary"
              onClick={copy}
            >
              Copy
            </button>
            <button
              type="button"
              className="evz-btn-primary evz-btn-small"
              onClick={share}
            >
              Share
            </button>
          </div>
        </section>

        <section className="evz-card" style={{ backgroundColor: "#e8fff6", border: "1px solid #03cd8c" }}>
          <div className="evz-card-title">Stats</div>
          <div className="evz-stats-row">
            <div className="evz-stat-block">
              <div className="evz-stat-label">Invites</div>
              <div className="evz-stat-value">{invites}</div>
            </div>
            <div className="evz-stat-block">
              <div className="evz-stat-label">Signups</div>
              <div className="evz-stat-value">{signups}</div>
            </div>
            <div className="evz-stat-block">
              <div className="evz-stat-label">Rewards</div>
              <div className="evz-stat-value evz-stat-value-accent">
                {fmt(curr, rewards)}
              </div>
            </div>
          </div>

          <div className="evz-sim-row">
            <button
              type="button"
              className="evz-btn-secondary evz-btn-small evz-btn-small-secondary"
              onClick={simulateInvite}
            >
              + Invite
            </button>
            <button
              type="button"
              className="evz-btn-secondary evz-btn-small evz-btn-small-secondary"
              onClick={simulateSignup}
            >
              + Signup
            </button>
            <button
              type="button"
              className="evz-btn-small evz-btn-small-text"
              onClick={withdraw}
              disabled={rewards <= 0}
            >
              Withdraw
            </button>
          </div>

          <p className="evz-caption">
            Withdraw adds rewards to your wallet balance.
          </p>
        </section>
      </main>

      <footer className="evz-footer">
        <div className="evz-footer-inner">
          <button
            type="button"
            className="evz-btn-text"
            onClick={() => goTo("/wallet")}
          >
            Back to wallet
          </button>
        </div>
      </footer>
    </EvzScreen>
  );
}

/**
 * Manual test cases:
 * 1) First open → generates a code EVZ-XXXXXX; Copy works; Share uses Web Share when available or
 *    copies text to clipboard.
 * 2) Simulate +Invite/+Signup → stats increase; rewards += 500 per signup; Withdraw → adds rewards
 *    to wallet balance and resets rewards to 0.
 * 3) Back to wallet → navigates to '/wallet'.
 * 4) Mobile fit: ~360x780 → no horizontal scroll; works even if localStorage is unavailable.
 */
