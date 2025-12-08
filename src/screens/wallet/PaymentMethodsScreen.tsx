import React, { useEffect, useMemo, useState } from "react";

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
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Inter", "SF Pro Text", sans-serif;
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
  padding-bottom: 10px;
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
}

.evz-section-title {
  font-size: 13px;
  font-weight: 800;
  margin-bottom: 4px;
}

.evz-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.evz-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid var(--evz-surface-soft);
}

.evz-list-main {
  display: flex;
  flex-direction: column;
}

.evz-list-label {
  font-size: 14px;
  font-weight: 700;
}

.evz-list-detail {
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-tag-default {
  border-radius: 999px;
  border: none;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 700;
  background-color: var(--evz-primary);
  color: #ffffff;
}

.evz-action-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.evz-btn-outline-sm {
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 11px;
  font-weight: 600;
  border: 1px solid #a6a6a6;
  background-color: #ffffff;
  color: var(--evz-text-primary);
  cursor: pointer;
}

.evz-btn-outline-sm:hover {
  background-color: #f9fafb;
}

.evz-btn-link-danger {
  border: none;
  background: none;
  padding: 4px 0;
  font-size: 11px;
  font-weight: 600;
  color: var(--evz-accent);
  cursor: pointer;
}

.evz-btn-link-danger:hover {
  text-decoration: underline;
}

.evz-empty-primary {
  font-size: 14px;
}

.evz-empty-secondary {
  font-size: 12px;
  color: var(--evz-text-secondary);
}

.evz-divider {
  height: 1px;
  width: 100%;
  background-color: #e5e7eb;
  margin: 12px 0;
}

.evz-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.evz-label {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 2px;
}

.evz-select,
.evz-input {
  width: 100%;
  border-radius: 12px;
  border: 1px solid var(--evz-border-subtle);
  padding: 9px 11px;
  font-size: 14px;
}

.evz-select:focus,
.evz-input:focus {
  outline: none;
  border-color: rgba(3, 205, 140, 0.8);
  box-shadow: 0 0 0 1px rgba(3, 205, 140, 0.1);
}

.evz-btn-primary {
  width: 100%;
  border-radius: 999px;
  padding: 12px 16px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  background-color: var(--evz-accent);
  color: #ffffff;
  cursor: pointer;
  box-shadow: 0 10px 22px rgba(247, 127, 0, 0.32);
}

.evz-btn-primary--disabled {
  background-color: #a6a6a6;
  box-shadow: none;
  cursor: default;
}

.evz-btn-primary:active:not(.evz-btn-primary--disabled) {
  transform: translateY(1px);
  box-shadow: 0 6px 14px rgba(247, 127, 0, 0.28);
}

.evz-footer {
  margin-top: auto;
  padding-top: 10px;
}

.evz-footer-link {
  width: 100%;
  border: none;
  background: none;
  padding: 10px 16px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  color: var(--evz-accent);
  cursor: pointer;
}

.evz-footer-link:hover {
  text-decoration: underline;
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
    if (typeof document === "undefined") return;
    const styleId = "evz-mobile-styles-p12-s02";
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

const METHODS_KEY = "evz.wallet.methods";
const DEFAULT_KEY = "evz.wallet.defaultMethodId";

function getJSON(key, fallback = []) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setJSON(key, value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

function getDefaultId(): void {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(DEFAULT_KEY) || "";
  } catch {
    return "";
  }
}

function setDefaultId(id) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(DEFAULT_KEY, id);
  } catch {
    // ignore
  }
}

function createId(): void {
  return "pm_" + Math.random().toString(36).slice(2, 9);
}

export default function PaymentMethodsScreen(): JSX.Element {
  useEvzStyles();

  const [methods, setMethods] = useState(() => getJSON(METHODS_KEY, []));
  const [defId, setDefId] = useState(() => getDefaultId());

  const [type, setType] = useState("mobile_money");
  const [label, setLabel] = useState("");
  const [detail, setDetail] = useState("");

  const canAdd = useMemo(
    () => label.trim().length >= 2 && detail.trim().length >= 4,
    [label, detail]
  );

  const typeHint = useMemo(() => {
    switch (type) {
      case "card":
        return "Masked card (e.g., **** 4242)";
      case "mobile_money":
        return "Phone number (e.g., +256712345678)";
      case "upi":
        return "UPI VPA (e.g., name@bank)";
      case "wechat":
        return "WeChat ID";
      case "alipay":
        return "Alipay ID";
      default:
        return "Detail";
    }
  }, [type]);

  const handleAdd = (): void => {
    if (!canAdd) return;
    const id = createId();
    const entry = {
      id,
      type,
      label: label.trim(),
      detail: detail.trim(),
    };
    const next = [...methods, entry];
    setMethods(next);
    setJSON(METHODS_KEY, next);
    if (!defId) {
      setDefId(id);
      setDefaultId(id);
    }
    setLabel("");
    setDetail("");
  };

  const handleRemove = (id) => {
    const next = methods.filter((m) => m.id !== id);
    setMethods(next);
    setJSON(METHODS_KEY, next);
    if (defId === id) {
      const newDef = next[0]?.id || "";
      setDefId(newDef);
      setDefaultId(newDef);
    }
  };

  const handleMakeDefault = (id) => {
    setDefId(id);
    setDefaultId(id);
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Payment methods</h1>
        <p className="evz-header-subtitle">
          Add, remove, and set a default method
        </p>
      </header>

      <main className="evz-content">
        <section>
          <div className="evz-section-title">Saved methods</div>
          <ul className="evz-list">
            {methods.length > 0 ? (
              methods.map((m) => (
                <li key={m.id} className="evz-list-item">
                  <div className="evz-list-main">
                    <span className="evz-list-label">{m.label}</span>
                    <span className="evz-list-detail">
                      {m.type} • {m.detail}
                    </span>
                  </div>
                  <div className="evz-action-row">
                    {defId === m.id ? (
                      <button
                        type="button"
                        className="evz-tag-default"
                        disabled
                      >
                        Default
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="evz-btn-outline-sm"
                        onClick={() => handleMakeDefault(m.id)}
                      >
                        Make default
                      </button>
                    )}
                    <button
                      type="button"
                      className="evz-btn-link-danger"
                      onClick={() => handleRemove(m.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="evz-list-item">
                <div>
                  <div className="evz-empty-primary">No methods yet</div>
                  <div className="evz-empty-secondary">Add one below</div>
                </div>
              </li>
            )}
          </ul>
        </section>

        <div className="evz-divider" />

        <section>
          <div className="evz-section-title">Add a method</div>
          <div className="evz-form">
            <div>
              <div className="evz-label">Type</div>
              <select
                className="evz-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="mobile_money">Mobile Money</option>
                <option value="card">Card</option>
                <option value="upi">UPI</option>
                <option value="wechat">WeChat Pay</option>
                <option value="alipay">Alipay</option>
              </select>
            </div>
            <div>
              <div className="evz-label">Label</div>
              <input
                className="evz-input"
                placeholder="e.g., Personal Wallet"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </div>
            <div>
              <div className="evz-label">Details</div>
              <input
                className="evz-input"
                placeholder={typeHint}
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
              />
            </div>
            <button
              type="button"
              className={
                "evz-btn-primary" + (canAdd ? "" : " evz-btn-primary--disabled")
              }
              onClick={handleAdd}
              disabled={!canAdd}
            >
              Add method
            </button>
          </div>
        </section>
      </main>

      <footer className="evz-footer">
        <button
          type="button"
          className="evz-footer-link"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.location.assign("/wallet");
            }
          }}
        >
          Back to wallet
        </button>
      </footer>
    </EvzScreen>
  );
}
