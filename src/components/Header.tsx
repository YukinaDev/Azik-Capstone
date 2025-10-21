"use client";

import { animate, stagger, set } from "animejs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About me", href: "#about" },
  { label: "Project", href: "#projects" },
  { label: "Contact me", href: "#contact" },
];

export default function Header() {
  const navRef = useRef<HTMLElement | null>(null);

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

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-neutral-950/70 px-6 py-6 backdrop-blur-xl md:px-14"
    >
      <Link
        href="#home"
        className="group flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-white/80 transition hover:text-white font-[var(--font-wolf)]"
        data-nav-item
      >
        <span className="relative flex h-10 w-10 items-center justify-center">
          <Image
            src="/assets/logo2.png"
            alt="Azik studio logo"
            width={80}
            height={80}
            className="h-10 w-10 object-contain opacity-80 transition duration-500 group-hover:scale-110 group-hover:opacity-100"
          />
        </span>
        Azik Studio
      </Link>
      <nav className="hidden gap-10 text-sm font-medium text-white/70 md:flex font-[var(--font-wolf)]">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="relative overflow-hidden"
            data-nav-item
          >
            <span className="inline-block transition duration-300 hover:text-white">
              {item.label}
            </span>
            <span className="absolute inset-x-0 bottom-0 h-px translate-y-2 bg-gradient-to-r from-transparent via-lime-300 to-transparent opacity-0 transition duration-300 hover:translate-y-0 hover:opacity-100" />
          </Link>
        ))}
      </nav>
      <a
        href="#contact"
        className="group flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-[0.2em] text-white/80 transition hover:border-lime-200/70 hover:text-white font-[var(--font-wolf)]"
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
