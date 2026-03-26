import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import EvzScreen from "../../shared/components/EvzScreen";

export default function ScanReturnBatteryScreen({
  nextPath = "/swap/self/insert-return",
}) {
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const [camErr, setCamErr] = useState("");
  const [value, setValue] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    return () => {
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startCamera = async () => {
    try {
      if (typeof navigator === "undefined" || !navigator.mediaDevices) {
        setCamErr("Camera not available. Use manual entry.");
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setStarted(true);
        setCamErr("");
      }
    } catch (err) {
      setCamErr(
        (err && err.message) || "Camera not available. Use manual entry."
      );
    }
  };

  const stopCamera = () => {
    const v = videoRef.current;
    const s = v && v.srcObject;
    if (s && typeof s.getTracks === "function") {
      s.getTracks().forEach((t) => t.stop());
    }
  };

  const handleConfirm = (e) => {
    const trimmed = value.trim().toUpperCase();
    if (!trimmed) {
      e.preventDefault();
      return;
    }

    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("evz.self.returnBatteryId", trimmed);
      }
    } catch {
      // ignore
    }

    stopCamera();
    navigate(nextPath);
  };

  const hasValue = value.trim().length > 0;

  const handleBack = () => {
    navigate("/swap/self/safety");
  };

  return (
    <EvzScreen className="bg-[#f5f7fb]">
      <header className="pb-[10px]">
        <h1 className="text-[22px] font-extrabold m-0 mb-1">Scan battery for return</h1>
        <p className="text-[13px] text-evz-textSecondary m-0">
          Scan the QR on your used battery. If damaged, enter the Battery ID
          manually.
        </p>
      </header>

      <main className="flex-1 pt-2">
        <section>
          <div className="h-[220px] rounded-2xl bg-[#f2f2f2] relative overflow-hidden flex items-center justify-center">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              muted
            />
            {!started && (
              <button
                type="button"
                className="absolute px-4 py-2.5 rounded-full border-none bg-evz-primary text-white text-sm font-semibold cursor-pointer shadow-[0_8px_18px_rgba(3,205,140,0.35)]"
                onClick={startCamera}
              >
                Open camera
              </button>
            )}
          </div>
          {camErr && <p className="mt-1 text-[11px] text-evz-textSecondary">{camErr}</p>}
        </section>

        <section>
          <div className="mt-4 text-[13px] font-extrabold">Simulate / Manual entry</div>
          <div className="flex gap-2 mt-2">
            <input
              className="flex-1 rounded-xl border border-evz-borderSubtle px-3 py-2.5 text-sm focus:outline-none focus:border-evz-primary focus:ring-1 focus:ring-evz-primary/10"
              placeholder="Battery ID (e.g., BAT-215B)"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              type="button"
              className={`rounded-full border-none px-3.5 py-2.5 text-sm font-semibold cursor-pointer text-white ${
                !hasValue ? "bg-[#a6a6a6] cursor-default" : "bg-evz-primary"
              }`}
              onClick={handleConfirm}
              disabled={!hasValue}
            >
              Continue
            </button>
          </div>

          <button
            type="button"
            className="mt-2 border-none bg-transparent p-0 text-[13px] font-medium text-evz-accent cursor-pointer hover:underline"
            onClick={handleBack}
          >
            Back
          </button>
        </section>
      </main>

      <div className="mt-auto h-5" />
    </EvzScreen>
  );
}
