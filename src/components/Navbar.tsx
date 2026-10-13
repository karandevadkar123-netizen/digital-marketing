"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";

const links = [
  { name: "Home", href: "#top" },
  { name: "About Us", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Locations", href: "#locations" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 150 && !open);
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      animate={hidden ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      aria-label="Main"
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-black/5 bg-white/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:h-20 md:px-10">
        <a href="#top" className="flex items-center gap-3">
          <img src="/logo-mark.png" alt="" className="h-9 w-auto md:h-11" />
          <span className="font-display text-[12px] leading-[1.05] text-brand md:text-[14px]">
            REALTY<br />AD MEDIA
          </span>
        </a>

        <div className="hidden items-center gap-1 rounded-full border border-black/5 bg-black/[0.05] p-1.5 backdrop-blur-sm md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider text-gray-700 transition-all hover:bg-white hover:text-black hover:shadow-sm"
            >
              {l.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="rounded-full bg-[#151515] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-black"
          >
            Enquiry
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-black/5 md:hidden"
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 top-0 h-0.5 w-5 bg-black transition ${open ? "top-[5px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[5px] h-0.5 w-5 bg-black transition ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 top-[10px] h-0.5 w-5 bg-black transition ${open ? "top-[5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-black/5 bg-white/95 md:hidden"
          >
            <div className="flex flex-col items-center gap-6 py-8 text-sm font-semibold uppercase tracking-wider text-gray-800">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.name}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
