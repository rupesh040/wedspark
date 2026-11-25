"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { DM_Serif_Display, Great_Vibes, Montserrat } from "next/font/google";
import type { TestimonialVariant } from "@/data/type";

const serif = DM_Serif_Display({ subsets: ["latin"], weight: "400", display: "swap" });
const script = Great_Vibes({ subsets: ["latin"], weight: "400", display: "swap" });
const sans = Montserrat({ subsets: ["latin"], display: "swap" });

const reveal =
  "transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";
const shown = "translate-y-0 opacity-100 blur-none";
const hidden = "translate-y-3 opacity-0 blur-[3px]";

const enter = (active: boolean, step: number): CSSProperties => ({
  transitionDelay: active ? `${420 + step * 130}ms` : "0ms",
});

interface TestimonialsProps {
  data: TestimonialVariant;
}

function Laurel({
  flipped = false,
  active,
  delay,
}: {
  flipped?: boolean;
  active: boolean;
  delay: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`block shrink-0 origin-bottom transition-[opacity,transform,scale,rotate] duration-[900ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${
        active
          ? "rotate-0 scale-100 opacity-100"
          : `scale-50 opacity-0 ${flipped ? "rotate-[40deg]" : "rotate-[-40deg]"}`
      }`}
      style={{ transitionDelay: active ? delay : "0ms" }}
    >
      <svg
        className={`h-9 w-9 text-[#D89A33] sm:h-11 sm:w-11 ${flipped ? "scale-x-[-1]" : ""}`}
        viewBox="0 0 36 36"
        fill="currentColor"
      >
        <path d="M28 32c-2-6-6-12-12-16-1.5-1-3.2-1.8-5-2.2 1.2 2.2 2.8 4.2 4.7 5.8 4 3.5 7.8 7.8 8.8 12.4.2.3.4.3.5 0z" />
        <path d="M10.8 11.2c2.2.4 4.3 1.5 5.8 3.1 1.8-2.6 2.8-5.7 3-8.9-2.7.5-5.1 2.1-6.7 4.3-.8 1-.9 1.3-2.1 1.5z" />
        <path d="M6 17.5c1.9 1.4 4.3 2 6.6 1.7-.2-3.1 1-6.1 3.2-8.3-2.6-.6-5.4.1-7.4 1.8-1.5 1.3-2 2.9-2.4 4.8z" />
        <path d="M6.5 25.2c2.4.6 4.9.1 7-1.3-.9-2.8-.7-5.9.6-8.5-2.6.4-5 2-6.3 4.3-.9 1.6-1.4 3.6-1.3 5.5z" />
        <path d="M19.5 5.2c1.4-1.8 3.4-3 5.7-3.4-.2 2.5-1.4 4.8-3.3 6.3-1.4.3-2.3-.9-2.4-2.9z" />
      </svg>
    </span>
  );
}

function Arrow({
  direction,
  label,
  onClick,
  className = "",
}: {
  direction: "prev" | "next";
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`group flex h-10 w-10 items-center justify-center rounded-full bg-[#A30B72] text-white shadow-[0_10px_24px_rgba(163,11,114,0.32)] transition-all duration-300 hover:scale-110 hover:bg-[#BA0D84] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BA0D84] focus-visible:ring-offset-2 active:scale-95 lg:h-12 lg:w-12 ${className}`}
    >
      <svg
        className={`h-5 w-5 transition-transform duration-300 ${
          direction === "prev" ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={direction === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
        />
      </svg>
    </button>
  );
}

export default function Testimonials({ data }: TestimonialsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const animRef = useRef<Animation | null>(null);
  const pausedRef = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const [inView, setInView] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = data.items.length;
  const autoplay = Boolean(data.sliderSettings.autoplay) && total > 1;
  const duration = data.sliderSettings.autoplayInterval || 6000;

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  useEffect(() => {
    if (!autoplay || !inView) return;
    const bar = barRefs.current[currentIndex];
    if (!bar) return;
    const animation = bar.animate(
      [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
      { duration, easing: "linear", fill: "forwards" }
    );
    if (pausedRef.current) animation.pause();
    animation.onfinish = () => handleNext();
    animRef.current = animation;
    return () => {
      animation.onfinish = null;
      animation.cancel();
      animRef.current = null;
    };
  }, [autoplay, inView, currentIndex, duration, handleNext]);

  if (total === 0) return null;

  const headingParts = [
    { text: (data.headingPart1 ?? "").trim(), highlight: false },
    { text: (data.headingHighlight ?? "").trim(), highlight: true },
    { text: (data.headingPart2 ?? "").trim(), highlight: false },
  ].filter((part) => part.text);

  return (
    <section
      ref={sectionRef}
      id="testimonial"
      className="relative overflow-hidden bg-[#FDF7FB] py-16"
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 origin-bottom-left rounded-full bg-gradient-to-tr from-[#F7E6F2] to-[#FBEFF7] transition-transform duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:h-80 sm:w-80 ${
          inView ? "scale-100" : "scale-0"
        }`}
      />

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
            {headingParts.map((part, i) => (
              <span key={i} className="block overflow-hidden pb-2">
                <span
                  className={`block transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    part.highlight ? "text-[#BA0D84]" : "text-[#1F1A1C]"
                  } ${inView ? "translate-y-0" : "translate-y-full"}`}
                  style={{ transitionDelay: `${300 + i * 150}ms` }}
                >
                  {part.text}
                </span>
              </span>
            ))}
          </h2>

          <p
            className={`${sans.className} mx-auto mt-2 max-w-2xl text-[14px] font-medium leading-[1.75] text-[#4B4E6B] transition-all delay-500 duration-[1000ms] ease-out motion-reduce:transition-none sm:text-[15.5px] ${
              inView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            {data.description}
          </p>
        </div>

        <div
          className="mt-10 sm:mt-12"
          onMouseEnter={() => {
            pausedRef.current = true;
            animRef.current?.pause();
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
            animRef.current?.play();
          }}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const diff = touchStartX.current - e.changedTouches[0].clientX;
            if (diff > 50) handleNext();
            if (diff < -50) handlePrev();
            touchStartX.current = null;
          }}
        >
          <div className="relative lg:px-[76px]">
            <div
              className={`absolute inset-y-0 left-0 z-30 hidden items-center transition-[opacity,transform,scale] duration-[900ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] [transition-delay:1000ms] motion-reduce:transition-none lg:flex ${
                inView ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
            >
              <Arrow
                direction="prev"
                label={data.ariaLabels.prevTestimonial}
                onClick={handlePrev}
              />
            </div>

            <div
              className={`absolute inset-y-0 right-0 z-30 hidden items-center transition-[opacity,transform,scale] duration-[900ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] [transition-delay:1100ms] motion-reduce:transition-none lg:flex ${
                inView ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
            >
              <Arrow
                direction="next"
                label={data.ariaLabels.nextTestimonial}
                onClick={handleNext}
              />
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center">
              <div
                className={`relative z-10 aspect-[4/3] w-full shrink-0 overflow-hidden rounded-[24px] shadow-[0_22px_50px_rgba(73,1,70,0.12)] transition-opacity duration-[900ms] ease-out motion-reduce:transition-none sm:aspect-[16/10] sm:rounded-[32px] lg:aspect-[41/25] lg:w-[58%] ${
                  inView ? "opacity-100" : "opacity-0"
                }`}
              >
                <div
                  className={`absolute inset-0 transition-[clip-path] delay-200 duration-[1500ms] ease-[cubic-bezier(0.77,0,0.175,1)] motion-reduce:transition-none ${
                    inView ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_100%_0_0)]"
                  }`}
                >
                  {data.items.map((item, index) => {
                    const active = index === currentIndex && inView;
                    return (
                      <div
                        key={item.id}
                        aria-hidden={!active}
                        className={`absolute inset-0 transition-[opacity,transform,scale,clip-path] duration-[1300ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                          active
                            ? "z-10 scale-100 opacity-100 delay-[250ms] [clip-path:inset(0_0_0_0)]"
                            : "z-0 scale-[1.12] opacity-0 delay-[1300ms] [clip-path:inset(6%_6%_6%_6%)]"
                        }`}
                      >
                        <Image
                          src={item.image}
                          alt={item.imageAlt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 740px"
                          priority={index === 0}
                          className="object-cover object-center"
                        />
                      </div>
                    );
                  })}

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-1/4 bg-gradient-to-l from-white/30 to-transparent lg:block"
                  />
                </div>
              </div>

              <div
                className={`relative z-20 -mt-8 mx-4 rounded-[22px] bg-[linear-gradient(to_bottom_left,#BA0D84_0%,rgba(186,13,132,0.1)_14%,rgba(186,13,132,0.1)_86%,#BA0D84_100%)] p-[2px] shadow-[0_24px_55px_rgba(73,1,70,0.12)] transition-[opacity,transform,translate] delay-500 duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:mx-8 sm:rounded-[26px] lg:mt-0 lg:mr-0 lg:-ml-20 lg:flex-1 ${
                  inView ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                }`}
              >
                <div className="rounded-[20px] bg-white px-6 py-8 sm:rounded-[24px] sm:px-10 sm:py-9">
                  <div className="mb-4 flex items-center justify-center gap-4 sm:mb-5">
                    <span
                      aria-hidden="true"
                      className={`h-[1.5px] w-14 origin-right bg-[#B9A2D1] transition-transform duration-[1000ms] ease-[cubic-bezier(0.65,0,0.35,1)] [transition-delay:900ms] motion-reduce:transition-none sm:w-20 lg:w-24 ${
                        inView ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                    <span
                      aria-hidden="true"
                      className={`${serif.className} block h-8 select-none text-[56px] leading-[1.1] text-[#A30B72] transition-[opacity,transform,scale] duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] [transition-delay:800ms] motion-reduce:transition-none ${
                        inView ? "scale-100 opacity-100" : "scale-50 opacity-0"
                      }`}
                    >
                      “
                    </span>
                    <span
                      aria-hidden="true"
                      className={`h-[1.5px] w-14 origin-left bg-[#B9A2D1] transition-transform duration-[1000ms] ease-[cubic-bezier(0.65,0,0.35,1)] [transition-delay:900ms] motion-reduce:transition-none sm:w-20 lg:w-24 ${
                        inView ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </div>

                  <div className="grid">
                    {data.items.map((item, index) => {
                      const active = index === currentIndex && inView;
                      return (
                        <div
                          key={item.id}
                          aria-hidden={!active}
                          className={`col-start-1 row-start-1 flex flex-col items-center text-center ${
                            active ? "" : "pointer-events-none"
                          }`}
                        >
                          <p
                            className={`${sans.className} ${reveal} max-w-[30rem] text-[14.5px] font-medium leading-[1.75] text-[#2A2D4A] sm:text-[16px] lg:text-[17px] ${
                              active ? shown : hidden
                            }`}
                            style={enter(active, 0)}
                          >
                            {item.quote}
                          </p>

                          <div className="mt-6 flex items-center justify-center gap-3 sm:mt-7 sm:gap-5">
                            <Laurel active={active} delay={`${420 + 130}ms`} />
                            <h3
                              className={`${script.className} ${reveal} select-none text-[30px] font-normal leading-tight text-[#A30B72] sm:text-[36px] ${
                                active ? shown : hidden
                              }`}
                              style={enter(active, 1)}
                            >
                              {item.names}
                            </h3>
                            <Laurel flipped active={active} delay={`${420 + 130}ms`} />
                          </div>

                          <span
                            className={`${sans.className} ${reveal} mt-1.5 block text-[13px] font-medium tracking-wide text-[#5B5E78] sm:text-[14.5px] ${
                              active ? shown : hidden
                            }`}
                            style={enter(active, 2)}
                          >
                            {item.event}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`mt-10 flex items-center justify-center gap-5 transition-all duration-[900ms] ease-out [transition-delay:1100ms] motion-reduce:transition-none ${
              inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <Arrow
              direction="prev"
              label={data.ariaLabels.prevTestimonial}
              onClick={handlePrev}
              className="lg:hidden"
            />

            <div className="flex items-center gap-2.5">
              {data.items.map((item, index) => {
                const active = index === currentIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`${data.ariaLabels.goToTestimonial} ${index + 1}`}
                    aria-current={active ? "true" : undefined}
                    className={`relative h-2.5 overflow-hidden rounded-full transition-[width,background-color] duration-500 ease-out ${
                      active
                        ? "w-9 bg-[#E6CFE3]"
                        : "w-2.5 bg-[#D9C4E3] hover:bg-[#BA0D84]/50"
                    }`}
                  >
                    {active && (
                      <span
                        ref={(el) => {
                          barRefs.current[index] = el;
                        }}
                        className="absolute inset-0 origin-left rounded-full bg-[#A30B72]"
                        style={{ transform: `scaleX(${autoplay ? 0 : 1})` }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <Arrow
              direction="next"
              label={data.ariaLabels.nextTestimonial}
              onClick={handleNext}
              className="lg:hidden"
            />
          </div>
        </div>
      </div>
    </section>
  );
}