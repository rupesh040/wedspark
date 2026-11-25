"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { HeaderVariant, SocialLink, TopBarContactInfo } from "@/data/type";

interface NavbarProps {
  data: HeaderVariant;
}

function SocialIcon({ platform }: { platform: SocialLink["icon"] }) {
  switch (platform) {
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden="true">
          <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z" />
        </svg>
      );
    case "twitter":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden="true">
          <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.830 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-[18px] w-[18px]"
          aria-hidden="true"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden="true">
          <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z" />
        </svg>
      );
    default:
      return null;
  }
}

function TopBar({ topBar }: { topBar: TopBarContactInfo }) {
  return (
    <div className="ws-topbar-enter bg-[#490146] text-white">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-2.5 text-[13px] sm:px-6 sm:text-[14px] lg:px-8">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 lg:gap-x-12">
          <a
            href={topBar.addressHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 text-white/95 transition-colors duration-300 hover:text-[#F6D58E]"
          >
            <span className="relative inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center">
              <span
                aria-hidden="true"
                className="ws-pin-ring pointer-events-none absolute inset-0 rounded-full border border-[#D89A33]"
              />
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="relative h-[18px] w-[18px] text-[#D89A33] transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
                aria-hidden="true"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <span>{topBar.address}</span>
          </a>

          <span className="hidden h-6 w-px bg-white/45 md:inline-block" aria-hidden="true" />

          <a
            href={topBar.emailHref}
            className="group inline-flex items-center gap-2.5 text-white/95 transition-colors duration-300 hover:text-[#F6D58E]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-[18px] w-[18px] shrink-0 text-[#D89A33] transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-110"
              aria-hidden="true"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>{topBar.email}</span>
          </a>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[13px] font-medium text-white/80 sm:text-[14px]">
            {topBar.followLabel}
          </span>
          <div className="flex items-center gap-3.5">
            {topBar.socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:text-[#D89A33] hover:drop-shadow-[0_2px_8px_rgba(216,154,51,0.55)]"
              >
                <SocialIcon platform={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactButton({
  label,
  href,
  onClick,
}: {
  label: string;
  href: string;
  onClick?: () => void;
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const target = document.getElementById(targetId);
      if (target) {
        const headerOffset = 90;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: "smooth",
        });
        try {
          history.pushState(null, "", href);
        } catch {}
      }
    }
    onClick?.();
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="group relative inline-flex items-center justify-center focus:outline-none"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 translate-x-[6px] translate-y-[6px] border border-[#D89A33] transition-transform duration-300 ease-out group-hover:translate-x-[8px] group-hover:translate-y-[8px]"
      />
      <span className="relative inline-flex items-center justify-center gap-2.5 overflow-hidden bg-[#D89A33] px-7 py-3.5 text-[14px] font-semibold uppercase tracking-[0.04em] text-white transition-all duration-300 ease-out group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-[#C78924]">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
        <span className="relative">{label}</span>
        <span className="ws-arrow-nudge relative inline-flex">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </span>
      </span>
    </a>
  );
}

export function Navbar({ data }: NavbarProps) {
  const defaultActiveHref =
    data.links.find((link) => link.active)?.href ?? data.links[0]?.href ?? "/";
  const [activeHref, setActiveHref] = useState<string>(defaultActiveHref);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [topBarHeight, setTopBarHeight] = useState<number>(0);

  const topBarRef = useRef<HTMLDivElement>(null);
  const isManualScrolling = useRef<boolean>(false);
  const manualScrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const scrollToSection = useCallback((href: string) => {
    setActiveHref(href);
    setMobileMenuOpen(false);

    if (href === "/" || href === "#home") {
      isManualScrolling.current = true;
      if (manualScrollTimeout.current) clearTimeout(manualScrollTimeout.current);
      window.scrollTo({ top: 0, behavior: "smooth" });
      try {
        history.pushState(null, "", href);
      } catch {}
      manualScrollTimeout.current = setTimeout(() => {
        isManualScrolling.current = false;
      }, 850);
      return;
    }

    if (href.startsWith("#")) {
      const targetId = href.replace("#", "");
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        isManualScrolling.current = true;
        if (manualScrollTimeout.current) clearTimeout(manualScrollTimeout.current);

        const headerOffset = 90;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: "smooth",
        });

        try {
          history.pushState(null, "", href);
        } catch {}

        manualScrollTimeout.current = setTimeout(() => {
          isManualScrolling.current = false;
        }, 850);
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      if (isManualScrolling.current) return;

      if (window.scrollY < 180) {
        setActiveHref(data.links[0]?.href ?? "/");
        return;
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        const lastLink = data.links[data.links.length - 1];
        if (lastLink) setActiveHref(lastLink.href);
        return;
      }

      const scrollPosition = window.scrollY + 140;
      let matchedHref = data.links[0]?.href ?? "/";

      for (const link of data.links) {
        const id = link.href === "/" || link.href === "#home" ? "home" : link.href.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (top <= scrollPosition) {
            matchedHref = link.href;
          }
        }
      }

      setActiveHref(matchedHref);
    };

    const handleHashChange = () => {
      const currentHash = window.location.hash;
      if (currentHash) {
        setActiveHref(currentHash);
      }
    };

    handleScroll();
    handleHashChange();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
      if (manualScrollTimeout.current) clearTimeout(manualScrollTimeout.current);
    };
  }, [data.links]);

  useEffect(() => {
    const node = topBarRef.current;
    if (!node) return;
    const update = () => setTopBarHeight(node.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      style={{ top: -topBarHeight }}
      className={`sticky z-50 w-full transition-shadow duration-500 ease-out ${
        scrolled ? "shadow-[0_12px_32px_rgba(73,1,70,0.10)]" : ""
      }`}
    >
      <div ref={topBarRef} className="hidden md:block">
        <TopBar topBar={data.topBar} />
      </div>

      <div
        className={`relative border-b border-[#490146]/5 transition-colors duration-500 ${
          scrolled ? "bg-white/90 backdrop-blur-md" : "bg-white"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-[100px] lg:px-8">
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(defaultActiveHref);
            }}
            className="ws-logo-enter group relative flex shrink-0 items-center focus:outline-none"
          >
            <Image
              src={data.logo}
              alt={data.logoAlt}
              width={200}
              height={102}
              priority
              className="h-14 w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04] group-hover:-rotate-1 sm:h-16 lg:h-[80px]"
            />
          </Link>

          <nav aria-label="Main Navigation" className="hidden items-center lg:flex">
            <ul className="flex items-center gap-6 xl:gap-9">
              {data.links.map((link, index) => {
                const isActive = activeHref === link.href;
                return (
                  <li
                    key={link.name}
                    className="ws-nav-enter relative flex flex-col items-center"
                    style={{ animationDelay: `${120 + index * 60}ms` }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      aria-current={isActive ? "page" : undefined}
                      className={`relative inline-block whitespace-nowrap py-1.5 text-[14px] font-semibold uppercase tracking-[0.02em] transition-colors duration-300 xl:text-[15px] ${
                        isActive
                          ? "text-[#84137C]"
                          : "text-[#490146] hover:text-[#84137C]"
                      }`}
                    >
                      <span>{link.name}</span>
                      <span
                        aria-hidden="true"
                        className={`absolute -bottom-2 left-0 right-0 h-[3.5px] rounded-full bg-[#D89A33] transition-all duration-300 origin-center ${
                          isActive
                            ? "scale-x-100 opacity-100"
                            : "scale-x-0 opacity-0"
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ws-cta-enter hidden items-center lg:flex">
            <ContactButton label={data.button} href={data.buttonHref} />
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#490146]/15 text-[#490146] transition-colors duration-300 hover:border-[#D89A33] hover:text-[#84137C] lg:hidden"
          >
            <span className="relative flex h-4 w-5 flex-col justify-between">
              <span
                className={`block h-0.5 w-full bg-current transition-all duration-300 ease-out ${
                  mobileMenuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-current transition-all duration-200 ease-out ${
                  mobileMenuOpen ? "scale-x-0 opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-current transition-all duration-300 ease-out ${
                  mobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        <div
          id="mobile-navigation-drawer"
          className={`grid overflow-hidden transition-all duration-500 ease-out lg:hidden ${
            mobileMenuOpen
              ? "grid-rows-[1fr] border-t border-[#490146]/10 opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0 bg-white">
            <nav aria-label="Mobile Navigation" className="mx-auto max-w-[1280px] px-4 py-5 sm:px-6">
              <ul className="flex flex-col gap-1">
                {data.links.map((link, index) => {
                  const isActive = activeHref === link.href;
                  return (
                    <li
                      key={link.name}
                      style={{
                        transitionDelay: mobileMenuOpen ? `${index * 40}ms` : "0ms",
                      }}
                      className={`transition-all duration-500 ease-out ${
                        mobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                      }`}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(link.href);
                        }}
                        aria-current={isActive ? "page" : undefined}
                        className={`flex items-center justify-between rounded-md px-3 py-3 text-[14px] font-semibold uppercase tracking-[0.04em] transition-colors duration-200 ${
                          isActive
                            ? "bg-[#490146]/5 text-[#84137C]"
                            : "text-[#490146] hover:bg-[#490146]/5 hover:text-[#84137C]"
                        }`}
                      >
                        <span>{link.name}</span>
                        <span
                          aria-hidden="true"
                          className={`h-2 w-2 rounded-full bg-[#D89A33] transition-transform duration-300 ${
                            isActive ? "scale-100" : "scale-0"
                          }`}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-5 pb-2 pl-1">
                <ContactButton
                  label={data.button}
                  href={data.buttonHref}
                  onClick={() => setMobileMenuOpen(false)}
                />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
