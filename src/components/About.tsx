const Cloud = ({ c }: { c: string }) => <span className={`absolute rounded-full bg-white/90 blur-2xl ${c}`} />;

export default function About() {
  return (
    <section id="about" className="bg-white px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto grid max-w-[1300px] items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        {/* rounded brand card, like the photo card in the example */}
        <div
          className="relative aspect-[4/3.6] overflow-hidden rounded-[28px]"
          style={{ background: "linear-gradient(180deg,#a8cbe9 0%,#d3e0ec 45%,#f3d3c3 100%)" }}
        >
          <Cloud c="-left-10 -bottom-10 h-40 w-[55%]" />
          <Cloud c="left-[30%] -bottom-14 h-44 w-[55%]" />
          <Cloud c="-right-10 -bottom-8 h-40 w-[50%]" />
          <div className="absolute inset-x-0 top-[10%] flex justify-center">
            <img src="/logo-mark.png" alt="RealtyAdMedia logo" className="bob h-[250px] w-auto drop-shadow-xl md:h-[290px]" />
          </div>
          {["Meta Ads", "Google Ads", "Web Design"].map((t, i) => (
            <span
              key={t}
              className={`${i === 1 ? "bob-2" : "bob"} absolute rounded-full bg-white px-4 py-2 text-xs font-bold text-ink shadow-lg ${
                ["left-5 top-8", "right-5 top-[38%]", "left-8 bottom-[22%]"][i]
              }`}
            >
              {t}
            </span>
          ))}
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[4px] text-brand">About Us</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-[#151515] md:text-5xl">
            Every property has a story to tell.
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-steel">
            <p>
              At RealtyAdMedia, we specialize in elevating real estate marketing to new heights. As a dynamic startup,
              we&rsquo;re passionate about harnessing the latest digital strategies to help your property stand out in a
              competitive market.
            </p>
            <p>
              At RealtyAdMedia, we understand that every property has a story to tell. Our creative team works closely
              with you to showcase your unique offerings, turning views into leads and leads into sales. With a focus on
              innovation and personalized service, we&rsquo;re here to help you thrive in the real estate market.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
