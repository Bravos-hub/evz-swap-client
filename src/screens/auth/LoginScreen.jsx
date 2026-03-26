import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/routes";
import { authApi } from "../../shared/api/authApi";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import EvzScreen from "../../shared/components/EvzScreen";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const type = identifier.includes("@") ? "email" : "phone";
      const res = await authApi.login({ identifier, password, type });
      if (res.success) {
        navigate(ROUTES.DASHBOARD);
      } else {
        // Fallback for demo
        navigate(ROUTES.DASHBOARD);
      }
    } catch (err) {
      console.error(err);
      // Fallback for demo
      navigate(ROUTES.DASHBOARD);
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
    <EvzScreen className="bg-white">
      <div className="flex-1 flex flex-col pt-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-evz-primary tracking-tighter mb-2">EVZONE</h1>
          <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Email or Phone Number</label>
            <input
              type="text"
              className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-evz-primary/20 focus:border-evz-primary transition-all outline-none text-slate-900"
              placeholder="e.g. name@email.com"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-bold text-slate-700">Password</label>
              <button type="button" className="text-xs font-bold text-evz-primary hover:underline">Forgot?</button>
            </div>
            <input
              type="password"
              className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-evz-primary/20 focus:border-evz-primary transition-all outline-none text-slate-900"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-5 bg-evz-primary text-white rounded-[2rem] font-black text-lg shadow-xl shadow-evz-primary/30 active:scale-[0.98] transition-all disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-slate-100"></div>
          <span className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">or continue with</span>
          <div className="flex-1 h-px bg-slate-100"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => handleSocialLogin('google')}
            className="flex items-center justify-center gap-3 py-4 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
          >
            <GoogleIcon sx={{ fontSize: 20 }} />
            <span className="text-sm font-bold text-slate-700">Google</span>
          </button>
          <button 
            onClick={() => handleSocialLogin('apple')}
            className="flex items-center justify-center gap-3 py-4 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
          >
            <AppleIcon sx={{ fontSize: 20 }} />
            <span className="text-sm font-bold text-slate-700">Apple</span>
          </button>
        </div>

        <div className="mt-auto pt-10 text-center">
          <p className="text-sm text-slate-500 font-medium">
            Don't have an account?{" "}
            <button 
              onClick={() => navigate(ROUTES.SIGNUP)} 
              className="text-evz-primary font-bold hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </EvzScreen>
  );
}
