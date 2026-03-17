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
    <section className="px-4 sm:px-8 lg:px-12">

      {/* Section Header */}
      <div className="mb-10 sm:mb-12">
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
            className="group relative bg-white border border-gray-100 rounded-2xl p-6 sm:p-7
                       shadow-sm hover:shadow-xl hover:bg-primary hover:border-primary
                       transition-all duration-300 ease-in-out overflow-hidden"
          >
            {/* Step number watermark */}
            <span className="absolute top-4 right-5 text-6xl font-black text-gray-100
                             group-hover:text-white/20 transition-colors duration-300 select-none leading-none">
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Icon */}
            <div className="relative w-12 h-12 mb-5 bg-primary/10 group-hover:bg-white/20
                            rounded-xl flex items-center justify-center transition-colors duration-300">
              <Image
                src={icon}
                alt={step.title}
                width={28}
                height={28}
                className="object-contain"
              />
            </div>

            {/* Text */}
            <h3 className="font-bold text-base sm:text-lg text-secondary group-hover:text-black
                           mb-2 transition-colors duration-300 leading-snug">
              {step.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-500 group-hover:text-black/70
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