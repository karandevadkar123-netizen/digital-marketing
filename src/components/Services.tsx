import { MetaScene, GoogleScene, WebScene } from "./Scenes";

const services = [
  {
    id: "meta-ads",
    title: "Meta Ads",
    question: "What are Meta Ads?",
    body: "Powerful advertising solutions on Facebook and Instagram.",
    points: [
      { h: "Reach over 2.8 billion users worldwide", p: "Put your property in front of buyers where they already spend their time." },
      { h: "Precise audience targeting", p: "Target by demographics, interests, and behaviors." },
      { h: "Diverse ad formats", p: "From image and video ads to carousel and collection ads, there\u2019s an option for every message." },
    ],
    Scene: MetaScene,
  },
  {
    id: "google-ads",
    title: "Google Ads",
    question: "What are Google Ads?",
    body: "A powerful online advertising platform that helps businesses reach potential customers through search, display, and video ads.",
    points: [
      { h: "Targeted visibility", p: "Appear at the top of search results when users are actively seeking your services." },
      { h: "Diverse ad formats", p: "Utilize search ads, display ads, shopping ads, and video ads to engage users across multiple platforms." },
    ],
    Scene: GoogleScene,
  },
  {
    id: "web-design",
    title: "Web Design",
    question: "",
    body: "Your website is often the first impression potential customers have of your business. Our web design services focus on creating visually appealing, user friendly, and responsive websites that reflect your brand and engage your audience.",
    points: [
      { h: "Functionality and aesthetics", p: "We make sure your website not only looks great but also provides a seamless user experience." },
      { h: "Built to convert", p: "Our goal is to convert visitors into customers through effective design and intuitive navigation." },
    ],
    Scene: WebScene,
  },
];

export default function Services() {
  return (
    <div>
      {services.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          className={i % 2 === 0 ? "bg-mist py-16 md:py-24" : "bg-white py-16 md:py-24"}
        >
          <div
            className={`mx-auto grid max-w-[1280px] items-center gap-12 px-6 md:px-10 lg:grid-cols-2 lg:gap-20 ${
              i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div>
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#151515] md:text-5xl">{s.title}</h2>
              {s.question && <p className="mt-5 text-xl font-bold text-brand">{s.question}</p>}
              <p className={`${s.question ? "mt-2" : "mt-5"} max-w-xl text-lg leading-relaxed text-steel`}>{s.body}</p>

              <dl className="mt-8 space-y-5 border-l-4 border-brand pl-6">
                {s.points.map((pt) => (
                  <div key={pt.h}>
                    <dt className="text-base font-bold text-ink">{pt.h}</dt>
                    <dd className="mt-0.5 max-w-lg text-base leading-relaxed text-steel">{pt.p}</dd>
                  </div>
                ))}
              </dl>

              <a href="#contact" className="mt-9 inline-block rounded-full bg-[#151515] px-7 py-3.5 font-bold text-white transition-colors hover:bg-black">
                Start with {s.title} <span aria-hidden>→</span>
              </a>
            </div>

            <s.Scene />
          </div>
        </section>
      ))}
    </div>
  );
}
