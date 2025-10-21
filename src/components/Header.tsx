"use client";

import { animate, stagger, set } from "animejs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About me", href: "#about" },
  { label: "Project", href: "#projects" },
  { label: "Contact me", href: "#contact" },
];

export default function Header() {
  const navRef = useRef<HTMLElement | null>(null);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isScrolled && navRef.current) {
      const navTargets = Array.from(
        navRef.current?.querySelectorAll<HTMLElement>("[data-nav-item]") ?? [],
      );

      if (navTargets.length) {
        set(navTargets, { opacity: 0, scale: 0.9 });
        animate(navTargets, {
          opacity: [0, 1],
          scale: [0.9, 1],
          delay: stagger(50),
          duration: 400,
          easing: "easeOutExpo",
        });
      }
    }
  }, [isScrolled]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <>
      <header className="fixed top-6 left-0 right-0 z-30 flex items-center justify-center px-6">
        <Link href="#home" className="absolute left-6 top-0">
          <Image
            src="/assets/logo2.png"
            alt="Azik logo"
            width={56}
            height={56}
            className="h-14 w-14 object-contain transition duration-500 hover:scale-110 drop-shadow-lg"
          />
        </Link>

        <nav
          ref={navRef}
          className={`transition-all duration-500 ${
            isScrolled
              ? "translate-y-0 opacity-100"
              : "-translate-y-32 opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex items-center gap-2 rounded-full border border-[#1c215e]/10 bg-white/95 backdrop-blur-xl px-3 py-3 shadow-[0_8px_32px_rgba(28,33,94,0.12)]">
            {navItems.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  data-nav-item
                  className={`relative px-6 py-2.5 text-sm font-medium transition-all duration-300 rounded-full font-[var(--font-wolf)] ${
                    isActive
                      ? "bg-[#5EC4F0] text-white shadow-[0_4px_16px_rgba(94,196,240,0.4)]"
                      : "text-[#1c215e]/70 hover:text-[#1c215e] hover:bg-[#5EC4F0]/10"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </header>
    </>
  );
}
