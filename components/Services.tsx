"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ServiceVariant } from "@/data/type";

interface ServicesProps {
  data: ServiceVariant;
}

const ease = "ease-[cubic-bezier(0.16,1,0.3,1)]";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "h-7 w-7 shrink-0",
  "aria-hidden": true,
} as const;

function ServiceIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "rings":
      return (
        <svg {...iconProps}>
          <circle cx="8" cy="14" r="5" />
          <circle cx="16" cy="14" r="5" />
          <path d="M6 7l2-3 2 3-2 1z" />
          <circle cx="8" cy="6" r="0.8" fill="currentColor" />
        </svg>
      );
    case "cake":
      return (
        <svg {...iconProps}>
          <path d="M20 21v-3a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
          <path d="M17 16v-4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v4" />
          <path d="M14 10V7a2 2 0 0 0-2-2h0a2 2 0 0 0-2 2v3" />
          <path d="M12 5V2" />
          <line x1="2" y1="21" x2="22" y2="21" />
        </svg>
      );
    case "lotus":
      return (
        <svg {...iconProps}>
          <path d="M12 3c-1.5 3-1.5 6 0 9 1.5-3 1.5-6 0-9z" />
          <path d="M12 12c-3-2-6-1.5-8 2 2.5 3 6.5 3 8-2z" />
          <path d="M12 12c3-2 6-1.5 8 2-2.5 3-6.5 3-8-2z" />
          <path d="M12 12c-2.5-4-5-5-7-4 1 3 4 5 7 4z" />
          <path d="M12 12c2.5-4 5-5 7-4-1 3-4 5-7 4z" />
        </svg>
      );
    case "champagne":
      return (
        <svg {...iconProps}>
          <path d="M7 3l4 7v6a2 2 0 0 1-2 2H6" />
          <path d="M17 3l-4 7v6a2 2 0 0 0 2 2h3" />
          <path d="M6 3h5" />
          <path d="M13 3h5" />
          <circle cx="12" cy="7" r="0.75" fill="currentColor" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...iconProps}>
          <rect x="3" y="4" width="18" height="17" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <path d="M12 12.5l1 2 2.2.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2-1.6-1.5 2.2-.3z" />
        </svg>
      );
    case "tent":
      return (
        <svg {...iconProps}>
          <path d="M3 21h18" />
          <path d="M12 3L2 11h20L12 3z" />
          <path d="M4 11v10" />
          <path d="M20 11v10" />
          <path d="M12 11v10" />
          <path d="M8 11c0 5-4 10-4 10" />
          <path d="M16 11c0 5 4 10 4 10" />
        </svg>
      );
    default:
      return null;
  }
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState<boolean>(() => {
    return typeof window !== "undefined" && typeof IntersectionObserver === "undefined";
  });

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

export function Services({ data }: ServicesProps) {
  const { ref, inView } = useInView<HTMLElement>();

  const defaultIndex = data.items.findIndex(
    (item) => item.id === (data.defaultActiveId ?? "event-decoration")
  );
  const [activeIndex, setActiveIndex] = useState<number>(
    defaultIndex >= 0 ? defaultIndex : 0
  );
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [indicator, setIndicator] = useState<{ y: number; h: number }>({ y: 0, h: 0 });

  const listRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const touchStartX = useRef<number | null>(null);

  const itemsCount = data.items.length;

  const goTo = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      setPrevIndex(activeIndex);
      setActiveIndex(index);
    },
    [activeIndex]
  );

  const handleNext = useCallback(() => {
    goTo((activeIndex + 1) % itemsCount);
  }, [goTo, activeIndex, itemsCount]);

  const handlePrev = useCallback(() => {
    goTo((activeIndex - 1 + itemsCount) % itemsCount);
  }, [goTo, activeIndex, itemsCount]);

  useEffect(() => {
    const measure = () => {
      const el = itemRefs.current[activeIndex];
      if (!el) return;
      setIndicator({ y: el.offsetTop, h: el.offsetHeight });
    };

    measure();
    document.fonts?.ready.then(measure);

    const list = listRef.current;
    if (typeof ResizeObserver === "undefined" || !list) return;
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [activeIndex]);

  if (!data.items || data.items.length === 0) {
    return null;
  }

  const delay = (ms: number) => ({ transitionDelay: `${ms}ms` });

  const wipe = inView
    ? "translate-x-0 opacity-100 blur-none [clip-path:inset(-0.2em_-0.2em_-0.2em_0)]"
    : "translate-x-6 opacity-0 blur-[8px] [clip-path:inset(-0.2em_100%_-0.2em_0)]";

  return (
    <section
      ref={ref}
      id="service"
      className="overflow-hidden bg-white py-16 "
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <span
              aria-hidden="true"
              style={delay(0)}
              className={`h-[1.5px] w-12 origin-right bg-[#D89A33] transition-transform duration-[1400ms] ${ease} motion-reduce:transition-none sm:w-20 ${
                inView ? "scale-x-100" : "scale-x-0"
              }`}
            />
            <span
              style={delay(250)}
              className={`text-[13px] font-bold uppercase tracking-[0.2em] text-[#84137C] transition-all duration-[1200ms] ${ease} motion-reduce:transition-none sm:text-sm ${
                inView ? "translate-y-0 opacity-100 blur-none" : "translate-y-3 opacity-0 blur-[6px]"
              }`}
            >
              {data.tagline}
            </span>
            <span
              aria-hidden="true"
              style={delay(0)}
              className={`h-[1.5px] w-12 origin-left bg-[#D89A33] transition-transform duration-[1400ms] ${ease} motion-reduce:transition-none sm:w-20 ${
                inView ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </div>

          <h2 className="mx-auto mt-4 max-w-4xl text-balance font-serif text-[clamp(1.75rem,5.6vw,3.125rem)] font-bold leading-[1.18] tracking-tight">
            <span className="block pb-[0.1em]">
              <span
                style={delay(350)}
                className={`block transition-all duration-[1400ms] ${ease} motion-reduce:transition-none ${wipe}`}
              >
                <span className="text-[#2A0628]">{data.headingPart1}</span>{" "}
                <span
                  style={{ transitionDelay: inView ? "1500ms" : "0ms" }}
                  className={`bg-[linear-gradient(100deg,#BA0D84_0%,#BA0D84_40%,#F27BCB_50%,#BA0D84_60%,#BA0D84_100%)] bg-[length:250%_100%] bg-clip-text text-transparent transition-[background-position] ease-in-out motion-reduce:transition-none ${
                    inView ? "bg-[position:0_0] duration-[2000ms]" : "bg-[position:100%_0] duration-0"
                  }`}
                >
                  {data.headingHighlight}
                </span>{" "}
                <span className="text-[#2A0628]">{data.headingPart2}</span>
              </span>
            </span>
          </h2>

          <p
            style={delay(800)}
            className={`mx-auto mt-5 max-w-2xl text-[15px] leading-[1.75] text-[#3D4863] transition-all duration-[1400ms] ${ease} motion-reduce:transition-none sm:text-base ${
              inView ? "translate-y-0 opacity-100 blur-none" : "translate-y-5 opacity-0 blur-[6px]"
            }`}
          >
            {data.description}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:mt-14 lg:grid-cols-[minmax(0,3fr)_minmax(0,7fr)] lg:gap-6">
          <div
            style={delay(300)}
            className={`flex flex-col rounded-xl bg-[#510134] p-3.5 transition-all duration-[1200ms] ${ease} motion-reduce:transition-none ${
              inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <ul ref={listRef} className="relative flex flex-col">
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 z-0 transition-opacity delay-[900ms] duration-[900ms] motion-reduce:transition-none ${
                  inView ? "opacity-100" : "opacity-0"
                }`}
              >
                <div
                  style={{
                    height: indicator.h,
                    transform: `translateY(${indicator.y}px)`,
                  }}
                  className={`absolute inset-x-0 top-0 rounded-lg bg-[#FEC969] shadow-md shadow-black/20 transition-[transform,height] duration-700 ${ease} motion-reduce:transition-none`}
                />
              </div>

              {data.items.map((item, index) => {
                const isActive = index === activeIndex;
                const hideDivider = isActive || index + 1 === activeIndex;
                return (
                  <li
                    key={item.id}
                    ref={(node) => {
                      itemRefs.current[index] = node;
                    }}
                    style={delay(500 + index * 90)}
                    className={`relative h-14 transition-all duration-[1100ms] ${ease} motion-reduce:transition-none lg:h-[66px] ${
                      inView ? "translate-x-0 opacity-100" : "-translate-x-5 opacity-0"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => goTo(index)}
                      aria-current={isActive ? "true" : undefined}
                      aria-label={`${data.ariaLabels.selectService}: ${item.title}`}
                      className={`group relative z-10 flex h-full w-full items-center gap-5 rounded-lg px-6 text-left text-[15px] transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FEC969] sm:text-base ${
                        isActive
                          ? "font-semibold text-[#490146]"
                          : "font-normal text-white/95 hover:bg-white/[0.07]"
                      }`}
                    >
                      <span
                        className={`inline-flex transition-all duration-500 ${ease} ${
                          isActive
                            ? "scale-110 text-[#490146]"
                            : "text-[#F4DDB0] group-hover:-translate-y-0.5"
                        }`}
                      >
                        <ServiceIcon icon={item.icon} />
                      </span>
                      <span className="grow">{item.title}</span>
                    </button>

                    {index < itemsCount - 1 && (
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute inset-x-5 bottom-0 h-px bg-white/10 transition-opacity duration-500 ${
                          hideDivider ? "opacity-0" : "opacity-100"
                        }`}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div
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
            className="relative min-h-[360px] sm:min-h-[440px] lg:min-h-0"
          >
            <div
              style={delay(450)}
              className={`absolute inset-0 overflow-hidden rounded-3xl transition-[clip-path] duration-[1600ms] ${ease} motion-reduce:transition-none ${
                inView ? "[clip-path:inset(0)]" : "[clip-path:inset(100%_0_0_0)]"
              }`}
            >
              <div
                style={delay(450)}
                className={`absolute inset-0 transition-transform duration-[2600ms] ${ease} motion-reduce:transition-none ${
                  inView ? "scale-100" : "scale-[1.12]"
                }`}
              >
                {data.items.map((item, index) => {
                  const isActive = index === activeIndex;
                  const isPrev = index === prevIndex;
                  return (
                    <div
                      key={item.id}
                      aria-hidden={!isActive}
                      className={`absolute inset-0 transition-[clip-path] duration-[1400ms] ${ease} motion-reduce:transition-none ${
                        isActive
                          ? "z-20 [clip-path:inset(0)]"
                          : isPrev
                            ? "z-10 [clip-path:inset(0)]"
                            : "pointer-events-none z-0 [clip-path:inset(100%_0_0_0)]"
                      }`}
                    >
                      <div
                        className={`absolute inset-0 transition-transform duration-[2200ms] ${ease} motion-reduce:transition-none ${
                          isActive || isPrev ? "scale-100" : "scale-[1.2]"
                        }`}
                      >
                        <Image
                          src={item.image}
                          alt={item.imageAlt}
                          fill
                          priority={index === 0 || index === defaultIndex}
                          sizes="(max-width: 1024px) 100vw, 900px"
                          className="object-cover object-center"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-t from-black/35 via-transparent to-transparent"
              />
            </div>

            <div
              style={delay(1100)}
              className={`absolute inset-y-0 left-3 z-30 flex items-center transition-all duration-[1200ms] ${ease} motion-reduce:transition-none sm:left-4 ${
                inView ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
              }`}
            >
              <button
                type="button"
                onClick={handlePrev}
                aria-label={data.ariaLabels.prevService}
                className={`group flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#BA0D84] shadow-lg shadow-black/20 transition-all duration-500 ${ease} hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FEC969] active:scale-95 sm:h-[52px] sm:w-[52px]`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`h-5 w-5 transition-transform duration-500 ${ease} group-hover:-translate-x-0.5`}
                  aria-hidden="true"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
            </div>

            <div
              style={delay(1100)}
              className={`absolute inset-y-0 right-3 z-30 flex items-center transition-all duration-[1200ms] ${ease} motion-reduce:transition-none sm:right-4 ${
                inView ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
              }`}
            >
              <button
                type="button"
                onClick={handleNext}
                aria-label={data.ariaLabels.nextService}
                className={`group flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#BA0D84] shadow-lg shadow-black/20 transition-all duration-500 ${ease} hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FEC969] active:scale-95 sm:h-[52px] sm:w-[52px]`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`h-5 w-5 transition-transform duration-500 ${ease} group-hover:translate-x-0.5`}
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-4 z-30 flex justify-center sm:bottom-5">
              <div
                style={delay(1300)}
                className={`pointer-events-auto flex items-center transition-all duration-[1200ms] ${ease} motion-reduce:transition-none ${
                  inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
              >
                {data.items.map((item, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => goTo(index)}
                      aria-label={item.title}
                      aria-current={isActive ? "true" : undefined}
                      className="group flex h-6 w-6 items-center justify-center focus:outline-none"
                    >
                      <span
                        className={`block h-3 w-3 rounded-full transition-all duration-500 ${ease} group-focus-visible:ring-2 group-focus-visible:ring-[#FEC969] ${
                          isActive
                            ? "scale-110 bg-[#BA0D84] ring-2 ring-white"
                            : "bg-white group-hover:scale-125"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;