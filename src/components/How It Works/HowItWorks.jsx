import Image from 'next/image';
import icon from '@/app/assets/bookingIcon.png';

const steps = [
  {
    title: "Booking Pick & Drop",
    description: "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    title: "Cash On Delivery",
    description: "Pay conveniently at your doorstep — secure, easy, and hassle-free.",
  },
  {
    title: "Delivery Hub",
    description: "Centralized hubs to ensure faster sorting and smooth delivery across all locations.",
  },
  {
    title: "Booking SME & Corporate",
    description: "Tailored solutions for small businesses and corporate shipments — reliable & efficient.",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-border/70 bg-white/80 px-4 py-12 shadow-[0_24px_80px_-48px_rgba(8,60,64,0.45)] backdrop-blur-sm sm:px-6 sm:py-16 lg:px-8">
      <div className="pointer-events-none absolute -left-16 top-0 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-52 w-52 rounded-full bg-accent/10 blur-3xl" />

      {/* Section Header */}
      <div className="relative mb-10 sm:mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">
          Simple Process
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary">
          How It Works
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-[1.5rem] border border-border/70 bg-gradient-to-b from-white to-[#f5fbf6] p-6 shadow-[0_12px_30px_-24px_rgba(8,60,64,0.35)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-primary/40 hover:from-secondary hover:to-[#0b4a4f] hover:shadow-[0_24px_50px_-30px_rgba(8,60,64,0.5)] sm:p-7"
          >
            {/* Step number watermark */}
            <span className="absolute top-4 right-5 text-6xl font-black text-secondary/5
                             group-hover:text-white/10 transition-colors duration-300 select-none leading-none">
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Icon */}
            <div className="relative w-12 h-12 mb-5 rounded-xl border border-primary/10 bg-primary/10 flex items-center justify-center transition-colors duration-300 group-hover:border-white/10 group-hover:bg-white/15">
              <Image
                src={icon}
                alt={step.title}
                width={28}
                height={28}
                className="object-contain"
              />
            </div>

            {/* Text */}
            <h3 className="font-bold text-base sm:text-lg text-secondary group-hover:text-white
                           mb-2 transition-colors duration-300 leading-snug">
              {step.title}
            </h3>
            <p className="text-sm sm:text-base text-slate-500 group-hover:text-white/75
                          leading-relaxed transition-colors duration-300">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
