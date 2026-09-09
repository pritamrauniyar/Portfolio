import { useEffect, useRef } from "react";
import analytics from "../utils/analytics";

/**
 * Hook to track element / component viewability impressions.
 * Fires once when the component enters the viewport (threshold customizable).
 *
 * @param {string} componentId - Unique identifier (e.g. 'hero_section', 'impact_metrics')
 * @param {object} metadata - Additional context metadata
 * @param {number} threshold - Intersection threshold (default 0.35 = 35% visible)
 * @returns {React.RefObject} - Element ref to attach to the target section wrapper
 */
export function useComponentImpression(componentId, metadata = {}, threshold = 0.35, externalRef = null) {
  const internalRef = useRef(null);
  const targetRef = externalRef || internalRef;

  useEffect(() => {
    const el = targetRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      // Fallback: If IntersectionObserver is not supported, log impression on mount
      analytics.trackImpression(componentId, metadata);
      return;
    }

    let hasRecorded = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRecorded) {
          hasRecorded = true;
          analytics.trackImpression(componentId, {
            ...metadata,
            intersectionRatio: Math.round(entry.intersectionRatio * 100) / 100,
          });
          observer.unobserve(el);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin: "0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [componentId, threshold, metadata, targetRef]);

  return targetRef;
}

export default useComponentImpression;
