"use client";

import React, { useEffect, useState, useCallback } from "react";
import bannerImg1 from "@/app/assets/banner/banner1.png";
import bannerImg2 from "@/app/assets/banner/banner2.png";
import bannerImg3 from "@/app/assets/banner/banner3.png";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const slides = [
  { img: bannerImg1, alt: "Banner 1" },
  { img: bannerImg2, alt: "Banner 2" },
  { img: bannerImg3, alt: "Banner 3" },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index) => {
      if (animating) return;
      setAnimating(true);
      setCurrent((index + slides.length) % slides.length);

      setTimeout(() => {
        setAnimating(false);
      }, 500);
    },
    [animating],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative mt-4 sm:mt-5 w-full overflow-hidden rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] border border-border/60 shadow-[0_30px_90px_-35px_rgba(8,60,64,0.65)]">
      {/* Slides */}
      <div className="relative w-full min-h-[240px] xs:min-h-[280px] sm:min-h-[360px] md:min-h-[440px] lg:min-h-[520px] xl:min-h-[600px]">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              i === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={slide.img}
              alt={slide.alt}
              fill
              priority={i === 0}
              className="object-cover"
              sizes="100vw"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 via-secondary/35 to-transparent" />
          </div>
        ))}

        {/* CTA Content */}
        <div className="absolute inset-0 z-20 flex items-end px-4 pb-5 sm:px-6 sm:pb-7 md:px-10 md:pb-10 lg:px-14 lg:pb-14 xl:px-16">
          <div className="w-full max-w-4xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/90 backdrop-blur-md sm:text-xs">
              Fast. Secure. Nationwide.
            </div>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 md:gap-4">
              <button className="rounded-full bg-gradient-to-r from-primary to-[#d9ff8e] px-4 py-2.5 text-xs font-semibold text-secondary shadow-[0_18px_35px_rgba(184,244,93,0.32)] transition-all duration-200 hover:brightness-105 active:scale-95 sm:px-5 sm:py-3 sm:text-sm md:px-6 md:text-base">
                Track Your Parcel
              </button>

              <Link
                href="/sign-up"
                className="rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-all duration-200 hover:bg-white/15 active:scale-95 sm:px-5 sm:py-3 sm:text-sm md:px-6 md:text-base"
              >
                Join Now
              </Link>

              <div className="hidden md:flex rounded-full bg-white/10 p-3 text-primary shadow-md backdrop-blur-md -rotate-45">
                <FaArrowRight className="text-sm lg:text-base" />
              </div>

              <Link
                href="/rider"
                className="rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-secondary shadow-[0_18px_35px_rgba(15,31,33,0.15)] transition-all duration-200 hover:bg-slate-50 active:scale-95 sm:px-5 sm:py-3 sm:text-sm md:px-6 md:text-base"
              >
                Be a Rider
              </Link>
            </div>
          </div>
        </div>

        {/* Prev Button */}
        <button
          onClick={() => goTo(current - 1)}
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/10 bg-white/10 p-2 text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20 sm:left-4 sm:p-2.5 md:left-5 md:p-3"
        >
          <FaChevronLeft className="text-[10px] sm:text-xs md:text-sm" />
        </button>

        {/* Next Button */}
        <button
          onClick={() => goTo(current + 1)}
          aria-label="Next slide"
          className="absolute right-2 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/10 bg-white/10 p-2 text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20 sm:right-4 sm:p-2.5 md:right-5 md:p-3"
        >
          <FaChevronRight className="text-[10px] sm:text-xs md:text-sm" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 right-3 z-30 flex gap-1.5 sm:bottom-4 sm:right-5 sm:gap-2 md:bottom-5 md:right-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "h-2 w-6 bg-primary shadow-[0_0_18px_rgba(184,244,93,0.65)] sm:w-7 md:w-8"
                  : "h-2 w-2 bg-white/45 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
