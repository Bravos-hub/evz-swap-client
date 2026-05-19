import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/routes";
import { authApi } from "../../shared/api/authApi";
import EvzScreen from "../../shared/components/EvzScreen";

export default function ProfileSetupScreen() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleComplete = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await authApi.updateProfile(formData);
      if (res.success) {
        if (typeof window !== "undefined") {
          window.localStorage.setItem("evz.profile.name", formData.displayName);
        }
        navigate(ROUTES.DASHBOARD);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Could not save your profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <EvzScreen className="bg-white">
      <div className="flex-1 flex flex-col pt-12">
        <div className="text-center mb-10">
          <div className="w-24 h-24 rounded-full bg-slate-100 mx-auto mb-6 flex items-center justify-center overflow-hidden border-4 border-white shadow-xl">
             <span className="text-3xl">👤</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Complete Profile</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Let us know you better for a personalized experience</p>
        </div>

        <form onSubmit={handleComplete} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Display Name</label>
            <input
              type="text"
              className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-evz-primary/20 focus:border-evz-primary transition-all outline-none text-slate-900"
              placeholder="e.g. Alex Green"
              value={formData.displayName}
              onChange={(e) => setFormData({...formData, displayName: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Location (City)</label>
            <input
              type="text"
              className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-evz-primary/20 focus:border-evz-primary transition-all outline-none text-slate-900"
              placeholder="e.g. Kampala, UG"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Short Bio</label>
            <textarea
              className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-evz-primary/20 focus:border-evz-primary transition-all outline-none text-slate-900 min-h-[100px]"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
            />
          </div>

          {error && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
              {error}
            </p>
          )}

          <button 
            type="submit" 
            className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black text-lg shadow-xl shadow-slate-900/20 active:scale-[0.98] transition-all disabled:opacity-50 mt-4"
            disabled={loading}
          >
            {loading ? "Saving..." : "Start Swapping"}
          </button>
        </form>

        <div className="mt-auto pt-10 text-center">
            <button 
              onClick={() => navigate(ROUTES.DASHBOARD)} 
              className="text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors"
            >
              Skip for now
            </button>
        </div>
      </div>
    </EvzScreen>
  );
}
