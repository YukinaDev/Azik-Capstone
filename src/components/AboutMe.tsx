"use client";

import { animate } from "animejs";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const aboutCards = [
  {
    id: "welcome",
    title: "Welcome!",
    subtitle: "I'm a Graphic Designer",
    description:
      "My name is Vũ Đức Trung, but you can call me Azik. I create visual stories that blend creativity with strategic thinking.",
    image: "/assets/myavatar2.png",
  },
  {
    id: "location",
    title: "Based in Hanoi",
    subtitle: "Hanoi, Vietnam",
    description:
      "Hà Nội - the vibrant capital of Vietnam, where thousand-year-old heritage meets modern creative energy. This city inspires my work with its perfect balance of tradition and innovation.",
    image: "/assets/t11-2.jpg",
  },
  {
    id: "about",
    title: "About Azik",
    subtitle: "Designer & Creative",
    description:
      "A multidisciplinary designer passionate about crafting meaningful visual experiences. I specialize in branding, packaging design, and creative direction.",
    image: "/assets/myavatar3.png",
  },
];

export default function AboutMe() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && cardsContainerRef.current) {
            const cards = cardsContainerRef.current.querySelectorAll("[data-card]");
            animate(cards, {
              opacity: [0, 1],
              translateY: [60, 0],
              duration: 800,
              delay: (_el: unknown, i: number) => i * 150,
              easing: "easeOutExpo",
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
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 px-6 md:px-14 lg:px-24"
    >
      <div className="mb-16">
        <h2 className="font-[var(--font-wolf)] text-5xl md:text-6xl text-[#1c215e] mb-4">
          About me
        </h2>
        <p className="text-lg text-[#1c215e]/60 max-w-2xl">
          Hover on the cards to explore my journey
        </p>
      </div>

      <div 
        ref={cardsContainerRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        {aboutCards.map((card, index) => {
          const isHovered = hoveredCard === index;

          return (
            <div
              key={card.id}
              data-card
              className="relative h-[500px] cursor-pointer opacity-0 group"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`relative w-full h-full bg-white border-2 border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.15)] hover:border-[#5EC4F0]/50 transition-all duration-500 rounded-3xl overflow-hidden ${isHovered ? 'scale-105' : 'scale-100'}`}>
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
                
                {/* Dark overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-60'}`} />
                
                {/* Text content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  {/* Title - shown when not hovered */}
                  <div className={`transition-all duration-500 ${isHovered ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                    <p className="text-xs uppercase tracking-[0.3em] font-[var(--font-wolf)] text-white">
                      {card.title}
                    </p>
                  </div>

                  {/* Description - shown when hovered */}
                  <div className={`absolute inset-0 p-8 flex flex-col justify-center transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/80 font-[var(--font-wolf)] mb-3">
                      {card.title}
                    </p>
                    <h3 className="font-[var(--font-wolf)] text-3xl text-white mb-4">
                      {card.subtitle}
                    </h3>
                    <p className="text-base text-white/90 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
