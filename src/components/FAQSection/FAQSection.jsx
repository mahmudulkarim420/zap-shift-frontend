'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How do I book a parcel pick-up?',
    answer:
      'Booking is simple — log in to your ZapShift merchant account, enter the pick-up and drop-off details, select your preferred delivery speed, and confirm. Our rider will arrive at your location within the scheduled window.',
  },
  {
    question: 'What areas does ZapShift deliver to?',
    answer:
      'We deliver nationwide across all 64 districts of Bangladesh, with express same-day or 4–6 hour delivery available within Dhaka. Major cities like Chittagong, Sylhet, Khulna, and Rajshahi enjoy 24–48 hour service.',
  },
  {
    question: 'How does Cash on Delivery (COD) work?',
    answer:
      'Our riders collect payment from your customer at the time of delivery. The collected amount is transferred to your registered merchant account within the standard settlement cycle — securely and on time.',
  },
  {
    question: 'Can I track my parcel in real time?',
    answer:
      'Yes. Every shipment comes with a live tracking link. You and your customer can monitor the parcel status — from pick-up confirmation through to final delivery — directly from our platform or app.',
  },
  {
    question: 'What happens if a parcel is lost or damaged?',
    answer:
      'All parcels are covered under our delivery guarantee. In the rare event of loss or damage, our support team initiates an investigation within 24 hours and processes compensation according to the declared parcel value.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-border/70 bg-white/80 px-4 py-12 shadow-[0_24px_80px_-48px_rgba(8,60,64,0.45)] backdrop-blur-sm sm:px-6 sm:py-16 lg:px-8">
      <div className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />

      {/* Section Header */}
      <div className="relative max-w-2xl mx-auto text-center mb-10 sm:mb-12">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mb-2">
          Got Questions?
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
          Everything you need to know about shipping, delivery, and working
          with ZapShift. Can&apos;t find your answer? Our support team is available 24/7.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`border rounded-2xl overflow-hidden transition-all duration-300
                ${isOpen
                  ? 'border-primary/30 bg-primary/10 shadow-[0_18px_45px_-28px_rgba(8,60,64,0.4)]'
                  : 'border-border/70 bg-white hover:border-primary/20 hover:shadow-[0_14px_35px_-24px_rgba(8,60,64,0.25)] shadow-sm'
                }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex justify-between items-center w-full px-5 sm:px-6 py-4 sm:py-5 text-left gap-4"
                aria-expanded={isOpen}
              >
                <span className={`text-sm sm:text-base font-semibold leading-snug transition-colors duration-200
                  ${isOpen ? 'text-secondary' : 'text-slate-700'}`}>
                  {faq.question}
                </span>

                {/* Animated chevron */}
                <span className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center
                                  transition-all duration-300
                                  ${isOpen
                    ? 'bg-primary text-secondary rotate-180'
                    : 'bg-slate-100 text-slate-500'
                  }`}>
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>

              {/* Animated answer panel */}
              <div className={`grid transition-all duration-300 ease-in-out
                              ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  <p className="px-5 sm:px-6 pb-5 text-sm sm:text-base text-slate-500 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-10 sm:mt-12">
        <button className="inline-flex items-center gap-3 bg-secondary text-white
                           font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm sm:text-base
                           hover:brightness-110 active:scale-95 transition-all duration-200 shadow-lg">
          View All FAQs
          <span className="w-6 h-6 bg-primary text-secondary rounded-full flex items-center justify-center -rotate-45 shrink-0">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
};

export default FAQSection;
