import { useEffect, useSyncExternalStore } from "react";
import { useLocation } from "react-router-dom";
import { initAnalytics, trackPageView } from "@/lib/analytics";
import { captureAcquisition } from "@/lib/attribution";
import { getConsent, serverConsent, subscribeConsent } from "@/lib/consent";

export function Analytics() {
  const location = useLocation();
  const consent = useSyncExternalStore(subscribeConsent, getConsent, serverConsent);

  useEffect(() => {
    captureAcquisition();
    initAnalytics();
    trackPageView(`${location.pathname}${location.search}`);
  }, [location.pathname, location.search, consent]);

  return null;
}
