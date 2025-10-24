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
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      const menuItems = Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>("[data-menu-item]") ?? [],
      );

      if (menuItems.length) {
        set(menuItems, { opacity: 0, translateX: 20 });
        animate(menuItems, {
          opacity: [0, 1],
          translateX: [20, 0],
          delay: stagger(50),
          duration: 400,
          easing: "easeOutExpo",
        });
      }
    }
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed top-6 left-0 right-0 z-30 flex items-center justify-between px-6">
        <Link href="#home" className="z-40">
          <Image
            src={activeSection === "home" ? "/assets/logo2.png" : "/assets/logo.png"}
            alt="Azik logo"
            width={56}
            height={56}
            className="h-14 w-14 object-contain transition duration-500 hover:scale-110 drop-shadow-lg"
          />
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="z-40 transition duration-500 hover:scale-110"
        >
          <Image
            src={activeSection === "home" && !isMenuOpen ? "/assets/pattern-smile.png" : "/assets/pattern-smile-2.png"}
            alt="Menu icon"
            width={56}
            height={56}
            className="h-14 w-14 object-contain drop-shadow-lg"
          />
        </button>
      </header>

      {/* Vertical Dropdown Menu */}
      <div
        className={`fixed top-0 right-0 z-20 h-screen w-64 bg-white/95 backdrop-blur-xl shadow-[-8px_0_32px_rgba(28,33,94,0.12)] rounded-l-3xl transition-transform duration-500 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div ref={menuRef} className="flex flex-col pt-32 px-8">
          {navItems.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <Link
                key={item.label}
                href={item.href}
                data-menu-item
                style={{ fontFamily: 'var(--font-wolf)' }}
                className={`relative py-4 px-6 text-lg font-medium transition-all duration-300 rounded-2xl mb-2 ${
                  isActive
                    ? "bg-[#5EC4F0] text-white shadow-[0_4px_16px_rgba(94,196,240,0.4)]"
                    : "text-[#1c215e]/70 hover:text-[#1c215e] hover:bg-[#5EC4F0]/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10 transition-opacity duration-500"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
