'use client';

import { useState } from "react";

const tabs = [
  { key: "story", label: "Our Story", icon: "📖" },
  { key: "mission", label: "Mission", icon: "🎯" },
  { key: "success", label: "Success", icon: "🏆" },
  { key: "team", label: "Team", icon: "🤝" },
];

const content = {
  story: {
    heading: "How ZapShift Began",
    paragraphs: [
      "We started with a simple promise — to make parcel delivery fast, reliable and absolutely stress-free for everyone. From the very beginning, our focus has been to build a delivery network that people can trust without thinking twice. With continuous improvement in route management, rider efficiency and technology integration, we have grown from a small initiative to a service handling hundreds of deliveries every single day.",
      "Over the years, thousands of individuals and companies have relied on us to deliver gifts, documents, business shipments and urgent parcels — always on time. Our goal remains simple: to ensure every delivery reaches safely, quickly, and with real-time transparency. This story is just the beginning — we are evolving every day to serve better.",
    ],
  },
  mission: {
    heading: "What Drives Us Forward",
    paragraphs: [
      "Our mission is to transform traditional delivery into a modern, efficient, technology-powered experience. We want parcel delivery to feel effortless — where customers book in seconds, track live locations, and stay confident throughout the journey. Logistics shouldn't be stressful, and we aim to make it smooth for both personal users and businesses who rely on fast movement of goods.",
      "With a mission to deliver excellence, we continuously focus on rider training, optimized delivery routes, a responsive support team and an ever-improving platform. We dream of a future where every parcel — no matter how big or small — reaches its destination with speed, care and reliability.",
    ],
  },
  success: {
    heading: "Built on Trust & Results",
    paragraphs: [
      "Our success is built on trust — trust from customers, riders and business partners who chose us every day. From our early days of handling only a handful of deliveries to now managing a growing volume across multiple locations, we've come a long way. Each completed delivery, each satisfied customer, and each returning client adds to the foundation of our growth.",
      "We continue investing in technology, rider expansion and smart logistics to keep raising the bar. The milestones we have achieved so far motivate us to push further — faster delivery speed, improved coverage, better support and innovative new features to elevate the delivery experience.",
    ],
  },
  team: {
    heading: "The People Behind Every Parcel",
    paragraphs: [
      "Behind every parcel delivered on time stands a dedicated team working with focus and passion. Our riders are trained not only for speed, but also for handling items with care and maintaining friendly service with customers. Our support and tech team operate continuously to ensure smooth communication, system performance and issue resolution when needed.",
      "We believe that people are the heart of our company. A strong, motivated team creates strong results — and that is why we invest in better training, better communication and better work opportunities for everyone involved. Together, we move with one goal: delivering smiles, safely and on time.",
    ],
  },
};

const stats = [
  { value: "50K+", label: "Parcels Delivered" },
  { value: "64", label: "Districts Covered" },
  { value: "99%", label: "On-time Rate" },
  { value: "24/7", label: "Support Available" },
];

const AboutUs = () => {
  const [active, setActive] = useState("story");
  const current = content[active];
  const activeTab = tabs.find((tab) => tab.key === active);

  return (
    <section className="py-10 sm:py-14 space-y-6 sm:space-y-8">
      <div className="relative overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
        {/* Background Accent */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />

        {/* Header */}
        <div className="relative bg-secondary px-6 py-10 sm:px-8 sm:py-12 lg:px-14 lg:py-14">
          <div className="grid gap-8 xl:grid-cols-[1.2fr_.8fr] xl:items-end">
            <div className="max-w-2xl">
              <p className="mb-3 inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">
                Who We Are
              </p>

              <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl xl:text-[2.6rem]">
                Delivering Trust,{" "}
                <span className="text-primary">One Parcel at a Time</span>
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
                Fast, reliable parcel delivery with real-time tracking and zero
                hassle — built for personal packages, growing businesses, and
                urgent shipments that matter.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 xl:grid-cols-2">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center backdrop-blur-sm"
                >
                  <p className="text-2xl font-extrabold leading-none text-primary sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-white/50 sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-100 bg-white px-4 sm:px-6 lg:px-14">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {tabs.map((tab) => {
              const isActive = active === tab.key;

              return (
                <button
                  key={tab.key}
                  onClick={() => setActive(tab.key)}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-200 sm:px-5 sm:py-3 sm:text-base ${isActive
                    ? "border-primary bg-primary text-secondary shadow-sm"
                    : "border-gray-200 bg-white text-gray-500 hover:border-primary/30 hover:bg-primary/5 hover:text-secondary"
                    }`}
                >
                  <span className="text-base sm:text-lg">{tab.icon}</span>
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="relative px-6 py-10 sm:px-8 sm:py-12 lg:px-14">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
            {/* Left Content */}
            <div className="max-w-3xl">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-2xl">
                  {activeTab?.icon}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    ZapShift Insight
                  </p>
                  <h3 className="text-xl font-bold text-secondary sm:text-2xl">
                    {current.heading}
                  </h3>
                </div>
              </div>

              <div className="space-y-5">
                {current.paragraphs.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-sm leading-7 text-gray-600 sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Right Card */}
            <div className="w-full">
              <div className="sticky top-24 overflow-hidden rounded-[24px] border border-primary/15 bg-gradient-to-br from-primary/10 via-white to-secondary/5 p-6 shadow-sm sm:p-7">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-3xl">
                  {activeTab?.icon}
                </div>

                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Highlight
                </p>

                <h4 className="text-lg font-bold leading-snug text-secondary sm:text-xl">
                  {current.heading}
                </h4>

                <p className="mt-4 text-sm leading-7 text-gray-600">
                  {current.paragraphs[0].slice(0, 135)}...
                </p>

                <div className="mt-6 flex items-center gap-3 border-t border-primary/15 pt-5">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                    ZapShift Courier
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom subtle strip */}
        <div className="h-2 w-full bg-gradient-to-r from-primary via-lime-300 to-primary/70" />
      </div>
    </section>
  );
};

export default AboutUs;