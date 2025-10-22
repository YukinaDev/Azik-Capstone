"use client";

import { animate } from "animejs";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const slides = [
  {
    id: 1,
    image: "/assets/projects/pj1/mockup 2.jpg",
    title: "Save the sea to see your future",
    category: "Individual Project",
  },
  {
    id: 2,
    image: "/assets/projects/pj2/mockup 2.jpg",
    title: "Z & Space",
    category: "UI/UX Design",
  },
  {
    id: 3,
    image: "/assets/projects/pj3/mockup 11.jpg",
    title: "Baby Love",
    category: "Branding & Identity",
  },
];

export default function AutoSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 2500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (slideRef.current) {
      const elements = slideRef.current.querySelectorAll("[data-slide-content]");
      animate(elements, {
        opacity: [0, 1],
        translateX: [-60, 0],
        duration: 800,
        easing: "easeOutExpo",
      });
    }
  }, [currentIndex]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }, 2500);
    }
  };

  return (
    <section id="home" className="relative h-[calc(100vh+5rem)] overflow-hidden -mt-20">
      <div ref={slideRef} className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c215e]/90 via-[#1c215e]/50 to-transparent" />
            
            {index === currentIndex && (
              <div className="absolute bottom-24 left-0 right-0 px-6 md:px-14 lg:px-24">
                <div className="space-y-4" data-slide-content>
                  <p className="text-xs uppercase tracking-[0.4em] text-[#5EC4F0]" style={{ fontFamily: 'var(--font-wolf)' }}>
                    {slide.category}
                  </p>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]" style={{ fontFamily: 'var(--font-wolf)' }}>
                    {slide.title}
                  </h2>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 right-6 md:right-14 lg:right-24 z-10 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-12 bg-[#5EC4F0] shadow-[0_0_10px_rgba(94,196,240,0.8)]"
                : "w-2 bg-[#1c215e]/30 hover:bg-[#5EC4F0]/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
