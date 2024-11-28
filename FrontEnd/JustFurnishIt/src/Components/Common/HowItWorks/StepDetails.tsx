import React from 'react';

const StepDetails: React.FC<{ stepId: number }> = ({ stepId }) => {
  const stepDetails = [
    {
      id: 1,
      title: 'Meet your designer',
      imgSrc: 'https://res.cloudinary.com/dtpcgqcrs/image/upload/v1730713127/meet-designer_twutrf.png',
      details: [
       
        {
          subtitle: 'Get free consultation',
          description:
            'Talk to your designer and get personalised designs and quote for your dream home.',
        },
      ],
    },
    {
      id: 2,
      title: 'Book Designer',
      imgSrc: 'https://res.cloudinary.com/dtpcgqcrs/image/upload/v1730713114/book-livspace_mqqemd.png',
      details: [
       
        {
          subtitle: 'Finalise your home design',
          description:
            "It's time to deep dive into the nitty-gritties & pick your favorite materials, finishes, etc. Interim payments will be requested based on project scope, value, and timelines during the booking and design phase.",
        },
      ],
    },
    {
      id: 3,
      title: 'Place the order',
      imgSrc: 'https://res.cloudinary.com/dtpcgqcrs/image/upload/v1730713115/execution-begins_iqh7su.png',
      details: [
        {
          subtitle: 'Confirm your Design',
          description:
            "Finalise the design , and your project is now off to a good start.",
         
        },
        {
          subtitle: 'Work commences',
          description:
            "Civil work begins on site. Keep a tab on your project status .",
        },
      ],
    },
    {
      id: 4,
      title: 'Final installations',
      imgSrc: 'https://res.cloudinary.com/dtpcgqcrs/image/upload/v1730713120/final-installations_bbrcjx.png',
      details: [
        {
          subtitle: 'Material Dispatch',
          description:
            "Once the materials are ready for dispatch, you'll be intimated. We'll head to the last leg of your project.",
           buttonText: '',
        },
        {
          subtitle: 'Installation',
          description:
            'Orders get delivered on-site and installation happens as per design.',
        },
      ],
    },
    {
      id: 5,
      title: 'Move in!',
      imgSrc: 'https://res.cloudinary.com/dtpcgqcrs/image/upload/v1730713137/move-in_yotwcp.png',
      details: [
        {
          subtitle: '',
          description:
            "Your dream home is now a reality! It's time to make new memories! Do avail the free professional photoshoot session of your #JustFurnishIt.",
        },
      ],
    },
  ];

  const step = stepDetails.find((s) => s.id === stepId);

  if (!step) return null;

  return (
    <div className="flex flex-col md:flex-row items-start gap-10 p-5">
      <div className="w-full md:w-2/5"> {/* Reduced width to 2/5 for smaller size */}
        <img
          src={step.imgSrc}
          alt={step.title}
          className="w-full rounded-lg max-w-xs md:max-w-sm" // Added max-width for a smaller image size
        />
      </div>
      <div className="w-full md:w-3/5">
        <h2 className="text-3xl font-bold mb-5">{step.title}</h2>
        {step.details.map((detail, index) => (
          <div key={index} className="mb-6">
            {detail.subtitle && (
              <h3 className="text-xl font-semibold mb-2">{detail.subtitle}</h3>
            )}
            <p className="text-gray-700 mb-4">{detail.description}</p>
            {detail.buttonText && (
              <button className="bg-gray-800 text-white py-2 px-4 rounded-full hover:bg-red-600">
                {detail.buttonText}
              </button>
            )}
          </div>
        ))}

        {stepId === 3 && (
          <div className="w-full bg-gray-800 text-white py-6 mt-8 flex justify-center items-center rounded-lg">
            <p className="text-center text-lg font-bold">
              🎉 You’re halfway there. Your orders are raised!
            </p>
          </div>
        )}

        
      </div>
    </div>
  );
};

export default StepDetails;
