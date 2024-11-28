
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faBolt, faBalanceScale, faShoppingBag } from '@fortawesome/free-solid-svg-icons';

const HomeSection = () => {
  return (
    <section className="flex flex-col items-center text-center py-16 px-4 bg-white">
      {/* Main heading */}
      <h1 className="text-5xl font-extrabold mb-6 leading-tight text-gray-900">
        A better way to create a home you'll love
      </h1>

      {/* Subtext */}
      <p className="text-lg text-black-700 max-w-2xl mb-12">
        JustFurnishIt is the easiest, and the fastest way to design & decorate your home. 
        From room makeovers to styling advice and product recommendations, our experts 
        are here to help with it all!
      </p>

      {/* Grid with features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* First feature */}
        <div className="bg-gray-50 p-8 rounded-lg shadow-md flex items-start">
          <div className="mr-4 text-black-500 text-3xl">
            <FontAwesomeIcon icon={faBox} />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Expert designs</h3>
            <p className="text-black-500 text-base leading-relaxed">
              Love a little bit of this, a little bit of that? Our designers are ready to help 
              you create your perfect room.
            </p>
          </div>
        </div>

        {/* Second feature */}
        <div className="bg-gray-50 p-8 rounded-lg shadow-md flex items-start">
          <div className="mr-4 text-balck-500 text-3xl">
            <FontAwesomeIcon icon={faBolt} />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">No wait time</h3>
            <p className="text-black-500 text-base leading-relaxed">
               We deliver the final designs for your room 
              in as little time as possible!
            </p>
          </div>
        </div>

        {/* Third feature */}
        <div className="bg-gray-50 p-8 rounded-lg shadow-md flex items-start">
          <div className="mr-4 text-black-500 text-3xl">
            <FontAwesomeIcon icon={faBalanceScale} />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Life-like designs</h3>
            <p className="text-gray-black text-base leading-relaxed">
              Skip the guess-work and see your designs as 3D renders that are so life-like, they could be photographs.
            </p>
          </div>
        </div>

        {/* Fourth feature */}
        <div className="bg-gray-50 p-8 rounded-lg shadow-md flex items-start">
          <div className="mr-4 text-black-500 text-3xl">
            <FontAwesomeIcon icon={faShoppingBag} />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Shopping made easy</h3>
            <p className="text-black-500 text-base leading-relaxed">
              Easily shop all the products in your design or find the perfect alternatives, right here on JustFurnishIt.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
