import Link from "next/link";

const services = [
  {
    title: "Same Day Delivery",
    desc: "Fast and reliable same-day delivery for urgent parcels inside the city.",
    icon: "⚡",
  },
  {
    title: "Express Delivery",
    desc: "Quick parcel delivery with real-time tracking and smooth handling.",
    icon: "🚚",
  },
  {
    title: "Nationwide Delivery",
    desc: "Send parcels to all 64 districts with secure and affordable shipping.",
    icon: "📦",
  },
  {
    title: "Cash on Delivery",
    desc: "Collect payments easily with our trusted cash on delivery support.",
    icon: "💵",
  },
  {
    title: "Business Solutions",
    desc: "Custom delivery support for e-commerce, shops, and growing businesses.",
    icon: "🏢",
  },
  {
    title: "Parcel Tracking",
    desc: "Track your parcel live and stay updated from pickup to final delivery.",
    icon: "📍",
  },
];

const processSteps = [
  {
    title: "Book Your Parcel",
    desc: "Choose parcel type, destination, and schedule the pickup in seconds.",
  },
  {
    title: "We Pick It Up",
    desc: "Our rider collects your parcel from your location right on time.",
  },
  {
    title: "Safe Transportation",
    desc: "Your parcel is handled carefully and moved securely to the destination.",
  },
  {
    title: "Delivered Successfully",
    desc: "The parcel reaches the receiver safely and on schedule — guaranteed.",
  },
];

const highlights = [
  { value: "24/7", label: "Customer Support" },
  { value: "99%", label: "On-time Delivery" },
  { value: "50K+", label: "Parcels Delivered" },
  { value: "100+", label: "Delivery Partners" },
];

const whyUs = [
  "Real-time parcel tracking",
  "Affordable pricing plans",
  "Secure parcel handling",
  "Fast pickup and delivery",
  "Support for personal and business needs",
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen py-10 sm:py-14 space-y-6 sm:space-y-8">

      {/* ── Hero ── */}
      <section className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 px-6 sm:px-10 lg:px-14 py-10 sm:py-14 items-center">

          {/* Left */}
          <div>
            <span className="inline-block bg-primary/10 text-secondary text-xs font-semibold
                             uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              Our Services
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-secondary
                           leading-tight mb-5 max-w-xl">
              Smart Delivery Solutions{" "}
              <span className="text-primary">For Every Parcel Need</span>
            </h1>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-lg mb-8">
              From personal packages to business shipments, we provide fast,
              secure, and affordable delivery services designed to make every
              shipment simple and stress-free.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link
                href="/pricing"
                className="bg-primary text-black font-semibold text-sm sm:text-base
                           px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow
                           hover:brightness-105 active:scale-95 transition-all duration-200"
              >
                View Pricing
              </Link>
              <Link
                href="/be-a-rider"
                className="border border-secondary text-secondary font-semibold text-sm sm:text-base
                           px-5 sm:px-6 py-2.5 sm:py-3 rounded-full
                           hover:bg-secondary hover:text-white active:scale-95
                           transition-all duration-200"
              >
                Be a Rider
              </Link>
            </div>
          </div>

          {/* Right — illustrated card */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-sm sm:max-w-md bg-primary/10 rounded-3xl p-8 sm:p-10
                            flex flex-col items-center justify-center text-center
                            min-h-[240px] sm:min-h-[300px]">
              <span className="text-6xl sm:text-7xl mb-4">📦</span>
              <h3 className="text-xl sm:text-2xl font-bold text-secondary mb-2">
                Fast & Safe Delivery
              </h3>
              <p className="text-gray-500 text-sm sm:text-base">
                Reliable parcel service with live tracking across Bangladesh.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Cards ── */}
      <section className="bg-secondary rounded-3xl px-6 sm:px-10 lg:px-14 py-12 sm:py-16">
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mb-2">
            What We Offer
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Delivery Services Built For Everyone
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Multiple parcel solutions to match personal, business, and urgent delivery requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-7
                         overflow-hidden hover:bg-primary hover:border-primary
                         transition-all duration-300 hover:shadow-2xl"
            >
              {/* Watermark number */}
              <span className="absolute top-4 right-5 text-6xl font-black text-white/5
                               group-hover:text-black/10 transition-colors duration-300
                               select-none leading-none">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="w-12 h-12 bg-white/10 group-hover:bg-black/10 rounded-xl
                              flex items-center justify-center text-2xl mb-5
                              transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-black
                             mb-2 leading-snug transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-sm sm:text-base text-white/60 group-hover:text-black/70
                            leading-relaxed transition-colors duration-300">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why Choose Us + Highlights ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

        {/* Why Choose Us */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-sm">
          <span className="inline-block bg-primary/10 text-secondary text-xs font-semibold
                           uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            Why Choose Us
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary mb-4 leading-snug">
            We Make Delivery Easy,{" "}
            <span className="text-primary">Fast & Secure</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8">
            Our platform is designed to give you a smooth delivery experience,
            whether you're sending one package or managing daily business orders.
          </p>

          <ul className="space-y-3 sm:space-y-4">
            {whyUs.map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="shrink-0 w-6 h-6 bg-primary rounded-full flex items-center
                                 justify-center text-xs font-bold text-black">
                  ✓
                </span>
                <p className="text-sm sm:text-base font-medium text-secondary">{item}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Service Highlights */}
        <div className="bg-primary/10 border border-primary/20 rounded-3xl p-6 sm:p-10">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-secondary/60 mb-2">
            By The Numbers
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-secondary mb-8">
            Service Highlights
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {highlights.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100
                           hover:border-primary/30 hover:shadow-md transition-all duration-200"
              >
                <p className="text-3xl sm:text-4xl font-extrabold text-secondary leading-none mb-1">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process Section ── */}
      <section className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 lg:p-14 shadow-sm">
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mb-2">
            Working Process
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary mb-4">
            How Our Service Works
          </h2>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            A simple and smooth parcel delivery process from booking to final delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {processSteps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-white border border-gray-100 rounded-2xl p-6 sm:p-7
                         hover:border-primary/30 hover:shadow-lg overflow-hidden
                         transition-all duration-300"
            >
              {/* Watermark */}
              <span className="absolute top-4 right-5 text-6xl font-black text-gray-50
                               group-hover:text-primary/10 transition-colors duration-300
                               select-none leading-none">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Step number badge */}
              <div className="w-11 h-11 bg-primary rounded-full flex items-center justify-center
                              text-base font-bold text-black mb-5 shadow-sm">
                {index + 1}
              </div>

              <h3 className="font-bold text-base sm:text-lg text-secondary mb-2 leading-snug">
                {step.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                {step.desc}
              </p>

              {/* Connector arrow — hidden on last */}
              {index < processSteps.length - 1 && (
                <div className="hidden xl:block absolute -right-3 top-1/2 -translate-y-1/2 z-10
                                w-6 h-6 bg-primary rounded-full flex items-center justify-center
                                text-black text-xs font-bold shadow">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}