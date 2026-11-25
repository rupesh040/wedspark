"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { AboutVariant } from "@/data/type";

interface AboutProps {
  data: AboutVariant;
}

type AboutImage = AboutVariant["images"][number];

const ease = "ease-[cubic-bezier(0.16,1,0.3,1)]";

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

function PhotoCard({
  image,
  inView,
  delay,
  center = false,
}: {
  image: AboutImage;
  inView: boolean;
  delay: number;
  center?: boolean;
}) {
  return (
    <div
      className={`group relative shrink-0 transition-transform duration-700 ${ease} hover:-translate-y-2 motion-reduce:transition-none ${
        center ? "z-20 w-[42%]" : "z-10 w-[29%]"
      }`}
    >
      <div
        style={{ transitionDelay: `${delay}ms` }}
        className={`bg-white transition-all duration-[1400ms] ${ease} motion-reduce:transition-none ${
          center
            ? "p-2 shadow-[0_20px_45px_rgba(73,1,70,0.18)] sm:p-2.5"
            : "p-1.5 shadow-[0_12px_30px_rgba(73,1,70,0.12)] sm:p-2"
        } ${inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        <div
          style={{ transitionDelay: `${delay + 350}ms` }}
          className={`relative w-full overflow-hidden transition-[clip-path] duration-[1500ms] ${ease} motion-reduce:transition-none ${
            center ? "aspect-[3/4.2]" : "aspect-[3/4]"
          } ${inView ? "[clip-path:inset(0)]" : "[clip-path:inset(0_0_100%_0)]"}`}
        >
          <div
            style={{ transitionDelay: `${delay + 350}ms` }}
            className={`absolute inset-0 transition-transform duration-[2200ms] ${ease} motion-reduce:transition-none ${
              inView ? "scale-100" : "scale-[1.3]"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={center ? "(max-width: 1024px) 42vw, 360px" : "(max-width: 1024px) 29vw, 250px"}
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function About({ data }: AboutProps) {
  const { ref, inView } = useInView<HTMLElement>();

  const leftImage = data.images[0];
  const centerImage = data.images[1];
  const rightImage = data.images[2];

  const delay = (ms: number) => ({ transitionDelay: `${ms}ms` });

  const wipe = inView
    ? "translate-x-0 opacity-100 blur-none [clip-path:inset(-0.2em_-0.2em_-0.2em_0)]"
    : "translate-x-6 opacity-0 blur-[8px] [clip-path:inset(-0.2em_100%_-0.2em_0)]";

  return (
    <section
      ref={ref}
      id="about"
      className="overflow-hidden bg-white py-16 "
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-3 sm:gap-4">
              <span
                aria-hidden="true"
                style={delay(0)}
                className={`h-[1.5px] w-12 origin-right bg-[#D89A33] transition-transform duration-[1400ms] ${ease} motion-reduce:transition-none sm:w-16 ${
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
                className={`h-[1.5px] w-12 origin-left bg-[#D89A33] transition-transform duration-[1400ms] ${ease} motion-reduce:transition-none sm:w-16 ${
                  inView ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </div>

            <div className="mt-5 inline-block max-w-full">
              <h2 className="font-serif text-[clamp(1.75rem,7.2vw,2.75rem)] font-bold leading-[1.18] tracking-tight lg:text-[clamp(2rem,3.7vw,3rem)]">
                <span className="block pb-[0.1em]">
                  <span
                    style={delay(350)}
                    className={`block whitespace-nowrap text-[#3A0538] transition-all duration-[1400ms] ${ease} motion-reduce:transition-none ${wipe}`}
                  >
                    {data.headingPart1}
                  </span>
                </span>
                <span className="block pb-[0.1em]">
                  <span
                    style={delay(530)}
                    className={`block whitespace-nowrap text-[#84137C] transition-all duration-[1400ms] ${ease} motion-reduce:transition-none ${wipe}`}
                  >
                    {data.headingPart2}
                  </span>
                </span>
              </h2>

              <div className="mt-4 flex items-center justify-center gap-2.5">
                <span
                  aria-hidden="true"
                  style={delay(900)}
                  className={`h-px w-16 origin-right bg-gradient-to-r from-transparent to-[#D89A33]/60 transition-transform duration-[1400ms] ${ease} motion-reduce:transition-none sm:w-24 ${
                    inView ? "scale-x-100" : "scale-x-0"
                  }`}
                />
                <svg
                  viewBox="0 0 46 22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-11 shrink-0 overflow-visible text-[#D89A33]"
                  aria-hidden="true"
                >
                  <circle
                    cx="16"
                    cy="11"
                    r="8.5"
                    style={delay(1050)}
                    className={`transition-all duration-[1400ms] ${ease} motion-reduce:transition-none ${
                      inView ? "translate-x-0 opacity-100" : "-translate-x-[14px] opacity-0"
                    }`}
                  />
                  <circle
                    cx="28"
                    cy="11"
                    r="8.5"
                    style={delay(1050)}
                    className={`transition-all duration-[1400ms] ${ease} motion-reduce:transition-none ${
                      inView ? "translate-x-0 opacity-100" : "translate-x-[14px] opacity-0"
                    }`}
                  />
                </svg>
                <span
                  aria-hidden="true"
                  style={delay(900)}
                  className={`h-px w-16 origin-left bg-gradient-to-r from-[#D89A33]/60 to-transparent transition-transform duration-[1400ms] ${ease} motion-reduce:transition-none sm:w-24 ${
                    inView ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </div>
            </div>

            <p
              style={delay(1000)}
              className={`mt-6 max-w-[30rem] text-[15px] leading-[1.85] text-[#4F3F4D] transition-all duration-[1400ms] ${ease} motion-reduce:transition-none sm:text-base ${
                inView ? "translate-y-0 opacity-100 blur-none" : "translate-y-5 opacity-0 blur-[6px]"
              }`}
            >
              {data.description}
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="relative mx-auto flex w-full max-w-[620px] items-center lg:max-w-none">
              <div
                aria-hidden="true"
                style={delay(0)}
                className={`absolute left-[13%] top-[9%] z-0 h-[81%] w-[36%] origin-top border border-[#84137C]/70 bg-[#F1E7F3] transition-transform duration-[1500ms] ${ease} motion-reduce:transition-none ${
                  inView ? "scale-y-100" : "scale-y-0"
                }`}
              />
              <div
                aria-hidden="true"
                style={delay(200)}
                className={`absolute bottom-0 right-[11%] top-[15%] z-0 w-[18%] origin-bottom bg-[#EFE3F2] transition-transform duration-[1500ms] ${ease} motion-reduce:transition-none ${
                  inView ? "scale-y-100" : "scale-y-0"
                }`}
              />

              {leftImage && <PhotoCard image={leftImage} inView={inView} delay={550} />}
              {centerImage && <PhotoCard image={centerImage} inView={inView} delay={350} center />}
              {rightImage && <PhotoCard image={rightImage} inView={inView} delay={750} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;