"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { FooterVariant } from "@/data/type";

interface FooterProps {
  data: FooterVariant;
}

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function SocialIcon({ platform }: { platform: string }) {
  const base = "w-5 h-5 fill-current transition-transform duration-500 group-hover:scale-110";

  if (platform === "whatsapp") {
    return (
      <svg className={base} viewBox="0 0 24 24">
        <path d="M12.031 2c-5.508 0-9.986 4.477-9.986 9.983 0 1.761.459 3.479 1.332 4.992l-1.417 5.176 5.305-1.391c1.458.795 3.104 1.213 4.766 1.213 5.508 0 9.986-4.477 9.986-9.984s-4.478-9.989-9.986-9.989zm0 18.258c-1.498 0-2.964-.403-4.244-1.163l-.305-.181-3.15.826.841-3.072-.198-.315c-.838-1.335-1.28-2.884-1.28-4.47 0-4.551 3.704-8.255 8.256-8.255 4.552 0 8.256 3.704 8.256 8.255 0 4.552-3.704 8.255-8.256 8.255zm4.526-6.182c-.248-.124-1.468-.724-1.696-.807-.228-.083-.394-.124-.56.124-.166.248-.642.807-.787.973-.145.166-.29.186-.538.062-.248-.124-1.047-.386-1.995-1.231-.738-.658-1.237-1.471-1.382-1.719-.145-.248-.015-.382.109-.505.112-.111.248-.29.372-.435.124-.145.166-.248.248-.414.083-.166.041-.311-.021-.435-.062-.124-.56-1.35-.767-1.848-.202-.486-.407-.42-.56-.428l-.477-.008c-.166 0-.435.062-.663.311-.228.248-.87 1.056-.87 2.575s.891 2.988 1.015 3.154c.124.166 1.752 2.675 4.244 3.752.593.256 1.056.409 1.417.524.596.19 1.139.163 1.568.099.479-.071 1.468-.6 1.675-1.18.207-.58.207-1.077.145-1.18-.062-.103-.228-.166-.476-.29z" />
      </svg>
    );
  }
  if (platform === "instagram") {
    return (
      <svg className={base} viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    );
  }
  if (platform === "facebook") {
    return (
      <svg className={base} viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    );
  }
  if (platform === "linkedin") {
    return (
      <svg className={base} viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    );
  }
  if (platform === "pinterest") {
    return (
      <svg className={base} viewBox="0 0 24 24">
        <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.357-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
      </svg>
    );
  }
  return null;
}

const GRID_ROWS = 4;

const HEART = "M12 21s-8-5.2-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 5.8-8 11-8 11z";

export default function Footer({ data }: FooterProps) {
  const { ref, inView } = useInView<HTMLElement>(0.2);

  const rise = (delay: number) => ({
    className: `transition-all duration-[900ms] ${
      inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
    }`,
    style: { transitionDelay: `${delay}ms`, transitionTimingFunction: EASE },
  });

  const pop = (delay: number) => ({
    className: `transition-all duration-[800ms] ${
      inView ? "opacity-100 scale-100" : "opacity-0 scale-50"
    }`,
    style: {
      transitionDelay: `${delay}ms`,
      transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    },
  });

  const navCount = data.links.length;
  const midIndex = Math.ceil(navCount / 2) - 1;
  const navEnd = 450 + navCount * 80;
  const socialStart = navEnd + 100;
  const dividerStart = socialStart + data.socialLinks.length * 90 + 100;

  const dividerLine = (delay: number) => ({
    transform: inView ? "scaleY(1)" : "scaleY(0)",
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: EASE,
  });

  return (
    <footer
      ref={ref}
      className="relative bg-[#FFF9FB] pt-7 pb-8 sm:pt-14 sm:pb-14 lg:pt-18 lg:pb-16 px-4 sm:px-6 lg:px-8 border-t border-[#F2DEEB] overflow-hidden"
    >
      <style>{`
        @keyframes ft-beat {
          0%, 100% { transform: scale(1); }
          14% { transform: scale(1.09); }
          28% { transform: scale(1); }
          42% { transform: scale(1.06); }
          56% { transform: scale(1); }
        }
        @keyframes ft-drift {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -4px, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ft-motion { animation: none !important; }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-full max-w-[1280px] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#CB995A]/50 to-transparent origin-center transition-transform duration-[1800ms]"
        style={{
          transform: `translateX(-50%) scaleX(${inView ? 1 : 0})`,
          transitionTimingFunction: EASE,
        }}
      />

      <div className="max-w-[1280px] mx-auto text-center">
        <div
          className="transition-all duration-[1400ms]"
          style={{
            opacity: inView ? 1 : 0,
            filter: inView ? "blur(0px)" : "blur(10px)",
            transform: inView ? "scale(1)" : "scale(0.92)",
            transitionTimingFunction: EASE,
          }}
        >
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-block transition-transform duration-500 hover:scale-105 focus:outline-none"
          >
            <Image
              src={data.logo}
              alt={data.logoAlt}
              width={400}
              height={160}
              priority
              className="h-20 sm:h-28 md:h-32 lg:h-36 w-auto object-contain mx-auto ft-motion"
              style={{ animation: "ft-drift 7s ease-in-out 1.6s infinite" }}
            />
          </Link>
        </div>

        <nav aria-label="Footer Navigation" className="mt-5 mb-5 sm:mt-8 sm:mb-7">
          <div className="relative w-full max-w-[300px] xs:max-w-[340px] mx-auto sm:max-w-none">
            {navCount > 1 && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1 bottom-1 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#CB995A] to-transparent origin-center transition-transform duration-[1400ms] sm:hidden"
                style={dividerLine(450 + (midIndex + 1) * 80)}
              />
            )}
            <ul className="grid grid-cols-2 grid-rows-4 grid-flow-col gap-x-10 gap-y-2.5 text-center sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-3.5 md:gap-x-5 sm:gap-y-2.5 text-xs sm:text-sm font-bold tracking-wider text-[#1F1A1C]">
              {data.links.map((link, index) => (
                <li
                  key={link.name}
                  className={`flex items-center justify-start text-left sm:justify-center sm:text-center sm:pl-0 sm:gap-x-3.5 md:gap-x-5 ${
                    index >= GRID_ROWS ? "pl-3" : ""
                  }`}
                >
                  <span
                    className={`inline-block transition-all duration-[900ms] ${
                      inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{
                      transitionDelay: `${450 + index * 80}ms`,
                      transitionTimingFunction: EASE,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => {
                        if (link.href === "/" || link.href === "#home") {
                          e.preventDefault();
                          window.scrollTo({ top: 0, behavior: "smooth" });
                          try {
                            history.pushState(null, "", link.href);
                          } catch {}
                          return;
                        }
                        if (link.href.startsWith("#")) {
                          e.preventDefault();
                          const targetId = link.href.replace("#", "");
                          const target = document.getElementById(targetId);
                          if (target) {
                            const isMobile = window.innerWidth < 1024;
                            const headerOffset = isMobile ? 70 : 90;
                            const pos = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                            window.scrollTo({ top: Math.max(0, pos), behavior: "smooth" });
                            try {
                              history.pushState(null, "", link.href);
                            } catch {}
                          }
                        }
                      }}
                      className="group relative inline-block py-1 hover:text-[#84137C] transition-colors duration-300"
                    >
                      {link.name}
                      <span
                        className="absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-[#CB995A] origin-left sm:origin-center scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                      />
                    </Link>
                  </span>
                  {index < navCount - 1 &&
                    (index === midIndex ? (
                      <span
                        aria-hidden="true"
                        className="hidden sm:inline-block w-px h-6 shrink-0 bg-gradient-to-b from-transparent via-[#CB995A] to-transparent origin-center transition-transform duration-[1400ms] select-none"
                        style={dividerLine(520 + index * 80)}
                      />
                    ) : (
                      <span
                        className={`hidden sm:inline text-[#CB995A] text-xs select-none ${pop(520 + index * 80).className}`}
                        style={pop(520 + index * 80).style}
                      >
                        •
                      </span>
                    ))}
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="flex items-center justify-center gap-3.5 sm:gap-4 my-4 sm:my-6">
          {data.socialLinks.map((item, index) => (
            <span
              key={item.platform}
              className={pop(socialStart + index * 90).className}
              style={pop(socialStart + index * 90).style}
            >
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-md flex items-center justify-center text-[#84137C] hover:bg-[#84137C] hover:text-white transition-all duration-500 hover:-translate-y-1 hover:shadow-lg active:scale-95 border border-[#F5E6F0]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border border-[#84137C]/30 scale-90 opacity-0 transition-all duration-500 group-hover:scale-[1.35] group-hover:opacity-100"
                />
                <SocialIcon platform={item.platform} />
              </a>
            </span>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 max-w-lg mx-auto my-5 sm:my-7">
          <span
            className="h-[1px] flex-1 bg-[#CB995A]/60 origin-right transition-transform duration-[1400ms]"
            style={{
              transform: inView ? "scaleX(1)" : "scaleX(0)",
              transitionDelay: `${dividerStart + 500}ms`,
              transitionTimingFunction: EASE,
            }}
          />
          <svg
            viewBox="0 0 34 24"
            className="w-10 h-7 text-[#CB995A] shrink-0 ft-motion"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{
              animation: "ft-beat 3.6s ease-in-out 3s infinite",
              transformOrigin: "center",
            }}
          >
            {[-4, 9.2].map((x, i) => (
              <path
                key={x}
                d={HEART}
                transform={`translate(${x} -3) scale(1.2)`}
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={inView ? 0 : 1}
                style={{
                  transition: `stroke-dashoffset 1.6s ${EASE} ${dividerStart + i * 300}ms`,
                }}
              />
            ))}
          </svg>
          <span
            className="h-[1px] flex-1 bg-[#CB995A]/60 origin-left transition-transform duration-[1400ms]"
            style={{
              transform: inView ? "scaleX(1)" : "scaleX(0)",
              transitionDelay: `${dividerStart + 500}ms`,
              transitionTimingFunction: EASE,
            }}
          />
        </div>

        <p
          className={`text-xs sm:text-sm text-[#6E5D6A] font-sans text-center ${rise(dividerStart + 900).className}`}
          style={rise(dividerStart + 900).style}
        >
          {data.copyright.textPrefix}
          <span className="font-semibold text-[#84137C]">
            {data.copyright.brandName}
          </span>
          {data.copyright.textSuffix}
        </p>
      </div>
    </footer>
  );
}
