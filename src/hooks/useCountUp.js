import { useEffect, useRef, useState } from "react";

// animates a number from its previous value to `target`
export default function useCountUp(target, ms = 600) {
  const [value, setValue] = useState(target);
  const last = useRef(target);
  useEffect(() => {
    const from = last.current, t0 = performance.now();
    let raf;
    const tick = (now) => {
      const k = Math.min(1, (now - t0) / ms);
      last.current = from + (target - from) * (1 - Math.pow(1 - k, 3));
      setValue(last.current);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return Math.round(value);
}
