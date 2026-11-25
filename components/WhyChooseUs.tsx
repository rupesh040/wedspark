"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Great_Vibes, DM_Serif_Display, DM_Sans } from "next/font/google";
import type { WhyChooseUsVariant } from "@/data/type";

const script = Great_Vibes({ subsets: ["latin"], weight: "400", display: "swap" });
const serif = DM_Serif_Display({ subsets: ["latin"], weight: "400", display: "swap" });
const sans = DM_Sans({ subsets: ["latin"], display: "swap" });

interface WhyChooseUsProps {
  data: WhyChooseUsVariant;
}

export function WhyChooseUs({ data }: WhyChooseUsProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

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
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="why-choose-us"
      className="overflow-hidden bg-white py-16"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="lg:col-span-6">
            <div className="relative z-10 flex -translate-x-3 items-center justify-center gap-3 sm:-translate-x-6 lg:justify-end lg:-mr-[52px] lg:-translate-x-0 xl:-mr-[64px]">
              <span
                className={`${script.className} shrink-0 select-none text-[32px] font-normal leading-none text-[#84137C] transition-all duration-[1000ms] ease-out motion-reduce:transition-none sm:text-[36px] lg:text-[40px] ${
                  inView
                    ? "translate-x-0 opacity-100 blur-0"
                    : "-translate-x-6 opacity-0 blur-sm"
                }`}
              >
                {data.tagline}
              </span>
              <span
                aria-hidden="true"
                className={`h-px w-14 shrink-0 origin-left bg-[#84137C] transition-transform delay-500 duration-[1000ms] ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none sm:w-20 lg:w-[130px] xl:w-[150px] ${
                  inView ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </div>

            <h2
              className={`${serif.className} mt-5 text-center text-[30px] font-normal leading-[1.2] tracking-tight sm:text-[34px] lg:text-[40px] xl:text-[44px]`}
            >
              <span className="block overflow-hidden pb-2">
                <span
                  className={`block text-[#1F1A1C] transition-transform delay-200 duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    inView ? "translate-y-0" : "translate-y-full"
                  }`}
                >
                  {data.headingPart1}
                </span>
              </span>
              <span className="-mt-1 block overflow-hidden pb-2">
                <span
                  className={`block text-[#84137C] transition-transform delay-[350ms] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    inView ? "translate-y-0" : "translate-y-full"
                  }`}
                >
                  {data.headingPart2}
                </span>
              </span>
            </h2>

            <p
              className={`${sans.className} mx-auto mt-5 max-w-md text-center text-[14px] leading-[1.9] text-[#3D3340] transition-all delay-500 duration-[1000ms] ease-out motion-reduce:transition-none sm:text-[15px] ${
                inView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
              }`}
            >
              {data.description}
            </p>
          </div>

          <div className="flex items-center justify-center lg:col-span-6 lg:justify-end">
            <div className="group relative">
              <div
                className={`relative rounded-[2px] border bg-white p-2.5 shadow-[0_15px_40px_rgba(73,1,70,0.08)] transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#84137C]/60 hover:shadow-[0_22px_50px_rgba(73,1,70,0.15)] motion-reduce:transition-none sm:p-3.5 ${
                  inView
                    ? "scale-100 border-[#84137C]/40 opacity-100"
                    : "scale-95 border-[#84137C]/0 opacity-0"
                }`}
              >
                <div className="relative aspect-[3/3.8] w-[270px] overflow-hidden rounded-[2px] sm:w-[340px] md:w-[400px] lg:w-[430px]">
                  <div
                    className={`absolute inset-0 transition-[clip-path] delay-300 duration-[1400ms] ease-[cubic-bezier(0.77,0,0.175,1)] motion-reduce:transition-none ${
                      inView
                        ? "[clip-path:inset(0_0_0_0)]"
                        : "[clip-path:inset(0_0_100%_0)]"
                    }`}
                  >
                    <Image
                      src={data.image}
                      alt={data.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 90vw, 440px"
                      className={`object-cover object-center transition-transform delay-300 duration-[1800ms] ease-out group-hover:scale-[1.04] motion-reduce:transition-none ${
                        inView ? "scale-100" : "scale-[1.18]"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;