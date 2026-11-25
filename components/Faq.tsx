"use client";

import { useEffect, useRef, useState } from "react";
import { DM_Serif_Display, Montserrat, Source_Serif_4 } from "next/font/google";
import type { FaqVariant } from "@/data/type";

const display = DM_Serif_Display({ subsets: ["latin"], weight: "400", display: "swap" });
const serif = Source_Serif_4({ subsets: ["latin"], weight: "600", display: "swap" });
const sans = Montserrat({ subsets: ["latin"], display: "swap" });

const FILL_ORIGIN = "calc(100% - 2.25rem) 2.25rem";

interface FaqProps {
  data: FaqVariant;
}

export default function Faq({ data }: FaqProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const defaultId = data.defaultOpenId || "1";

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
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const timer = window.setTimeout(() => {
      setOpenId((prev) => prev ?? defaultId);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [inView, defaultId]);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  if (!data.items || data.items.length === 0) return null;

  const headingParts = [
    { text: (data.headingPart1 ?? "").trim(), highlight: false },
    { text: (data.headingHighlight ?? "").trim(), highlight: true },
  ].filter((part) => part.text);

  return (
    <section
      ref={ref}
      id="faqs"
      className="relative overflow-hidden bg-[#FDF7FB] py-16"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <span
              aria-hidden="true"
              className={`h-[2px] w-14 shrink-0 origin-right bg-[#D9A13B] transition-transform duration-[1000ms] ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none sm:w-24 lg:w-36 ${
                inView ? "scale-x-100" : "scale-x-0"
              }`}
            />
            <span
              className={`${sans.className} text-sm font-semibold uppercase text-[#A30B72] transition-[opacity,letter-spacing] delay-200 duration-[1200ms] ease-out motion-reduce:transition-none sm:text-lg lg:text-xl ${
                inView ? "tracking-[0.3em] opacity-100" : "tracking-[0.6em] opacity-0"
              }`}
            >
              {data.tagline}
            </span>
            <span
              aria-hidden="true"
              className={`h-[2px] w-14 shrink-0 origin-left bg-[#D9A13B] transition-transform duration-[1000ms] ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none sm:w-24 lg:w-36 ${
                inView ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </div>

          <h2
            className={`${display.className} mt-3 flex flex-wrap justify-center gap-x-[0.26em] text-[34px] font-normal leading-[1.15] tracking-tight sm:text-[44px] lg:text-[54px]`}
          >
            {headingParts.map((part, i) => (
              <span key={i} className="block overflow-hidden pb-2">
                <span
                  className={`block transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    part.highlight ? "text-[#A30B72]" : "text-[#1F1A1C]"
                  } ${inView ? "translate-y-0" : "translate-y-full"}`}
                  style={{ transitionDelay: `${300 + i * 150}ms` }}
                >
                  {part.text}
                </span>
              </span>
            ))}
          </h2>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:mt-14 sm:gap-3.5">
          {data.items.map((item, index) => {
            const open = openId === item.id;

            return (
              <div
                key={item.id}
                className={`transition-[opacity,transform,translate] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: inView ? `${450 + index * 100}ms` : "0ms" }}
              >
                <div
                  className={`relative overflow-hidden rounded-2xl border bg-white transition-[border-color,box-shadow,background-color] duration-500 ease-out ${
                    open
                      ? "border-[#EFBFCF] shadow-[0_14px_34px_rgba(163,11,114,0.08)]"
                      : "border-[#F1CCD8] hover:border-[#E3A9BE] hover:bg-[#FEF9FB] hover:shadow-[0_8px_22px_rgba(163,11,114,0.06)]"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[#FBE8EE] transition-[clip-path] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                    style={{
                      clipPath: open
                        ? `circle(200% at ${FILL_ORIGIN})`
                        : `circle(0% at ${FILL_ORIGIN})`,
                    }}
                  />

                  <button
                    type="button"
                    id={`faq-question-${item.id}`}
                    aria-expanded={open}
                    aria-controls={`faq-answer-${item.id}`}
                    onClick={() => toggleItem(item.id)}
                    className="group relative z-10 flex w-full items-center justify-between gap-4 px-5 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#BA0D84] sm:px-7"
                  >
                    <span
                      className={`${serif.className} block text-[17px] leading-snug text-[#1F1A1C] transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:translate-x-1 sm:text-[19px] lg:text-[21px]`}
                    >
                      {item.number} {item.question}
                    </span>

                    <span
                      aria-hidden="true"
                      className={`relative block h-5 w-5 shrink-0 transition-transform duration-[700ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none lg:h-6 lg:w-6 ${
                        open ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-[#A30B72]" />
                      <span
                        className={`absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 rounded-full bg-[#A30B72] transition-transform duration-500 ease-out motion-reduce:transition-none ${
                          open ? "scale-y-0" : "scale-y-100"
                        }`}
                      />
                    </span>
                  </button>

                  <div
                    id={`faq-answer-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-question-${item.id}`}
                    aria-hidden={!open}
                    className={`relative z-10 grid transition-[grid-template-rows] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p
                        className={`${sans.className} px-5 pb-6 text-[14px] leading-[1.7] text-[#5B5E78] transition-[opacity,transform,translate,filter] duration-[700ms] ease-out motion-reduce:transition-none sm:px-7 sm:text-[15px] lg:text-[16px] ${
                          open
                            ? "translate-y-0 opacity-100 blur-none delay-200"
                            : "-translate-y-2 opacity-0 blur-[2px] delay-0"
                        }`}
                      >
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}