import React from "react";

export default function TelemetryCard({ label, value, unit, icon, colorClass = "text-evz-primary", bgClass = "bg-evz-primary/10" }) {
  return (
    <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm transition-all hover:shadow-md hover:border-slate-200">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-2xl ${bgClass} ${colorClass} flex items-center justify-center`}>
          {icon}
        </div>
        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">Real-time</div>
      </div>
      <div>
        <p className="text-slate-500 text-xs font-bold mb-1">{label}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black text-slate-900 tracking-tight">{value}</span>
          <span className="text-sm font-bold text-slate-400">{unit}</span>
        </div>
      </div>
      
      {/* Small sparkline-like decoration */}
      <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${colorClass.replace('text-', 'bg-')} transition-all duration-1000 ease-out`} 
          style={{ width: `${Math.min(100, (parseFloat(value) / 100) * 100)}%` }}
        />
      </div>
    </div>
  );
}
