import React, { useEffect, useMemo, useRef, useState } from "react";

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
  padding-top: 10px;
  padding-bottom: 10px;
}

.evz-footer {
  padding-top: 12px;
}

.evz-camera-shell {
  margin-top: 4px;
}

.evz-camera-frame {
  height: 220px;
  border-radius: 16px;
  background-color: #f2f2f2;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.evz-camera-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.evz-camera-button {
  position: absolute;
  padding: 10px 16px;
  border-radius: 999px;
  border: none;
  background-color: var(--evz-primary);
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(3, 205, 140, 0.35);
}

.evz-camera-error {
  margin-top: 4px;
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-section-title {
  margin-top: 16px;
  font-size: 13px;
  font-weight: 800;
}

.evz-row-inline {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.evz-input {
  flex: 1;
  border-radius: 12px;
  border: 1px solid var(--evz-border-subtle);
  padding: 10px 12px;
  font-size: 14px;
}

.evz-input:focus {
  outline: none;
  border-color: rgba(3, 205, 140, 0.8);
  box-shadow: 0 0 0 1px rgba(3, 205, 140, 0.1);
}

.evz-button-inline {
  border-radius: 999px;
  border: none;
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  background-color: var(--evz-primary);
  color: #ffffff;
}

.evz-button-inline--disabled {
  background-color: #a6a6a6;
  cursor: default;
}

.evz-link-button {
  margin-top: 8px;
  border: none;
  background: none;
  padding: 0;
  font-size: 13px;
  font-weight: 500;
  color: var(--evz-accent);
  cursor: pointer;
}

.evz-link-button:hover {
  text-decoration: underline;
}

.evz-footer-button {
  width: 100%;
  border-radius: 999px;
  border: none;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  background-color: transparent;
  color: var(--evz-accent);
  cursor: pointer;
}

.evz-footer-button:hover {
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

function useEvzStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = "evz-mobile-styles-p08-s02";
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

export default function StationIdentifyScanScreen({ nextPath = "/swap/self/locker" }) {
  useEvzStyles();

  const videoRef = useRef(null);
  const [camErr, setCamErr] = useState("");
  const [code, setCode] = useState("");
  const [started, setStarted] = useState(false);

  const trimmed = useMemo(() => code.trim(), [code]);
  const hasCode = trimmed.length > 0;

  useEffect(() => {
    return () => {
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startCamera = async () => {
    try {
      if (typeof navigator === "undefined" || !navigator.mediaDevices) {
        setCamErr("Camera not available. Use manual entry.");
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setStarted(true);
        setCamErr("");
      }
    } catch (err) {
      setCamErr(
        (err && err.message) || "Camera not available. Use manual entry."
      );
    }
  };

  const stopCamera = () => {
    const v = videoRef.current;
    const s = v && v.srcObject;
    if (s && typeof s.getTracks === "function") {
      s.getTracks().forEach((t) => t.stop());
    }
  };

  const handleConfirm = (e) => {
    if (!hasCode) {
      e.preventDefault();
      return;
    }
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("evz.self.stationCode", trimmed);
        window.localStorage.setItem("evz.self.identMethod", "qr");
        window.localStorage.setItem("evz.self.verified", "true");
      }
    } catch {
      // ignore
    }
    stopCamera();
  };

  const confirmHref = hasCode ? nextPath : "#";

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Scan station QR</h1>
        <p className="evz-header-subtitle">
          Align the kiosk QR within the frame. If scanning fails, use manual
          entry.
        </p>
      </header>

      <main className="evz-content">
        <section className="evz-camera-shell">
          <div className="evz-camera-frame">
            <video
              ref={videoRef}
              className="evz-camera-video"
              playsInline
              muted
            />
            {!started && (
              <button
                type="button"
                className="evz-camera-button"
                onClick={startCamera}
              >
                Start camera
              </button>
            )}
          </div>
          {camErr && <p className="evz-camera-error">{camErr}</p>}
        </section>

        <section>
          <div className="evz-section-title">Simulate scan</div>
          <div className="evz-row-inline">
            <input
              className="evz-input"
              placeholder="Paste scanned content (e.g., EVSP05)"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <a
              href={confirmHref}
              onClick={handleConfirm}
              className={
                "evz-button-inline" + (!hasCode ? " evz-button-inline--disabled" : "")
              }
              aria-disabled={!hasCode}
            >
              Confirm
            </a>
          </div>
          <button
            type="button"
            className="evz-link-button"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.location.assign("/swap/self/station-code");
              }
            }}
          >
            Enter code instead
          </button>
        </section>
      </main>

      <footer className="evz-footer">
        <button
          type="button"
          className="evz-footer-button"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.location.assign("/swap/self/safety");
            }
          }}
        >
          Back
        </button>
      </footer>
    </EvzScreen>
  );
}
