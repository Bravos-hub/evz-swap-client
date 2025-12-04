import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ROUTES } from "../../router/routes";

const evzStyles = `
:root {
  --evz-primary: #03cd8c;
  --evz-accent: #f77f00;
  --evz-bg: #f5f7fb;
  --evz-surface: #ffffff;
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
  position: relative;
}

.evz-header-gradient {
  background: linear-gradient(135deg, #d97706 0%, #7c3aed 50%, #4c1d95 100%);
  padding-top: 60px;
  padding-bottom: 40px;
  position: relative;
  overflow: hidden;
}

.evz-header-gradient::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  pointer-events: none;
}


.evz-profile-picture-section {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
}

.evz-profile-picture-wrapper {
  position: relative;
}

.evz-profile-picture {
  width: 120px;
  height: 120px;
  border-radius: 999px;
  background-color: var(--evz-primary);
  color: #ffffff;
  font-weight: 800;
  font-size: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 4px solid #ffffff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.evz-profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 999px;
}

.evz-profile-edit-icon {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background-color: #1e40af;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #ffffff;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}

.evz-profile-edit-icon:hover {
  transform: scale(1.05);
}

.evz-profile-edit-icon svg {
  font-size: 18px;
}

.evz-form-card {
  background: var(--evz-surface);
  border-radius: 24px 24px 0 0;
  margin-top: -24px;
  padding: 24px 20px;
  flex: 1;
  position: relative;
  z-index: 2;
}

.evz-form-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 24px;
  color: var(--evz-text-primary);
}

.evz-form-field {
  margin-bottom: 20px;
}

.evz-form-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--evz-text-primary);
}

.evz-form-input {
  width: 100%;
  border-radius: 12px;
  border: 1px solid #d1d5db;
  padding: 12px 16px;
  font-size: 16px;
  box-sizing: border-box;
  background: var(--evz-surface);
  color: var(--evz-text-primary);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.evz-form-input:focus {
  outline: none;
  border-color: var(--evz-primary);
  box-shadow: 0 0 0 3px rgba(3, 205, 140, 0.1);
}

.evz-form-input::placeholder {
  color: #9ca3af;
}

.evz-form-select-wrapper {
  position: relative;
}

.evz-form-select {
  width: 100%;
  border-radius: 12px;
  border: 1px solid #d1d5db;
  padding: 12px 40px 12px 16px;
  font-size: 16px;
  box-sizing: border-box;
  background: var(--evz-surface);
  color: var(--evz-text-primary);
  appearance: none;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.evz-form-select:focus {
  outline: none;
  border-color: var(--evz-primary);
  box-shadow: 0 0 0 3px rgba(3, 205, 140, 0.1);
}

.evz-form-select-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--evz-text-secondary);
}

.evz-phone-input-wrapper {
  display: flex;
  gap: 8px;
  align-items: stretch;
}

.evz-phone-country {
  flex-shrink: 0;
  width: 80px;
}

.evz-phone-number {
  flex: 1;
}

/* Responsive styles for 320px - 420px range */
@media (max-width: 420px) {
  .evz-header-gradient {
    padding-top: 50px;
    padding-bottom: 35px;
  }
  
  .evz-profile-picture {
    width: 110px;
    height: 110px;
    font-size: 44px;
  }
  
  .evz-profile-edit-icon {
    width: 32px;
    height: 32px;
  }
  
  .evz-form-card {
    padding: 20px 16px;
  }
  
  .evz-form-title {
    font-size: 22px;
    margin-bottom: 20px;
  }
  
  .evz-form-field {
    margin-bottom: 18px;
  }
  
  .evz-form-input,
  .evz-form-select {
    padding: 11px 14px;
    font-size: 15px;
  }
}

@media (max-width: 370px) {
  .evz-header-gradient {
    padding-top: 45px;
    padding-bottom: 30px;
  }
  
  .evz-header-back {
    width: 36px;
    height: 36px;
    top: 12px;
    left: 12px;
  }
  
  .evz-profile-picture {
    width: 100px;
    height: 100px;
    font-size: 40px;
    border-width: 3px;
  }
  
  .evz-profile-edit-icon {
    width: 30px;
    height: 30px;
    border-width: 2px;
  }
  
  .evz-profile-edit-icon svg {
    font-size: 16px;
  }
  
  .evz-form-card {
    padding: 18px 14px;
    border-radius: 20px 20px 0 0;
  }
  
  .evz-form-title {
    font-size: 20px;
    margin-bottom: 18px;
  }
  
  .evz-form-label {
    font-size: 13px;
    margin-bottom: 6px;
  }
  
  .evz-form-input,
  .evz-form-select {
    padding: 10px 12px;
    font-size: 14px;
  }
  
  .evz-phone-country {
    width: 70px;
  }
  
}

@media (max-width: 360px) {
  .evz-header-gradient {
    padding-top: 40px;
    padding-bottom: 25px;
  }
  
  .evz-profile-picture {
    width: 90px;
    height: 90px;
    font-size: 36px;
  }
  
  .evz-form-card {
    padding: 16px 12px;
  }
  
  .evz-form-title {
    font-size: 19px;
  }
  
  .evz-form-field {
    margin-bottom: 16px;
  }
  
  .evz-form-input,
  .evz-form-select {
    padding: 10px;
    font-size: 14px;
  }
}

@media (max-width: 340px) {
  .evz-header-gradient {
    padding-top: 35px;
    padding-bottom: 20px;
  }
  
  .evz-header-back {
    width: 32px;
    height: 32px;
  }
  
  .evz-profile-picture {
    width: 85px;
    height: 85px;
    font-size: 32px;
  }
  
  .evz-profile-edit-icon {
    width: 28px;
    height: 28px;
  }
  
  .evz-form-card {
    padding: 14px 10px;
  }
  
  .evz-form-title {
    font-size: 18px;
    margin-bottom: 16px;
  }
  
  .evz-form-label {
    font-size: 12px;
  }
  
  .evz-form-input,
  .evz-form-select {
    padding: 9px 10px;
    font-size: 13px;
  }
  
  .evz-phone-country {
    width: 65px;
  }
  
}

@media (max-width: 320px) {
  .evz-header-gradient {
    padding-top: 30px;
    padding-bottom: 18px;
  }
  
  .evz-profile-picture {
    width: 80px;
    height: 80px;
    font-size: 30px;
  }
  
  .evz-profile-edit-icon {
    width: 26px;
    height: 26px;
  }
  
  .evz-form-card {
    padding: 12px 8px;
  }
  
  .evz-form-title {
    font-size: 17px;
    margin-bottom: 14px;
  }
  
  .evz-form-field {
    margin-bottom: 14px;
  }
  
  .evz-form-input,
  .evz-form-select {
    padding: 8px 10px;
    font-size: 12px;
  }
  
}
`;

function useEvzStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = "evz-edit-profile-styles";
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
const PICTURE_KEY = "evz.profile.picture";
const FIRST_NAME_KEY = "evz.profile.firstName";
const LAST_NAME_KEY = "evz.profile.lastName";
const USERNAME_KEY = "evz.profile.username";
const BIRTH_KEY = "evz.profile.birth";
const GENDER_KEY = "evz.profile.gender";

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

function setItem(key, value) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    ls.setItem(key, value);
  } catch {
    // ignore
  }
}

function initials(name) {
  const trimmed = (name || "").trim();
  if (!trimmed) return "EV";
  const parts = trimmed.split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() || "").join("") || "EV";
}

export default function EditProfileScreen() {
  useEvzStyles();
  const navigate = useNavigate();

  const fullName = getItem(NAME_KEY, "");
  const email = getItem(EMAIL_KEY, "");
  const phone = getItem(PHONE_KEY, "");
  const profilePicture = getItem(PICTURE_KEY, "");
  
  // Split full name into first and last
  const nameParts = fullName.trim().split(/\s+/);
  const firstNameDefault = nameParts[0] || "";
  const lastNameDefault = nameParts.slice(1).join(" ") || "";
  
  const [firstName, setFirstName] = useState(() => getItem(FIRST_NAME_KEY, firstNameDefault));
  const [lastName, setLastName] = useState(() => getItem(LAST_NAME_KEY, lastNameDefault));
  const [username, setUsername] = useState(() => getItem(USERNAME_KEY, `@${firstNameDefault || "user"}`));
  const [emailValue, setEmailValue] = useState(() => email);
  const [phoneValue, setPhoneValue] = useState(() => phone);
  const [countryCode, setCountryCode] = useState(() => "+256");
  const [birth, setBirth] = useState(() => getItem(BIRTH_KEY, ""));
  const [gender, setGender] = useState(() => getItem(GENDER_KEY, ""));

  const avatarText = useMemo(() => {
    const name = `${firstName} ${lastName}`.trim() || fullName;
    return initials(name || "EV");
  }, [firstName, lastName, fullName]);

  const handlePictureEdit = () => {
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

  const handleSave = () => {
    // Save all profile data
    setItem(FIRST_NAME_KEY, firstName.trim());
    setItem(LAST_NAME_KEY, lastName.trim());
    setItem(USERNAME_KEY, username.trim());
    setItem(NAME_KEY, `${firstName.trim()} ${lastName.trim()}`.trim());
    setItem(EMAIL_KEY, emailValue.trim());
    setItem(BIRTH_KEY, birth);
    setItem(GENDER_KEY, gender);
    
    // Navigate back to profile
    navigate(ROUTES.ACCOUNT);
  };

  // Extract phone number without country code
  const phoneNumberOnly = phoneValue.replace(/^\+\d+\s*/, "");

  return (
    <EvzScreen>
      <div className="evz-header-gradient">
        <div className="evz-profile-picture-section">
          <div className="evz-profile-picture-wrapper">
            <div className="evz-profile-picture" aria-hidden="true">
              {profilePicture ? (
                <img src={profilePicture} alt="Profile" />
              ) : (
                avatarText
              )}
            </div>
            <div className="evz-profile-edit-icon" onClick={handlePictureEdit} aria-label="Edit profile picture">
              <EditIcon />
            </div>
          </div>
        </div>
      </div>

      <div className="evz-form-card">
        <h1 className="evz-form-title">Edit Profile</h1>

        <div className="evz-form-field">
          <label className="evz-form-label" htmlFor="first-name">First Name</label>
          <input
            id="first-name"
            type="text"
            className="evz-form-input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
          />
        </div>

        <div className="evz-form-field">
          <label className="evz-form-label" htmlFor="last-name">Last Name</label>
          <input
            id="last-name"
            type="text"
            className="evz-form-input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
          />
        </div>

        <div className="evz-form-field">
          <label className="evz-form-label" htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            className="evz-form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="@username"
          />
        </div>

        <div className="evz-form-field">
          <label className="evz-form-label" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="evz-form-input"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            placeholder="email@example.com"
          />
        </div>

        <div className="evz-form-field">
          <label className="evz-form-label" htmlFor="phone">Phone Number</label>
          <div className="evz-phone-input-wrapper">
            <div className="evz-form-select-wrapper evz-phone-country">
              <select
                className="evz-form-select"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                <option value="+256">+256</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+234">+234</option>
              </select>
              <div className="evz-form-select-arrow">
                <ArrowDropDownIcon />
              </div>
            </div>
            <input
              id="phone"
              type="tel"
              className="evz-form-input evz-phone-number"
              value={phoneNumberOnly}
              onChange={(e) => setPhoneValue(`${countryCode} ${e.target.value}`)}
              placeholder="904 6470"
            />
          </div>
        </div>

        <div className="evz-form-field">
          <label className="evz-form-label" htmlFor="birth">Birth</label>
          <div className="evz-form-select-wrapper">
            <input
              id="birth"
              type="date"
              className="evz-form-input"
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
            />
          </div>
        </div>

        <div className="evz-form-field">
          <label className="evz-form-label" htmlFor="gender">Gender</label>
          <div className="evz-form-select-wrapper">
            <select
              id="gender"
              className="evz-form-select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
            <div className="evz-form-select-arrow">
              <ArrowDropDownIcon />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
          <button
            type="button"
            onClick={handleSave}
            style={{
              width: '100%',
              backgroundColor: 'var(--evz-primary)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              padding: '14px 20px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease, transform 0.1s ease',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#02b87a'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--evz-primary)'}
            onMouseDown={(e) => e.target.style.transform = 'translateY(1px)'}
            onMouseUp={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Save Changes
          </button>
        </div>
      </div>
    </EvzScreen>
  );
}

