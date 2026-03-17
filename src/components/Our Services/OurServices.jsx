import Image from 'next/image';
import icon from '@/app/assets/service.png';

const services = [
  {
    title: "Express & Standard Delivery",
    desc: "Parcels delivered within 24–72 hours across major cities. Express delivery in Dhaka within 4–6 hours from pick-up to drop-off.",
  },
  {
    title: "Nationwide Delivery",
    desc: "Home delivery in every district across Bangladesh — your products reach customers within 48–72 hours, guaranteed.",
  },
  {
    title: "Fulfillment Solution",
    desc: "Inventory management, online order processing, custom packaging, and after-sales support — all under one roof.",
  },
  {
    title: "Cash on Home Delivery",
    desc: "100% cash on delivery anywhere in Bangladesh with guaranteed safety and secure handling of every product.",
  },
  {
    title: "Corporate & Contract Logistics",
    desc: "Customized corporate solutions including warehouse management, inventory control, and dedicated logistics contracts.",
  },
  {
    title: "Parcel Return",
    desc: "Reverse logistics made easy — allow end customers to return or exchange products with your online business seamlessly.",
  },
];

const OurServices = () => {
  return (
    <section className="relative overflow-hidden rounded-[28px] bg-secondary px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14 lg:mb-16">
          <p className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">
            What We Offer
          </p>

          <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl xl:text-5xl">
            Our <span className="text-primary">Services</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
            Fast, reliable parcel delivery with real-time tracking and zero hassle.
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/60 hover:bg-primary hover:shadow-[0_20px_50px_rgba(0,0,0,0.18)] sm:p-7"
            >
              {/* top gradient accent */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-60" />

              {/* Watermark number */}
              <span className="pointer-events-none absolute right-4 top-3 select-none text-6xl font-black leading-none text-white/5 transition-colors duration-300 group-hover:text-black/10 sm:right-5 sm:top-4">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Icon */}
              <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 transition-all duration-300 group-hover:border-black/10 group-hover:bg-black/10">
                <Image
                  src={icon}
                  alt={service.title}
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>

              {/* Content */}
              <h3 className="mb-3 pr-10 text-lg font-bold leading-snug text-white transition-colors duration-300 group-hover:text-black sm:text-xl">
                {service.title}
              </h3>

              <p className="text-sm leading-7 text-white/65 transition-colors duration-300 group-hover:text-black/75 sm:text-base">
                {service.desc}
              </p>

              {/* bottom accent */}
              <div className="mt-6 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary transition-colors duration-300 group-hover:bg-black" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50 transition-colors duration-300 group-hover:text-black/60">
                  ZapShift Service
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;