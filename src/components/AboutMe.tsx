"use client";

import { animate } from "animejs";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function AboutMe() {
  const [isRevealed, setIsRevealed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isRevealed) {
            animate(entry.target, {
              opacity: [0, 1],
              translateY: [60, 0],
              duration: 800,
              easing: "easeOutCirc",
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isRevealed]);

  const handleReveal = () => {
    if (!isRevealed && contentRef.current) {
      setIsRevealed(true);
      
      const elements = contentRef.current.querySelectorAll("[data-reveal]");
      animate(elements, {
        opacity: [0, 1],
        translateY: [30, 0],
        rotateX: [-15, 0],
        duration: 600,
        delay: (el, i) => i * 100,
        easing: "easeOutExpo",
      });
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex items-center px-6 py-24 md:px-14 lg:px-24"
      onMouseEnter={handleReveal}
    >
      <div className="w-full grid gap-16 lg:grid-cols-2 items-center">
        <div className="relative">
          <div className="absolute -inset-8 rounded-[3rem] border border-white/10 bg-white/5 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/10">
            <Image
              src="/assets/myavatar.png"
              alt="Azik - Vũ Đức Trung"
              width={600}
              height={800}
              className="w-full h-auto object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
          </div>
        </div>

        <div ref={contentRef} className="space-y-8">
          <div data-reveal>
            <h2 className="font-[var(--font-wolf)] text-5xl md:text-6xl text-white mb-6">
              About me
            </h2>
            <div
              className={`space-y-6 text-lg text-white/70 transition-opacity duration-500 ${
                isRevealed ? "opacity-100" : "opacity-0"
              }`}
            >
              <div data-reveal className="space-y-4">
                <p className="text-2xl text-lime-200 font-[var(--font-wolf)]">
                  Welcome! I&apos;m a Graphic Designer
                </p>
                <p>
                  My name is <span className="text-white font-semibold">Vũ Đức Trung</span>, 
                  but you can call me <span className="text-lime-200 font-semibold">Azik</span>.
                  I create visual stories that blend creativity with strategic thinking.
                </p>
              </div>

              <div data-reveal className="space-y-2">
                <h3 className="text-xl text-white font-[var(--font-wolf)]">
                  📍 Based in Hanoi
                </h3>
                <p className="text-white/60">
                  Hà Nội - the vibrant capital of Vietnam, where thousand-year-old heritage 
                  meets modern creative energy. This city inspires my work with its perfect 
                  balance of tradition and innovation.
                </p>
              </div>

              <div data-reveal className="space-y-2">
                <h3 className="text-xl text-white font-[var(--font-wolf)]">
                  About Azik
                </h3>
                <p className="text-white/60">
                  [Phần này cứ ghi tạm, tôi sẽ chỉnh sau] - A multidisciplinary designer 
                  passionate about crafting meaningful visual experiences. I specialize in 
                  branding, packaging design, and creative direction. Every project is an 
                  opportunity to tell a unique story through design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isRevealed && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-white/40 text-sm uppercase tracking-[0.3em] font-[var(--font-wolf)]">
            Hover to reveal
          </p>
        </div>
      )}
    </section>
  );
}
