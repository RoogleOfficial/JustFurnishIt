import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import Spinner from "../Spinner/Spinner";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store/Store";
import {
  addToFavorites,
  fetchDesignsByCategory,
  fetchFavorites,
  removeFromFavorites,
} from "../../Services/DesignService";

// TypeScript type for design data
interface DesignData {
  designId: number;
  designName: string;
  dimension: string;
  rating: number;
  imageLink: string;
}
// TypeScript type for category details
interface CategoryDetails {
  title: string;
  description: string;
}
const designCategories = [
  { slug: "modular-kitchen-designs", name: "Kitchen" },
  { slug: "master-bedroom-designs", name: "Master Bedroom" },
  { slug: "living-room-designs", name: "Living Room" },
  { slug: "bathroom-designs", name: "Bathroom" },
  { slug: "wardrobe-designs", name: "Wardrobe" },
  { slug: "study-room-designs", name: "Study Room" },
  { slug: "kids-bedroom", name: "Kids Bedroom" },
  { slug: "pooja-room-designs", name: "Pooja Room" },
];
const DesignCategoryDetails: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const { slug } = useParams<{ slug: string }>();
  const [designs, setDesigns] = useState<DesignData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<
    { designId: number; wishListId: number }[]
  >([]);
  const navigate = useNavigate();
  // Mock customer ID (replace with actual customer ID in your app)
  const { userDetails } = useSelector((state: RootState) => state.auth);
  const customerId = userDetails?.UserId;
  const getCategoryIdFromSlug = (slug: string): number | null => {
    const slugToIdMap: { [key: string]: number } = {
      "modular-kitchen-designs": 0,
      "wardrobe-designs": 1,
      "bathroom-designs": 2,
      "master-bedroom-designs": 3,
      "living-room-designs": 4,
      "pooja-room-designs": 5,
      "kids-bedroom": 6,
      "balcony-designs": 7,
      "dining-room-designs": 8,
      "home-office-designs": 9,
      "study-room-designs": 10,
    };
    return slugToIdMap[slug] ?? null;
  };
  const getCategoryDetailsFromSlug = (slug: string): CategoryDetails | null => {
    const slugToDetailsMap: { [key: string]: CategoryDetails } = {
      "modular-kitchen-designs": {
        title: "Modular Kitchen ",
        description:
          "Explore beautiful modular kitchen designs that blend functionality and style.",
      },
      "wardrobe-designs": {
        title: "Wardrobe ",
        description:
          "Discover stylish wardrobe designs for all your storage needs.",
      },
      "bathroom-designs": {
        title: "Bathroom ",
        description:
          "Find modern and functional bathroom designs that suit every home.",
      },
      "master-bedroom-designs": {
        title: "Master Bedroom ",
        description:
          "Create your dream master bedroom with these inspiring designs.",
      },
      "living-room-designs": {
        title: "Living Room ",
        description:
          "Elevate your living space with contemporary living room designs.",
      },
      "pooja-room-designs": {
        title: "Pooja Room ",
        description: "Explore spiritual and peaceful pooja room designs.",
      },
      "kids-bedroom": {
        title: "Kids Bedroom ",
        description:
          "Find playful and functional designs for your kids' bedroom.",
      },
      "balcony-designs": {
        title: "Balcony ",
        description:
          "Create a relaxing outdoor space with our balcony design ideas.",
      },
      "dining-room-designs": {
        title: "Dining Room ",
        description:
          "Design the perfect dining room for family gatherings and meals.",
      },
      "home-office-designs": {
        title: "Home Office ",
        description: "Design a productive and stylish home office space.",
      },
      "study-room-designs": {
        title: "Study Room ",
        description:
          "Discover study room designs that blend focus with comfort.",
      },
    };
    return slugToDetailsMap[slug] ?? null;
  };
  const categoryDetails = getCategoryDetailsFromSlug(slug!);

  // Fetch favorites
  useEffect(() => {
    const fetchUserFavorites = async () => {
      if (customerId) {
        try {
          const favoriteDesigns = await fetchFavorites(customerId);
          setFavorites(favoriteDesigns);
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      }
    };
    fetchUserFavorites();
  }, [customerId]);

  useEffect(() => {
    const categoryId = getCategoryIdFromSlug(slug!);
    if (categoryId === null) {
      setError("Invalid category");
      setLoading(false);
      return;
    }

    const fetchCategoryDesigns = async () => {
      try {
        const data = await fetchDesignsByCategory(categoryId);
        setDesigns(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchCategoryDesigns();
  }, [slug]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleFavoriteClick = async (designId: number) => {
    if (userDetails === null) {
      navigate("/login");
    }else{
    try {
      const favorite = favorites.find((item) => item.designId === designId);

      if (favorite) {
        await removeFromFavorites(customerId!, favorite.wishListId);
        setFavorites((prevFavorites) =>
          prevFavorites.filter((item) => item.designId !== designId)
        );
        console.log(`Design ${designId} removed from wishlist.`);
      } else {
        const newFavorite = await addToFavorites(customerId!, designId);
        setFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
        console.log(`Design ${designId} added to wishlist.`);
      }
    } catch (error) {
      console.error("Error handling favorite click:", error);
    }}
  };
  const handleCategoryClick = (slug: string) => {
    navigate(`/design-ideas/${slug}`);
  };
  const isFavorite = (designId: number) =>
    favorites.some((item) => item.designId === designId);
  const handleBookingClick = (design: DesignData) => {
    if (userDetails === null) {
      navigate("/login");
    }else{
      navigate(`/design-ideas/${slug}/${design.designId}/appointment`, {
        state: { design },
      });

    }
    
  };
  const quoteHandler = (id: number) => {
    if (userDetails === null) {
      navigate("/login");
    }else{
      navigate(`/design-ideas/${slug}/estimateQuote/${id}`);
    }

   
  };
  return (
    <div className="container mx-auto w-full px-20 pt-[4.5rem] max-w-screen-2xl">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 my-3">
        <Link to="/" className="text-red-500 no-underline hover:text-red-500">
          Home
        </Link>{" "}
        /
        <Link
          to="/design-ideas"
          className="text-red-500 ml-1 no-underline hover:text-red-500"
        >
          Design Ideas
        </Link>{" "}
        /<span className="ml-1 text-black">{categoryDetails?.title}</span>
      </nav>
      {/* Category Slider with Left and Right Buttons */}
      <div className="relative py-4 ">
        <div
          ref={sliderRef}
          className="flex space-x-4 pr-4 items-center overflow-x-auto scrollbar-hide no-scrollbar py-2"
        >
          {designCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category.slug)}
              className={`text-gray-700 font-bold px-4 py-2 whitespace-nowrap hover:text-red-600 transition-colors ${
                slug === category.slug
                  ? "text-red-600 border-b-2 border-red-600"
                  : ""
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        {/* Scroll Right Button */}
        {/* <button onClick={() => (sliderRef.current!.scrollLeft += 200)} className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg z-10">
          <FaChevronRight />
        </button> */}
      </div>
      {/* Title with Red Border */}
      <div className="flex items-center mb-5">
        <div className="border-l-4 border-red-600 pl-4">
          <h1 className="text-4xl font-bold ">{categoryDetails?.title}</h1>
        </div>
      </div>
      <p className="mt-4 text-lg text-gray-600">
        {categoryDetails?.description}
      </p>
      {/* Centered Grid Layout for Designs */}
      <div className="container mx-auto py-5 px-2 sm:px-3 lg:px-8">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center">
          {designs.map((design) => (
            <div
              key={design.designId}
              className="relative bg-white shadow-lg rounded-lg overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-4 right-4 z-10">
                <button
                  className="group bg-white border border-transparent rounded-full p-2 shadow transition-all duration-300 hover:bg-red-500"
                  onClick={() => handleFavoriteClick(design.designId)}
                >
                  <FaHeart
                    className={`h-6 w-6 ${
                      isFavorite(design.designId)
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              </div>
              <Link
                to={`/design-ideas/${slug}/${design.designId}`}
                className="no-underline"
              >
                <img
                  className="w-full h-60 object-cover transition-transform duration-300 hover:scale-105"
                  src={design.imageLink}
                  alt={design.designName}
                />
                <div className="p-4 flex-grow">
                  <h3 className="text-xl font-roboto text-gray-800 mb-2">
                    {design.designName}
                  </h3>
                  <p className="text-sm text-gray-500 mb-0">
                    Size: {design.dimension}
                  </p>
                </div>
              </Link>
              <div className="px-2 pb-4 mt-auto">
                <div className="flex space-x-2">
                  <button
                    className="flex-1 bg-gray-900 text-white font-bold py-1 text-sm px-3 rounded-full hover:bg-gray-800 transition-colors whitespace-nowrap"
                    onClick={() => handleBookingClick(design)}
                  >
                    Book Consultation
                  </button>
                  <button
                    onClick={() => {
                      quoteHandler(design.designId);
                    }}
                    className="flex-1 bg-gray-900 text-white font-bold py-2 text-sm px-3 rounded-full hover:bg-gray-800 transition-colors"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default DesignCategoryDetails;
