import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import StatsSection from "@/components/StatsSection";
import ServiceCards from "@/components/ServiceCards";
import Services from "@/components/Services";
import Locations from "@/components/Locations";
import EnquiryForm from "@/components/EnquiryForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <StatsSection />
      <ServiceCards />
      <Services />
      <Locations />

      <section id="contact" className="relative bg-mist py-16 md:py-24">
        <div className="mx-auto grid max-w-[1300px] gap-12 px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[4px] text-brand">Enquiry</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-[#151515] md:text-5xl">
              Tell us about your property.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-steel">
              Share a few details and our team will contact you with a plan to turn views into leads and leads into
              sales.
            </p>
          </div>
          <EnquiryForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
