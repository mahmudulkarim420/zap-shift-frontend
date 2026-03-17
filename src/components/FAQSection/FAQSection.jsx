'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FaArrowRight } from 'react-icons/fa';

const faqs = [
  {
    question: 'How does this posture corrector work?',
    answer:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here's how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
    isExpanded: true,
    highlight: true,
  },
  {
    question: 'Is it suitable for all ages and body types?',
    answer:
      'Yes, our posture corrector is designed to be fully adjustable to fit a wide range of body types and ages. Please refer to our size guide for more details.',
    highlight: true,
  },
  {
    question: 'Does it really help with back pain and posture improvement?',
    answer:
      'Absolutely. Consistent use of the posture corrector can significantly aid in reducing muscle strain, correcting alignment, and improving overall posture, which in turn helps alleviate back pain.',
    highlight: true,
  },
  {
    question: 'Does it have smart features like vibration alerts?',
    answer:
      'No, the Posture Pro is a simple, non-electronic device focused on providing comfortable physical support. It does not include smart features like vibration alerts.',
    highlight: true,
  },
  {
    question: 'How will I be notified when the product is back in stock?',
    answer:
      'You can sign up for a notification on the product page. We will send you an email as soon as the Posture Pro is available for purchase again.',
    highlight: true,
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="my-16 sm:my-20 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary tracking-tight">
          Frequently Asked Question (FAQ)
        </h2>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-600">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
        </p>
      </div>

      {/* FAQ Items */}
      <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 md:space-y-5">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border rounded-lg shadow-sm overflow-hidden transition-all duration-300 
              ${faq.highlight ? 'border-teal-300 bg-teal-50' : 'bg-white border-gray-200 hover:border-gray-300'}`}
          >
            <button
              className="flex justify-between items-center w-full py-3 sm:py-4 px-4 sm:px-6 text-left"
              onClick={() => toggleFAQ(index)}
            >
              <span className={`text-sm sm:text-base md:text-lg font-semibold ${faq.highlight ? 'text-gray-800' : 'text-gray-700'}`}>
                {faq.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className={`w-4 sm:w-5 h-4 sm:h-5 ${faq.highlight ? 'text-teal-600' : 'text-gray-500'}`} />
              ) : (
                <ChevronDown className={`w-4 sm:w-5 h-4 sm:h-5 ${faq.highlight ? 'text-teal-600' : 'text-gray-500'}`} />
              )}
            </button>

            {/* Answer Content */}
            {openIndex === index && (
              <div className={`px-4 sm:px-6 pb-3 sm:pb-4 pt-0 transition-opacity duration-300 ${faq.highlight ? 'text-gray-700' : 'text-gray-500'}`}>
                <p className="text-xs sm:text-sm md:text-base leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* See More Button */}
      <div className="relative text-center mt-8 sm:mt-10">
        <button className="bg-primary hover:bg-lime-400 text-gray-800 font-semibold py-3 px-5 sm:px-6 rounded-full transition-colors duration-200 shadow-md">
          See More FAQ's
        </button>

        {/* Arrow outside button */}
        <div className="absolute top-1/2 md:right-[37%] right-[18%] -rotate-45 -translate-y-1/2 bg-secondary text-primary p-3 rounded-full">
          <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
