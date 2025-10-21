"use client";

import { animate, set, stagger } from "animejs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { SVGProps } from "react";
import { VideoBackground } from "./components/VideoBackground";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About Me", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const infoHighlights = [
  {
    title: "Design Ethos",
    description:
      "Curating immersive stories that blend bold typography, kinetic motion, and human-centered thinking.",
  },
  {
    title: "Expertise",
    description:
      "Brand identity, interactive storytelling, UI systems, and motion prototypes for forward-looking teams.",
  },
];

const featuredProjects = [
  {
    title: "SPECTRA Identity",
    category: "Brand System",
    summary:
      "Chromatic visual identity for an immersive art festival, balancing expressive gradients with functional grids.",
    palette: "from-[#0e7fa8]/80 via-[#12bcd0]/75 to-[#5de3d9]/70",
    tags: ["Branding", "Motion Kit", "Design Systems"],
  },
  {
    title: "Vessel UI Lab",
    category: "Product Vision",
    summary:
      "Conceptual control hub for smart living, built around fluid motion cues and tactile spatial layout.",
    palette: "from-[#0c446d]/85 via-[#176c97]/75 to-[#2bb1d0]/70",
    tags: ["UI/UX", "Prototype", "Research"],
  },
  {
    title: "Pulsewave Campaign",
    category: "Art Direction",
    summary:
      "Digital launch for an audio startup with responsive typography, generative shapes, and layered storytelling.",
    palette: "from-[#084255]/85 via-[#0e6282]/75 to-[#1db1c2]/70",
    tags: ["Creative Direction", "3D", "Animation"],
  },
  {
    title: "Orbit Collaboration",
    category: "Experience Design",
    summary:
      "Collaborative workspace rethink featuring modular cards, motion-mapped transitions, and tactile feedback.",
    palette: "from-[#155b7b]/85 via-[#1a8297]/75 to-[#43c6c7]/70",
    tags: ["Experience", "Strategy", "Motion"],
  },
];

const socialLinks = [
  {
    label: "Telegram",
    handle: "@azik.design",
    href: "https://t.me/azikdesign",
  },
  {
    label: "Behance",
    handle: "behance.net/azikdesign",
    href: "https://www.behance.net/azikdesign",
  },
  {
    label: "Instagram",
    handle: "@azik.visual",
    href: "https://www.instagram.com/azik.visual",
  },
];

type IconProps = SVGProps<SVGSVGElement>;

const ArrowUpRightIcon = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

const ChevronLeftIcon = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m15 6-6 6 6 6" />
  </svg>
);

const ChevronRightIcon = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export default function Home() {
  const navRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const infoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contactRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const navTargets = Array.from(
      navRef.current?.querySelectorAll<HTMLElement>("[data-nav-item]") ?? [],
    );
    const heroTargets = Array.from(
      heroRef.current?.querySelectorAll<HTMLElement>("[data-animate]") ?? [],
    );

    const initialTargets = [...navTargets, ...heroTargets];
    if (initialTargets.length) {
      set(initialTargets, { opacity: 0, translateY: 20 });
    }

    if (navTargets.length) {
      animate(navTargets, {
        opacity: [0, 1],
        translateY: [-16, 0],
        delay: stagger(80),
        duration: 700,
        easing: "easeOutExpo",
      });
    }

    if (heroTargets.length) {
      animate(heroTargets, {
        opacity: [0, 1],
        translateY: [32, 0],
        delay: stagger(110, { start: 320 }),
        duration: 700,
        easing: "easeOutExpo",
      });
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target, {
              opacity: [0, 1],
              translateY: [28, 0],
              easing: "easeOutCirc",
              duration: 600,
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    [...infoRefs.current, ...projectRefs.current, contactRef.current].forEach(
      (node) => {
        if (node) {
          set(node, { opacity: 0, translateY: 32 });
          observer.observe(node);
        }
      },
    );

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden text-white">
      <VideoBackground />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#041a2a]/70 via-transparent to-[#01060d]/90" />

      <header
        ref={navRef}
        className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#041627]/70 px-6 py-6 backdrop-blur-2xl md:px-14"
      >
        <Link
          href="#home"
          className="group flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-white/80 transition hover:text-white"
          data-nav-item
        >
          <span className="relative flex h-10 w-10 items-center justify-center">
            <Image
              src="/assets/logo.png"
              alt="Azik studio logo"
              width={80}
              height={80}
              className="h-8 w-8 object-contain opacity-80 transition duration-500 group-hover:scale-110 group-hover:opacity-100 mix-blend-screen"
            />
          </span>
          Azik Studio
        </Link>
        <nav className="hidden gap-10 text-sm font-medium text-white/70 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative overflow-hidden"
              data-nav-item
            >
              <span className="inline-block transition duration-300 hover:text-white">
                {item.label}
              </span>
              <span className="absolute inset-x-0 bottom-0 h-px translate-y-2 bg-gradient-to-r from-transparent via-lime-300 to-transparent opacity-0 transition duration-300 hover:translate-y-0 hover:opacity-100" />
            </Link>
          ))}
        </nav>
        <a
          href="#contact"
          className="group flex items-center gap-2 rounded-full border border-teal-300/40 px-5 py-2 text-xs uppercase tracking-[0.2em] text-teal-200 transition hover:border-teal-200/80 hover:text-white"
          data-nav-item
        >
          Contact
          <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </header>

      <main className="relative z-10 flex flex-1 flex-col">
        <section
          id="home"
          ref={heroRef}
          className="px-6 pb-24 pt-16 md:px-14 lg:px-24 lg:pt-24"
        >
          <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-10">
              <div className="flex items-center gap-4 text-xs uppercase tracking-[0.4em] text-white/60">
                <span
                  className="h-px w-12 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  data-animate
                />
                Visual Designer & Motion Crafter
              </div>
              <h1
                className="text-balance font-[var(--font-display)] text-4xl leading-tight text-white md:text-5xl lg:text-6xl"
                data-animate
              >
                Kinetic storytelling for brands that move faster than trends.
              </h1>
              <p
                className="max-w-xl text-lg text-white/75 md:text-xl"
                data-animate
              >
                I craft daring digital experiences where typography, motion, and
                sound meet. Every project blends research, experimentation, and
                emotive detail to help teams ship unforgettable narratives.
              </p>
              <div
                className="flex flex-col gap-6 md:flex-row md:items-center"
                data-animate
              >
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-400 px-6 py-3 text-sm font-semibold text-[#022433] transition hover:shadow-[0_0_35px_rgba(64,206,255,0.45)]"
                >
                  View featured work
                  <ArrowUpRightIcon className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                </a>
                <div className="flex items-center gap-6 text-sm uppercase tracking-[0.2em] text-white/60">
                  <div className="flex items-center gap-2">
                    <ChevronLeftIcon className="h-4 w-4" />
                    Previous
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    Next
                    <ChevronRightIcon className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative ml-auto w-full max-w-xl" data-animate>
              <div className="absolute -inset-6 rounded-3xl border border-white/10 bg-white/5 blur-xl" />
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/10">
                <Image
                  src="/assets/hero.jpg"
                  alt="Portrait of Azik"
                  width={900}
                  height={1200}
                  className="h-[520px] w-full object-cover md:h-[620px]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between text-white/80">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em]">
                      Current focus
                    </p>
                    <p className="font-[var(--font-display)] text-2xl">
                      Experiential Portals
                    </p>
                  </div>
                  <div className="text-right text-xs uppercase tracking-[0.3em] text-white/60">
                    2025
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="relative px-6 pb-24 md:px-14 lg:px-24">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-6">
              <h2 className="font-[var(--font-display)] text-3xl text-white md:text-4xl">
                About me
              </h2>
              <p className="max-w-lg text-white/70">
                Azik is a multidisciplinary designer weaving visual systems and
                motion experiments. Across startups and agencies, I help teams
                transform abstract ideas into expressive, strategic experiences.
                Every interface becomes a choreography of light, rhythm, and
                intent.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-teal-200 transition hover:text-white"
              >
                Book a collaboration call
                <ArrowUpRightIcon className="h-4 w-4" />
              </a>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {infoHighlights.map((panel, index) => (
                <div
                  key={panel.title}
                  ref={(node: HTMLDivElement | null) => {
                    infoRefs.current[index] = node;
                  }}
                  className="rounded-3xl border border-teal-300/15 bg-white/5 p-8 transition hover:border-teal-200/60 hover:bg-cyan-200/10"
                >
                  <h3 className="font-[var(--font-display)] text-2xl text-white">
                    {panel.title}
                  </h3>
                  <p className="mt-4 text-sm text-white/80">
                    {panel.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="px-6 pb-24 md:px-14 lg:px-24">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-[var(--font-display)] text-3xl text-white md:text-4xl">
                Featured Works
              </h2>
              <p className="max-w-xl text-white/70">
                Modular stories that sequence research, prototypes, and final
                experiences. Hover to feel the gradients pulse—each project is
                built to move.
              </p>
            </div>
            <Link
              href="#contact"
              className="inline-flex items-center gap-3 rounded-full border border-teal-200/40 px-5 py-3 text-xs uppercase tracking-[0.25em] text-white/70 transition hover:border-teal-100/70 hover:text-teal-100"
            >
              Request full portfolio
              <ArrowUpRightIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <article
                key={project.title}
                ref={(node: HTMLDivElement | null) => {
                  projectRefs.current[index] = node;
                }}
                className="group relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#051422]/60 p-8 transition hover:border-teal-100/40 hover:bg-[#062036]/80"
              >
                <div
                  className={`absolute inset-0 opacity-30 blur-3xl transition duration-700 group-hover:opacity-60 group-hover:blur-2xl bg-gradient-to-br ${project.palette}`}
                />
                <div className="relative flex flex-col gap-6">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/60">
                    {project.category}
                    <span>2025</span>
                  </div>
                  <h3 className="font-[var(--font-display)] text-2xl text-white">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/70">{project.summary}</p>
                  <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.25em] text-white/60">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/20 px-3 py-1 text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="contact"
          ref={contactRef}
          className="relative px-6 pb-28 md:px-14 lg:px-24"
        >
          <div className="relative overflow-hidden rounded-[2.5rem] border border-teal-200/30 bg-[#062238]/85 px-8 py-12 md:p-16">
            <div className="absolute -left-20 top-1/2 hidden h-40 w-40 -translate-y-1/2 rounded-full bg-gradient-to-tr from-teal-300/35 to-cyan-300/25 blur-3xl md:block" />
            <div className="absolute -right-14 -bottom-14 h-52 w-52 rounded-full bg-gradient-to-tr from-sky-400/25 to-emerald-300/20 blur-3xl" />
            <div className="relative space-y-12">
              <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-white/60">
                    Contact me now
                  </p>
                  <h2 className="mt-4 font-[var(--font-display)] text-3xl text-white md:text-4xl">
                    Let’s co-create an experience that refuses to sit still.
                  </h2>
                </div>
                <a
                  href="mailto:hello@azik.design"
                  className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-400 px-6 py-3 text-sm font-semibold text-[#022433] transition hover:shadow-[0_0_30px_rgba(64,206,255,0.45)]"
                >
                  hello@azik.design
                  <ArrowUpRightIcon className="h-5 w-5" />
                </a>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group rounded-2xl border border-teal-200/25 bg-white/5 p-6 transition hover:border-teal-100/50 hover:bg-teal-100/10"
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                      {social.label}
                    </p>
                    <p className="mt-3 font-[var(--font-display)] text-xl text-white">
                      {social.handle}
                    </p>
                    <ArrowUpRightIcon className="mt-6 h-5 w-5 text-white/60 transition group-hover:translate-x-2 group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="z-10 flex items-center justify-between border-t border-white/10 px-6 py-6 text-xs uppercase tracking-[0.3em] text-white/40 md:px-14">
        <p>Copyright {new Date().getFullYear()} Azik Studio. All motion reserved.</p>
        <div className="hidden gap-4 md:flex">
          <span>Portfolio v2.5</span>
          <span>Crafted with Tailwind & anime.js</span>
        </div>
      </footer>
    </div>
  );
}
