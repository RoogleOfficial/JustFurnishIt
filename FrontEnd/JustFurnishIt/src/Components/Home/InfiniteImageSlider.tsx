import "/src/index.css";
import './SliderPage.css';

const InfiniteImageSlider: React.FC = () => {
  return (
    <div className="slider-container overflow-hidden w-full md:mb-[3rem]">
      <div className="slider-track flex whitespace-nowrap animate-slider">
        <img
          src="https://res.cloudinary.com/spacejoy/image/upload/v1626229337/spj-v2/home-gallery/Gallery_nskrrd.jpg"
          alt="Gallery"
          className="slider-image object-cover h-[30rem] w-auto"
        />
        <img
          src="https://res.cloudinary.com/spacejoy/image/upload/v1626229337/spj-v2/home-gallery/Gallery_nskrrd.jpg"
          alt="Gallery"
          className="slider-image object-cover h-[30rem] w-auto"
        />
        <img
          src="https://res.cloudinary.com/spacejoy/image/upload/v1626229337/spj-v2/home-gallery/Gallery_nskrrd.jpg"
          alt="Gallery"
          className="slider-image object-cover h-[30rem] w-auto"
        />
        <img
          src="https://res.cloudinary.com/spacejoy/image/upload/v1626229337/spj-v2/home-gallery/Gallery_nskrrd.jpg"
          alt="Gallery"
          className="slider-image object-cover h-[30rem] w-auto"
        />
      </div>
    </div>

  );
};

export default InfiniteImageSlider;