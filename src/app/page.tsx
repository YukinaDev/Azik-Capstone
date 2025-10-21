import Header from "@/components/Header";
import AutoSlider from "@/components/AutoSlider";
import AboutMe from "@/components/AboutMe";
import FeaturedWorks from "@/components/FeaturedWorks";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-white">
      <div className="pointer-events-none fixed inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[url('/assets/pattern-star.png')] bg-repeat" />
      </div>

      <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-[#5EC4F0]/5 via-transparent to-[#1c215e]/5" />

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
