"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroScene } from "./Scenes";

const fillStyle: React.CSSProperties = {
  backgroundImage: "url(/fill.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextStroke: "2px #04508a",
};

const outlineStyle: React.CSSProperties = {
  WebkitTextStroke: "2px rgba(255,255,255,.95)",
  color: "transparent",
};

const Clouds = () => (
  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[34vh]" aria-hidden>
    {[
      "left-[-8%] bottom-[-8%] h-[22vh] w-[38%]",
      "left-[18%] bottom-[-12%] h-[26vh] w-[40%]",
      "left-[44%] bottom-[-10%] h-[24vh] w-[36%]",
      "right-[-6%] bottom-[-8%] h-[24vh] w-[40%]",
      "left-[5%] bottom-[2%] h-[12vh] w-[26%]",
      "right-[8%] bottom-[3%] h-[12vh] w-[28%]",
    ].map((c) => (
      <span key={c} className={`absolute rounded-full bg-white/90 blur-2xl ${c}`} />
    ))}
  </div>
);

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const titleOpacity = useTransform(p, [0, 0.16], [1, 0]);
  const titleY = useTransform(p, [0, 0.16], [0, -70]);
  const sceneY = useTransform(p, [0, 0.45], ["34%", "2%"]);
  const sceneScale = useTransform(p, [0, 0.5], [0.92, 1.12]);
  const sceneOpacity = useTransform(p, [0.5, 0.78], [1, 0]);
  const outlineOpacity = useTransform(p, [0.28, 0.42, 0.66, 0.8], [0, 1, 1, 0]);
  const fillOpacity = useTransform(p, [0.62, 0.84], [0, 1]);
  const whiteOpacity = useTransform(p, [0.6, 0.86], [0, 1]);
  const cloudOpacity = useTransform(p, [0.6, 0.86], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* sky */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg,#a8cbe9 0%,#c9dcec 38%,#efd9d0 72%,#f6cdb5 100%)" }}
        />
        <motion.div className="absolute inset-0 bg-white" style={{ opacity: whiteOpacity }} />

        {/* the three services, rising */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-10 mx-auto w-full max-w-[1100px] px-4"
          style={{ y: sceneY, scale: sceneScale, opacity: sceneOpacity, transformOrigin: "50% 100%" }}
        >
          <HeroScene />
        </motion.div>

        <motion.div style={{ opacity: cloudOpacity }}>
          <Clouds />
        </motion.div>

        {/* headline */}
        <motion.div
          className="absolute inset-x-0 top-[17vh] z-30 px-6 text-center"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <h1 className="mx-auto max-w-4xl text-[clamp(2.1rem,5.4vw,4.4rem)] font-extrabold leading-[1.08] tracking-tight text-[#111]">
            Digital Marketing Realty AD Media
          </h1>
          <p className="mt-4 text-lg font-medium text-steel md:text-xl">Turning views into leads and leads into sales</p>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#151515] px-8 py-4 text-base font-bold text-white transition-colors hover:bg-black"
          >
            Get Started <span aria-hidden>→</span>
          </a>
        </motion.div>

        {/* the big word: outline first, then filled with the brand image */}
        <div className="pointer-events-none absolute inset-0 z-30 grid place-items-center px-4 text-center">
          <div className="relative">
            <motion.div style={{ opacity: outlineOpacity }} aria-hidden>
              <p className="font-display text-[clamp(1.5rem,7.4vw,7rem)] leading-none" style={outlineStyle}>REALTYADMEDIA</p>
              <p className="mt-4 font-display text-[clamp(1rem,3vw,2.6rem)] tracking-[0.12em]" style={outlineStyle}>Digital Marketing</p>
            </motion.div>
            <motion.div className="absolute inset-0" style={{ opacity: fillOpacity }}>
              <p className="font-display text-[clamp(1.5rem,7.4vw,7rem)] leading-none" style={fillStyle}>REALTYADMEDIA</p>
              <p className="mt-4 font-display text-[clamp(1rem,3vw,2.6rem)] tracking-[0.12em]" style={{ ...fillStyle, backgroundPosition: "20% 70%" }}>Digital Marketing</p>
            </motion.div>
            <h2 className="sr-only">RealtyAdMedia Digital Marketing</h2>
          </div>
        </div>
      </div>
    </section>
  );
}
