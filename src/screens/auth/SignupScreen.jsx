import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/routes";
import { authApi } from "../../shared/api/authApi";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";

const evzStyles = `
:root {
  --evz-primary: #03cd8c;
  --evz-accent: #f77f00;
  --evz-bg: #f8fafc;
  --evz-surface: #ffffff;
  --evz-text-primary: #0f172a;
  --evz-text-secondary: #64748b;
  --evz-border: #e2e8f0;
}

.evz-signup-container {
  min-height: 100vh;
  background-color: var(--evz-surface);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Inter', -apple-system, sans-serif;
}

.evz-signup-content {
  width: 100%;
  max-width: 420px;
  padding: 48px 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.evz-title-section {
  text-align: center;
  margin-bottom: 32px;
}

.evz-app-name {
  font-size: 28px;
  font-weight: 800;
  color: var(--evz-primary);
  margin: 0;
}

.evz-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--evz-text-primary);
  margin-top: 8px;
  margin-bottom: 4px;
}

.evz-subtitle {
  font-size: 14px;
  color: var(--evz-text-secondary);
}

.evz-input-group {
  margin-bottom: 16px;
}

.evz-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--evz-text-primary);
  margin-bottom: 6px;
}

.evz-input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid var(--evz-border);
  font-size: 16px;
  transition: all 0.2s;
  box-sizing: border-box;
}

.evz-input:focus {
  outline: none;
  border-color: var(--evz-primary);
  box-shadow: 0 0 0 3px rgba(3, 205, 140, 0.1);
}

.evz-terms {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 20px;
  font-size: 13px;
  color: var(--evz-text-secondary);
}

.evz-checkbox {
  width: 18px;
  height: 18px;
  accent-color: var(--evz-primary);
  margin-top: 2px;
}

.evz-btn-primary {
  width: 100%;
  padding: 14px;
  background-color: var(--evz-primary);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 24px;
  transition: opacity 0.2s;
}

.evz-btn-primary:active {
  opacity: 0.9;
}

.evz-divider-container {
  display: flex;
  align-items: center;
  margin: 24px 0;
}

.evz-divider-line {
  flex: 1;
  height: 1px;
  background-color: var(--evz-border);
}

.evz-divider-text {
  padding: 0 16px;
  font-size: 13px;
  color: var(--evz-text-secondary);
}

.evz-social-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.evz-social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border: 1px solid var(--evz-border);
  border-radius: 12px;
  background: white;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: var(--evz-text-primary);
}

.evz-login-link {
  text-align: center;
  margin-top: 32px;
  font-size: 14px;
  color: var(--evz-text-secondary);
}

.evz-link {
  color: var(--evz-primary);
  text-decoration: none;
  font-weight: 600;
}
`;

export default function SignupScreen() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    agree: false
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const styleId = "evz-signup-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = evzStyles;
      document.head.appendChild(style);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!formData.agree) {
      alert("Please agree to the terms and conditions");
      return;
    }
    setLoading(true);
    try {
      const res = await authApi.signup(formData);
      if (res.success) {
        navigate(ROUTES.PROFILE_SETUP);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = async (provider) => {
    try {
      const res = await authApi.socialLogin(provider);
      if (res.success) {
        navigate(ROUTES.PROFILE_SETUP);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="evz-signup-container">
      <div className="evz-signup-content">
        <div className="evz-title-section">
          <h1 className="evz-app-name">EVZONE</h1>
          <h2 className="evz-title">Create Account</h2>
          <p className="evz-subtitle">Join the future of energy swapping</p>
        </div>

        <form onSubmit={handleSignup}>
          <div className="evz-input-group">
            <label className="evz-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="evz-input"
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="evz-input-group">
            <label className="evz-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="evz-input"
              placeholder="name@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="evz-input-group">
            <label className="evz-label">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="evz-input"
              placeholder="+256..."
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="evz-input-group">
            <label className="evz-label">Password</label>
            <input
              type="password"
              name="password"
              className="evz-input"
              placeholder="Minimum 8 characters"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
            />
          </div>

          <div className="evz-terms">
            <input
              type="checkbox"
              name="agree"
              className="evz-checkbox"
              checked={formData.agree}
              onChange={handleChange}
            />
            <span>
              I agree to the <a href="#" className="evz-link">Terms of Service</a> and{" "}
              <a href="#" className="evz-link">Privacy Policy</a>
            </span>
          </div>

          <button type="submit" className="evz-btn-primary" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="evz-divider-container">
          <div className="evz-divider-line"></div>
          <div className="evz-divider-text">OR SIGN UP WITH</div>
          <div className="evz-divider-line"></div>
        </div>

        <div className="evz-social-grid">
          <button className="evz-social-btn" onClick={() => handleSocialSignup('google')}>
            <GoogleIcon sx={{ fontSize: 20 }} />
            Google
          </button>
          <button className="evz-social-btn" onClick={() => handleSocialSignup('apple')}>
            <AppleIcon sx={{ fontSize: 20 }} />
            Apple
          </button>
        </div>

        <div className="evz-login-link">
          Already have an account?{" "}
          <a href="#" onClick={(e) => { e.preventDefault(); navigate(ROUTES.LOGIN); }} className="evz-link">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
