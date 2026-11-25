"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { EB_Garamond, Playfair_Display } from "next/font/google";
import type { StatsVariant } from "@/data/type";

const display = Playfair_Display({ subsets: ["latin"], weight: "700", display: "swap" });
const serif = EB_Garamond({ subsets: ["latin"], weight: "500", display: "swap" });

interface StatsProps {
  data: StatsVariant;
}

type Parsed = NonNullable<ReturnType<typeof parseValue>>;

function parseValue(value: string) {
  const match = value.match(/^(\D*)(\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const numeric = match[2];
  return {
    prefix: match[1],
    suffix: match[3],
    target: parseFloat(numeric.replace(/,/g, "")),
    decimals: numeric.includes(".") ? numeric.split(".")[1].length : 0,
    grouped: numeric.includes(","),
  };
}

function format(parsed: Parsed, amount: number) {
  const body = amount.toLocaleString("en-US", {
    minimumFractionDigits: parsed.decimals,
    maximumFractionDigits: parsed.decimals,
    useGrouping: parsed.grouped,
  });
  return `${parsed.prefix}${body}${parsed.suffix}`;
}

function CountUp({ value, active, delay }: { value: string; active: boolean; delay: number }) {
  const parsed = useMemo(() => parseValue(value), [value]);
  const [display, setDisplay] = useState(() => (parsed ? format(parsed, 0) : value));

  useEffect(() => {
    if (!active || !parsed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(id);
    }
    let frame = 0;
    const duration = 1900;
    const begin = performance.now() + delay;
    const tick = (now: number) => {
      const t = Math.min(Math.max((now - begin) / duration, 0), 1);
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(t === 1 ? value : format(parsed, parsed.target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, parsed, value, delay]);

  return (
    <span className="grid place-items-center">
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {value}
      </span>
      <span aria-hidden="true" className="col-start-1 row-start-1">
        {display}
      </span>
    </span>
  );
}

function IconFrame({
  active,
  delay,
  children,
}: {
  active: boolean;
  delay: number;
  children: ReactNode;
}) {
  return (
    <div
      className="relative flex shrink-0 items-center justify-center"
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      <span
        aria-hidden="true"
        className={`absolute -right-1.5 -top-1.5 h-8 w-8 rounded-full bg-[#FCEBE4] transition-transform duration-[900ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] [transition-delay:var(--d)] motion-reduce:transition-none sm:h-9 sm:w-9 xl:h-11 xl:w-11 ${
          active ? "scale-100" : "scale-0"
        }`}
      />
      <svg
        viewBox="0 0 40 40"
        fill="none"
        className={`relative h-9 w-9 sm:h-10 sm:w-10 xl:h-12 xl:w-12 [&_*]:transition-[stroke-dashoffset] [&_*]:duration-[1400ms] [&_*]:ease-out [&_*]:[stroke-dasharray:80] [&_*]:[transition-delay:var(--d)] [&_circle[fill]]:transition-opacity [&_circle[fill]]:duration-700 [&_circle[fill]]:[transition-delay:calc(var(--d)+900ms)] motion-reduce:[&_*]:transition-none ${
          active
            ? "[&_*]:[stroke-dashoffset:0] [&_circle[fill]]:opacity-100"
            : "[&_*]:[stroke-dashoffset:82] [&_circle[fill]]:opacity-0"
        }`}
      >
        {children}
      </svg>
    </div>
  );
}

function iconPaths(icon: string): ReactNode {
  switch (icon) {
    case "rings-heart":
      return (
        <>
          <circle cx="16" cy="24" r="7.5" stroke="#490146" strokeWidth="2.2" />
          <circle cx="25" cy="24" r="7.5" stroke="#490146" strokeWidth="2.2" />
          <path
            d="M20.5 7.5 C19 5.5 16 6 16 8.5 C16 11.5 20.5 14 20.5 14 C20.5 14 25 11.5 25 8.5 C25 6 22 5.5 20.5 7.5 Z"
            stroke="#D89A33"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M14 6 L12 4" stroke="#D89A33" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M27 6 L29 4" stroke="#D89A33" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M20.5 3 L20.5 1" stroke="#D89A33" strokeWidth="1.8" strokeLinecap="round" />
        </>
      );
    case "users":
      return (
        <>
          <circle cx="20" cy="14" r="4.8" stroke="#490146" strokeWidth="2.2" />
          <path
            d="M12 28 C12 23.5 15.5 21 20 21 C24.5 21 28 23.5 28 28"
            stroke="#490146"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="11" cy="16" r="3.2" stroke="#490146" strokeWidth="1.8" />
          <path d="M6 27 C6 24 8 22 11 22" stroke="#490146" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="29" cy="16" r="3.2" stroke="#490146" strokeWidth="1.8" />
          <path d="M34 27 C34 24 32 22 29 22" stroke="#490146" strokeWidth="1.8" strokeLinecap="round" />
        </>
      );
    case "map-pin":
      return (
        <>
          <path
            d="M20 7 C15.5 7 12 10.5 12 15 C12 21 20 28 20 28 C20 28 28 21 28 15 C28 10.5 24.5 7 20 7 Z"
            stroke="#490146"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="15" r="3" stroke="#D89A33" strokeWidth="2" />
          <path d="M10 32 L30 32" stroke="#490146" strokeWidth="2" strokeLinecap="round" />
          <path d="M15 28 L10 32" stroke="#490146" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M25 28 L30 32" stroke="#490146" strokeWidth="1.8" strokeLinecap="round" />
        </>
      );
    case "thumbs-up":
      return (
        <>
          <path
            d="M14 20 L14 30 L10 30 C8.9 30 8 29.1 8 28 L8 22 C8 20.9 8.9 20 10 20 L14 20 Z"
            stroke="#490146"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M14 20 L18 11 C18.8 9.5 21 10.5 21 12.5 L21 16 L27 16 C28.5 16 29.5 17.5 29 19 L26.5 27 C26.2 28 25.2 28.8 24 28.8 L14 28.8"
            stroke="#490146"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M22 6 L22 4" stroke="#D89A33" strokeWidth="2" strokeLinecap="round" />
          <path d="M27 8 L29 7" stroke="#D89A33" strokeWidth="2" strokeLinecap="round" />
          <path d="M17 8 L15 7" stroke="#D89A33" strokeWidth="2" strokeLinecap="round" />
        </>
      );
    case "calendar":
      return (
        <>
          <rect x="10" y="12" width="20" height="18" rx="3" stroke="#490146" strokeWidth="2.2" />
          <path d="M10 18 L30 18" stroke="#490146" strokeWidth="1.8" />
          <path d="M15 8 L15 12" stroke="#D89A33" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M25 8 L25 12" stroke="#D89A33" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="15" cy="22" r="1" fill="#490146" />
          <circle cx="20" cy="22" r="1" fill="#490146" />
          <circle cx="25" cy="22" r="1" fill="#490146" />
          <circle cx="15" cy="26" r="1" fill="#490146" />
          <circle cx="20" cy="26" r="1" fill="#490146" />
          <circle cx="25" cy="26" r="1" fill="#490146" />
        </>
      );
    default:
      return null;
  }
}

function StatIcon({ icon, active, delay }: { icon: string; active: boolean; delay: number }) {
  const paths = iconPaths(icon);
  if (!paths) return null;
  return (
    <IconFrame active={active} delay={delay}>
      {paths}
    </IconFrame>
  );
}

export function Stats({ data }: StatsProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const count = data.items?.length ?? 0;

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
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [count]);

  if (!data.items || data.items.length === 0) {
    return null;
  }

  return (
    <section ref={ref} className="bg-white py-18">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-y-0">
          {data.items.map((stat, index) => {
            const isLast = index === data.items.length - 1;
            const delay = index * 140;

            return (
              <div key={stat.id} className={`relative ${isLast ? "col-span-2 sm:col-span-1" : ""}`}>
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className={`absolute inset-y-1 right-0 hidden w-px origin-top bg-[#E4D9E2] transition-transform duration-[1100ms] ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none lg:block ${
                      inView ? "scale-y-100" : "scale-y-0"
                    }`}
                    style={{ transitionDelay: `${delay}ms` }}
                  />
                )}

                <div className="group flex flex-col items-center justify-center px-3 transition-transform duration-300 ease-out hover:-translate-y-1 sm:px-4">
                  <div className="grid grid-cols-[auto_auto] items-center gap-x-2.5 sm:gap-x-3.5">
                    <span
                      className={`${display.className} block whitespace-nowrap text-3xl font-bold leading-[1.1] tracking-tight text-[#490146] transition-opacity duration-700 ease-out motion-reduce:transition-none sm:text-4xl lg:text-[32px] xl:text-[42px] ${
                        inView ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ transitionDelay: `${delay}ms` }}
                    >
                      <CountUp value={String(stat.value)} active={inView} delay={delay} />
                    </span>

                    <div className="transition-transform duration-300 ease-out group-hover:scale-110">
                      <StatIcon icon={stat.icon} active={inView} delay={delay + 250} />
                    </div>

                    <span
                      aria-hidden="true"
                      className={`col-start-1 mt-3 h-[3px] w-9 origin-center justify-self-center rounded-full bg-[#D89A33] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:mt-3.5 sm:w-10 ${
                        inView ? "scale-x-100" : "scale-x-0"
                      }`}
                      style={{ transitionDelay: `${delay + 700}ms` }}
                    />
                  </div>

                  <p
                    className={`${serif.className} mt-3 text-center text-[15px] leading-tight text-[#1F1A1C] transition-[opacity,transform,translate,filter] duration-[900ms] ease-out motion-reduce:transition-none sm:mt-3.5 sm:text-[16px] lg:text-[17px] xl:text-[19px] ${
                      inView
                        ? "translate-y-0 opacity-100 blur-none"
                        : "translate-y-2 opacity-0 blur-[3px]"
                    }`}
                    style={{ transitionDelay: `${delay + 900}ms` }}
                  >
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Stats;