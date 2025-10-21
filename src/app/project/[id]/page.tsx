"use client";

import { animate } from "animejs";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";

const projectsData = {
  pj1: {
    id: "pj1",
    title: "MONA Scented Candles",
    category: "Branding / Packaging",
    year: "2021",
    client: "MONA Fragrances",
    description:
      "A sophisticated branding and packaging design project for MONA Scented Candles. The design embraces minimalism with elegant typography and earthy tones, reflecting the natural essence of the product. Each element was carefully crafted to create a cohesive luxury experience.",
    challenge:
      "Create a premium brand identity that stands out in the competitive candle market while maintaining an approachable, natural aesthetic.",
    solution:
      "We developed a clean visual language combining elegant serif typography with warm, neutral colors. The packaging design features subtle textures and gold accents to convey luxury without overwhelming the natural theme.",
    tags: ["Branding", "Packaging Design", "Visual Identity", "Print Design"],
    gradient: "from-[#C49A6C] via-[#D4B896] to-[#E8D5BF]",
    images: [
      "/assets/projects/pj1/mocup 5.jpg",
      "/assets/projects/pj1/mockup 1.jpg",
      "/assets/projects/pj1/mockup 2.jpg",
      "/assets/projects/pj1/mockup 3.jpg",
      "/assets/projects/pj1/mockup 4.jpg",
      "/assets/projects/pj1/mockup 6.jpg",
    ],
  },
  pj2: {
    id: "pj2",
    title: "Modern Poster Series",
    category: "Art Direction",
    year: "2022",
    client: "Contemporary Art Gallery",
    description:
      "A bold poster series exploring the intersection of modern design and traditional art forms. Each piece combines vibrant colors with geometric patterns to create eye-catching compositions that demand attention.",
    challenge:
      "Design a poster series that appeals to both traditional art enthusiasts and modern design lovers.",
    solution:
      "We created a unique visual system that bridges classical composition with contemporary color palettes and bold typography, resulting in a harmonious blend of old and new.",
    tags: ["Poster Design", "Art Direction", "Typography", "Print Design"],
    gradient: "from-[#2A3875] via-[#4A5FA0] to-[#6B8DD6]",
    images: [
      "/assets/projects/pj2/mockup 3.jpg",
      "/assets/projects/pj2/mockup 2.jpg",
      "/assets/projects/pj2/poster mockup.jpg",
      "/assets/projects/pj2/poster mockup 2.jpg",
    ],
  },
  pj3: {
    id: "pj3",
    title: "Creative Campaign",
    category: "Visual Identity",
    year: "2023",
    client: "Modern Lifestyle Brand",
    description:
      "A comprehensive creative campaign showcasing innovative visual storytelling. This project combines photography, graphic design, and digital art to create a cohesive brand narrative across multiple touchpoints.",
    challenge:
      "Develop a versatile visual identity system that works seamlessly across digital and print media while maintaining brand consistency.",
    solution:
      "We established a flexible design framework with adaptable layouts, consistent color schemes, and modular graphic elements that can be customized for various applications.",
    tags: ["Campaign Design", "Visual Identity", "Photography", "Digital Design"],
    gradient: "from-[#D4A5A0] via-[#E8C5C0] to-[#F5E0DC]",
    images: [
      "/assets/projects/pj3/mockup 10.jpg",
      "/assets/projects/pj3/mockup 11.jpg",
      "/assets/projects/pj3/mockup 1.jpg",
      "/assets/projects/pj3/mockup 2.jpg",
      "/assets/projects/pj3/mockup 5.jpg",
      "/assets/projects/pj3/mockup 6.jpg",
      "/assets/projects/pj3/mockup 9.jpg",
      "/assets/projects/pj3/mockup 12.jpg",
      "/assets/projects/pj3/mockup 2 1.jpg",
      "/assets/projects/pj3/mockup.jpg",
    ],
  },
};

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = projectsData[id as keyof typeof projectsData];

  if (!project) {
    notFound();
  }

  // Get next project ID
  const projectIds = Object.keys(projectsData);
  const currentIndex = projectIds.indexOf(id);
  const nextProjectId = projectIds[(currentIndex + 1) % projectIds.length];

  const [selectedImage, setSelectedImage] = useState(0);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && mainImageRef.current) {
            animate(mainImageRef.current, {
              opacity: [0, 1],
              translateX: [-60, 0],
              duration: 800,
              easing: "easeOutExpo",
            });
            imageObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (mainImageRef.current) {
      imageObserver.observe(mainImageRef.current);
    }

    const infoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && infoRef.current) {
            animate(infoRef.current.children, {
              opacity: [0, 1],
              translateX: [60, 0],
              duration: 800,
              delay: (_el: unknown, i: number) => i * 100,
              easing: "easeOutExpo",
            });
            infoObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (infoRef.current) {
      infoObserver.observe(infoRef.current);
    }

    return () => {
      imageObserver.disconnect();
      infoObserver.disconnect();
    };
  }, []);

  const handleThumbnailClick = (index: number) => {
    setSelectedImage(index);
    if (mainImageRef.current) {
      animate(mainImageRef.current.querySelector('img'), {
        opacity: [0.3, 1],
        duration: 400,
        easing: "easeOutExpo",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Pattern Background */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/assets/pattern-star.png)',
          backgroundSize: '150px',
          opacity: 0.05,
          zIndex: 0
        }}
      />
      
      {/* Header with Back Button */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-14 lg:px-24 py-6 bg-white/80 backdrop-blur-md border-b border-[#1c215e]/10">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#1c215e] hover:text-[#5EC4F0] transition-colors group"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 transition-transform group-hover:-translate-x-1"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="text-sm uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-wolf)' }}>
              Back to Home
            </span>
          </Link>

          <Link
            href={`/project/${nextProjectId}`}
            className="inline-flex items-center gap-2 text-[#1c215e] hover:text-[#5EC4F0] transition-colors group"
          >
            <span className="text-sm uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-wolf)' }}>
              Next Project
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-24 px-6 md:px-14 lg:px-24">
        <div className="max-w-[1400px] mx-auto">
          {/* Project Info - Above Images */}
          <div ref={infoRef} className="mb-16 space-y-8">
            <p className="text-xs uppercase tracking-[0.4em] text-[#5EC4F0] opacity-0" style={{ fontFamily: 'var(--font-wolf)' }}>
              {project.category}
            </p>
            <h1 className="text-5xl md:text-7xl text-[#1c215e] opacity-0" style={{ fontFamily: 'var(--font-wolf)' }}>
              {project.title}
            </h1>
            
            <div className="grid md:grid-cols-4 gap-8 opacity-0">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#1c215e]/60 mb-2" style={{ fontFamily: 'var(--font-wolf)' }}>Year</p>
                <p className="text-lg text-[#1c215e]" style={{ fontFamily: 'var(--font-wolf)' }}>{project.year}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#1c215e]/60 mb-2" style={{ fontFamily: 'var(--font-wolf)' }}>Client</p>
                <p className="text-lg text-[#1c215e]" style={{ fontFamily: 'var(--font-wolf)' }}>{project.client}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs uppercase tracking-[0.3em] text-[#1c215e]/60 mb-2" style={{ fontFamily: 'var(--font-wolf)' }}>Tags</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs rounded-full bg-[#1c215e]/5 text-[#1c215e] border border-[#1c215e]/10" style={{ fontFamily: 'var(--font-wolf)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-lg text-[#1c215e]/70 leading-relaxed max-w-3xl opacity-0" style={{ fontFamily: 'var(--font-wolf)' }}>
              {project.description}
            </p>
          </div>

          {/* Image Gallery */}
          <div className="flex gap-6">
            {/* Thumbnails - Left Side */}
            <div ref={thumbnailsRef} className="w-24 flex flex-col gap-3">
              {project.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`relative w-full aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index
                      ? "border-[#5EC4F0] scale-105 shadow-lg"
                      : "border-[#1c215e]/10 hover:border-[#5EC4F0]/50"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image - Right Side */}
            <div
              ref={mainImageRef}
              className="flex-1 relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#f5f5f5] opacity-0 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
            >
              <Image
                src={project.images[selectedImage]}
                alt={`${project.title} - Image ${selectedImage + 1}`}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
