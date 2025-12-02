import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DownloadIcon from '@mui/icons-material/Download';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: var(--evz-surface);
}

.evz-header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
  background: var(--evz-surface);
}

.evz-header-back {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: var(--evz-text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -8px;
}

.evz-header-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  flex: 1;
  text-align: center;
}

.evz-header-settings {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: var(--evz-text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: -8px;
}

.evz-profile-section {
  padding: 24px 20px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.evz-avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.evz-avatar {
  width: 80px;
  height: 80px;
  border-radius: 999px;
  background-color: var(--evz-primary);
  color: #ffffff;
  font-weight: 800;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.evz-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 999px;
}

.evz-avatar-camera {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background-color: var(--evz-accent);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid var(--evz-surface);
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.evz-avatar-camera svg {
  font-size: 16px;
}

.evz-profile-info {
  flex: 1;
  min-width: 0;
}

.evz-profile-name {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 4px;
  color: var(--evz-text-primary);
}

.evz-profile-email {
  font-size: 14px;
  color: var(--evz-text-secondary);
  margin: 0 0 12px;
  word-break: break-all;
}

.evz-edit-profile-btn {
  background-color: #3b82f6;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.evz-edit-profile-btn:hover {
  background-color: #2563eb;
}

.evz-menu-section {
  border-bottom: 1px solid #e5e7eb;
}

.evz-menu-item {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background: var(--evz-surface);
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease;
  gap: 16px;
  text-decoration: none;
  color: inherit;
}

.evz-menu-item:hover {
  background-color: #f9fafb;
}

.evz-menu-item:active {
  background-color: #f3f4f6;
}

.evz-menu-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--evz-text-secondary);
  flex-shrink: 0;
}

.evz-menu-icon svg {
  font-size: 24px;
}

.evz-menu-text {
  flex: 1;
  font-size: 16px;
  font-weight: 400;
  color: var(--evz-text-primary);
}

.evz-menu-arrow {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--evz-text-secondary);
  flex-shrink: 0;
}

.evz-menu-arrow svg {
  font-size: 20px;
}

.evz-footer-version {
  padding: 20px;
  text-align: center;
  font-size: 12px;
  color: var(--evz-text-secondary);
  margin-top: auto;
}

/* Responsive styles for 320px - 420px range */
@media (max-width: 420px) {
  .evz-screen {
    max-width: 100%;
  }
  
  .evz-header-bar {
    padding: 14px 16px;
  }
  
  .evz-header-title {
    font-size: 17px;
  }
  
  .evz-profile-section {
    padding: 20px 16px;
  }
  
  .evz-avatar {
    width: 72px;
    height: 72px;
    font-size: 28px;
  }
  
  .evz-profile-name {
    font-size: 18px;
  }
  
  .evz-profile-email {
    font-size: 13px;
  }
  
  .evz-menu-item {
    padding: 14px 16px;
  }
  
  .evz-menu-text {
    font-size: 15px;
  }
}

@media (max-width: 370px) {
  .evz-header-bar {
    padding: 12px 14px;
  }
  
  .evz-header-title {
    font-size: 16px;
  }
  
  .evz-profile-section {
    padding: 18px 14px;
    gap: 12px;
  }
  
  .evz-avatar {
    width: 68px;
    height: 68px;
    font-size: 26px;
  }
  
  .evz-avatar-camera {
    width: 24px;
    height: 24px;
    border-width: 2px;
  }
  
  .evz-avatar-camera svg {
    font-size: 14px;
  }
  
  .evz-profile-name {
    font-size: 17px;
  }
  
  .evz-profile-email {
    font-size: 12px;
  }
  
  .evz-edit-profile-btn {
    padding: 7px 14px;
    font-size: 13px;
  }
  
  .evz-menu-item {
    padding: 12px 14px;
    gap: 12px;
  }
  
  .evz-menu-text {
    font-size: 14px;
  }
}

@media (max-width: 360px) {
  .evz-profile-section {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .evz-profile-info {
    width: 100%;
    text-align: center;
  }
  
  .evz-edit-profile-btn {
    width: 100%;
  }
}

@media (max-width: 340px) {
  .evz-header-bar {
    padding: 10px 12px;
  }
  
  .evz-header-title {
    font-size: 15px;
  }
  
  .evz-profile-section {
    padding: 16px 12px;
  }
  
  .evz-avatar {
    width: 64px;
    height: 64px;
    font-size: 24px;
  }
  
  .evz-profile-name {
    font-size: 16px;
  }
  
  .evz-menu-item {
    padding: 10px 12px;
  }
  
  .evz-menu-text {
    font-size: 13px;
  }
}

@media (max-width: 320px) {
  .evz-header-bar {
    padding: 10px;
  }
  
  .evz-header-title {
    font-size: 14px;
  }
  
  .evz-profile-section {
    padding: 14px 10px;
  }
  
  .evz-avatar {
    width: 60px;
    height: 60px;
    font-size: 22px;
  }
  
  .evz-profile-name {
    font-size: 15px;
  }
  
  .evz-profile-email {
    font-size: 11px;
  }
  
  .evz-menu-item {
    padding: 10px;
    gap: 10px;
  }
  
  .evz-menu-text {
    font-size: 12px;
  }
  
  .evz-footer-version {
    padding: 16px 10px;
    font-size: 11px;
  }
}
`;

function useEvzStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = "evz-mobile-styles-p17-s01";
    const existing = document.getElementById(styleId);
    if (existing) {
      existing.remove();
    }
    
    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = evzStyles;
    document.head.appendChild(style);
    
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

const NAME_KEY = "evz.profile.name";
const EMAIL_KEY = "evz.profile.email";
const PHONE_KEY = "evz.msisdn";
const AUTH_KEY = "evz.auth.verified";
const PICTURE_KEY = "evz.profile.picture";

function safeLocalStorage() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
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

function removeItem(key) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    ls.removeItem(key);
  } catch {
    // ignore
  }
}

function goTo(path) {
  if (typeof window === "undefined") return;
  window.location.assign(path);
}

function initials(name) {
  const trimmed = (name || "").trim();
  if (!trimmed) return "EV";
  const parts = trimmed.split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() || "").join("") || "EV";
}

export default function ProfileScreen() {
  useEvzStyles();
  const navigate = useNavigate();

  const name = getItem(NAME_KEY, "");
  const email = getItem(EMAIL_KEY, "");
  const profilePicture = getItem(PICTURE_KEY, "");
  const avatarText = useMemo(() => initials(name || "EV"), [name]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSignOut = () => {
    removeItem(AUTH_KEY);
    goTo("/auth/phone");
  };

  const handleEditProfile = () => {
    navigate(ROUTES.PROFILE_EDIT_ACCOUNT);
  };

  const handleCameraClick = () => {
    // Trigger profile picture upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result;
          try {
            if (typeof window !== "undefined") {
              window.localStorage.setItem(PICTURE_KEY, base64String);
              window.location.reload();
            }
          } catch {
            // ignore
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleClearCache = () => {
    if (window.confirm("Are you sure you want to clear cache?")) {
      // Clear cache logic here
      alert("Cache cleared");
    }
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear history?")) {
      // Clear history logic here
      alert("History cleared");
    }
  };

  return (
    <EvzScreen>
      <header className="evz-header-bar">
        <button type="button" className="evz-header-back" onClick={handleBack} aria-label="Back">
          <ArrowBackIcon />
        </button>
        <h1 className="evz-header-title">My Profile</h1>
        <button type="button" className="evz-header-settings" aria-label="Settings">
          <SettingsIcon />
        </button>
      </header>

      <div className="evz-profile-section">
        <div className="evz-avatar-wrapper">
          <div className="evz-avatar" aria-hidden="true">
            {profilePicture ? (
              <img src={profilePicture} alt="Profile" />
            ) : (
              avatarText
            )}
          </div>
          <div className="evz-avatar-camera" onClick={handleCameraClick} aria-label="Change profile picture">
            <CameraAltIcon />
          </div>
        </div>
        <div className="evz-profile-info">
          <h2 className="evz-profile-name">{name || "User"}</h2>
          <p className="evz-profile-email">{email || "No email set"}</p>
          <button type="button" className="evz-edit-profile-btn" onClick={handleEditProfile}>
            Edit Profile
          </button>
        </div>
      </div>

      <div className="evz-menu-section">
        <a href={ROUTES.FAVORITES} className="evz-menu-item">
          <div className="evz-menu-icon">
            <FavoriteBorderIcon />
          </div>
          <span className="evz-menu-text">Favourites</span>
          <div className="evz-menu-arrow">
            <ChevronRightIcon />
          </div>
        </a>
        <a href="#" className="evz-menu-item">
          <div className="evz-menu-icon">
            <DownloadIcon />
          </div>
          <span className="evz-menu-text">Downloads</span>
          <div className="evz-menu-arrow">
            <ChevronRightIcon />
          </div>
        </a>
      </div>

      <div className="evz-menu-section">
        <a href={ROUTES.LANGUAGE_REGION_ACCOUNT} className="evz-menu-item">
          <div className="evz-menu-icon">
            <LanguageIcon />
          </div>
          <span className="evz-menu-text">Languages</span>
          <div className="evz-menu-arrow">
            <ChevronRightIcon />
          </div>
        </a>
        <a href="#" className="evz-menu-item">
          <div className="evz-menu-icon">
            <LocationOnIcon />
          </div>
          <span className="evz-menu-text">Location</span>
          <div className="evz-menu-arrow">
            <ChevronRightIcon />
          </div>
        </a>
        <a href={ROUTES.PROVIDER_PLANS} className="evz-menu-item">
          <div className="evz-menu-icon">
            <SubscriptionsIcon />
          </div>
          <span className="evz-menu-text">Subscription</span>
          <div className="evz-menu-arrow">
            <ChevronRightIcon />
          </div>
        </a>
        <a href="#" className="evz-menu-item">
          <div className="evz-menu-icon">
            <DisplaySettingsIcon />
          </div>
          <span className="evz-menu-text">Display</span>
          <div className="evz-menu-arrow">
            <ChevronRightIcon />
          </div>
        </a>
      </div>

      <div className="evz-menu-section">
        <button type="button" className="evz-menu-item" onClick={handleClearCache}>
          <div className="evz-menu-icon">
            <DeleteOutlineIcon />
          </div>
          <span className="evz-menu-text">Clear Cache</span>
          <div className="evz-menu-arrow">
            <ChevronRightIcon />
          </div>
        </button>
        <button type="button" className="evz-menu-item" onClick={handleClearHistory}>
          <div className="evz-menu-icon">
            <HistoryIcon />
          </div>
          <span className="evz-menu-text">Clear History</span>
          <div className="evz-menu-arrow">
            <ChevronRightIcon />
          </div>
        </button>
        <button type="button" className="evz-menu-item" onClick={handleSignOut}>
          <div className="evz-menu-icon">
            <LogoutIcon />
          </div>
          <span className="evz-menu-text">Log Out</span>
          <div className="evz-menu-arrow">
            <ChevronRightIcon />
          </div>
        </button>
      </div>

      <footer className="evz-footer-version">
        App Version 2.3
      </footer>
    </EvzScreen>
  );
}
