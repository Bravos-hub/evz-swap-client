import React, { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
  background: #f5f5f5;
}

.evz-app {
  min-height: 100vh;
  background: #f5f5f5;
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
  display: flex;
  align-items: center;
  justify-content: center;
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

.evz-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  width: 100%;
}

.evz-avatar-card {
  width: 100%;
  max-width: 420px;
  height: 320px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  background-color: #e5e7eb;
  border: 1px solid #d1d5db;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.evz-avatar-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.evz-avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
  color: #9ca3af;
}

.evz-avatar-placeholder-icon {
  font-size: 48px;
}

.evz-avatar-placeholder-text {
  font-size: 14px;
  font-weight: 500;
}

.evz-avatar-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4), transparent);
  padding: 10px 12px;
  display: flex;
  gap: 6px;
}

.evz-avatar-button {
  flex: 1;
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  transition: background-color 0.2s ease;
}

.evz-avatar-button:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.evz-avatar-button--outlined {
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.evz-avatar-button--outlined:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.evz-avatar-button-icon {
  font-size: 12px;
}

.evz-file-input {
  display: none;
}

.evz-field {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  padding: 12px 14px;
  font-size: 15px;
  background-color: #ffffff;
  color: var(--evz-text-primary);
  box-sizing: border-box;
}

.evz-input::placeholder {
  color: rgba(156, 163, 175, 0.85);
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

@media (max-width: 375px) {
  .evz-screen {
    padding-inline: 16px;
  }
}
`;

function useEvzStyles() {
  useEffect(() => {
    if (document.getElementById("evz-mobile-styles")) return;
    const style = document.createElement("style");
    style.id = "evz-mobile-styles";
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

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((s) => (s[0] ? s[0].toUpperCase() : ""))
    .join("");
}

export default function ProfileSetupScreen() {
  useEvzStyles();
  const navigate = useNavigate();

  const [name, setName] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      return window.localStorage.getItem("evz.profile.name") || "";
    } catch {
      return "";
    }
  });

  const [profilePicture, setProfilePicture] = useState(() => {
    if (typeof window === "undefined") return null;
    try {
      return window.localStorage.getItem("evz.profile.picture") || null;
    } catch {
      return null;
    }
  });

  const fileInputRef = useRef(null);

  const initials = useMemo(() => (name ? getInitials(name) : "EV"), [name]);
  const isValid = name.trim().length >= 2;

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setProfilePicture(base64String);
        try {
          window.localStorage.setItem("evz.profile.picture", base64String);
        } catch {
          // ignore
        }
      };
      reader.readAsDataURL(file);
    }
    // Reset input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadFromFile = () => {
    fileInputRef.current?.click();
  };

  const handleUploadFromCloud = () => {
    // In a real app, this would open Google Drive/iCloud picker
    // For now, we'll use a URL input prompt
    const url = prompt("Enter image URL:");
    if (url) {
      setProfilePicture(url);
      try {
        window.localStorage.setItem("evz.profile.picture", url);
      } catch {
        // ignore
      }
    }
  };

  const handleContinue = () => {
    if (!isValid) {
      return;
    }

    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("evz.profile.name", name.trim());
      }
    } catch {
      // ignore
    }

    navigate(ROUTES.VEHICLE_SELECT);
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Set up your profile</h1>
        <p className="evz-header-subtitle">
          Add your display name (you can change it later)
        </p>
      </header>

      <main className="evz-content">
        <div className="evz-profile">
          <div className="evz-avatar-card">
            {profilePicture ? (
              <>
                <img src={profilePicture} alt="Profile" />
                <div className="evz-avatar-overlay">
                  <button
                    type="button"
                    className="evz-avatar-button"
                    onClick={handleUploadFromFile}
                  >
                    <span>Change photo</span>
                  </button>
                  <button
                    type="button"
                    className="evz-avatar-button evz-avatar-button--outlined"
                    onClick={handleUploadFromCloud}
                  >
                    <span className="evz-avatar-button-icon">🔗</span>
                    <span>From URL</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="evz-avatar-placeholder">
                  <span className="evz-avatar-placeholder-icon">📷</span>
                  <span className="evz-avatar-placeholder-text">Add profile photo</span>
                </div>
                <div className="evz-avatar-overlay">
                  <button
                    type="button"
                    className="evz-avatar-button"
                    onClick={handleUploadFromFile}
                  >
                    <span>Change photo</span>
                  </button>
                  <button
                    type="button"
                    className="evz-avatar-button evz-avatar-button--outlined"
                    onClick={handleUploadFromCloud}
                  >
                    <span className="evz-avatar-button-icon">🔗</span>
                    <span>From URL</span>
                  </button>
                </div>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="evz-file-input"
          />

          <div className="evz-field">
            <label className="evz-input-label" htmlFor="evz-name">
              Your name
            </label>
            <input
              id="evz-name"
              className={
                "evz-input" +
                (!isValid && name.length > 0 ? " evz-input--error" : "")
              }
              placeholder="e.g., Amina N."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p
              className={
                "evz-helper-text" +
                (!isValid && name.length > 0
                  ? " evz-helper-text--error"
                  : "")
              }
            >
              {!isValid && name.length > 0
                ? "Please enter at least 2 characters"
                : "\u00A0"}
            </p>
          </div>
        </div>
      </main>

      <footer className="evz-footer">
        <button
          type="button"
          onClick={handleContinue}
          className="evz-button evz-button--primary"
        >
          Continue
        </button>
      </footer>
    </EvzScreen>
  );
}
