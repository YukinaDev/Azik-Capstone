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
    image: "/assets/myavatar3.png",
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
    image: "/assets/myavatar2.png",
  },
];

export default function AboutMe() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && titleRef.current) {
            animate(titleRef.current.children, {
              opacity: [0, 1],
              translateX: [-60, 0],
              duration: 800,
              delay: (_el: unknown, i: number) => i * 100,
              easing: "easeOutExpo",
            });
            titleObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (titleRef.current) {
      titleObserver.observe(titleRef.current);
    }

    const cardsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && cardsContainerRef.current) {
            const cards = cardsContainerRef.current.querySelectorAll("[data-card]");
            animate(cards, {
              opacity: [0, 1],
              scale: [0.8, 1],
              duration: 800,
              delay: (_el: unknown, i: number) => i * 150,
              easing: "easeOutExpo",
            });
            cardsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardsContainerRef.current) {
      cardsObserver.observe(cardsContainerRef.current);
    }

    return () => {
      titleObserver.disconnect();
      cardsObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      animate(contentRef.current, {
        opacity: [0, 1],
        translateX: [40, 0],
        duration: 600,
        easing: "easeOutExpo",
      });
    }
  }, [activeCardIndex]);



  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 px-6 md:px-14 lg:px-24 min-h-screen"
    >
      <div ref={titleRef} className="mb-16">
        <h2 className="text-5xl md:text-6xl text-[#1c215e] mb-4 opacity-0" style={{ fontFamily: 'var(--font-wolf)' }}>
          About me
        </h2>
        <p className="text-lg text-[#1c215e]/60 max-w-2xl opacity-0" style={{ fontFamily: 'var(--font-wolf)' }}>
          Click on the cards to explore my journey
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-center max-w-7xl mx-auto">
        {/* Stacked Cards */}
        <div 
          ref={cardsContainerRef}
          className="relative w-full lg:w-1/2 h-[680px] flex items-center justify-center"
        >
          {aboutCards.map((card, index) => {
            const isActive = activeCardIndex === index;
            const offset = index - activeCardIndex;
            const rotation = offset * 8;
            const translateY = Math.abs(offset) * 20;
            const translateX = offset * 30;
            const scale = isActive ? 1 : 0.9 - Math.abs(offset) * 0.05;
            const zIndex = aboutCards.length - Math.abs(offset);
            const opacity = Math.abs(offset) > 2 ? 0 : 1;

            return (
              <div
                key={card.id}
                data-card
                className="absolute w-[450px] h-[600px] cursor-pointer opacity-0 transition-all duration-700 ease-out"
                style={{
                  transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotation}deg) scale(${scale})`,
                  zIndex,
                  opacity,
                }}
                onClick={() => setActiveCardIndex(index)}
              >
                <div className={`relative w-full h-full bg-white rounded-3xl overflow-hidden ${
                  isActive 
                    ? 'shadow-[0_0_60px_rgba(94,196,240,0.6)] border-2 border-transparent' 
                    : 'border-2 border-[#1c215e]/10 shadow-[0_12px_48px_rgba(28,33,94,0.2)]'
                }`}>
                  {isActive && (
                    <div className="absolute inset-0 rounded-3xl p-[2px] animate-spin-slow" style={{
                      background: 'conic-gradient(from 0deg, #5EC4F0, #FF6B9D, #FFC837, #5EC4F0)',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'exclude',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                    }} />
                  )}
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/90 mb-2" style={{ fontFamily: 'var(--font-wolf)' }}>
                      {card.title}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <div key={activeCardIndex} ref={contentRef} className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-[#5EC4F0]" style={{ fontFamily: 'var(--font-wolf)' }}>
              {aboutCards[activeCardIndex].title}
            </p>
            <h3 className="text-5xl text-[#1c215e]" style={{ fontFamily: 'var(--font-wolf)' }}>
              {aboutCards[activeCardIndex].subtitle}
            </h3>
            <p className="text-lg text-[#1c215e]/70 leading-relaxed" style={{ fontFamily: 'var(--font-roboto)' }}>
              {aboutCards[activeCardIndex].description}
            </p>

            {/* Card indicators */}
            <div className="flex gap-2 pt-4">
              {aboutCards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCardIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activeCardIndex 
                      ? 'w-12 bg-[#5EC4F0]' 
                      : 'w-6 bg-[#1c215e]/20 hover:bg-[#1c215e]/40'
                  }`}
                  aria-label={`Go to card ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
