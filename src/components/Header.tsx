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

  useEffect(() => {
    const navTargets = Array.from(
      navRef.current?.querySelectorAll<HTMLElement>("[data-nav-item]") ?? [],
    );

    if (navTargets.length) {
      set(navTargets, { opacity: 0, translateY: -16 });
      animate(navTargets, {
        opacity: [0, 1],
        translateY: [-16, 0],
        delay: stagger(80),
        duration: 700,
        easing: "easeOutExpo",
      });
    }
  }, []);

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
    <header
      ref={navRef}
      className="sticky top-0 z-30 flex items-center justify-between border-b border-[#5EC4F0]/20 bg-[#1c215e]/90 px-6 py-4 backdrop-blur-xl md:px-14"
    >
      <Link
        href="#home"
        className="group flex items-center transition"
        data-nav-item
      >
        <span className="relative flex h-12 w-12 items-center justify-center">
          <Image
            src="/assets/logo2.png"
            alt="Azik logo"
            width={48}
            height={48}
            className="h-12 w-12 object-contain transition duration-500 group-hover:scale-110"
          />
        </span>
      </Link>

      <nav
        className="hidden md:flex items-center gap-2 rounded-full border border-[#5EC4F0]/30 bg-[#1c215e]/60 px-2 py-2 backdrop-blur-md"
        data-nav-item
      >
        {navItems.map((item) => {
          const sectionId = item.href.replace("#", "");
          const isActive = activeSection === sectionId;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative px-5 py-2 text-sm font-medium transition-all duration-300 rounded-full font-[var(--font-wolf)] ${
                isActive
                  ? "bg-[#5EC4F0] text-[#1c215e] shadow-[0_0_20px_rgba(94,196,240,0.5)]"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <a
        href="#contact"
        className="group flex items-center gap-2 rounded-full border border-[#5EC4F0]/40 bg-[#5EC4F0]/10 px-5 py-2 text-xs uppercase tracking-[0.2em] text-[#5EC4F0] transition hover:bg-[#5EC4F0] hover:text-[#1c215e] hover:shadow-[0_0_20px_rgba(94,196,240,0.4)] font-[var(--font-wolf)]"
        data-nav-item
      >
        Contact
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        >
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </svg>
      </a>
    </header>
  );
}
