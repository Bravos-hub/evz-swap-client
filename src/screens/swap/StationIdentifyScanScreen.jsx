import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import EvzScreen from "../../shared/components/EvzScreen";

export default function StationIdentifyScanScreen({
  nextPath = "/swap/self/safety",
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
        window.localStorage.setItem("evz.self.stationId", trimmed);
      }
    } catch {
      // ignore
    }

    stopCamera();
    navigate(nextPath);
  };

  const hasValue = value.trim().length > 0;

  return (
    <EvzScreen className="bg-white">
      <header className="pb-[10px]">
        <h1 className="text-[22px] font-extrabold m-0 mb-1">Scan Station QR</h1>
        <p className="text-[13px] text-evz-textSecondary m-0">
          Scan the QR code displayed on the station screen to identify this location.
        </p>
      </header>

      <main className="flex-1 pt-2">
        <section>
          <div className="h-[240px] rounded-2xl bg-[#000000] relative overflow-hidden flex items-center justify-center border-4 border-evz-primary shadow-lg">
            <video
              ref={videoRef}
              className="w-full h-full object-cover opacity-80"
              playsInline
              muted
            />
            {!started && (
              <button
                type="button"
                className="absolute px-5 py-3 rounded-full border-none bg-evz-primary text-white text-sm font-bold cursor-pointer shadow-xl transition-transform hover:scale-105"
                onClick={startCamera}
              >
                Scan Station
              </button>
            )}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-white opacity-40 rounded-lg pointer-events-none" />
          </div>
          {camErr && <p className="mt-2 text-[11px] text-red-500 font-medium">{camErr}</p>}
        </section>

        <section className="mt-6">
          <div className="text-[13px] font-extrabold text-[#374151]">Manual station ID</div>
          <div className="flex gap-2 mt-2">
            <input
              className="flex-1 rounded-xl border border-gray-100 bg-gray-50 px-3 py-3 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-evz-primary/30"
              placeholder="e.g. EVZ-ST-0042"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              type="button"
              className={`rounded-full border-none px-4 py-3 text-sm font-bold cursor-pointer text-white shadow-md ${
                !hasValue ? "bg-gray-300 cursor-default" : "bg-evz-accent hover:bg-evz-accent/90"
              }`}
              onClick={handleConfirm}
              disabled={!hasValue}
            >
              Next
            </button>
          </div>

          <button
            type="button"
            className="mt-6 w-full border-none bg-transparent p-0 text-[13px] font-bold text-evz-primary cursor-pointer hover:underline"
            onClick={() => navigate("/swap/self/identify-code")}
          >
            Enter by Code instead
          </button>
        </section>
      </main>

      <div className="mt-auto h-4" />

      <footer className="pt-3">
        <button
          type="button"
          className="w-full text-evz-accent font-bold text-sm bg-transparent border-none cursor-pointer hover:underline"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </footer>
    </EvzScreen>
  );
}
