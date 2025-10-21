import Header from "@/components/Header";
import AutoSlider from "@/components/AutoSlider";
import AboutMe from "@/components/AboutMe";
import FeaturedWorks from "@/components/FeaturedWorks";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-white">
      <div className="pointer-events-none fixed inset-0 opacity-[0.05]">
        <div className="absolute inset-0 bg-[url('/assets/pattern5.png')] bg-repeat" style={{ backgroundSize: '150px 150px' }} />
      </div>

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
