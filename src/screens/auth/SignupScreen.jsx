import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/routes";
import { authApi } from "../../shared/api/authApi";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import EvzScreen from "../../shared/components/EvzScreen";

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
      } else {
        // Fallback for demo
        navigate(ROUTES.PROFILE_SETUP);
      }
    } catch (err) {
      console.error(err);
      // Fallback for demo
      navigate(ROUTES.PROFILE_SETUP);
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
    <EvzScreen className="bg-white">
      <div className="flex-1 flex flex-col pt-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-evz-primary tracking-tighter mb-2">EVZONE</h1>
          <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">Join the future of energy swapping</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-evz-primary/20 focus:border-evz-primary transition-all outline-none text-slate-900 text-sm"
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
            <input
              type="email"
              name="email"
              className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-evz-primary/20 focus:border-evz-primary transition-all outline-none text-slate-900 text-sm"
              placeholder="name@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-evz-primary/20 focus:border-evz-primary transition-all outline-none text-slate-900 text-sm"
              placeholder="+256..."
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-evz-primary/20 focus:border-evz-primary transition-all outline-none text-slate-900 text-sm"
              placeholder="Minimum 8 characters"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
            />
          </div>

          <label className="flex items-start gap-3 pt-2 cursor-pointer group">
            <div className="relative flex items-center mt-0.5">
              <input
                type="checkbox"
                name="agree"
                className="w-5 h-5 rounded border-slate-200 text-evz-primary focus:ring-evz-primary/20"
                checked={formData.agree}
                onChange={handleChange}
              />
            </div>
            <span className="text-xs text-slate-500 font-medium leading-relaxed">
              I agree to the <button type="button" className="text-evz-primary font-bold hover:underline">Terms of Service</button> and <button type="button" className="text-evz-primary font-bold hover:underline">Privacy Policy</button>
            </span>
          </label>

          <button 
            type="submit" 
            className="w-full py-5 bg-evz-primary text-white rounded-[2rem] font-black text-lg shadow-xl shadow-evz-primary/30 active:scale-[0.98] transition-all disabled:opacity-50 mt-6"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-slate-100"></div>
          <span className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">or sign up with</span>
          <div className="flex-1 h-px bg-slate-100"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => handleSocialSignup('google')}
            className="flex items-center justify-center gap-3 py-4 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
          >
            <GoogleIcon sx={{ fontSize: 20 }} />
            <span className="text-sm font-bold text-slate-700">Google</span>
          </button>
          <button 
            onClick={() => handleSocialSignup('apple')}
            className="flex items-center justify-center gap-3 py-4 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
          >
            <AppleIcon sx={{ fontSize: 20 }} />
            <span className="text-sm font-bold text-slate-700">Apple</span>
          </button>
        </div>

        <div className="mt-auto pt-8 text-center">
          <p className="text-sm text-slate-500 font-medium">
            Already have an account?{" "}
            <button 
              onClick={() => navigate(ROUTES.LOGIN)} 
              className="text-evz-primary font-bold hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </EvzScreen>
  );
}
