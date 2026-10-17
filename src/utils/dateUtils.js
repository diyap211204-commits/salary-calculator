const DAY_MS = 864e5;

export const todayISO = () => new Date().toISOString().slice(0, 10);

const toUTC = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
};

// number of days from `fromISO` to `toISO`
export const daysBetween = (fromISO, toISO) =>
  Math.round((toUTC(toISO) - toUTC(fromISO)) / DAY_MS);

export const addDays = (iso, n) => new Date(toUTC(iso) + n * DAY_MS).toISOString().slice(0, 10);

// how many Sundays fall between two dates (both included)
export const countSundays = (fromISO, toISO) => {
  let count = 0;
  for (let t = toUTC(fromISO), end = toUTC(toISO); t <= end; t += DAY_MS) {
    if (new Date(t).getUTCDay() === 0) count++;
  }
  return count;
};

// 2026-10-09 -> 09-10-2026
export const formatDate = (iso) => (iso ? iso.split("-").reverse().join("-") : "—");
