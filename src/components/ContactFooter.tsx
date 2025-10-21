"use client";

import { animate } from "animejs";
import { useEffect, useRef } from "react";

const socialLinks = [
  {
    name: "Instagram",
    handle: "@azik.visual",
    href: "https://www.instagram.com/azik.visual",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
      </svg>
    ),
  },
  {
    name: "Behance",
    handle: "behance.net/azikdesign",
    href: "https://www.behance.net/azikdesign",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.61.165-1.252.254-1.91.254H0V4.51h6.938v-.007zM16.94 16.665c.44.428 1.073.643 1.894.643.59 0 1.1-.148 1.53-.447.424-.29.68-.61.78-.94h2.588c-.403 1.28-1.048 2.2-1.9 2.75-.85.56-1.884.83-3.08.83-.837 0-1.584-.13-2.272-.4-.673-.27-1.24-.65-1.686-1.14-.445-.49-.78-1.08-1.005-1.77-.225-.69-.34-1.47-.34-2.32 0-.803.12-1.54.357-2.2.24-.66.58-1.24 1.03-1.74.448-.48.99-.86 1.628-1.14.64-.28 1.35-.42 2.138-.42.86 0 1.598.16 2.24.48.627.32 1.14.74 1.55 1.26.404.52.705 1.12.902 1.79.196.66.29 1.35.29 2.05v.67H15.03c.03.84.29 1.52.74 1.95l-.02.03zm-2.21-6.95c-.37.37-.78.65-1.34.81-.27.08-.57.12-.92.12-.56 0-1.04-.14-1.44-.42-.4-.284-.71-.67-.93-1.16H6.938V9.558h3.165c.25-.48.565-.864.94-1.155.37-.287.86-.433 1.44-.433.35 0 .65.04.92.124.56.16.97.44 1.34.81.37.36.62.84.75 1.4.13.55.19 1.16.19 1.81s-.06 1.26-.19 1.81c-.13.56-.38 1.05-.75 1.42z"/>
      </svg>
    ),
  },
  {
    name: "X (Twitter)",
    handle: "@azikdesign",
    href: "https://x.com/azikdesign",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

export default function ContactFooter() {
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll("[data-contact-item]");
            animate(elements, {
              opacity: [0, 1],
              translateY: [40, 0],
              duration: 600,
              delay: (el, i) => i * 100,
              easing: "easeOutExpo",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        id="contact"
        ref={contactRef}
        className="relative px-6 py-24 md:px-14 lg:px-24"
      >
        <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-[#1c215e]/10 bg-white shadow-[0_16px_64px_rgba(28,33,94,0.12)] px-8 py-16 md:p-20">
          <div className="absolute -left-20 top-1/2 hidden h-40 w-40 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[#5EC4F0]/20 to-[#5EC4F0]/10 blur-3xl md:block" />
          <div className="absolute -right-14 -bottom-14 h-52 w-52 rounded-full bg-gradient-to-tr from-[#1c215e]/10 to-[#5EC4F0]/20 blur-3xl" />
          
          <div className="relative space-y-12">
            <div data-contact-item className="space-y-6">
              <p className="text-xs uppercase tracking-[0.4em] text-[#5EC4F0] font-[var(--font-wolf)]">
                Let&apos;s work together
              </p>
              <h2 className="font-[var(--font-wolf)] text-4xl md:text-5xl lg:text-6xl text-[#1c215e] max-w-3xl">
                Ready to bring your vision to life?
              </h2>
              <p className="text-lg text-[#1c215e]/70 max-w-2xl">
                Whether you need branding, packaging design, or creative direction, 
                let&apos;s create something extraordinary together.
              </p>
            </div>

            <div data-contact-item className="flex flex-wrap gap-4">
              <a
                href="mailto:hello@azik.design"
                className="inline-flex items-center gap-3 rounded-full bg-[#5EC4F0] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#1c215e] hover:shadow-[0_8px_32px_rgba(28,33,94,0.3)] font-[var(--font-wolf)]"
              >
                hello@azik.design
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </a>
              <a
                href="tel:+84123456789"
                className="inline-flex items-center gap-3 rounded-full border-2 border-[#1c215e]/20 px-8 py-4 text-sm font-semibold text-[#1c215e] transition hover:border-[#5EC4F0] hover:bg-[#5EC4F0]/10 font-[var(--font-wolf)]"
              >
                +84 123 456 789
              </a>
            </div>

            <div className="grid gap-6 md:grid-cols-3" data-contact-item>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-2xl border-2 border-[#1c215e]/10 bg-white shadow-[0_4px_16px_rgba(28,33,94,0.06)] p-6 transition hover:border-[#5EC4F0] hover:shadow-[0_8px_24px_rgba(94,196,240,0.15)]"
                >
                  <div className="mb-4 text-[#1c215e]/40 transition-colors group-hover:text-[#5EC4F0]">
                    {social.icon}
                  </div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#5EC4F0] font-[var(--font-wolf)]">
                    {social.name}
                  </p>
                  <p className="mt-2 text-lg text-[#1c215e] font-[var(--font-wolf)]">
                    {social.handle}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 flex flex-col gap-4 border-t-2 border-[#1c215e]/10 px-6 py-8 text-center text-xs uppercase tracking-[0.3em] text-[#1c215e]/40 md:flex-row md:items-center md:justify-between md:px-14 font-[var(--font-wolf)]">
        <p>© {new Date().getFullYear()} Azik Studio. All rights reserved.</p>
        <p className="text-[#1c215e]/30">
          Designed & Developed with ❤️ in Hanoi
        </p>
      </footer>
    </>
  );
}
