"use client";

import { animate } from "animejs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const projects = [
  {
    id: "pj1",
    title: "Save the sea to see your future",
    category: "Individual Project",
    year: "2022",
    preview: "/assets/projects/pj1/mocup 5.jpg",
    gradient: "from-[#C49A6C] via-[#D4B896] to-[#E8D5BF]",
  },
  {
    id: "pj2",
    title: "Z & Space",
    category: "UI/UX Design",
    year: "2023",
    preview: "/assets/projects/pj2/mockup 3.jpg",
    gradient: "from-[#2A3875] via-[#4A5FA0] to-[#6B8DD6]",
  },
  {
    id: "pj3",
    title: "Baby Love",
    category: "Branding & Identity",
    year: "2024",
    preview: "/assets/projects/pj3/mockup 10.jpg",
    gradient: "from-[#D4A5A0] via-[#E8C5C0] to-[#F5E0DC]",
  },
  {
    id: "pj4",
    title: "Fashion Collection",
    category: "Product Design",
    year: "2024",
    preview: "/assets/projects/pj4/Mockup 4.jpg",
    gradient: "from-[#1a1a1a] via-[#4a4a4a] to-[#7a7a7a]",
  },
];

export default function FeaturedWorks() {
  const projectRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
          if (entry.isIntersecting && containerRef.current) {
            const cards = containerRef.current.querySelectorAll("[data-project-card]");
            animate(cards, {
              opacity: [0, 1],
              translateY: [60, 0],
              duration: 400,
              delay: (_el: unknown, i: number) => i * 100,
              easing: "easeOutExpo",
            });
            cardsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      cardsObserver.observe(containerRef.current);
    }

    return () => {
      titleObserver.disconnect();
      cardsObserver.disconnect();
    };
  }, []);

  return (
    <section id="projects" className="px-6 py-24 md:px-14 lg:px-24">
      <div ref={titleRef} className="mb-16 space-y-4">
        <h2 className="text-5xl md:text-6xl text-[#1c215e] opacity-0" style={{ fontFamily: 'var(--font-wolf)' }}>
          Featured Works
        </h2>
        <p className="text-lg text-[#1c215e]/60 max-w-2xl opacity-0" style={{ fontFamily: 'var(--font-wolf)' }}>
          A curated selection of brand identities, packaging designs, and creative campaigns
          crafted with attention to detail and strategic thinking.
        </p>
      </div>

      <div ref={containerRef} className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {projects.map((project, index) => (
          <Link
            key={project.id}
            href={`/project/${project.id}`}
            data-project-card
            className="group relative overflow-hidden rounded-[2rem] border-2 border-[#1c215e]/10 bg-white shadow-[0_8px_32px_rgba(28,33,94,0.08)] transition-all duration-500 hover:border-[#5EC4F0] hover:scale-105 hover:shadow-[0_16px_48px_rgba(94,196,240,0.2)] opacity-0"
          >
            <div className="aspect-[3/4] relative overflow-hidden">
              <Image
                src={project.preview}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-br ${project.gradient} mix-blend-screen`}
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/80" style={{ fontFamily: 'var(--font-wolf)' }}>
                <span>{project.category}</span>
                <span>{project.year}</span>
              </div>
              <h3 className="text-2xl text-white" style={{ fontFamily: 'var(--font-wolf)' }}>
                {project.title}
              </h3>
              <div className="flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-wolf)' }}>
                  View Project
                </span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
