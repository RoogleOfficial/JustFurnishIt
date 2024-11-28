import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import Spinner from '../Spinner/Spinner';
import { fetchDesignByIdAsync } from '../../Services/DesignService';

// Define the type for the design data to ensure type safety
interface Design {
  designId: number;
  imageLink: string;
  designName: string;
  category: string;
  dimension: string;
  style: string;
  color: string;
  materialsUsed: string;
  specialFeatures: string;
  description: string;
}

const DesignDetail: React.FC = () => {
  const { slug, designId } = useParams<{ slug: string; designId: string }>(); // Capture the slug and designId from the URL
  const [design, setDesign] = useState<Design | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  useEffect(() => {
    const loadDesignData = async () => {
      try {
        const fetchedDesign: Design = await fetchDesignByIdAsync(Number(designId));
        setDesign(fetchedDesign);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadDesignData();
  }, [designId]);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!design) return <div>No design found</div>;

  // Example data for previous/next designs, replace with actual API data
  const prevProject = design.designId > 1 ? {
    id: design.designId - 1,
    name: 'Previous Project',
    image: design.imageLink,
  } : null;

  const nextProject = {
    id: design.designId + 1,
    name: 'Next Project',
    image: design.imageLink,
  };
  function quoteHandler(id: Number) {
    navigate(`/design-ideas/${slug}/estimateQuote/${id}`);
  }

  return (
    <div className="container py-[6rem] max-w-screen-xl mx-auto">
      {loading ? (
        <Spinner /> // Show the spinner while loading is true
      ) : (
        <>
          <div className="flex flex-col lg:flex-row lg:gap-4 items-start">
            {/* Left Section - Image */}
            <div className="w-full lg:w-[60%]">
              <img
                className="w-full h-[600px] object-cover rounded-lg shadow-md"
                src={design.imageLink}
                alt={design.designName}
              />
            </div>

            {/* Right Section - Breadcrumbs and Details */}
            <div className="w-full lg:w-[40%] flex flex-col pl-5">
              {/* Breadcrumb Navigation */}
              <nav className="text-sm text-gray-500 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                <Link to="/" className="text-red-500 no-underline">Home</Link> /
                <Link to="/design-ideas" className="text-red-500 ml-1 no-underline">Design Ideas</Link> /
                <Link to={`/design-ideas/${slug}`} className="text-red-500 ml-1 no-underline">{design.category}</Link> /
                <span className="ml-1 text-black">{design.designName}</span>
              </nav>

              {/* Design Details */}
              <div className="mt-4">
                <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-800 mb-4">{design.designName}</h2>
                <div className="text-gray-700">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3">Design Details:</h3>
                  <div className="text-sm sm:text-base">
                    <p className="mb-2"><span className="font-bold">Layout:</span> {design.category} Design</p>
                    <p className="mb-2"><span className="font-bold">Room Dimension:</span> {design.dimension}</p>
                    <p className="mb-2"><span className="font-bold">Style:</span> {design.style}</p>
                    <p className="mb-2"><span className="font-bold">Colour:</span> {design.color}</p>
                    <p className="mb-2"><span className="font-bold">Materials Used:</span> {design.materialsUsed}</p>
                    <p className="mb-2"><span className="font-bold">Special Features:</span> {design.specialFeatures}</p>
                    <p className="mb-2"><span className="font-bold">Description:</span> {design.description}</p>
                  </div>
                </div>

                {/* Get Free Quote Button */}
                <div className="mt-8 flex justify-start">

                  <button onClick={() => quoteHandler(design.designId)}
                    className="bg-red-500 text-white px-8 sm:px-16 py-3 rounded-full font-bold hover:bg-red-600 transition duration-300">
                    GET FREE QUOTE
                  </button>
                </div>
              </div>
            </div>


          </div>

          {/* Previous/Next Project Navigation */}
          <div className="flex  items-center  mt-5">
            {/* Previous Button */}
            <Link
              to={`/design-ideas/${slug}/${prevProject?.id}`}
              className="flex items-center px-4 py-2 bg-gray-200 mr-[27rem] text-gray-600 rounded-full shadow hover:bg-gray-300 transition duration-200"
            >
              <GrChapterPrevious className="mr-2 text-xl" />
              <span>{prevProject?.name || 'Previous'}</span>
            </Link>

            {/* Next Button */}
            <Link
              to={`/design-ideas/${slug}/${nextProject.id}`}
              className="flex items-center px-4 py-2 bg-gray-200 text-gray-600 rounded-full shadow hover:bg-gray-300 transition duration-200"
            >
              <span className="mr-2">{nextProject.name || 'Next'}</span>
              <GrChapterNext className="text-xl" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default DesignDetail;
