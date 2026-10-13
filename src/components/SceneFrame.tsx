"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const SIZE = 440; // default design canvas (440 x 440); wider scenes pass their own width/height

/**
 * Wraps a 3D scene. Scales it to the available width and tilts it
 * slightly toward the pointer so the depth is easy to see.
 */
export default function SceneFrame({
  children,
  tilt = 9,
  width = SIZE,
  height = SIZE,
  maxWidth = 480,
}: {
  children: React.ReactNode;
  tilt?: number;
  width?: number;
  height?: number;
  maxWidth?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const rx = useSpring(useMotionValue(0), { stiffness: 90, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 90, damping: 18 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / width);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  const onMove = (e: React.PointerEvent) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * tilt * 2);
    rx.set(-py * tilt * 2);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="relative mx-auto w-full"
      style={{ maxWidth, aspectRatio: `${width} / ${height}` }}
      aria-hidden="true"
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width,
          height,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          perspective: 1400,
        }}
      >
        <motion.div
          className="scene-3d"
          style={{ width, height, rotateX: rx, rotateY: ry }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
