"use client";

import { animate } from "animejs";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";

const projectsData: Record<string, {
  title: string;
  category: string;
  year: string;
  client: string;
  role: string;
  description: string;
  images: string[];
}> = {
  pj1: {
    title: "MONA Scented Candles Branding",
    category: "Branding / Packaging",
    year: "2021",
    client: "MONA CANDLES",
    role: "Art Director / Designer",
    description:
      "This is a premium scented candles brand established in Hanoi in 2002. When building visual identity for MONA, I wanted customers to perceive the brand as: A high quality scented candles, An unique & luxury aroma experience, and The most loved products by women of all time.",
    images: [
      "/assets/projects/pj1/mockup 1.jpg",
      "/assets/projects/pj1/mockup 2.jpg",
      "/assets/projects/pj1/mockup 3.jpg",
      "/assets/projects/pj1/mockup 4.jpg",
      "/assets/projects/pj1/mocup 5.jpg",
      "/assets/projects/pj1/mockup 6.jpg",
    ],
  },
  pj2: {
    title: "Modern Poster Series",
    category: "Art Direction",
    year: "2022",
    client: "CREATIVE STUDIO",
    role: "Art Director / Designer",
    description:
      "A collection of bold and expressive poster designs that push the boundaries of typography and visual communication. Each piece tells a unique story through the interplay of form, color, and negative space.",
    images: [
      "/assets/projects/pj2/poster mockup.jpg",
      "/assets/projects/pj2/poster mockup 2.jpg",
      "/assets/projects/pj2/mockup 2.jpg",
      "/assets/projects/pj2/mockup 3.jpg",
    ],
  },
  pj3: {
    title: "Creative Campaign Identity",
    category: "Visual Identity",
    year: "2023",
    client: "BRAND COLLECTIVE",
    role: "Creative Director / Designer",
    description:
      "A comprehensive visual identity system designed for a forward-thinking creative campaign. The project explores the intersection of digital and print media, creating a cohesive brand experience across all touchpoints.",
    images: [
      "/assets/projects/pj3/mockup 1.jpg",
      "/assets/projects/pj3/mockup 2.jpg",
      "/assets/projects/pj3/mockup 5.jpg",
      "/assets/projects/pj3/mockup 6.jpg",
      "/assets/projects/pj3/mockup 9.jpg",
      "/assets/projects/pj3/mockup 10.jpg",
      "/assets/projects/pj3/mockup 11.jpg",
      "/assets/projects/pj3/mockup 12.jpg",
    ],
  },
};

export default function ProjectDetail() {
  const params = useParams();
  const id = params?.id as string;
  const project = projectsData[id];
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll("[data-animate]");
      animate(elements, {
        opacity: [0, 1],
        translateY: [60, 0],
        duration: 800,
        delay: (_el: unknown, i: number) => i * 100,
        easing: "easeOutExpo",
      });
    }
  }, [id]);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="font-[var(--font-wolf)] text-4xl text-[#1c215e] mb-4">
            Project not found
          </h1>
          <Link
            href="/"
            className="text-[#5EC4F0] hover:text-[#1c215e] transition font-[var(--font-wolf)]"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="pointer-events-none fixed inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[url('/assets/pattern-star.png')] bg-repeat" />
      </div>

      <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-[#5EC4F0]/5 via-transparent to-[#1c215e]/5" />

      <header className="sticky top-0 z-30 border-b-2 border-[#1c215e]/10 bg-white/95 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-6 md:px-14">
          <Link
            href="/"
            className="group flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-[#1c215e]/70 transition hover:text-[#1c215e] font-[var(--font-wolf)]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path d="m15 6-6 6 6 6" />
            </svg>
            Back to home
          </Link>
          <Link
            href="/#contact"
            className="rounded-full border-2 border-[#1c215e]/20 px-5 py-2 text-xs uppercase tracking-[0.2em] text-[#1c215e] transition hover:border-[#5EC4F0] hover:bg-[#5EC4F0]/10 font-[var(--font-wolf)]"
          >
            Contact
          </Link>
        </div>
      </header>

      <main ref={contentRef} className="relative z-10 px-6 py-16 md:px-14 lg:px-24">
        <div className="mx-auto max-w-6xl space-y-16">
          <div className="space-y-8" data-animate>
            <p className="text-xs uppercase tracking-[0.4em] text-[#5EC4F0] font-[var(--font-wolf)]">
              EST 2023 / HANOI
            </p>
            <h1 className="font-[var(--font-wolf)] text-5xl md:text-6xl lg:text-7xl text-[#1c215e]">
              {project.title}
            </h1>
            <p className="max-w-3xl text-lg text-[#1c215e]/70 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div
            data-animate
            className="grid gap-8 rounded-3xl border-2 border-[#1c215e]/10 bg-white shadow-[0_8px_32px_rgba(28,33,94,0.08)] p-8 md:grid-cols-2 lg:grid-cols-4"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#5EC4F0] font-[var(--font-wolf)]">
                Year
              </p>
              <p className="mt-2 text-xl text-[#1c215e] font-[var(--font-wolf)]">
                {project.year}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#5EC4F0] font-[var(--font-wolf)]">
                Client
              </p>
              <p className="mt-2 text-xl text-[#1c215e] font-[var(--font-wolf)]">
                {project.client}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#5EC4F0] font-[var(--font-wolf)]">
                Types of Work
              </p>
              <p className="mt-2 text-xl text-[#1c215e] font-[var(--font-wolf)]">
                {project.category}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#5EC4F0] font-[var(--font-wolf)]">
                Role
              </p>
              <p className="mt-2 text-xl text-[#1c215e] font-[var(--font-wolf)]">
                {project.role}
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {project.images.map((image, index) => (
              <div
                key={index}
                data-animate
                className="overflow-hidden rounded-3xl border-2 border-[#1c215e]/10 hover:border-[#5EC4F0]/50 transition-all shadow-[0_4px_16px_rgba(28,33,94,0.06)] hover:shadow-[0_8px_24px_rgba(94,196,240,0.15)]"
              >
                <Image
                  src={image}
                  alt={`${project.title} - Image ${index + 1}`}
                  width={1200}
                  height={800}
                  className="h-auto w-full object-cover"
                />
              </div>
            ))}
          </div>

          <div
            data-animate
            className="flex items-center justify-between border-t-2 border-[#1c215e]/10 pt-8"
          >
            <Link
              href="/"
              className="group flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-[#1c215e]/70 transition hover:text-[#1c215e] font-[var(--font-wolf)]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5 transition-transform group-hover:-translate-x-1"
              >
                <path d="m15 6-6 6 6 6" />
              </svg>
              Back to all works
            </Link>
            <Link
              href="/#contact"
              className="group flex items-center gap-3 rounded-full bg-[#5EC4F0] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1c215e] hover:shadow-[0_8px_32px_rgba(28,33,94,0.3)] font-[var(--font-wolf)]"
            >
              Start a project
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
