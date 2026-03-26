import React from "react";
import { useNavigate } from "react-router-dom";
import EvzScreen from "../../shared/components/EvzScreen";
import StationMap from "../../shared/components/StationMap";
import TelemetryCard from "../../shared/components/TelemetryCard";

export default function DashboardOverviewScreen() {
  const navigate = useNavigate();

  const handleStartSwap = () => {
    navigate("/swap/self/identify-method");
  };

  return (
    <EvzScreen className="bg-[#f8fafc]">
      {/* Header with User Info */}
      <header className="flex justify-between items-center mb-6 pt-2">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Hello, Alex</h1>
          <p className="text-sm text-slate-500 font-medium">Your battery is at <span className="text-evz-primary font-bold">84%</span></p>
        </div>
        <div className="w-10 h-10 rounded-full bg-evz-primary/10 border-2 border-evz-primary/20 flex items-center justify-center">
          <span className="text-evz-primary font-bold">A</span>
        </div>
      </header>

      {/* Main Action Card */}
      <section className="mb-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 shadow-2xl shadow-indigo-500/20">
          <div className="relative z-10">
            <h2 className="text-white text-xl font-bold mb-1">Ready for a swap?</h2>
            <p className="text-slate-400 text-sm mb-6 max-w-[200px]">Next station is 1.2km away with 14 full batteries.</p>
            <button 
              onClick={handleStartSwap}
              className="bg-evz-primary hover:bg-[#02b87e] text-white px-8 py-4 rounded-full font-bold transition-all active:scale-95 shadow-lg shadow-evz-primary/30"
            >
              Start New Swap
            </button>
          </div>
          
          {/* Abstract pattern decoration */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-evz-primary/20 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl opacity-30" />
        </div>
      </section>

      {/* Near Stations Map */}
      <section className="mb-8">
        <div className="flex justify-between items-end mb-4 px-1">
          <h3 className="text-lg font-bold text-slate-900">Nearby Stations</h3>
          <button className="text-evz-primary text-xs font-bold hover:underline">View All</button>
        </div>
        <StationMap className="border border-slate-100 shadow-xl shadow-slate-200/50" />
      </section>

      {/* Telemetry Section */}
      <section className="mb-8">
        <div className="flex justify-between items-end mb-4 px-1">
          <h3 className="text-lg font-bold text-slate-900">Battery Health</h3>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Telemetry</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <TelemetryCard 
            label="Voltage" 
            value="72.4" 
            unit="V" 
            colorClass="text-blue-500"
            bgClass="bg-blue-50"
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
          />
          <TelemetryCard 
            label="Temperature" 
            value="32" 
            unit="°C" 
            colorClass="text-orange-500"
            bgClass="bg-orange-50"
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
          />
          <div className="col-span-2">
            <TelemetryCard 
              label="Charge Cycles" 
              value="128" 
              unit="cycles" 
              colorClass="text-evz-primary"
              bgClass="bg-evz-primary/10"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>}
            />
          </div>
        </div>
      </section>

      {/* Stats and Info */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
          <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center mb-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-1">Total Impact</p>
          <p className="text-slate-900 text-lg font-black">240 kg</p>
          <p className="text-[10px] text-evz-primary font-bold mt-1">CO2 Saved</p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center mb-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-1">Lifetime Swaps</p>
          <p className="text-slate-900 text-lg font-black">42</p>
          <p className="text-[10px] text-blue-500 font-bold mt-1">Total Count</p>
        </div>
      </section>

      {/* Reward Points Promo */}
      <section className="mt-8 mb-4">
        <div className="bg-evz-accent/10 border border-evz-accent/20 p-5 rounded-3xl flex items-center gap-4">
          <div className="text-2xl">🏆</div>
          <div>
            <p className="text-slate-900 text-sm font-bold">You have 1,250 points!</p>
            <p className="text-slate-500 text-xs">Redeem for free swap or local rewards.</p>
          </div>
          <button className="ml-auto w-8 h-8 rounded-full bg-evz-accent text-white flex items-center justify-center font-bold text-lg leading-none transition-transform active:scale-90 shadow-sm shadow-evz-accent/30">+</button>
        </div>
      </section>

      <div className="h-10 shrink-0" />
    </EvzScreen>
  );
}
