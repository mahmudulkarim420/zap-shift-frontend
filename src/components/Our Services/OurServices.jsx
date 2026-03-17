import Image from 'next/image';
import icon from '@/app/assets/service.png';

const OurServices = () => {
  const services = [
    {
      title: "Express & Standard Delivery",
      desc: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off."
    },
    {
      title: "Nationwide Delivery",
      desc: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours."
    },
    {
      title: "Fulfillment Solution",
      desc: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support."
    },
    {
      title: "Cash on Home Delivery",
      desc: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product."
    },
    {
      title: "Corporate Service / Contract In Logistics",
      desc: "Customized corporate services which includes warehouse and inventory management support."
    },
    {
      title: "Parcel Return",
      desc: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants."
    }
  ];

  return (
    <div className='bg-secondary p-8 sm:p-20 rounded-2xl my-25'>
      <h3 className="text-3xl font-bold text-white text-center mb-5">Our Services</h3>
      <p className='text-white text-center max-w-3xl mx-auto mb-10'>
        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
      </p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {services.map((service, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm hover:bg-primary hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            <Image src={icon} alt={service.title} className="w-12 h-12 mb-4 mx-auto" width={48} height={48} />
            <h3 className="font-bold text-lg text-secondary text-center">{service.title}</h3>
            <p className="text-gray-500 mt-2 text-center">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
