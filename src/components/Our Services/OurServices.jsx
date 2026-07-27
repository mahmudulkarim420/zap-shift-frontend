import { Zap, Globe, Package, Banknote, Building2, RotateCcw } from 'lucide-react';

const services = [
  {
    icon: Zap,
    title: "Express & Standard Delivery",
    desc: "Parcels delivered within 24–72 hours across major cities. Express delivery in Dhaka within 4–6 hours from pickup to drop-off.",
  },
  {
    icon: Globe,
    title: "Nationwide Delivery",
    desc: "Home delivery in every district across Bangladesh — your products reach customers within 48–72 hours, guaranteed.",
  },
  {
    icon: Package,
    title: "Fulfillment Solutions",
    desc: "Inventory management, order processing, custom packaging, and after-sales support — all under one roof.",
  },
  {
    icon: Banknote,
    title: "Cash on Delivery",
    desc: "100% cash on delivery anywhere in Bangladesh with guaranteed safety and secure handling of every product.",
  },
  {
    icon: Building2,
    title: "Corporate & Contract Logistics",
    desc: "Customized corporate solutions including warehouse management, inventory control, and dedicated logistics contracts.",
  },
  {
    icon: RotateCcw,
    title: "Parcel Returns",
    desc: "Reverse logistics made easy — allow customers to return or exchange products with your online business seamlessly.",
  },
];

const OurServices = () => {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-[#E5E7EB] bg-white px-4 py-12 shadow-[0_1px_3px_rgba(0,0,0,0.06)] sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-primary/4 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-56 w-56 rounded-full bg-accent/4 blur-3xl" />

      <div className="relative">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14 lg:mb-16">
          <p className="mb-3 inline-block rounded-full bg-primary/8 px-4 py-1.5 text-xs font-semibold tracking-wider text-primary sm:text-sm">
            What We Offer
          </p>

          <h2 className="text-2xl font-bold leading-tight text-[#1F2937] sm:text-3xl lg:text-4xl">
            Our <span className="text-primary">Services</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#6B7280] sm:text-base sm:leading-7">
            Fast, reliable parcel delivery with real-time tracking and zero hassle.
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-white hover:shadow-[0_8px_32px_-8px_rgba(0,183,149,0.1)] sm:p-7"
              >
                {/* Top gradient accent */}
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

                {/* Watermark number */}
                <span className="pointer-events-none absolute right-4 top-3 select-none text-6xl font-black leading-none text-[#F3F4F6] transition-colors duration-300 group-hover:text-primary/8 sm:right-5 sm:top-4">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Icon */}
                <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/10 bg-primary/8 transition-all duration-300 group-hover:border-primary/20 group-hover:bg-primary/12">
                  <Icon className="w-5 h-5 text-primary" />
                </div>

                {/* Content */}
                <h3 className="mb-2 pr-10 text-lg font-bold leading-snug text-[#1F2937] transition-colors duration-300 group-hover:text-primary">
                  {service.title}
                </h3>

                <p className="text-sm leading-relaxed text-[#6B7280]">
                  {service.desc}
                </p>

                {/* Bottom accent */}
                <div className="mt-6 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="text-xs font-medium text-[#9CA3AF] transition-colors duration-300 group-hover:text-[#6B7280]">
                    ZapShift Service
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
