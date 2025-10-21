"use client";

import { animate } from "animejs";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const aboutCards = [
  {
    id: "welcome",
    title: "Welcome!",
    icon: "👋",
    content: {
      heading: "I'm a Graphic Designer",
      description:
        "My name is Vũ Đức Trung, but you can call me Azik. I create visual stories that blend creativity with strategic thinking.",
      image: "/assets/myavatar2.png",
    },
  },
  {
    id: "location",
    title: "Based in Hanoi",
    icon: "📍",
    content: {
      heading: "Hanoi, Vietnam",
      description:
        "Hà Nội - the vibrant capital of Vietnam, where thousand-year-old heritage meets modern creative energy. This city inspires my work with its perfect balance of tradition and innovation.",
      image: "/assets/myavatar2.png",
    },
  },
  {
    id: "about",
    title: "About Azik",
    icon: "✨",
    content: {
      heading: "Designer & Creative",
      description:
        "A multidisciplinary designer passionate about crafting meaningful visual experiences. I specialize in branding, packaging design, and creative direction. Every project is an opportunity to tell a unique story through design.",
      image: "/assets/myavatar2.png",
    },
  },
];

export default function AboutMe() {
  const [activeCard, setActiveCard] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = cardsRef.current.filter(Boolean);
            if (cards.length) {
              animate(cards, {
                opacity: [0, 1],
                translateY: [60, 0],
                rotateZ: (_el: unknown, i: number) => [i === 0 ? -8 : i === 1 ? 0 : 8, i === 0 ? -5 : i === 1 ? 0 : 5],
                duration: 800,
                delay: (_el: unknown, i: number) => i * 150,
                easing: "easeOutExpo",
              });
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll("[data-content]");
      animate(elements, {
        opacity: [0, 1],
        translateX: [40, 0],
        duration: 600,
        delay: (_el: unknown, i: number) => i * 100,
        easing: "easeOutExpo",
      });
    }
  }, [activeCard]);

  const handleCardClick = (index: number) => {
    setActiveCard(index);
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex items-center px-6 py-24 md:px-14 lg:px-24"
    >
      <div className="w-full">
        <h2 className="font-[var(--font-wolf)] text-5xl md:text-6xl text-white mb-16 text-center">
          About me
        </h2>

        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] items-center">
          <div className="relative flex items-center justify-center h-[400px] lg:h-[500px]">
            <div className="relative w-full max-w-[350px]">
              {aboutCards.map((card, index) => {
                const offset = (index - 1) * 30;
                const rotation = index === 0 ? -5 : index === 1 ? 0 : 5;
                const isActive = activeCard === index;

                return (
                  <button
                    key={card.id}
                    ref={(el) => {
                      cardsRef.current[index] = el;
                    }}
                    onClick={() => handleCardClick(index)}
                    className={`absolute left-1/2 top-1/2 w-[280px] h-[360px] rounded-3xl border-2 transition-all duration-500 cursor-pointer ${
                      isActive
                        ? "border-[#5EC4F0] bg-gradient-to-br from-[#5EC4F0]/20 to-[#1c215e]/40 shadow-[0_0_40px_rgba(94,196,240,0.5)] z-20 scale-110"
                        : "border-white/20 bg-white/5 hover:border-[#5EC4F0]/50 z-10"
                    }`}
                    style={{
                      transform: `translate(-50%, -50%) translateX(${offset}px) rotate(${rotation}deg)`,
                      opacity: 0,
                    }}
                  >
                    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                      <div className="text-6xl mb-4">{card.icon}</div>
                      <h3 className="font-[var(--font-wolf)] text-2xl text-white">
                        {card.title}
                      </h3>
                      {isActive && (
                        <div className="mt-3 text-[#5EC4F0] text-sm uppercase tracking-[0.2em]">
                          Active
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div ref={contentRef} className="space-y-8">
            <div data-content className="overflow-hidden rounded-3xl border border-[#5EC4F0]/20 bg-gradient-to-br from-[#1c215e]/60 to-[#1c215e]/40 backdrop-blur-xl">
              <div className="relative h-[300px] overflow-hidden">
                <Image
                  src={aboutCards[activeCard].content.image}
                  alt={aboutCards[activeCard].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c215e] via-[#1c215e]/50 to-transparent" />
              </div>

              <div className="p-8 space-y-4">
                <h3
                  data-content
                  className="font-[var(--font-wolf)] text-3xl md:text-4xl text-[#5EC4F0]"
                >
                  {aboutCards[activeCard].content.heading}
                </h3>
                <p data-content className="text-lg text-white/80 leading-relaxed">
                  {aboutCards[activeCard].content.description}
                </p>
              </div>
            </div>

            <div data-content className="flex items-center gap-4 text-sm text-white/60">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#5EC4F0] animate-pulse" />
                Click on cards to explore
              </span>
              <span>•</span>
              <span>{activeCard + 1} / {aboutCards.length}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
