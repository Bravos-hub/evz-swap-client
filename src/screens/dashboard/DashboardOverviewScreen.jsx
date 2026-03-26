import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/routes";
import EvzScreen from "../../shared/components/EvzScreen";

const KWH_KEY = "evz.analytics.kwhLog";
const CO2F_KEY = "evz.analytics.co2PerKWh";
const SESS_KEY = "evz.swap.sessions";

function safeLocalStorage() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function getJSON(key, fallback = []) {
  const ls = safeLocalStorage();
  if (!ls) return fallback;
  try {
    const raw = ls.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setJSON(key, value) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    ls.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

function getNumber(key, fallback = 0.4) {
  const ls = safeLocalStorage();
  if (!ls) return fallback;
  try {
    const raw = ls.getItem(key);
    return raw == null ? fallback : Number(raw);
  } catch {
    return fallback;
  }
}

function seedKwh() {
  const ls = safeLocalStorage();
  if (!ls) return;
  const existing = getJSON(KWH_KEY, []);
  if (existing.length > 0) return;
  const now = Date.now();
  const demo = Array.from({ length: 10 }).map((_, i) => ({
    ts: now - i * 24 * 3600 * 1000,
    kwh: Number((Math.random() * 3).toFixed(2)),
  }));
  setJSON(KWH_KEY, demo);
}

function lastDays(arr, days) {
  const cut = Date.now() - days * 24 * 3600 * 1000;
  return arr.filter((x) => {
    const t = x.ts != null ? x.ts : x.when; // support older session schema
    return (t || 0) >= cut;
  });
}

export default function DashboardOverviewScreen() {
  const navigate = useNavigate();

  const [kwhLog, setKwhLog] = useState(() => getJSON(KWH_KEY, []));
  const [co2Factor] = useState(() => getNumber(CO2F_KEY, 0.4));
  const [sessions, setSessions] = useState(() => getJSON(SESS_KEY, []));

  useEffect(() => {
    seedKwh();
    // Refresh data when component mounts or when navigating to dashboard
    setKwhLog(getJSON(KWH_KEY, []));
    setSessions(getJSON(SESS_KEY, []));
  }, []);

  const kwh7 = useMemo(
    () => lastDays(kwhLog, 7).reduce((sum, it) => sum + Number(it.kwh || 0), 0),
    [kwhLog]
  );

  const swaps7 = useMemo(
    () => lastDays(sessions.filter((s) => s.type === "completed"), 7).length,
    [sessions]
  );

  const co2kg7 = useMemo(() => kwh7 * co2Factor, [kwh7, co2Factor]);

  return (
    <EvzScreen>
      <header className="pb-2">
        <h1 className="text-[22px] font-extrabold m-0 mb-1">Dashboard</h1>
        <p className="text-[13px] text-evz-textSecondary m-0">Energy &amp; impact (last 7 days)</p>
        <div className="h-px w-full bg-gray-200 mt-[10px]" />
      </header>

      <main className="pt-3">
        <div className="flex flex-col gap-[10px]">
          <section className="rounded-2xl bg-evz-surfaceSoft p-[12px_14px_10px]">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[13px] font-extrabold">Energy used</div>
                <div className="text-[26px] font-black text-evz-primary">
                  {kwh7.toFixed(2)} kWh
                </div>
              </div>
              <span className="px-[10px] py-[2px] rounded-full bg-[#a6a6a6] text-white text-[11px] font-semibold">7 days</span>
            </div>
          </section>

          <section 
            className="rounded-2xl bg-evz-surfaceSoft p-[12px_14px_10px] cursor-pointer transition-all duration-150 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] active:translate-y-0"
            onClick={() => navigate(ROUTES.SWAP_SESSIONS)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate(ROUTES.SWAP_SESSIONS);
              }
            }}
            aria-label="View swap history"
          >
            <div className="text-[13px] font-extrabold">Swaps completed</div>
            <div className="text-[26px] font-black">{swaps7}</div>
          </section>

          <section className="rounded-2xl bg-[#e8fff6] border border-evz-primary p-[12px_14px_10px]">
            <div className="text-[13px] font-extrabold">CO₂ impact (estimate)</div>
            <div className="text-[11px] text-evz-textSecondary">
              Factor: {co2Factor.toFixed(2)} kg CO₂ / kWh
            </div>
            <div className="text-[26px] font-black text-evz-primary mt-1">
              {co2kg7.toFixed(2)} kg
            </div>
            <div className="text-[11px] text-evz-textSecondary">
              Adjust factor in Carbon savings
            </div>
          </section>
        </div>
      </main>

      <footer className="pt-5">
        <div className="flex gap-2">
          <button
            type="button"
            className="flex-1 rounded-full p-[11px_16px] text-sm font-semibold cursor-pointer border border-[#a6a6a6] bg-white text-evz-textPrimary hover:bg-gray-50"
            onClick={() => navigate("/dashboard/carbon")}
          >
            Carbon savings
          </button>
          <button
            type="button"
            className="flex-1 rounded-full p-[11px_16px] text-sm font-semibold cursor-pointer border border-transparent bg-evz-accent text-white shadow-[0_10px_22px_rgba(247,127,0,0.32)] active:translate-y-px active:shadow-[0_6px_14px_rgba(247,127,0,0.28)]"
            onClick={() => navigate("/dashboard/battery")}
          >
            Battery health
          </button>
        </div>
      </footer>
    </EvzScreen>
  );
}
