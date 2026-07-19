"use client";

import { useEffect } from "react";

/**
 * Tracks the pointer over glass surfaces and feeds coordinates to the
 * CSS spotlight (.glass::after). Delegated: one listener for the page.
 */
export default function CursorGlow() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return; // touch: skip
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(".glass, .glass-strong");
      if (el instanceof HTMLElement) {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
  return null;
}
