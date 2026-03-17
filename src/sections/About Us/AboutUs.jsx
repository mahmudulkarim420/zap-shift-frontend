'use client';

import { useState } from "react";

const AboutUs = () => {
  const [active, setActive] = useState("story");

  const content = {
  story: (
    <>
      <p>
        We started with a simple promise — to make parcel delivery fast, reliable
        and absolutely stress-free for everyone. From the very beginning, our focus
        has been to build a delivery network that people can trust without thinking
        twice. With continuous improvement in route management, rider efficiency and
        technology integration, we have grown from a small initiative to a service
        capable of handling hundreds of deliveries every single day.
      </p>
      <br />
      <p>
        Over the years, thousands of individuals and companies have relied on us to
        deliver gifts, documents, business shipments and urgent parcels — always on
        time. Our goal remains simple: to ensure every delivery reaches safely,
        quickly, and with real-time transparency. This story is just the beginning —
        we are evolving every day to serve better.
      </p>
    </>
  ),

  mission: (
    <>
      <p>
        Our mission is to transform traditional delivery into a modern, efficient,
        technology-powered experience. We want parcel delivery to feel effortless —
        where customers book in seconds, track live locations, and stay confident
        throughout the journey. Logistics shouldn’t be stressful, and we aim to make
        it smooth for both personal users and businesses who rely on fast movement
        of goods.
      </p>
      <br />
      <p>
        With a mission to deliver excellence, we continuously focus on rider
        training, optimized delivery routes, a responsive support team and an
        ever-improving platform. We dream of a future where every parcel — no matter
        how big or small — reaches its destination with speed, care and reliability.
      </p>
    </>
  ),

  success: (
    <>
      <p>
        Our success is built on trust — trust from customers, riders and business
        partners who chose us every day. From our early days of handling only a
        handful of deliveries to now managing a growing volume across multiple
        locations, we’ve come a long way. Each completed delivery, each satisfied
        customer, and each returning client adds to the foundation of our growth.
      </p>
      <br />
      <p>
        We continue investing in technology, rider expansion and smart logistics to
        keep raising the bar. The milestones we have achieved so far motivate us to
        push further — faster delivery speed, improved coverage, better support and
        innovative new features to elevate the delivery experience.
      </p>
    </>
  ),

  team: (
    <>
      <p>
        Behind every parcel delivered on time stands a dedicated team working with
        focus and passion. Our riders are trained not only for speed, but also for
        handling items with care and maintaining friendly service with customers.
        Our support and tech team operate continuously to ensure smooth communication,
        system performance and issue resolution when needed.
      </p>
      <br />
      <p>
        We believe that people are the heart of our company. A strong, motivated
        team creates strong results — and that is why we invest in better training,
        better communication and better work opportunities for everyone involved.
        Together, we move with one goal: delivering smiles, safely and on time.
      </p>
    </>
  ),
};


  const tabs = [
    { key: "story", label: "Story" },
    { key: "mission", label: "Mission" },
    { key: "success", label: "Success" },
    { key: "team", label: "Team & Others" },
  ];

  return (
    <div className="my-15 bg-white rounded-2xl p-10 shadow-sm border border-gray-100">
      <h2 className="text-secondary font-bold text-4xl">About Us</h2>
      <p className="text-gray-500 mt-4 max-w-xl leading-relaxed">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>

      <hr className="mt-8 border-gray-200" />

      {/* tabs */}
      <div className="flex flex-wrap gap-6 mt-6 font-medium text-gray-600">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`pb-2 transition-all ${
              active === tab.key
                ? "text-primary font-semibold border-b-2 border-primary"
                : "hover:text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* dynamic content display */}
      <div className="mt-8 text-gray-600 leading-7">{content[active]}</div>
    </div>
  );
};

export default AboutUs;
