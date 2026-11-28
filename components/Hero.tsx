"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { HeroVariant } from "@/data/type";

interface HeroProps {
  data: HeroVariant;
}

type Slide = HeroVariant["slides"][number];

const arrowSvgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

function ArrowIcon({
  direction,
  className = "h-5 w-5",
}: {
  direction: "prev" | "next";
  className?: string;
}) {
  const isNext = direction === "next";
  const path = isNext ? (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ) : (
    <>
      <path d="M19 12H5" />
      <path d="m11 18-6-6 6-6" />
    </>
  );

  return (
    <span className={`relative block overflow-hidden ${className}`}>
      <svg
        {...arrowSvgProps}
        className={`absolute inset-0 h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isNext ? "group-hover:translate-x-full" : "group-hover:-translate-x-full"
        }`}
      >
        {path}
      </svg>
      <svg
        {...arrowSvgProps}
        className={`absolute inset-0 h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 ${
          isNext ? "-translate-x-full" : "translate-x-full"
        }`}
      >
        {path}
      </svg>
    </span>
  );
}

function SlideContent({ slide, active }: { slide: Slide; active: boolean }) {
  const ease = "ease-[cubic-bezier(0.16,1,0.3,1)]";
  const dur = active ? "duration-[1400ms]" : "duration-500";
  const delay = (ms: number) => ({ transitionDelay: active ? `${ms}ms` : "0ms" });

  return (
    <div
      aria-hidden={!active}
      className={`col-start-1 row-start-1 w-full min-w-0 max-w-3xl text-left ${
        active ? "" : "pointer-events-none"
      }`}
    >
      <div className="mb-4 sm:mb-5">
        <p
          style={delay(150)}
          className={`whitespace-nowrap font-serif text-[12px] font-medium uppercase text-[#EA9AD5] transition-all ${dur} ${ease} motion-reduce:transition-none sm:text-sm md:text-base xl:text-[19px] ${
            active
              ? "translate-y-0 tracking-[0.3em] opacity-100 blur-0"
              : "translate-y-3 tracking-[0.4em] opacity-0 blur-[6px]"
          }`}
        >
          {slide.subtitle}
        </p>

        <div className="mt-3 flex items-center gap-1">
          <span
            aria-hidden="true"
            style={delay(400)}
            className={`h-[1.5px] w-28 origin-left bg-[#CB995A]/85 transition-transform duration-[1600ms] ${ease} motion-reduce:transition-none sm:w-40 lg:w-60 ${
              active ? "scale-x-100" : "scale-x-0 !duration-500"
            }`}
          />
          <svg
            viewBox="0 0 46 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-5 w-11 overflow-visible text-[#CB995A] sm:h-6 sm:w-14"
            aria-hidden="true"
          >
            <circle
              cx="16"
              cy="11"
              r="8.5"
              style={delay(1100)}
              className={`transition-all ${dur} ${ease} motion-reduce:transition-none ${
                active ? "translate-x-0 opacity-100" : "-translate-x-[14px] opacity-0"
              }`}
            />
            <circle
              cx="28"
              cy="11"
              r="8.5"
              style={delay(1100)}
              className={`transition-all ${dur} ${ease} motion-reduce:transition-none ${
                active ? "translate-x-0 opacity-100" : "translate-x-[14px] opacity-0"
              }`}
            />
          </svg>
        </div>
      </div>

      <h1 className="font-serif text-[clamp(1.25rem,6.4vw,3.625rem)] font-bold leading-[1.2] tracking-tight text-white">
        <span className="block pb-[0.12em]">
          <span
            style={delay(300)}
            className={`block whitespace-nowrap transition-all ${dur} ${ease} motion-reduce:transition-none ${
              active
                ? "translate-x-0 opacity-100 blur-0 [clip-path:inset(-0.2em_-0.2em_-0.2em_0)]"
                : "translate-x-6 opacity-0 blur-[8px] [clip-path:inset(-0.2em_100%_-0.2em_0)]"
            }`}
          >
            {slide.headingLine1}
          </span>
        </span>
        <span className="block pb-[0.12em]">
          <span
            style={delay(480)}
            className={`block whitespace-nowrap transition-all ${dur} ${ease} motion-reduce:transition-none ${
              active
                ? "translate-x-0 opacity-100 blur-0 [clip-path:inset(-0.2em_-0.2em_-0.2em_0)]"
                : "translate-x-6 opacity-0 blur-[8px] [clip-path:inset(-0.2em_100%_-0.2em_0)]"
            }`}
          >
            {slide.headingPrefix}
            <span
              style={{ transitionDelay: active ? "1500ms" : "0ms" }}
              className={`bg-[linear-gradient(100deg,#f5a905_0%,#f5a905_40%,#ffe29a_50%,#f5a905_60%,#f5a905_100%)] bg-[length:250%_100%] bg-clip-text text-transparent transition-[background-position] ease-in-out motion-reduce:transition-none ${
                active
                  ? "bg-[position:0_0] duration-[2000ms]"
                  : "bg-[position:100%_0] duration-0"
              }`}
            >
              {slide.headingHighlight}
            </span>
            {slide.headingSuffix}
          </span>
        </span>
      </h1>

      <p
        style={delay(800)}
        className={`mt-4 max-w-xl text-sm leading-relaxed text-white/95 transition-all ${dur} ${ease} motion-reduce:transition-none sm:mt-5 sm:text-base md:text-[16.5px] ${
          active
            ? "translate-y-0 opacity-100 blur-0"
            : "translate-y-4 opacity-0 blur-[6px]"
        }`}
      >
        {slide.description}
      </p>
    </div>
  );
}

export function Hero({ data }: HeroProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [ready, setReady] = useState<boolean>(false);
  const isPausedRef = useRef<boolean>(false);
  const touchStartX = useRef<number | null>(null);
  const ringRef = useRef<SVGCircleElement | null>(null);

  const slidesCount = data.slides.length;
  const autoplayEnabled = data.sliderSettings.autoplay && slidesCount > 1;
  const autoplayInterval = data.sliderSettings.autoplayInterval;

  const handleNext = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % slidesCount);
  }, [slidesCount]);

  const handlePrev = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + slidesCount) % slidesCount);
  }, [slidesCount]);

  useEffect(() => {
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setReady(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, []);

  useEffect(() => {
    if (!autoplayEnabled) return;

    let frame = 0;
    let last = performance.now();
    let elapsed = 0;

    ringRef.current?.style.setProperty("stroke-dashoffset", "1");

    const tick = (now: number) => {
      const delta = Math.min(now - last, 100);
      last = now;
      if (!isPausedRef.current) elapsed += delta;

      const progress = Math.min(elapsed / autoplayInterval, 1);
      ringRef.current?.style.setProperty("stroke-dashoffset", String(1 - progress));

      if (progress >= 1) {
        handleNext();
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [autoplayEnabled, autoplayInterval, currentSlideIndex, handleNext]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  if (!data.slides || data.slides.length === 0) {
    return null;
  }

  return (
    <section
      id="home"
      aria-label="Hero Carousel"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") isPausedRef.current = true;
      }}
      onPointerLeave={() => {
        isPausedRef.current = false;
      }}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const deltaX = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(deltaX) > 50) {
          if (deltaX < 0) {
            handleNext();
          } else {
            handlePrev();
          }
        }
      }}
      className="relative h-[700px] min-h-[700px] max-h-[700px] w-full shrink-0 grow-0 overflow-hidden bg-[#290526]"
    >
      <div className="pointer-events-none absolute inset-0 select-none">
        {data.slides.map((slide, index) => {
          const isActive = index === currentSlideIndex;
          return (
            <div
              key={slide.id}
              aria-hidden={!isActive}
              className={`absolute inset-0 [transition:opacity_1600ms_cubic-bezier(0.4,0,0.2,1),transform_10000ms_cubic-bezier(0.16,1,0.3,1)] motion-reduce:scale-100 ${
                isActive
                  ? "z-10 scale-100 opacity-100"
                  : "pointer-events-none z-0 scale-[1.12] opacity-0"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="pointer-events-none select-none object-cover object-center"
              />
            </div>
          );
        })}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-[#290526]/40 lg:bg-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-[#290526]/95 via-[#290526]/75 via-45% to-transparent lg:w-[65%]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/50 via-transparent to-black/20"
      />

      <div className="pointer-events-none absolute inset-0 z-30">
        <div className="mx-auto flex h-full max-w-[1280px] items-center px-4 py-10 sm:px-6 sm:py-14 lg:pl-24 lg:pr-8 lg:py-18 min-[1440px]:pl-8">
          <div className="grid w-full grid-cols-[minmax(0,1fr)]">
            {data.slides.map((slide, index) => (
              <SlideContent
                key={slide.id}
                slide={slide}
                active={ready && index === currentSlideIndex}
              />
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handlePrev}
        aria-label={data.ariaLabels.prevSlide}
        className="group absolute left-6 top-1/2 z-40 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#5C246E] shadow-xl shadow-black/30 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D89A33] active:scale-95 lg:flex"
      >
        <ArrowIcon direction="prev" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        aria-label={data.ariaLabels.nextSlide}
        className="group absolute right-6 top-1/2 z-40 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#5C246E] shadow-xl shadow-black/30 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D89A33] active:scale-95 lg:flex"
      >
        <ArrowIcon direction="next" />
      </button>

      <div className="absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 sm:bottom-5 sm:gap-4 lg:gap-0">
        <button
          type="button"
          onClick={handlePrev}
          aria-label={data.ariaLabels.prevSlide}
          className="group flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#5C246E] shadow-lg shadow-black/30 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D89A33] active:scale-90 lg:hidden"
        >
          <ArrowIcon direction="prev" className="h-4 w-4" />
        </button>

        <div className="flex items-center">
          {data.slides.map((slide, index) => {
            const isActive = index === currentSlideIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentSlideIndex(index)}
                aria-label={`${data.ariaLabels.goToSlide} ${index + 1}`}
                aria-current={isActive ? "true" : undefined}
                className="group relative flex h-6 w-6 items-center justify-center focus:outline-none"
              >
                <span
                  className={`block h-2.5 w-2.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-visible:ring-2 group-focus-visible:ring-[#D89A33] ${
                    isActive
                      ? "scale-110 bg-[#5C246E] ring-1 ring-white/60"
                      : "bg-white group-hover:scale-125"
                  }`}
                />
                {isActive && autoplayEnabled && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="1.6"
                    className="pointer-events-none absolute inset-0 -rotate-90"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10.5" stroke="white" strokeOpacity="0.25" />
                    <circle
                      ref={ringRef}
                      cx="12"
                      cy="12"
                      r="10.5"
                      stroke="#D89A33"
                      pathLength={1}
                      className="[stroke-dasharray:1]"
                      style={{ strokeDashoffset: 1 }}
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label={data.ariaLabels.nextSlide}
          className="group flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#5C246E] shadow-lg shadow-black/30 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D89A33] active:scale-90 lg:hidden"
        >
          <ArrowIcon direction="next" className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}

export default Hero;