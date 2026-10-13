import { MetaScene, GoogleScene, WebScene } from "./Scenes";

const cards = [
  { title: "Meta Ads", href: "#meta-ads", note: "Facebook and Instagram", Scene: MetaScene },
  { title: "Google Ads", href: "#google-ads", note: "Search, display and video", Scene: GoogleScene },
  { title: "Web Design", href: "#web-design", note: "Websites that convert", Scene: WebScene },
];

export default function ServiceCards() {
  return (
    <section id="services" className="bg-white px-6 pb-16 pt-4 md:px-12 md:pb-24">
      <div className="mx-auto max-w-[1300px]">
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-3 text-sm font-bold uppercase tracking-[4px] text-[#151515]">Our Services</p>
          <h2 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-[#151515] md:text-5xl">
            Marketing built for every property.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {cards.map(({ title, href, note, Scene }) => (
            <a
              key={title}
              href={href}
              className="group relative block overflow-hidden rounded-[24px] shadow-sm transition hover:shadow-md"
              style={{ background: "linear-gradient(180deg,#a8cbe9 0%,#d3e0ec 55%,#f3d9cf 100%)" }}
            >
              <div className="p-6 md:p-7">
                <h3 className="text-2xl font-bold tracking-tight text-[#151515] md:text-3xl">{title}</h3>
                <p className="mt-1 text-base font-medium text-steel">{note}</p>
              </div>
              <div className="px-3 pb-16 md:pb-20">
                <Scene />
              </div>
              <span
                aria-hidden
                className="absolute bottom-6 right-6 grid h-12 w-12 place-items-center rounded-full border border-black/30 bg-white/40 text-xl text-black backdrop-blur-sm transition duration-300 group-hover:bg-black group-hover:text-white"
              >
                →
              </span>
              <span className="sr-only">Read more about {title}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
