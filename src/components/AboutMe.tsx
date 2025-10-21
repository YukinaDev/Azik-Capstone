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
    overlay: "bg-gradient-to-t from-[#5EC4F0]/70 via-[#5EC4F0]/30 to-transparent",
  },
  {
    id: "location",
    title: "Based in Hanoi",
    subtitle: "Hanoi, Vietnam",
    description:
      "Hà Nội - the vibrant capital of Vietnam, where thousand-year-old heritage meets modern creative energy. This city inspires my work with its perfect balance of tradition and innovation.",
    image: "/assets/t11-2.jpg",
    overlay: "bg-gradient-to-t from-[#1c215e]/50 via-[#1c215e]/15 to-transparent",
  },
  {
    id: "about",
    title: "About Azik",
    subtitle: "Designer & Creative",
    description:
      "A multidisciplinary designer passionate about crafting meaningful visual experiences. I specialize in branding, packaging design, and creative direction.",
    image: "/assets/myavatar3.png",
    overlay: "bg-gradient-to-t from-purple-600/60 via-purple-600/20 to-transparent",
  },
];

export default function AboutMe() {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
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

  const handleCardHover = (index: number, isHovering: boolean) => {
    setFlippedCards((prev) =>
      isHovering
        ? prev.includes(index) ? prev : [...prev, index]
        : prev.filter((i) => i !== index)
    );
  };

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
          Hover on the cards to flip and explore my journey
        </p>
      </div>

      <div 
        ref={cardsContainerRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        {aboutCards.map((card, index) => {
          const isFlipped = flippedCards.includes(index);

          return (
            <div
              key={card.id}
              data-card
              className="relative h-[500px] cursor-pointer opacity-0"
              style={{ perspective: "1000px" }}
              onMouseEnter={() => handleCardHover(index, true)}
              onMouseLeave={() => handleCardHover(index, false)}
            >
              <div
                className={`relative w-full h-full transition-transform duration-700 transform-3d`}
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front of card */}
                <div
                  className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden backface-hidden"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="relative w-full h-full bg-white border-2 border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.15)] hover:border-[#5EC4F0]/50 hover:scale-105 transition-all duration-300 rounded-3xl overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                    />
                    
                    {/* Overlay */}
                    <div className={`absolute inset-0 ${card.overlay}`} />
                    
                    {/* Card label */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-xs uppercase tracking-[0.3em] font-[var(--font-wolf)] text-white">
                        {card.title}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Back of card */}
                <div
                  className="absolute inset-0 w-full h-full rounded-3xl backface-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="relative w-full h-full bg-[#1c125e] border-2 border-[#1c125e] shadow-[0_8px_32px_rgba(0,0,0,0.15)] rounded-3xl overflow-hidden p-8 flex flex-col justify-center">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/80 font-[var(--font-wolf)] mb-3">
                      {card.title}
                    </p>
                    <h3 className="font-[var(--font-wolf)] text-4xl text-white mb-6">
                      {card.subtitle}
                    </h3>
                    <p className="text-lg text-white/90 leading-relaxed">
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
