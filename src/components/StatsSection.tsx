"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

const stats = [
  { value: 1, label: "Year of experience" },
  { value: 15, label: "Total completed projects" },
  { value: 6, label: "Ongoing projects" },
  { value: 21, label: "Happy customers" },
];

const expertise = ["Brandshark SEO", "Web Design", "Digital Marketing"];

function Count({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
    const controls = animate(0, to, { duration: 1, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} aria-label={String(to)}>
      {n}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="bg-white px-6 pb-16 md:px-12 md:pb-24">
      <div
        className="relative mx-auto max-w-[1300px] overflow-hidden rounded-[32px] px-8 py-10 text-white md:px-14 md:py-14"
        style={{
          backgroundImage: "linear-gradient(rgba(10,14,20,.74),rgba(10,14,20,.82)), url(/fill.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <p className="text-sm font-bold uppercase tracking-[4px] text-white/70">RealtyAdMedia by the numbers</p>

        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dd className="text-5xl font-light tracking-tight md:text-6xl">
                <Count to={s.value} />
              </dd>
              <span className="my-3 block h-px w-14 bg-white/60" />
              <dt className="text-base text-white/80 md:text-lg">{s.label}</dt>
            </div>
          ))}
        </dl>

        <ul className="mt-12 flex flex-wrap gap-3 border-t border-white/15 pt-8">
          {expertise.map((e) => (
            <li key={e} className="rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-base font-semibold backdrop-blur-sm">
              {e}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
