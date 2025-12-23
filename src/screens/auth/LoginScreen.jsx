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

.evz-login-container {
  min-height: 100vh;
  background-color: var(--evz-surface);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Inter', -apple-system, sans-serif;
}

.evz-login-content {
  width: 100%;
  max-width: 420px;
  padding: 48px 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.evz-logo-section {
  text-align: center;
  margin-bottom: 32px;
}

.evz-app-name {
  font-size: 28px;
  font-weight: 800;
  color: var(--evz-primary);
  margin: 0;
  letter-spacing: -0.5px;
}

.evz-welcome-text {
  font-size: 24px;
  font-weight: 700;
  color: var(--evz-text-primary);
  margin-top: 8px;
  margin-bottom: 4px;
}

.evz-subtitle {
  font-size: 14px;
  color: var(--evz-text-secondary);
  margin-bottom: 32px;
}

.evz-input-group {
  margin-bottom: 20px;
}

.evz-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--evz-text-primary);
  margin-bottom: 8px;
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

.evz-forgot-pwd {
  text-align: right;
  margin-top: 8px;
}

.evz-link {
  font-size: 13px;
  color: var(--evz-primary);
  text-decoration: none;
  font-weight: 600;
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
  transition: background 0.2s;
}

.evz-social-btn:hover {
  background: #f8fafc;
}

.evz-signup-link {
  text-align: center;
  margin-top: 32px;
  font-size: 14px;
  color: var(--evz-text-secondary);
}
`;

export default function LoginScreen() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const styleId = "evz-login-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = evzStyles;
      document.head.appendChild(style);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const type = identifier.includes("@") ? "email" : "phone";
      const res = await authApi.login({ identifier, password, type });
      if (res.success) {
        navigate(ROUTES.DASHBOARD);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      const res = await authApi.socialLogin(provider);
      if (res.success) {
        navigate(ROUTES.DASHBOARD);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="evz-login-container">
      <div className="evz-login-content">
        <div className="evz-logo-section">
          <h1 className="evz-app-name">EVZONE</h1>
          <h2 className="evz-welcome-text">Welcome back</h2>
          <p className="evz-subtitle">Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="evz-input-group">
            <label className="evz-label">Email or Phone Number</label>
            <input
              type="text"
              className="evz-input"
              placeholder="e.g. name@email.com or +256..."
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>

          <div className="evz-input-group">
            <label className="evz-label">Password</label>
            <input
              type="password"
              className="evz-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="evz-forgot-pwd">
              <a href="#" className="evz-link">Forgot password?</a>
            </div>
          </div>

          <button type="submit" className="evz-btn-primary" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="evz-divider-container">
          <div className="evz-divider-line"></div>
          <div className="evz-divider-text">OR CONTINUE WITH</div>
          <div className="evz-divider-line"></div>
        </div>

        <div className="evz-social-grid">
          <button className="evz-social-btn" onClick={() => handleSocialLogin('google')}>
            <GoogleIcon sx={{ fontSize: 20 }} />
            Google
          </button>
          <button className="evz-social-btn" onClick={() => handleSocialLogin('apple')}>
            <AppleIcon sx={{ fontSize: 20 }} />
            Apple
          </button>
        </div>

        <div className="evz-signup-link">
          Don't have an account?{" "}
          <a href="#" onClick={(e) => { e.preventDefault(); navigate(ROUTES.SIGNUP); }} className="evz-link">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
