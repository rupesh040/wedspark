"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ContactVariant } from "@/data/type";

interface ContactProps {
  data: ContactVariant;
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

function FieldIcon({ name }: { name: string }) {
  const base =
    "w-5 h-5 text-[#84137C] shrink-0 transition-transform duration-500 group-focus-within:scale-110 group-focus-within:-rotate-6";

  if (name === "user") {
    return (
      <svg className={base} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
      </svg>
    );
  }
  if (name === "email") {
    return (
      <svg className={base} fill="currentColor" viewBox="0 0 20 20">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
    );
  }
  if (name === "phone") {
    return (
      <svg className={base} fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 4V3z" />
      </svg>
    );
  }
  if (name === "calendar") {
    return (
      <svg className={base} fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
  if (name === "location") {
    return (
      <svg className={base} fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
  if (name === "guests") {
    return (
      <svg className={base} fill="currentColor" viewBox="0 0 20 20">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
      </svg>
    );
  }
  if (name === "message") {
    return (
      <svg className={`${base} mt-0.5`} fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
  return null;
}

export default function Contact({ data }: ContactProps) {
  const { ref, inView } = useInView<HTMLElement>(0.15);
  const [formValues, setFormValues] = useState<Record<string, string>>({
    name: "",
    email: "",
    phone: "",
    date: "",
    location: "",
    guests: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormValues({
        name: "",
        email: "",
        phone: "",
        date: "",
        location: "",
        guests: "",
        message: "",
      });
      setTimeout(() => setIsSubmitted(false), 6000);
    }, 700);
  };

  const rise = (delay: number) => ({
    className: `transition-all duration-[900ms] ${
      inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`,
    style: { transitionDelay: `${delay}ms`, transitionTimingFunction: EASE },
  });

  const curtain = (delay: number, from: "top" | "bottom") => ({
    clipPath: inView
      ? "inset(0% 0% 0% 0% round 16px)"
      : from === "top"
      ? "inset(0% 0% 100% 0% round 16px)"
      : "inset(100% 0% 0% 0% round 16px)",
    transition: `clip-path 1.2s ${EASE} ${delay}ms`,
  });

  const maskLine = (delay: number) => ({
    className: `block transition-transform duration-[1000ms] ${
      inView ? "translate-y-0" : "translate-y-[110%]"
    }`,
    style: { transitionDelay: `${delay}ms`, transitionTimingFunction: EASE },
  });

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#FFF9FB] via-[#FFFDFE] to-[#FFF5FA] overflow-hidden scroll-mt-20 sm:scroll-mt-24 lg:scroll-mt-28"
    >
      <style>{`
        @keyframes cf-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-9px) rotate(4deg); }
        }
        @keyframes cf-sway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2.5deg); }
        }
        @keyframes cf-pop {
          0% { opacity: 0; transform: translateY(-8px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes cf-sheen {
          0% { transform: translateX(-120%) skewX(-20deg); }
          100% { transform: translateX(260%) skewX(-20deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cf-motion { animation: none !important; }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-48 sm:w-64 lg:w-80 h-48 sm:h-64 lg:h-80 -z-0 transition-all duration-[1600ms]"
        style={{
          opacity: inView ? 0.85 : 0,
          transform: inView ? "translate(0,0) scale(1)" : "translate(40px,-40px) scale(0.92)",
          transitionTimingFunction: EASE,
        }}
      >
        <svg
          viewBox="0 0 260 260"
          fill="none"
          className="w-full h-full cf-motion origin-top-right"
          style={{ animation: "cf-sway 9s ease-in-out infinite" }}
        >
          <g opacity="0.85">
            <path
              d="M260 20c-35 10-65 40-80 75-10 25-12 55-2 80 5-20 18-38 35-50 25-18 55-22 85-22 0-30-15-60-38-83z"
              fill="#D4A76A"
              opacity="0.35"
            />
            <path
              d="M250 85c-20 12-45 18-70 12-18-4-32-16-40-32 15 2 30-2 44-10 18-10 32-26 42-45 10 24 20 50 24 75z"
              fill="#C2965A"
              opacity="0.4"
            />
            <circle cx="210" cy="50" r="38" fill="#F4A6C5" opacity="0.6" />
            <circle cx="185" cy="70" r="30" fill="#E86E9F" opacity="0.75" />
            <circle cx="225" cy="75" r="28" fill="#F294BC" opacity="0.65" />
            <circle cx="205" cy="95" r="26" fill="#D6487E" opacity="0.75" />
            <circle cx="205" cy="72" r="14" fill="#FFE59E" opacity="0.9" />
          </g>
        </svg>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-2 sm:left-6 top-1/3 -translate-y-1/2 w-24 sm:w-32 h-48 sm:h-64 -z-0"
        style={{ opacity: 0.4 }}
      >
        <svg
          viewBox="0 0 100 200"
          fill="none"
          stroke="#D88BAC"
          strokeWidth="1.6"
          className="w-full h-full cf-motion origin-bottom"
          style={{ animation: "cf-sway 8s ease-in-out infinite" }}
        >
          {[
            "M50 190C45 130 15 90 20 30c8 30 35 60 30 110",
            "M50 150c15-40 40-70 35-120-10 25-30 50-35 80",
            "M48 110c-15-25-25-45-20-75 8 18 20 35 22 55",
          ].map((d, i) => (
            <path
              key={d}
              d={d}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={inView ? 0 : 1}
              style={{
                transition: `stroke-dashoffset 2s ${EASE} ${300 + i * 250}ms`,
              }}
            />
          ))}
        </svg>
      </div>

      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative w-full max-w-md mx-auto lg:max-w-none">
              <div
                className="w-[82%] ml-auto aspect-[4/5] rounded-2xl border-4 border-white shadow-2xl overflow-hidden relative group"
                style={curtain(100, "top")}
              >
                <Image
                  src={data.images.top.src}
                  alt={data.images.top.alt}
                  fill
                  sizes="(max-width: 1024px) 80vw, 35vw"
                  className="object-cover transition-transform duration-[1800ms] group-hover:scale-105"
                  style={{
                    transform: inView ? undefined : "scale(1.25)",
                    transitionTimingFunction: EASE,
                  }}
                />
              </div>

              <div
                className="w-[78%] -mt-32 sm:-mt-36 lg:-mt-40 ml-0 aspect-[4/5] rounded-2xl border-4 border-white shadow-2xl overflow-hidden relative z-20 group"
                style={curtain(450, "bottom")}
              >
                <Image
                  src={data.images.bottom.src}
                  alt={data.images.bottom.alt}
                  fill
                  sizes="(max-width: 1024px) 75vw, 32vw"
                  className="object-cover transition-transform duration-[1800ms] group-hover:scale-105"
                  style={{
                    transform: inView ? undefined : "scale(1.25)",
                    transitionTimingFunction: EASE,
                  }}
                />
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-6 right-8 sm:right-16 z-30 flex items-end gap-2 transition-all duration-1000"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: "1100ms",
                  transitionTimingFunction: EASE,
                }}
              >
                <svg
                  viewBox="0 0 40 40"
                  fill="none"
                  className="w-8 h-8 text-[#E86E9F] cf-motion"
                  style={{ animation: "cf-float 5s ease-in-out infinite" }}
                >
                  <ellipse cx="20" cy="14" rx="5" ry="12" fill="currentColor" opacity="0.85" />
                  <ellipse cx="14" cy="22" rx="10" ry="5" fill="currentColor" opacity="0.8" />
                  <ellipse cx="26" cy="22" rx="10" ry="5" fill="currentColor" opacity="0.8" />
                  <circle cx="20" cy="20" r="4" fill="#FFE082" />
                  <path d="M20 24v12" stroke="#689F38" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <svg
                  viewBox="0 0 40 40"
                  fill="none"
                  className="w-6 h-6 text-[#F080A8] cf-motion"
                  style={{ animation: "cf-float 6.5s ease-in-out 0.8s infinite" }}
                >
                  <ellipse cx="20" cy="14" rx="4" ry="10" fill="currentColor" opacity="0.85" />
                  <ellipse cx="15" cy="20" rx="8" ry="4" fill="currentColor" opacity="0.8" />
                  <ellipse cx="25" cy="20" rx="8" ry="4" fill="currentColor" opacity="0.8" />
                  <circle cx="20" cy="19" r="3.5" fill="#FFE082" />
                  <path d="M20 22v10" stroke="#689F38" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-2.5">
              <span {...rise(150)} className={`${rise(150).className} text-base sm:text-lg font-bold text-[#84137C] tracking-wide font-sans`}>
                {data.tagline}
              </span>
              <span
                className="h-[2px] w-20 sm:w-28 bg-[#CB995A] origin-left transition-transform duration-[1200ms]"
                style={{
                  transform: inView ? "scaleX(1)" : "scaleX(0)",
                  transitionDelay: "400ms",
                  transitionTimingFunction: EASE,
                }}
              />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1F1A1C] leading-tight">
              <span className="block overflow-hidden pb-1">
                <span {...maskLine(250)}>{data.headingPart1}</span>
              </span>
              <span className="block overflow-hidden pb-1 text-[#84137C]">
                <span {...maskLine(400)}>{data.headingHighlight}</span>
              </span>
            </h2>

            <div className="mt-3.5 mb-8 text-sm sm:text-base text-[#554051] font-sans leading-relaxed">
              <p className={rise(550).className} style={rise(550).style}>
                {data.descriptionLine1}
              </p>
              <p className={rise(650).className} style={rise(650).style}>
                {data.descriptionLine2}
              </p>
            </div>

            {isSubmitted && (
              <div
                role="alert"
                className="mb-6 p-4 rounded-2xl bg-[#F3FAF4] border border-[#A6E1B6] text-[#1E6B35] text-sm sm:text-base font-sans flex items-center gap-2.5 shadow-sm"
                style={{ animation: `cf-pop 0.6s ${EASE} both` }}
              >
                <svg className="w-5 h-5 shrink-0 text-[#1E6B35]" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{data.form.successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.form.fields.map((field, i) => (
                  <div
                    key={field.name}
                    className={`group relative flex items-center bg-white border border-[#E5CFDE] rounded-2xl px-4 py-3.5 overflow-hidden transition-all duration-[900ms] hover:border-[#84137C]/50 hover:-translate-y-0.5 focus-within:border-[#84137C] focus-within:ring-2 focus-within:ring-[#84137C]/15 focus-within:shadow-sm ${
                      inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                    style={{
                      transitionDelay: inView ? `${750 + i * 80}ms` : "0ms",
                      transitionTimingFunction: EASE,
                    }}
                  >
                    <FieldIcon name={field.icon} />
                    <input
                      type={field.type}
                      name={field.name}
                      id={`contact-${field.name}`}
                      value={formValues[field.name] || ""}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full bg-transparent pl-3 text-sm sm:text-base text-[#1F1A1C] placeholder-[#7D6B78] outline-none font-sans"
                    />
                    <span className="absolute left-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-[#84137C] to-[#E86E9F] origin-left scale-x-0 transition-transform duration-700 group-focus-within:scale-x-100" />
                  </div>
                ))}
              </div>

              <div
                className={`group relative flex items-start bg-white border border-[#E5CFDE] rounded-2xl px-4 py-3.5 overflow-hidden transition-all duration-[900ms] hover:border-[#84137C]/50 focus-within:border-[#84137C] focus-within:ring-2 focus-within:ring-[#84137C]/15 focus-within:shadow-sm ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{
                  transitionDelay: inView ? `${750 + data.form.fields.length * 80}ms` : "0ms",
                  transitionTimingFunction: EASE,
                }}
              >
                <FieldIcon name={data.form.messageField.icon} />
                <textarea
                  name={data.form.messageField.name}
                  id={`contact-${data.form.messageField.name}`}
                  value={formValues[data.form.messageField.name] || ""}
                  onChange={(e) => handleInputChange(data.form.messageField.name, e.target.value)}
                  placeholder={data.form.messageField.placeholder}
                  required={data.form.messageField.required}
                  rows={4}
                  className="w-full bg-transparent pl-3 text-sm sm:text-base text-[#1F1A1C] placeholder-[#7D6B78] outline-none font-sans min-h-[110px]"
                />
                <span className="absolute left-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-[#84137C] to-[#E86E9F] origin-left scale-x-0 transition-transform duration-700 group-focus-within:scale-x-100" />
              </div>

              <div
                className={`pt-2 transition-all duration-[900ms] ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{
                  transitionDelay: inView ? `${850 + data.form.fields.length * 80}ms` : "0ms",
                  transitionTimingFunction: EASE,
                }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative inline-flex items-center gap-2 overflow-hidden bg-[#84137C] text-white text-sm sm:text-base font-semibold px-8 py-3.5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-0.5 active:scale-95 disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  <span className="absolute inset-0 bg-[#BA0D84] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ transitionTimingFunction: EASE }} />
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-1/4 bg-white/25 -translate-x-[120%] group-hover:animate-[cf-sheen_0.9s_ease-out]"
                  />
                  <span className="relative">
                    {isSubmitting ? "Sending..." : data.form.submitButtonText}
                  </span>
                  <svg
                    className={`relative w-4 h-4 ml-1 transition-transform duration-500 group-hover:translate-x-1.5 ${
                      isSubmitting ? "animate-pulse" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
