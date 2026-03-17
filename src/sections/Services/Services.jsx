import Link from "next/link";

const services = [
  {
    title: "Same Day Delivery",
    desc: "Fast and reliable same day delivery service for urgent parcels inside the city.",
    icon: "⚡",
  },
  {
    title: "Express Delivery",
    desc: "Quick parcel delivery with real-time tracking and smooth handling process.",
    icon: "🚚",
  },
  {
    title: "Nationwide Delivery",
    desc: "Send parcels anywhere in the country with secure and affordable shipping.",
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
    desc: "Choose your parcel type, destination, and schedule the pickup easily.",
  },
  {
    title: "We Pick It Up",
    desc: "Our rider collects your parcel from your location on time.",
  },
  {
    title: "Safe Transportation",
    desc: "Your parcel is handled carefully and moved securely to the destination.",
  },
  {
    title: "Delivered Successfully",
    desc: "The parcel reaches the receiver safely and on schedule.",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="pb-12 pt-10">
        <div className="overflow-hidden rounded-[30px] bg-white shadow-sm">
          <div className="grid items-center gap-10 px-6 py-10 md:px-10 md:py-14 lg:grid-cols-2 lg:px-14">
            <div>
              <span className="inline-block rounded-full bg-lime-100 px-4 py-1 text-sm font-semibold text-[#0c3b44]">
                Our Services
              </span>

              <h1 className="mt-5 max-w-xl text-3xl font-extrabold leading-tight text-[#0c3b44] md:text-5xl">
                Smart Delivery Solutions For Every Parcel Need
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-500 md:text-base">
                From personal packages to business shipments, we provide fast,
                secure, and affordable delivery services designed to make every
                shipment simple and stress-free.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/pricing"
                  className="rounded-xl bg-lime-400 px-6 py-3 text-sm font-semibold text-[#0c3b44] transition hover:bg-lime-500"
                >
                  View Pricing
                </Link>
                <Link
                  href="/be-a-rider"
                  className="rounded-xl border border-[#0c3b44] px-6 py-3 text-sm font-semibold text-[#0c3b44] transition hover:bg-[#0c3b44] hover:text-white"
                >
                  Be a Rider
                </Link>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="flex h-[280px] w-full max-w-[500px] items-center justify-center rounded-[28px] bg-[#edf7d0] p-6 md:h-[340px]">
                <div className="text-center">
                  <div className="text-6xl md:text-8xl">📦</div>
                  <h3 className="mt-4 text-2xl font-bold text-[#0c3b44]">
                    Fast & Safe Delivery
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 md:text-base">
                    Reliable parcel service with modern tracking support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Cards */}
      <section className="py-4">
        <div className="rounded-[30px] bg-[#0b3a43] px-6 py-10 md:px-10 md:py-14">
          <div className="mb-10 text-center">
            <span className="inline-block rounded-full bg-lime-300 px-4 py-1 text-sm font-semibold text-[#0b3a43]">
              What We Offer
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-white md:text-4xl">
              Delivery Services Built For Everyone
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
              We offer multiple parcel solutions to match personal, business,
              and urgent delivery requirements.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="rounded-[24px] bg-white p-6 shadow-sm transition hover:-translate-y-1"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-100 text-2xl">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0c3b44]">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-gray-500">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[30px] bg-white p-6 shadow-sm md:p-10">
            <span className="inline-block rounded-full bg-lime-100 px-4 py-1 text-sm font-semibold text-[#0c3b44]">
              Why Choose Us
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-[#0c3b44] md:text-4xl">
              We Make Delivery Easy, Fast, and Secure
            </h2>
            <p className="mt-4 text-sm leading-7 text-gray-500 md:text-base">
              Our platform is designed to give you a smooth delivery
              experience, whether you are sending one package or managing daily
              business orders.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Real-time parcel tracking",
                "Affordable pricing plans",
                "Secure parcel handling",
                "Fast pickup and delivery",
                "Support for personal and business needs",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-lime-300 text-xs font-bold text-[#0c3b44]">
                    ✓
                  </div>
                  <p className="text-sm font-medium text-[#0c3b44] md:text-base">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] bg-[#edf7d0] p-6 shadow-sm md:p-10">
            <h3 className="text-2xl font-extrabold text-[#0c3b44] md:text-3xl">
              Service Highlights
            </h3>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[22px] bg-white p-5">
                <h4 className="text-3xl font-extrabold text-[#0c3b44]">24/7</h4>
                <p className="mt-2 text-sm text-gray-500">Customer Support</p>
              </div>

              <div className="rounded-[22px] bg-white p-5">
                <h4 className="text-3xl font-extrabold text-[#0c3b44]">99%</h4>
                <p className="mt-2 text-sm text-gray-500">On-time Delivery</p>
              </div>

              <div className="rounded-[22px] bg-white p-5">
                <h4 className="text-3xl font-extrabold text-[#0c3b44]">50K+</h4>
                <p className="mt-2 text-sm text-gray-500">Parcels Delivered</p>
              </div>

              <div className="rounded-[22px] bg-white p-5">
                <h4 className="text-3xl font-extrabold text-[#0c3b44]">100+</h4>
                <p className="mt-2 text-sm text-gray-500">Delivery Partners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="pb-14">
        <div className="rounded-[30px] bg-white p-6 shadow-sm md:p-10">
          <div className="mb-10 text-center">
            <span className="inline-block rounded-full bg-lime-100 px-4 py-1 text-sm font-semibold text-[#0c3b44]">
              Working Process
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-[#0c3b44] md:text-4xl">
              How Our Service Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-500 md:text-base">
              A simple and smooth parcel delivery process from booking to final
              delivery.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="rounded-[24px] border border-gray-100 bg-[#f8fafb] p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lime-300 text-lg font-bold text-[#0c3b44]">
                  {index + 1}
                </div>
                <h3 className="mt-5 text-xl font-bold text-[#0c3b44]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-gray-500">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}