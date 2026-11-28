import { useEffect, useState } from "react";

// The form classes the media buyer pages share (signup, sign-in, dashboard).
export const mbFieldClass = "block rounded-lg border border-gray-300 bg-white px-3 py-3 text-base text-gray-950 focus:outline-emerald-600";
export const mbInputClass = `mt-2 w-full ${mbFieldClass}`;
export const mbHintClass = "mt-1.5 text-xs leading-5 text-gray-500";
export const mbLabelClass = "block text-sm font-bold text-gray-800";

/** Counts a resend's wait down to zero. */
export function useCooldown() {
  const [cooldown, setCooldown] = useState(0);
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);
  return [cooldown, setCooldown] as const;
}
