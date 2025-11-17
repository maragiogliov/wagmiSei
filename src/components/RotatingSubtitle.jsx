// components/RotatingSubtitle.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const RotatingSubtitle = ({ phrases, className, interval = 2.5 }) => {
  const el = useRef(null);

  useEffect(() => {
    if (!el.current || !phrases?.length) return;

    const ctx = gsap.context(() => {
      // ensure animatable props
      gsap.set(el.current, { opacity: 1, y: 0 });

      const tl = gsap.timeline({ repeat: -1 });

      // set first subtitle immediately
      el.current.textContent = phrases[0];

      // build the cycle for the rest (including looping back to first)
      const all = phrases.slice(1).concat(phrases[0]);
      all.forEach((text) => {
        tl.to(el.current, { opacity: 0, y: 8, duration: 0.5, ease: "power2.out" }, `+=${interval}`)
          .add(() => {
            el.current.textContent = text;

          })
          .to(el.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
      });
    });

    return () => ctx.revert();
  }, [phrases, interval]);

  // aria-live helps screen readers announce the changes politely
  return <p ref={el} className={className} aria-live="polite" />;
};

export default RotatingSubtitle;
