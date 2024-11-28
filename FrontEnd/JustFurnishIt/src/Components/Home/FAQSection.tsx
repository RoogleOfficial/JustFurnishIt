import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
    {
      question: 'Can JustFurnishIt work within my budget?',
      answer: 'Yes, JustFurnishIt can work with your budget to create a design that fits your needs while staying cost-effective.',
    },
    {
      question: 'Can JustFurnishIt design my room with just the floor plan?',
      answer: 'Absolutely! Our designers can work with your floor plan to create a design that is tailored specifically for your space.',
    },
    {
      question: 'Can I use my existing furniture in my new design?',
      answer: 'Yes, you can use your existing furniture in your new design. We will incorporate your pieces to ensure the design matches your vision.',
    },
    {
      question: 'Do I have to shop for items in my design right away?',
      answer: 'No, you do not need to shop for items immediately. You can shop for the items as per your convenience.',
    },
    {
      question: 'Will I be speaking with my designer?',
      answer: 'Yes, you will have direct communication with your designer throughout the project to ensure the design meets your expectations.',
    },
    {
      question: 'How does JustFurnishIt’s design service work?',
      answer: 'JustFurnishIt offers a step-by-step design service where you start by providing your requirements, and our designers work with you to bring your vision to life.',
    },
  ];

const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className=" mx-auto flex container flex-col lg:flex-row items-start lg:items-center py-1 px-5 sm:px-10 md:px-20  ">
      <div className="flex flex-col items-start lg:w-2/4 mb-5 lg:mb-0">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Still have questions?
        </h2>
        <h1 className="text-9xl font-bold text-gray-200">FAQ</h1>
        <img src='/src/assets/FAQ.png' className='mb-6 w-24 pl-[5rem] h-24 sm:w-32 sm:h-32 md:w-[25rem] md:h-[20rem]'></img>
      </div>
      <div className="lg:w-2/4 w-full max-w-4xl">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 border-b border-gray-200">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center py-4 text-left text-lg text-gray-800 focus:outline-none"
            >
              {faq.question}
              {activeIndex === index ? (
                <FaChevronUp className="text-gray-600" />
              ) : (
                <FaChevronDown className="text-gray-600" />
              )}
            </button>
            {activeIndex === index && (
              <div className="py-2 text-gray-600 text-base">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default FAQSection;
