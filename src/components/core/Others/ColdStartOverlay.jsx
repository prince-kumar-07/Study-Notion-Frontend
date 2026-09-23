import { useEffect, useState, useSyncExternalStore } from "react";
import { subscribe, getSnapshot } from "../../../services/coldStart";

const ESTIMATE_SECONDS = 60;

const ColdStartOverlay = () => {
  const { status, startedAt } = useSyncExternalStore(subscribe, getSnapshot);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (status !== "waking") return;
    const id = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(id);
  }, [status]);

  if (status !== "waking") return null;

  const elapsed = Math.floor((now - startedAt) / 1000);
  const progress = Math.min((elapsed / ESTIMATE_SECONDS) * 100, 95);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-4 bg-richblack-900/95 px-6 text-center text-richblack-5">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-richblack-600 border-t-yellow-50" />
      <h2 className="text-2xl font-semibold">Waking up the server…</h2>
      <p className="max-w-md text-richblack-200">
        Our free hosting puts the server to sleep after 15 minutes of
        inactivity. It usually takes about a minute to start. Your request will
        continue automatically.
      </p>
      <div className="h-2 w-64 overflow-hidden rounded-full bg-richblack-700">
        <div
          className="h-full bg-yellow-50 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-richblack-300">
        {elapsed < ESTIMATE_SECONDS
          ? `${elapsed}s elapsed · ~${ESTIMATE_SECONDS - elapsed}s remaining`
          : `${elapsed}s elapsed · almost there…`}
      </p>
    </div>
  );
};

export default ColdStartOverlay;
