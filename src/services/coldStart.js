import axios from "axios";

// Render's free tier sleeps after ~15 min idle; waking takes ~30-60s.
const HEALTH_URL = import.meta.env.VITE_BASE_URL + "/health";
const SHOW_AFTER_MS = 3000; // don't flash the overlay for a warm server
const POLL_EVERY_MS = 4000;
const PING_TIMEOUT_MS = 8000;
const KEEP_ALIVE_MS = 10 * 60 * 1000;

let state = { status: "ready", startedAt: null }; // ready | waking
const listeners = new Set();
let wakePromise = null;

const setState = (next) => {
    state = next;
    listeners.forEach((l) => l());
};

export const subscribe = (l) => {
    listeners.add(l);
    return () => listeners.delete(l);
};
export const getSnapshot = () => state;

// Any HTTP answer below 500 (even a 404 for a missing /health) means the server is awake.
const ping = async () => {
    try {
        const res = await axios.get(HEALTH_URL, {
            timeout: PING_TIMEOUT_MS,
            validateStatus: () => true,
        });
        return res.status < 500;
    } catch {
        return false;
    }
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Shared by the load-time check and the request interceptor, so only one poll loop runs.
export const ensureAwake = () => {
    if (wakePromise) return wakePromise;

    wakePromise = (async () => {
        const startedAt = Date.now();
        const timer = setTimeout(
            () => setState({ status: "waking", startedAt }),
            SHOW_AFTER_MS
        );

        while (!(await ping())) {
            await sleep(POLL_EVERY_MS);
        }

        clearTimeout(timer);
        setState({ status: "ready", startedAt: null });
        wakePromise = null;
    })();

    return wakePromise;
};

// Errors that mean "server asleep", not "server rejected the request".
export const isColdStartError = (error) => {
    if (error.code === "ERR_CANCELED") return false;
    if (!error.response) return true; // network error / timeout
    return [502, 503, 504].includes(error.response.status);
};

export const initColdStart = () => {
    ensureAwake();
    // Keep the server warm while the tab is open.
    setInterval(() => {
        if (!document.hidden) ping();
    }, KEEP_ALIVE_MS);
};
