import Header from "@/components/Header";
import AutoSlider from "@/components/AutoSlider";
import AboutMe from "@/components/AboutMe";
import FeaturedWorks from "@/components/FeaturedWorks";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#0a0e27]">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('/assets/pattern.png')] bg-repeat opacity-50" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#5EC4F0]/15 via-[#1c215e]/5 to-[#5EC4F0]/10 mix-blend-screen" />

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
