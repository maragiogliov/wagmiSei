import React, { useEffect, useRef } from "react";
import "./GhostBackground.css";

/* =======================================================
   🔹 Resolve var(--token) → actual color string
   ======================================================= */
function resolveCssVarOrColor(value, scopeEl = document.documentElement) {
  const m = /^var\((--[a-z0-9-_]+)\)\s*$/i.exec((value || "").trim());
  if (!m) return value; // already a hex/rgb/rgba value
  const fromScope = getComputedStyle(scopeEl).getPropertyValue(m[1]).trim();
  if (fromScope) return fromScope;
  const fromRoot = getComputedStyle(document.documentElement).getPropertyValue(m[1]).trim();
  return fromRoot || value;
}

/* =======================================================
   🔹 Convert any color → "r, g, b"
   ======================================================= */
function colorStringToTriplet(str) {
  const s = str.trim();

  // rgb() or rgba()
  const rgbMatch = /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*[\d.]+)?\s*\)$/i.exec(s);
  if (rgbMatch) {
    const [, r, g, b] = rgbMatch;
    return `${Math.round(+r)}, ${Math.round(+g)}, ${Math.round(+b)}`;
  }

  // hex (#abc or #aabbcc)
  if (s.startsWith("#")) {
    let h = s.slice(1);
    if (h.length === 3) h = h.split("").map(c => c + c).join("");
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  }

  // fallback: resolve via browser
  const tmp = document.createElement("div");
  tmp.style.color = s;
  document.body.appendChild(tmp);
  const computed = getComputedStyle(tmp).color;
  document.body.removeChild(tmp);
  const m2 = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(computed);
  return m2 ? `${m2[1]}, ${m2[2]}, ${m2[3]}` : "0, 0, 0";
}

/* =======================================================
   🔹 Main Component (static defaults + CSS vars)
   ======================================================= */
export default function GhostBackgroundWithControls() {
  const containerRef = useRef(null);
  const interactiveRef = useRef(null);
  const blurNodeRef = useRef(null);
  const g1Ref = useRef(null);
  const g2Ref = useRef(null);
  const g3Ref = useRef(null);
  const g4Ref = useRef(null);
  const g5Ref = useRef(null);

  // 🎨 Default from CSS variables
  const bg1 = "var(--brand-ghostbackground-bg1)";
  const bg2 = "var(--brand-ghostbackground-bg2)";
  const c1  = "var(--brand-ghostbackground-c1)";
  const c2  = "var(--brand-ghostbackground-c2)";
  const c3  = "var(--brand-ghostbackground-c3)";
  const c4  = "var(--brand-ghostbackground-c4)";
  const c5  = "var(--brand-ghostbackground-c5)";
  const cInteractive = "var(--brand-ghostbackground-interactive)";

  const blending      = "hard-light";
  const circleSize    = 140;
  const blur          = 82;
  const stdDev        = 8;
  const speedMul      = 2.4;
  const bubbleOpacity = 1;
  const smooth        = 0.4;

  /* =======================================================
     🔹 Cursor Follow Animation
     ======================================================= */
  useEffect(() => {
    const bubble = interactiveRef.current;
    if (!bubble) return;

    let curX = 0, curY = 0;
    let tgX = 0, tgY = 0;
    let raf;
    let last = performance.now();

    const onMove = (e) => {
      tgX = e.clientX;
      tgY = e.clientY;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const loop = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      const t = 1 - Math.pow(1 - smooth, dt * 60);
      curX += (tgX - curX) * t;
      curY += (tgY - curY) * t;
      bubble.style.transform = `translate(${curX}px, ${curY}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [smooth]);

  /* =======================================================
     🔹 Apply Styles (from vars)
     ======================================================= */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resolvedBg1 = resolveCssVarOrColor(bg1, container);
    const resolvedBg2 = resolveCssVarOrColor(bg2, container);
    container.style.setProperty("--color-bg1", resolvedBg1);
    container.style.setProperty("--color-bg2", resolvedBg2);

    const colors = [c1, c2, c3, c4, c5, cInteractive].map(c =>
      colorStringToTriplet(resolveCssVarOrColor(c, container))
    );

    container.style.setProperty("--color1", colors[0]);
    container.style.setProperty("--color2", colors[1]);
    container.style.setProperty("--color3", colors[2]);
    container.style.setProperty("--color4", colors[3]);
    container.style.setProperty("--color5", colors[4]);
    container.style.setProperty("--color-interactive", colors[5]);

    container.style.setProperty("--blending", blending);
    container.style.setProperty("--circle-size", `${circleSize}%`);

    const grads = container.querySelector(".gradients-container");
    if (grads) grads.style.filter = `url(#goo) blur(${blur}px)`;

    if (blurNodeRef.current)
      blurNodeRef.current.setAttribute("stdDeviation", String(stdDev));

    if (interactiveRef.current)
      interactiveRef.current.style.opacity = String(bubbleOpacity);

    const scale = (base) => `${Math.max(0.01, base / speedMul)}s`;
    g1Ref.current && (g1Ref.current.style.animationDuration = scale(30));
    g2Ref.current && (g2Ref.current.style.animationDuration = scale(20));
    g3Ref.current && (g3Ref.current.style.animationDuration = scale(40));
    g4Ref.current && (g4Ref.current.style.animationDuration = scale(40));
    g5Ref.current && (g5Ref.current.style.animationDuration = scale(20));
  }, [bg1, bg2, c1, c2, c3, c4, c5, cInteractive, blending, circleSize, blur, stdDev, bubbleOpacity, speedMul]);

  /* =======================================================
     🔹 Render
     ======================================================= */
  return (
    <div className="gradient-bg" ref={containerRef}>
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              ref={blurNodeRef}
              in="SourceGraphic"
              stdDeviation={stdDev}
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className="gradients-container">
        <div className="g1" ref={g1Ref}></div>
        <div className="g2" ref={g2Ref}></div>
        <div className="g3" ref={g3Ref}></div>
        <div className="g4" ref={g4Ref}></div>
        <div className="g5" ref={g5Ref}></div>
        <div className="interactive" ref={interactiveRef}></div>
      </div>
    </div>
  );
}