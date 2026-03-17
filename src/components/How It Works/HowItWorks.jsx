import Image from 'next/image';
import icon from '@/app/assets/bookingIcon.png';

const HowItWorks = () => {
  return (
    <div className='my-25 px-4 sm:px-10 lg:px-6'>
      <h2 className="text-2xl font-bold text-secondary mb-6">How It Works</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-6 text-center">
        {[1, 2, 3, 4].map((step) => {
          const titles = [
            "Booking Pick & Drop",
            "Cash On Delivery",
            "Delivery Hub",
            "Booking SME & Corporate"
          ];
          const descriptions = [
            "From personal packages to business shipments — we deliver on time, every time.",
            "Pay conveniently at your doorstep — secure, easy, and hassle-free.",
            "Centralized hubs to ensure faster sorting and smooth delivery across all locations.",
            "Tailored solutions for small businesses and corporate shipments — reliable & efficient."
          ];
          return (
            <div key={step} className="bg-white p-6 rounded-2xl shadow-sm hover:bg-primary hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              <Image src={icon} alt={`Step ${step}`} className="w-12 h-12 mb-4 mx-auto" width={48} height={48} />
              <h3 className="font-bold text-lg text-secondary">{titles[step-1]}</h3>
              <p className="text-gray-600 mt-2">{descriptions[step-1]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HowItWorks;
