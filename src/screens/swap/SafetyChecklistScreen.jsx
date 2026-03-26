import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EvzScreen from "../../shared/components/EvzScreen";

export default function SafetyChecklistScreen({
  nextPath = "/swap/self/scan-return",
}) {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { id: 1, text: "Vehicle is parked and engine is OFF", ok: false },
    { id: 2, text: "Battery is disconnected from vehicle", ok: false },
    { id: 3, text: "I am wearing protective gear if needed", ok: false },
    { id: 4, text: "No visible damage or leakage on battery", ok: false },
  ]);

  const toggle = (id) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, ok: !it.ok } : it))
    );
  };

  const allOk = items.every((it) => it.ok);

  const handleContinue = () => {
    if (allOk) {
      navigate(nextPath);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <EvzScreen>
      <header className="pb-[10px]">
        <h1 className="text-[22px] font-extrabold m-0 mb-1">Safety Checklist</h1>
        <p className="text-[13px] text-evz-textSecondary m-0">
          Please confirm these safety steps before proceeding with the swap.
        </p>
      </header>

      <main className="flex-1 pt-2">
        <div className="flex flex-col gap-2.5">
          {items.map((it) => (
            <label
              key={it.id}
              className={`flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${
                it.ok
                  ? "bg-[#e8fff6] border-evz-primary"
                  : "bg-evz-surfaceSoft border-transparent"
              }`}
            >
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-gray-300 text-evz-primary focus:ring-evz-primary"
                checked={it.ok}
                onChange={() => toggle(it.id)}
              />
              <span className={`text-sm font-medium ${it.ok ? "text-evz-textPrimary" : "text-evz-textSecondary"}`}>
                {it.text}
              </span>
            </label>
          ))}
        </div>
      </main>

      <footer className="pt-5">
        <div className="flex flex-col gap-2">
          <button
            type="button"
            className={`w-full rounded-full p-[11px_16px] text-sm font-semibold cursor-pointer transition-all ${
              allOk
                ? "bg-evz-accent text-white shadow-[0_8px_18px_rgba(247,127,0,0.3)]"
                : "bg-[#a6a6a6] text-white cursor-default"
            }`}
            onClick={allOk ? handleContinue : undefined}
            disabled={!allOk}
          >
            Continue to scan
          </button>
          <button
            type="button"
            className="w-full rounded-full p-[11px_16px] text-sm font-semibold cursor-pointer border border-transparent bg-transparent text-evz-textSecondary hover:text-evz-textPrimary"
            onClick={handleCancel}
          >
            Cancel swap
          </button>
        </div>
      </footer>
    </EvzScreen>
  );
}
