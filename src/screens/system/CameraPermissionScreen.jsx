import React, { useEffect, useMemo, useRef, useState } from "react";

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
  max-width: 420px;
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

.evz-preview-box {
  margin-top: 12px;
  height: 180px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.evz-preview-label {
  position: absolute;
  font-size: 11px;
  color: #ffffff;
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

function useEvzStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = "evz-mobile-styles-p22-s02";
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

function stopStream(videoEl) {
  if (!videoEl) return;
  const s = videoEl.srcObject;
  if (s && typeof s.getTracks === "function") {
    s.getTracks().forEach((t) => t.stop());
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

export default function CameraPermissionScreen({ nextPath = "/swap/self/station-scan" }) {
  useEvzStyles();

  const [status, setStatus] = useState(() => getItem("evz.perm.camera", "prompt"));
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    return () => {
      stopStream(videoElement);
    };
  }, []);

  const request = async () => {
    if (
      typeof navigator === "undefined" ||
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia
    ) {
      setStatus("denied");
      setItem("evz.perm.camera", "denied");
      setMsg("Camera API not available.");
      return;
    }

    setBusy(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setStatus("granted");
      setItem("evz.perm.camera", "granted");
      setMsg("Camera access granted.");
    } catch (err) {
      setStatus("denied");
      setItem("evz.perm.camera", "denied");
      setMsg(err?.message || "Permission denied or unavailable.");
    } finally {
      setBusy(false);
    }
  };

  const statusColor = useMemo(() => {
    if (status === "granted") return "var(--evz-primary)";
    if (status === "denied") return "var(--evz-accent)";
    return "#a6a6a6";
  }, [status]);

  const effectiveMessage =
    msg || "You can still enter codes manually if you prefer.";

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Allow camera</h1>
        <p className="evz-header-subtitle">
          We need your camera to scan station and battery QR codes.
        </p>
      </header>

      <div className="evz-divider" />

      <main className="evz-main">
        <section className="evz-card">
          <div className="evz-status-label" style={{ color: statusColor }}>
            Status: <span className="evz-status-text">{status}</span>
          </div>
          <p className="evz-status-message">{effectiveMessage}</p>

          <div className="evz-preview-box">
            <video
              ref={videoRef}
              playsInline
              muted
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {status !== "granted" && (
              <span className="evz-preview-label">Camera preview</span>
            )}
          </div>

          <p className="evz-caption">
            Tip: If you blocked the prompt, enable Camera for this site in your
            browser settings and try again.
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
            {busy ? "Requesting…" : "Allow camera"}
          </button>
          <button
            type="button"
            className="evz-btn-secondary"
            onClick={() => {
              stopStream(videoRef.current);
              goTo(nextPath);
            }}
          >
            Continue
          </button>
        </div>
      </footer>
    </EvzScreen>
  );
}
