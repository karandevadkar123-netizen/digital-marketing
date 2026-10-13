"use client";

import SceneFrame from "./SceneFrame";

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

/** Flat panel floating in 3D space. */
function Float({
  className = "", style, z = 0, children,
}: {
  className?: string; style?: React.CSSProperties; z?: number; children?: React.ReactNode;
}) {
  return (
    <div
      className={`layer ${className}`}
      style={{ transform: `translateZ(${z}px)`, ...style }}
    >
      {children}
    </div>
  );
}

const card = "rounded-xl bg-white shadow-[0_18px_40px_-12px_rgba(4,80,138,.35)] ring-1 ring-black/5";

const Heart = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="#e5395a" aria-hidden>
    <path d="M12 21s-7.5-4.6-9.6-9.2C1 8.6 2.9 5 6.3 5c2 0 3.4 1.1 4.2 2.4h3C14.3 6.1 15.7 5 17.7 5c3.4 0 5.3 3.6 3.9 6.8C19.5 16.4 12 21 12 21z" />
  </svg>
);
const Search = ({ c = "#4d4e50" }: { c?: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round" aria-hidden>
    <circle cx="10.5" cy="10.5" r="6.5" /><path d="M16 16l5 5" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* META ADS — an ad on a phone, ad formats behind it                   */
/* ------------------------------------------------------------------ */

function AdArt({ h = 130 }: { h?: number }) {
  return (
    <svg viewBox="0 0 200 130" width="100%" height={h} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="adsky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9bd6fb" /><stop offset="1" stopColor="#eaf6ff" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#adsky)" />
      <rect x="22" y="40" width="44" height="90" fill="#0670b8" />
      <rect x="72" y="22" width="52" height="108" fill="#04508a" />
      <rect x="130" y="58" width="48" height="72" fill="#4d4e50" />
      <g fill="rgba(255,255,255,.55)">
        {[0, 1, 2, 3, 4].map((r) =>
          [0, 1, 2].map((c) => (
            <rect key={`${r}${c}`} x={79 + c * 15} y={30 + r * 18} width="8" height="9" />
          ))
        )}
      </g>
    </svg>
  );
}

export function PhoneUI() {
  return (
    <div className="h-[384px] w-[212px] rounded-[34px] bg-ink p-[9px] shadow-[0_30px_60px_-20px_rgba(4,80,138,.55)]">
          <div className="flex h-full flex-col overflow-hidden rounded-[26px] bg-white">
            <div className="flex items-center gap-2 px-3 pb-2 pt-5">
              <img src="/logo-mark.png" alt="" className="h-7 w-7 rounded-full bg-mist object-contain p-1" />
              <span className="leading-tight">
                <span className="block text-[11px] font-bold text-ink">Your Realty Brand</span>
                <span className="block text-[10px] text-steel">Sponsored</span>
              </span>
            </div>
            <AdArt />
            <div className="px-3 pt-2.5">
              <span className="block text-[12px] font-bold leading-snug text-ink">
                Premium 2 &amp; 3 BHK homes, ready to visit
              </span>
              <span className="mt-1.5 block h-2 w-5/6 rounded bg-mist" />
              <span className="mt-1.5 block h-2 w-2/3 rounded bg-mist" />
            </div>
            <div className="mt-auto flex items-center justify-between bg-mist px-3 py-2.5">
              <span className="text-[10px] font-semibold text-steel">yourbrand.com</span>
              <span className="whitespace-nowrap rounded-md bg-brand px-3 py-1.5 text-[11px] font-bold text-white">Learn more</span>
            </div>
          </div>
        </div>
  );
}

export function MetaScene() {
  return (
    <SceneFrame tilt={10}>
      {/* ad formats behind the phone */}
      <Float z={-60} style={{ left: 232, top: 70, transform: "translateZ(-60px) rotateY(-20deg)" }}>
        <div className={`${card} w-[170px] overflow-hidden p-2`}>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="h-20 rounded-md bg-brand" />
            <div className="h-20 rounded-md bg-steel" />
            <div className="h-20 rounded-md bg-brand-bright/70" />
            <div className="h-20 rounded-md bg-mist" />
          </div>
          <div className="mt-2 h-2 w-2/3 rounded bg-mist" />
        </div>
      </Float>

      {/* phone */}
      <Float style={{ left: 100, top: 28, transform: "translateZ(0) rotateY(-14deg) rotateX(3deg)" }}>
        <PhoneUI />
      </Float>

      {/* floating reactions, nearest the viewer */}
      <Float z={110} className="bob" style={{ left: 20, top: 118 }}>
        <div className={`${card} flex items-center gap-2 px-3 py-2`}>
          <Heart /><span className="text-xs font-bold text-ink">Loved by buyers</span>
        </div>
      </Float>
      <Float z={150} className="bob-2" style={{ left: 252, top: 250 }}>
        <div className={`${card} px-3 py-2`}>
          <span className="block text-xs font-bold text-ink">Is it still available?</span>
          <span className="block text-[11px] text-steel">New message</span>
        </div>
      </Float>
      <Float z={90} className="bob" style={{ left: 30, top: 300 }}>
        <div className="rounded-full bg-brand px-4 py-2 text-xs font-bold text-white shadow-lg">New lead</div>
      </Float>
    </SceneFrame>
  );
}

/* ------------------------------------------------------------------ */
/* GOOGLE ADS — search bar, top ad result, organic results below       */
/* ------------------------------------------------------------------ */

export function GoogleScene() {
  return (
    <SceneFrame tilt={8}>
      <div
        style={{
          position: "absolute", left: 50, top: 60, width: 340, height: 340,
          transform: "rotateX(52deg) rotateZ(-38deg)",
        }}
      >
        {/* plate */}
        <div className="layer rounded-2xl bg-mist" style={{ inset: 0, transform: "translateZ(-20px)" }} />

        {/* organic results, lowest */}
        <Float z={0} style={{ left: 20, top: 232 }}>
          <div className={`${card} w-[300px] p-3`}>
            <span className="block h-2 w-1/3 rounded bg-mist" />
            <span className="mt-2 block h-3 w-3/4 rounded bg-[#cfd4da]" />
            <span className="mt-2 block h-2 w-full rounded bg-mist" />
          </div>
        </Float>
        <Float z={14} style={{ left: 20, top: 168 }}>
          <div className={`${card} w-[300px] p-3`}>
            <span className="block h-2 w-1/4 rounded bg-mist" />
            <span className="mt-2 block h-3 w-2/3 rounded bg-[#cfd4da]" />
            <span className="mt-2 block h-2 w-5/6 rounded bg-mist" />
          </div>
        </Float>

        {/* the ad, on top of the results */}
        <Float z={52} style={{ left: 14, top: 82 }}>
          <div className={`${card} w-[312px] p-3.5 ring-2 ring-brand-bright`}>
            <span className="flex items-center gap-2">
              <span className="rounded border border-ink px-1.5 text-[10px] font-bold text-ink">Ad</span>
              <span className="text-[11px] text-steel">yourbrand.com/thane</span>
            </span>
            <span className="mt-1.5 block text-[15px] font-bold leading-tight text-brand">
              Premium 3 BHK Homes in Thane
            </span>
            <span className="mt-1 block text-[11px] leading-snug text-steel">
              Book a site visit this week. Ready possession options.
            </span>
          </div>
        </Float>

        {/* search bar, highest */}
        <Float z={96} style={{ left: 10, top: 16 }}>
          <div className={`${card} flex w-[320px] items-center gap-2.5 rounded-full px-4 py-3`}>
            <Search />
            <span className="text-[13px] font-semibold text-ink">3 bhk flat in thane</span>
          </div>
        </Float>
      </div>

      {/* location pin, floating above the stack */}
      <Float z={170} className="bob" style={{ left: 330, top: 36 }}>
        <svg viewBox="0 0 48 60" width="52" height="64" aria-hidden>
          <path d="M24 2C12.4 2 4 10.6 4 21.6 4 36 24 58 24 58s20-22 20-36.4C44 10.6 35.6 2 24 2z" fill="#0670b8" />
          <circle cx="24" cy="22" r="8" fill="#fff" />
        </svg>
      </Float>
      <Float z={130} className="bob-2" style={{ left: 10, top: 320 }}>
        <div className="rounded-full bg-brand px-4 py-2 text-xs font-bold text-white shadow-lg">Top of results</div>
      </Float>
    </SceneFrame>
  );
}

/* ------------------------------------------------------------------ */
/* WEB DESIGN — wireframe → layout → finished page, stacked in depth   */
/* ------------------------------------------------------------------ */

const Dots = () => (
  <span className="flex gap-1">
    {["#ff6b6b", "#f7c548", "#4cd08c"].map((c) => (
      <i key={c} className="block h-2 w-2 rounded-full" style={{ background: c }} />
    ))}
  </span>
);

export function WebScene() {
  return (
    <SceneFrame tilt={8}>
      <div
        style={{
          position: "absolute", left: 60, top: 70, width: 320, height: 300,
          transform: "rotateX(54deg) rotateZ(-36deg)",
        }}
      >
        <div className="layer rounded-2xl bg-mist" style={{ inset: -10, transform: "translateZ(-24px)" }} />

        {/* 1 — wireframe */}
        <Float z={0} style={{ left: 0, top: 0 }}>
          <div className="h-[260px] w-[300px] rounded-xl border-2 border-dashed border-[#aeb4bb] bg-white/80 p-3">
            <div className="h-5 w-full rounded bg-mist" />
            <div className="mt-3 h-24 w-full rounded bg-mist" />
            <div className="mt-3 grid grid-cols-3 gap-2"><i className="h-14 rounded bg-mist" /><i className="h-14 rounded bg-mist" /><i className="h-14 rounded bg-mist" /></div>
          </div>
        </Float>

        {/* 2 — layout with colour */}
        <Float z={46} style={{ left: 0, top: 0 }}>
          <div className={`${card} h-[260px] w-[300px] overflow-hidden`}>
            <div className="flex items-center justify-between bg-steel px-3 py-2"><Dots /><span className="h-2 w-16 rounded bg-white/50" /></div>
            <div className="m-3 h-24 rounded-lg bg-brand/25" />
            <div className="mx-3 grid grid-cols-3 gap-2"><i className="h-14 rounded bg-brand/15" /><i className="h-14 rounded bg-brand/15" /><i className="h-14 rounded bg-brand/15" /></div>
          </div>
        </Float>

        {/* 3 — finished page */}
        <Float z={92} style={{ left: 0, top: 0 }}>
          <div className={`${card} h-[260px] w-[300px] overflow-hidden`}>
            <div className="flex items-center justify-between border-b border-mist px-3 py-2">
              <span className="flex items-center gap-1.5"><img src="/logo-mark.png" alt="" className="h-4 w-4 object-contain" /><i className="block h-2 w-12 rounded bg-ink" /></span>
              <span className="flex gap-1.5"><i className="block h-2 w-7 rounded bg-[#cfd4da]" /><i className="block h-2 w-7 rounded bg-[#cfd4da]" /></span>
            </div>
            <div className="relative h-[104px] overflow-hidden"><AdArt h={104} />
              <span className="absolute bottom-2 left-3 rounded-md bg-brand px-2.5 py-1 text-[10px] font-bold text-white">Book a visit</span>
            </div>
            <div className="grid grid-cols-3 gap-2 p-3">
              {["bg-brand", "bg-steel", "bg-brand-bright"].map((c) => (
                <span key={c} className="block">
                  <i className={`block h-12 rounded ${c}`} />
                  <i className="mt-1.5 block h-1.5 w-4/5 rounded bg-[#cfd4da]" />
                </span>
              ))}
            </div>
          </div>
        </Float>
      </div>

      {/* design tokens + cursor float above */}
      <Float z={170} className="bob" style={{ left: 10, top: 300 }}>
        <div className={`${card} flex gap-1.5 p-2.5`}>
          {["#0670b8", "#0a8ae0", "#4d4e50", "#eef2f6"].map((c) => (
            <i key={c} className="block h-6 w-6 rounded-full ring-1 ring-black/10" style={{ background: c }} />
          ))}
        </div>
      </Float>
      <Float z={200} className="bob-2" style={{ left: 300, top: 150 }}>
        <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden>
          <path d="M4 2l16 9-7 2-3 7z" fill="#17212b" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </Float>
    </SceneFrame>
  );
}

/* ------------------------------------------------------------------ */
/* HERO — the three services together, rising out of the clouds        */
/* ------------------------------------------------------------------ */

export function HeroScene() {
  return (
    <SceneFrame width={900} height={440} tilt={5} maxWidth={1000}>
      {/* Google ad, left */}
      <Float style={{ left: 40, top: 120, transform: "translateZ(50px) rotateY(24deg)" }}>
        <div className={`${card} w-[280px] p-3`}>
          <span className={`${card} mb-3 flex items-center gap-2.5 rounded-full px-3.5 py-2.5 shadow-none`}>
            <Search />
            <span className="text-[13px] font-semibold text-ink">3 bhk flat in thane</span>
          </span>
          <span className="flex items-center gap-2 px-1">
            <span className="rounded border border-ink px-1.5 text-[10px] font-bold text-ink">Ad</span>
            <span className="text-[11px] text-steel">yourbrand.com/thane</span>
          </span>
          <span className="mt-1.5 block px-1 text-[15px] font-bold leading-tight text-brand">Premium 3 BHK Homes in Thane</span>
          <span className="mt-1 block px-1 text-[11px] leading-snug text-steel">Book a site visit this week.</span>
        </div>
      </Float>

      {/* Meta ad on a phone, centre */}
      <Float style={{ left: 344, top: 20, transform: "translateZ(0)" }}>
        <PhoneUI />
      </Float>

      {/* website, right */}
      <Float style={{ left: 590, top: 100, transform: "translateZ(50px) rotateY(-24deg)" }}>
        <div className={`${card} h-[236px] w-[270px] overflow-hidden`}>
          <div className="flex items-center justify-between border-b border-mist px-3 py-2">
            <Dots />
            <span className="flex gap-1.5"><i className="block h-2 w-7 rounded bg-[#cfd4da]" /><i className="block h-2 w-7 rounded bg-[#cfd4da]" /></span>
          </div>
          <div className="relative h-[100px] overflow-hidden"><AdArt h={100} />
            <span className="absolute bottom-2 left-3 rounded-md bg-brand px-2.5 py-1 text-[10px] font-bold text-white">Book a visit</span>
          </div>
          <div className="grid grid-cols-3 gap-2 p-3">
            {["bg-brand", "bg-steel", "bg-brand-bright"].map((c) => (
              <span key={c} className="block"><i className={`block h-12 rounded ${c}`} /><i className="mt-1.5 block h-1.5 w-4/5 rounded bg-[#cfd4da]" /></span>
            ))}
          </div>
        </div>
      </Float>

      <Float z={120} className="bob" style={{ left: 270, top: 70 }}>
        <div className="rounded-full bg-brand px-4 py-2 text-xs font-bold text-white shadow-lg">New lead</div>
      </Float>
      <Float z={140} className="bob-2" style={{ left: 575, top: 40 }}>
        <div className={`${card} flex items-center gap-2 px-3 py-2`}><Heart /><span className="text-xs font-bold text-ink">Loved by buyers</span></div>
      </Float>
    </SceneFrame>
  );
}
