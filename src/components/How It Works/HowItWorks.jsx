import { PackageCheck, Banknote, Warehouse, Building2 } from 'lucide-react';

const steps = [
  {
    icon: PackageCheck,
    title: "Pickup & Drop-off",
    description: "From personal packages to business shipments — we pick up and deliver on time, every time.",
  },
  {
    icon: Banknote,
    title: "Cash on Delivery",
    description: "Pay conveniently at your doorstep — secure, easy, and completely hassle-free.",
  },
  {
    icon: Warehouse,
    title: "Delivery Hub",
    description: "Centralized hubs ensure faster sorting and smooth delivery across all locations.",
  },
  {
    icon: Building2,
    title: "SME & Corporate",
    description: "Tailored logistics solutions for small businesses and corporate shipments.",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-12 shadow-[0_1px_3px_rgba(0,0,0,0.06)] sm:px-6 sm:py-16 lg:px-8">
      <div className="pointer-events-none absolute -left-16 top-0 h-52 w-52 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-52 w-52 rounded-full bg-accent/5 blur-3xl" />

      {/* Section Header */}
      <div className="relative mb-10 sm:mb-12">
        <p className="text-xs sm:text-sm font-semibold tracking-wider text-primary mb-2">
          Simple Process
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F2937] leading-tight">
          How it works
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_8px_24px_-8px_rgba(0,183,149,0.12)] sm:p-7"
            >
              {/* Step number watermark */}
              <span className="absolute top-4 right-5 text-6xl font-black text-[#F3F4F6]
                               group-hover:text-primary/8 transition-colors duration-300 select-none leading-none">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Icon */}
              <div className="relative w-12 h-12 mb-5 rounded-xl border border-primary/10 bg-primary/8 flex items-center justify-center transition-colors duration-300 group-hover:border-primary/20 group-hover:bg-primary/12">
                <Icon className="w-5 h-5 text-primary" />
              </div>

              {/* Text */}
              <h3 className="font-bold text-base sm:text-lg text-[#1F2937] group-hover:text-primary
                             mb-2 transition-colors duration-300 leading-snug">
                {step.title}
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed transition-colors duration-300">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;
