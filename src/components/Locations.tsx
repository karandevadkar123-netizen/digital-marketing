const india = ["Navi Mumbai", "Thane", "Pune"];
const abroad = [
  "UAE", "Oman", "Qatar", "Saudi Arabia", "Kuwait", "Singapore",
  "Kenya", "USA", "UK", "Canada", "Australia",
];

export default function Locations() {
  return (
    <section id="locations" className="bg-white px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-[1300px] rounded-[32px] bg-ink p-8 text-white md:p-14">
        <p className="text-sm font-bold uppercase tracking-[4px] text-brand-bright">Locations</p>
        <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">Locations we market in</h2>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h3 className="text-xl font-bold text-brand-bright">India</h3>
            <ol className="mt-5 divide-y divide-white/15 border-y border-white/15">
              {india.map((c, i) => (
                <li key={c} className="flex items-baseline gap-5 py-5">
                  <span className="w-7 text-base font-bold text-white/50">{i + 1}.</span>
                  <span className="text-2xl font-bold md:text-3xl">{c}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="text-xl font-bold text-brand-bright">Outside India</h3>
            <ol className="mt-5 grid grid-cols-1 gap-x-10 border-t border-white/15 sm:grid-cols-2">
              {abroad.map((c, i) => (
                <li key={c} className="flex items-baseline gap-4 border-b border-white/15 py-3.5">
                  <span className="w-7 text-base font-bold text-white/50">{i + 1}.</span>
                  <span className="text-lg font-semibold">{c}</span>
                </li>
              ))}
              <li className="flex items-baseline gap-4 border-b border-white/15 py-3.5 text-white/70 sm:col-span-2">
                <span className="w-7" />
                <span className="text-lg font-semibold">and more, on request</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
