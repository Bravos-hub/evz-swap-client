import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/routes";
import EvzScreen from "../../shared/components/EvzScreen";

const LS_KEY = "evz.vehicles";

function seedIfEmpty() {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) {
      const demo = [
        { id: "v1", name: "Zembo e‑Bike", type: "bike", plate: "UBF‑902K", swapCapable: true },
        { id: "v2", name: "Neta V", type: "car", plate: "UAX‑123X", swapCapable: false },
        { id: "v3", name: "Gogoro Viva", type: "bike", plate: "KDA‑221A", swapCapable: true },
      ];
      window.localStorage.setItem(LS_KEY, JSON.stringify(demo));
    }
  } catch {
    // ignore
  }
}

function loadVehicles() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(LS_KEY) || "[]");
  } catch {
    return [];
  }
}

export default function VehicleSelectScreen() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("all");
  const [vehicles, setVehicles] = useState([]);
  const [selectedId, setSelectedId] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      return window.localStorage.getItem("evz.selectedVehicleId") || "";
    } catch {
      return "";
    }
  });

  useEffect(() => {
    seedIfEmpty();
    setVehicles(loadVehicles());
  }, []);

  const filtered = useMemo(
    () => (filter === "all" ? vehicles : vehicles.filter((v) => v.type === filter)),
    [vehicles, filter]
  );

  const selected = useMemo(
    () => vehicles.find((v) => v.id === selectedId) || null,
    [vehicles, selectedId]
  );

  const canContinue = !!(selected && selected.swapCapable);

  const handleSelect = (id) => {
    setSelectedId(id);
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("evz.selectedVehicleId", id);
      }
    } catch {
      // ignore
    }
  };

  const handleContinue = () => {
    if (!canContinue || !selected) return;
    navigate(`${ROUTES.PROVIDER_SELECT}?vehicleId=${encodeURIComponent(selected.id)}`);
  };

  const handleAddVehicle = () => {
    navigate(ROUTES.VEHICLE_DETAILS.replace(":id", "new"));
  };

  return (
    <EvzScreen className="bg-[#f8fafc]">
      <header className="mb-6 pt-2">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Select a vehicle</h1>
        <p className="text-sm text-slate-500 font-medium">Choose the vehicle to swap for</p>

        <div className="flex bg-white p-1 rounded-full border border-slate-100 mt-6 shadow-sm">
          {[
            { key: "all", label: "All" },
            { key: "car", label: "Car" },
            { key: "bike", label: "Bike" },
          ].map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all ${
                  active 
                    ? "bg-evz-primary text-white shadow-lg shadow-evz-primary/30" 
                    : "text-slate-400 hover:text-slate-600"
                }`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </header>

      <main className="flex-1">
        <div className="space-y-3">
          {filtered.map((v) => {
            const active = v.id === selectedId;
            return (
              <button
                key={v.id}
                type="button"
                className={`w-full p-4 rounded-3xl border text-left transition-all ${
                  active 
                    ? "bg-white border-evz-primary ring-4 ring-evz-primary/5 shadow-xl shadow-slate-200/50 scale-[1.02]" 
                    : "bg-white border-slate-100 border-transparent shadow-sm hover:border-slate-200"
                }`}
                onClick={() => handleSelect(v.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-slate-900">{v.name}</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded-md">
                      {v.type}
                    </span>
                  </div>
                  {active && (
                    <div className="w-5 h-5 rounded-full bg-evz-primary flex items-center justify-center text-white">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-500 tracking-wide">{v.plate}</span>
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${
                    v.swapCapable 
                      ? "bg-evz-primary/10 text-evz-primary" 
                      : "bg-slate-100 text-slate-400"
                  }`}>
                    {v.swapCapable ? "Swap Ready" : "Non-Compatible"}
                  </span>
                </div>
              </button>
            );
          })}

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-slate-400 font-bold">No vehicles found in this category.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="pt-6 space-y-3">
        {selected && !canContinue && (
          <div className="bg-orange-50 border border-orange-100 p-3 rounded-2xl flex items-center gap-3 mb-2">
            <span className="text-lg">⚠️</span>
            <p className="text-[11px] font-bold text-orange-700 leading-tight">
              Selected vehicle {selected.name} is not compatible with battery swapping.
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleAddVehicle}
            className="w-full py-4 rounded-full border border-slate-200 bg-white text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all active:scale-95"
          >
            Add Vehicle
          </button>

          <button
            type="button"
            onClick={handleContinue}
            disabled={!canContinue}
            className={`w-full py-4 rounded-full font-black text-sm transition-all shadow-xl ${
              canContinue 
                ? "bg-evz-accent text-white shadow-evz-accent/30 active:scale-95 cursor-pointer" 
                : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
            }`}
          >
            Continue
          </button>
        </div>
      </footer>
    </EvzScreen>
  );
}
