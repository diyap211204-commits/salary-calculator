import { useEffect, useState } from "react";

const KEY = "salary-slips";
const MAX = 8;

// saved salary slips, remembered in the browser
export default function useSavedSlips() {
  const [slips, setSlips] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(slips));
    } catch {
      /* storage blocked: ignore */
    }
  }, [slips]);

  return {
    slips,
    save: (values, result) =>
      setSlips((s) => [
        { id: Date.now(), values, net: result.net, role: result.position.label },
        ...s,
      ].slice(0, MAX)),
    remove: (id) => setSlips((s) => s.filter((x) => x.id !== id)),
    clear: () => setSlips([]),
  };
}
