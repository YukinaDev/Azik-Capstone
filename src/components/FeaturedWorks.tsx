"use client";

import { animate } from "animejs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const projects = [
  {
    id: "pj1",
    title: "MONA Scented Candles",
    category: "Branding / Packaging",
    year: "2021",
    preview: "/assets/projects/pj1/mockup 1.jpg",
    gradient: "from-[#5EC4F0] via-[#7DD3F4] to-[#ffffff]",
  },
  {
    id: "pj2",
    title: "Modern Poster Series",
    category: "Art Direction",
    year: "2022",
    preview: "/assets/projects/pj2/poster mockup.jpg",
    gradient: "from-[#1c215e] via-[#3d4489] to-[#5EC4F0]",
  },
  {
    id: "pj3",
    title: "Creative Campaign",
    category: "Visual Identity",
    year: "2023",
    preview: "/assets/projects/pj3/mockup 1.jpg",
    gradient: "from-[#5EC4F0] via-[#8B5CF6] to-[#1c215e]",
  },
];

export default function FeaturedWorks() {
  const projectRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target, {
              opacity: [0, 1],
              translateY: [50, 0],
              scale: [0.95, 1],
              duration: 700,
              easing: "easeOutCirc",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    projectRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="px-6 py-24 md:px-14 lg:px-24">
      <div className="mb-16 space-y-4">
        <h2 className="font-[var(--font-wolf)] text-5xl md:text-6xl text-[#1c215e]">
          Featured Works
        </h2>
        <p className="text-lg text-[#1c215e]/60 max-w-2xl">
          A curated selection of brand identities, packaging designs, and creative campaigns 
          crafted with attention to detail and strategic thinking.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {projects.map((project, index) => (
          <Link
            key={project.id}
            href={`/project/${project.id}`}
            ref={(node) => {
              projectRefs.current[index] = node;
            }}
            className="group relative overflow-hidden rounded-[2rem] border-2 border-[#1c215e]/10 bg-white shadow-[0_8px_32px_rgba(28,33,94,0.08)] transition-all duration-500 hover:border-[#5EC4F0] hover:scale-105 hover:shadow-[0_16px_48px_rgba(94,196,240,0.2)]"
            style={{ opacity: 0 }}
          >
            <div className="aspect-[3/4] relative overflow-hidden">
              <Image
                src={project.preview}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent" />
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-br ${project.gradient} mix-blend-screen`}
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[#5EC4F0]/70 font-[var(--font-wolf)]">
                <span>{project.category}</span>
                <span>{project.year}</span>
              </div>
              <h3 className="font-[var(--font-wolf)] text-2xl text-[#1c215e]">
                {project.title}
              </h3>
              <div className="flex items-center gap-2 text-[#5EC4F0] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm uppercase tracking-[0.2em] font-[var(--font-wolf)]">
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
