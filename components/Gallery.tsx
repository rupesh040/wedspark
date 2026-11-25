"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { DM_Serif_Display, Montserrat } from "next/font/google";
import type { GalleryItem, GalleryVariant } from "@/data/type";

const serif = DM_Serif_Display({ subsets: ["latin"], weight: "400", display: "swap" });
const sans = Montserrat({ subsets: ["latin"], display: "swap" });

const LEAF_PATHS = [
  "M15 15 C50 60 110 40 180 20",
  "M35 25 C60 10 90 25 60 40 C40 40 30 30 35 25 Z",
  "M75 32 C105 18 135 32 105 48 C85 48 70 38 75 32 Z",
  "M115 30 C145 15 175 30 145 46 C125 46 110 36 115 30 Z",
  "M20 20 C30 80 20 140 10 185",
  "M22 50 C40 70 25 95 12 75 C12 60 18 52 22 50 Z",
  "M20 100 C38 120 22 145 10 125 C10 110 16 102 20 100 Z",
  "M18 145 C34 165 18 185 8 165 C8 152 14 147 18 145 Z",
];

function Leaf({ inView, className }: { inView: boolean; className: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute z-0 text-[#84137C]/35 ${className}`}>
      <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.4">
        {LEAF_PATHS.map((d, i) => (
          <path
            key={i}
            d={d}
            pathLength={1}
            className="transition-[stroke-dashoffset] duration-[1800ms] ease-out motion-reduce:transition-none"
            style={{
              strokeDasharray: 1,
              strokeDashoffset: inView ? 0 : 1,
              transitionDelay: `${300 + i * 110}ms`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

interface GalleryProps {
  data: GalleryVariant;
}

export function Gallery({ data }: GalleryProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      }
    };

    if (selectedItem) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedItem]);

  const handleNextLightbox = () => {
    if (!selectedItem) return;
    const currentIndex = data.items.findIndex((item) => item.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % data.items.length;
    setSelectedItem(data.items[nextIndex]);
  };

  const handlePrevLightbox = () => {
    if (!selectedItem) return;
    const currentIndex = data.items.findIndex((item) => item.id === selectedItem.id);
    const prevIndex = (currentIndex - 1 + data.items.length) % data.items.length;
    setSelectedItem(data.items[prevIndex]);
  };

  return (
    <section
      ref={ref}
      id="gallery"
      className="relative overflow-hidden bg-[#FDF7FB] py-16"
    >
      <Leaf inView={inView} className="-left-4 -top-4 w-28 sm:w-36 lg:w-40" />
      <Leaf inView={inView} className="-bottom-4 -right-4 w-28 rotate-180 sm:w-36 lg:w-40" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3">
            <span
              aria-hidden="true"
              className={`flex w-10 shrink-0 origin-right items-center justify-end transition-transform duration-[1000ms] ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none sm:w-16 ${
                inView ? "scale-x-100" : "scale-x-0"
              }`}
            >
              <span className="h-px grow bg-[#E8A93A]" />
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#E8A93A]" />
            </span>

            <span
              className={`${sans.className} text-xs font-bold uppercase text-[#BA0D84] transition-[opacity,letter-spacing] delay-200 duration-[1200ms] ease-out motion-reduce:transition-none sm:text-[14px] ${
                inView ? "tracking-[0.22em] opacity-100" : "tracking-[0.5em] opacity-0"
              }`}
            >
              {data.tagline}
            </span>

            <span
              aria-hidden="true"
              className={`flex w-10 shrink-0 origin-left items-center transition-transform duration-[1000ms] ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none sm:w-16 ${
                inView ? "scale-x-100" : "scale-x-0"
              }`}
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#E8A93A]" />
              <span className="h-px grow bg-[#E8A93A]" />
            </span>
          </div>

          <h2
            className={`${serif.className} mt-3 flex flex-wrap justify-center gap-x-[0.26em] text-[34px] font-normal leading-[1.15] tracking-tight sm:text-[42px] lg:text-[50px]`}
          >
            <span className="block overflow-hidden pb-2">
              <span
                className={`block text-[#1F1A1C] transition-transform delay-300 duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  inView ? "translate-y-0" : "translate-y-full"
                }`}
              >
                {data.headingPart1.trim()}
              </span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span
                className={`block text-[#BA0D84] transition-transform delay-[450ms] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  inView ? "translate-y-0" : "translate-y-full"
                }`}
              >
                {data.headingHighlight.trim()}
              </span>
            </span>
          </h2>

          <p
            className={`${sans.className} mx-auto mt-2 max-w-2xl text-[14px] font-medium leading-[1.75] text-[#2A2D4A] transition-all delay-500 duration-[1000ms] ease-out motion-reduce:transition-none sm:text-[15.5px] ${
              inView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            {data.description}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {data.items.map((item, index) => {
            const delay = ((index % 4) + Math.floor(index / 4)) * 110 + 500;
            const fromLeft = index % 2 === 0;

            return (
              <div
                key={item.id}
                className={`transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                <div
                  onClick={() => setSelectedItem(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedItem(item);
                    }
                  }}
                  aria-label={`View photo: ${item.title}`}
                  className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl bg-white shadow-[0_8px_24px_rgba(73,1,70,0.07)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_18px_34px_rgba(73,1,70,0.16)] focus:outline-none focus:ring-2 focus:ring-[#BA0D84]"
                >
                  <div
                    className={`absolute inset-0 transition-[clip-path,transform] duration-[1300ms] ease-[cubic-bezier(0.77,0,0.175,1)] motion-reduce:transition-none ${
                      inView
                        ? "scale-100 [clip-path:inset(0_0_0_0)]"
                        : fromLeft
                          ? "scale-[1.2] [clip-path:inset(0_100%_0_0)]"
                          : "scale-[1.2] [clip-path:inset(0_0_0_100%)]"
                    }`}
                    style={{ transitionDelay: `${delay + 120}ms` }}
                  >
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      priority={index < 4}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#290526]/90 via-[#290526]/30 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                  />

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 translate-y-3 p-4 text-white opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 sm:p-5">
                    <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[#FDC868]">
                      {item.category}
                    </span>
                    <h3 className="mt-1 text-sm font-semibold leading-snug sm:text-base">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title}
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md transition-opacity duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="relative aspect-[16/10] w-full bg-black sm:aspect-[16/9]">
              <Image
                src={selectedItem.image}
                alt={selectedItem.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-contain"
              />

              <button
                type="button"
                onClick={handlePrevLightbox}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-[#490146] shadow-lg transition-transform hover:scale-110 active:scale-95 sm:left-5"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleNextLightbox}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-[#490146] shadow-lg transition-transform hover:scale-110 active:scale-95 sm:right-5"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>

            <div className="flex items-center justify-between bg-white px-6 py-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#84137C]">
                  {selectedItem.category}
                </span>
                <h4 className={`${serif.className} text-lg font-normal text-[#1F1A1C] sm:text-xl`}>
                  {selectedItem.title}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                aria-label="Close photo preview"
                className="rounded-full border border-zinc-200 p-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-black"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Gallery;