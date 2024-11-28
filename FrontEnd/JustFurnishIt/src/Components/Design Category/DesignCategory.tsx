import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation } from 'react-router-dom';
import { DesignCardData } from '../../Types/DesignTypes';


// TypeScript type for card data


const DesignCategory: React.FC = () => {
  const [designCards, setDesignCards] = useState<DesignCardData[]>([]); // State to hold the categories

  const location = useLocation(); // Hook to get the current path
  // State for toggling the "read more/less" functionality
  const [showFullText, setShowFullText] = useState(false);
  const[loading , setLoading] = useState(true);
  loading



  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await fetch('src/Components/Design Category/category.json'); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setLoading(false);

        // Assuming the API returns an array of categories with title, designs count, image, and link
        const categories = data.map((category: any) => ({
          title: category.title,
          designs: category.designs,
          image: category.image,
          link: `/design-ideas/${category.slug}`, // Or any format you want for the link
        }));

        setDesignCards(categories);
     
      } catch (err: any) {
        toast.error(err.message)
      }
    };

    fetchCategories();
  }, []); 

  return (
    <div className="container  mx-auto px-5 py-20 relative max-w-screen-xl">
        <>
          {/* Breadcrumb Navigation */}
          <nav className="text-sm text-gray-500 my-4">
            <Link
              to="/"
              className={`hover:text-red-500 transition-colors duration-200 no-underline ${location.pathname === '/' ? 'text-red-500' : 'text-red-500'
                }`}
            >
              Home
            </Link>
            /
            <span
              className={`ml-1 ${location.pathname === '/design-ideas' ? 'text-black' : 'text-gray-500'
                }`}
            >
              Design Ideas
            </span>
          </nav>

          <div className="text-left mb-10">
            <h2 className="text-4xl font-bold text-gray-800 border-l-4 border-red-600 pl-3 inline-block align-middle">
              Home Interior Design
            </h2>

            {/* Conditional rendering for the text */}
            <p className="text-lg w-3/4 text-gray-600 mt-2 ml-[1.15rem]">
              {showFullText
                ? 'We bring you carefully-curated interior design ideas, to give your home a brand new look. Explore exclusive interior designs and trends that are every bit inspirational as they are practical. Our team of interior designers have put together ideas across kitchen, bedroom, living room and more, to help you pick a design that will best suit your home interior requirements.'
                : 'We bring you carefully-curated interior design ideas, to give your home a brand new look. Explore exclusive interior designs and trends that are every bit inspirational as they are practical. Our team of....'}
            </p>

            <button
              onClick={() => setShowFullText(!showFullText)}
              className="ml-[1.15rem] text-red-500 font-semibold focus:outline-none mt-2"
            >
              {showFullText ? 'Read Less' : 'Read More'}
            </button>
          </div>

          {/* Card grid layout */}
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {designCards.map((card, index) => (
              <Link to={card.link} key={index} className="no-underline">
                <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <img
                    className="w-full h-60 object-cover"
                    src={card.image}
                    alt={card.title}
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 pt-4 pb-2 px-2">{card.title}</h3>
                    {/* <p className="text-sm text-gray-500 ">{card.designs} Designs</p> */}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      
    </div>
  );
};

export default DesignCategory;
