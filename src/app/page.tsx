import Header from "@/components/Header";
import AutoSlider from "@/components/AutoSlider";
import AboutMe from "@/components/AboutMe";
import FeaturedWorks from "@/components/FeaturedWorks";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-neutral-950">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[url('/assets/pattern.png')] bg-repeat opacity-60" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-lime-400/10 via-transparent to-sky-500/10 mix-blend-screen" />

      <Header />

      <main className="relative z-10 flex flex-1 flex-col">
        <AutoSlider />
        <AboutMe />
        <FeaturedWorks />
        <ContactFooter />
      </main>
    </div>
  );
}
