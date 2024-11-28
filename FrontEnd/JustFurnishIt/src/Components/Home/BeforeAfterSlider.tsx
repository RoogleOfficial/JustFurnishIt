import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Define a type for the valid room tabs
type RoomTab = 'Living Room' | 'Dining Room' | 'Bedroom';

const BeforeAfterSlider: React.FC = () => {
  const [activeTab, setActiveTab] = useState<RoomTab>('Living Room');
  const [sliderPosition, setSliderPosition] = useState(50); // Slider starts at 50%
  const sliderRef = useRef<HTMLDivElement | null>(null);

  // Define images for each room type with explicit RoomTab keys
  const roomImages: Record<RoomTab, { before: string; after: string }> = {
    'Living Room': {
      before: 'https://res.cloudinary.com/dtpcgqcrs/image/upload/v1730713126/LivingRoomAfter_chf2e2.webp',
      after: 'https://res.cloudinary.com/dtpcgqcrs/image/upload/v1730713127/LivingRoomBefore_qusshp.webp',
    },
    'Dining Room': {
      before: 'https://res.cloudinary.com/dtpcgqcrs/image/upload/v1730713115/DiningTableBefore_ob5gdq.webp',
      after: 'https://res.cloudinary.com/dtpcgqcrs/image/upload/v1730713115/DiningTableAfter_os1iqo.webp',
    },
    'Bedroom': {
      before: 'https://res.cloudinary.com/dtpcgqcrs/image/upload/v1730713114/BedRoomAfter_abqney.webp',
      after: 'https://res.cloudinary.com/dtpcgqcrs/image/upload/v1730713114/BedRoombefore_k4lba1.webp',
    },
  };

  const activeImages = roomImages[activeTab]; // Get images based on active tab

  const handleSliderMove = (e: React.MouseEvent | React.TouchEvent) => {
    const slider = sliderRef.current;
    if (!slider) return;

    let offsetX: number;
    const rect = slider.getBoundingClientRect();
    
    // Check if the event is a TouchEvent
    if ('touches' in e) {
      offsetX = e.touches[0].clientX - rect.left; // TouchEvent
    } else {
      offsetX = e.clientX - rect.left; // MouseEvent
    }

    const percentage = (offsetX / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100)); // Prevent out-of-bounds
  };

  useEffect(() => {
    const handleResize = () => {
      setSliderPosition(20); // Reset to center on window resize
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center md:pb-10">
      <h2 className="text-4xl font-semibold text-gray-800 mb-6">Explore Real Client Before & After</h2>

      {/* Room Tabs */}
      <div className="flex justify-center space-x-4 my-2 md:pb-4">
        {(['Living Room', 'Dining Room', 'Bedroom'] as RoomTab[]).map((room) => (
          <button
            key={room}
            onClick={() => setActiveTab(room)}
            className={`py-2  px-4 rounded-full border text-gray-800  ${
              activeTab === room ? 'bg-gray-900 text-white' : 'border-gray-300 hover:bg-gray-100'
            }`}
          >
            {room}
          </button>
        ))}
      </div>

      {/* Before After Slider */}
      <div
        className="relative w-full max-w-7xl rounded-lg mx-auto h-[35rem] overflow-hidden"
        ref={sliderRef}
        onMouseMove={handleSliderMove}
        onTouchMove={handleSliderMove}
      >
        {/* After Image - Always visible */}
        <img
          src={activeImages.after}
          alt="After"
          className="absolute top-0 left-0 w-full h-full object-fit "
        />
        
        {/* Before Image - Clipped based on slider position */}
        <img
          src={activeImages.before}
          alt="Before"
          className=" absolute top-0 left-0 w-full h-full object-fit "
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }} // Apply clipping based on slider position
        />

        {/* Slider Handle */}
              <div
                  className="absolute top-0 left-0 h-full bg-transparent cursor-col-resize"
                  style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
              >
                  {/* Before/After Button */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 border border-gray-400 rounded-full flex items-center text-gray-700 shadow-md">
                      <span className="mr-2">&larr;</span> {/* Left Arrow */}
                      <span className="font-medium">Before</span>
                      <span className="mx-4">|</span>
                      <span className="font-medium">After</span>
                      <span className="ml-2">&rarr;</span> {/* Right Arrow */}
                  </div>
              </div>
      </div>

      {/* Get Started Button */}
      <Link to="/design-ideas">
      <button className="mt-8  md:mt-12 px-6 py-2 bg-gray-900 text-white text-lg rounded-full hover:bg-yellow-600">
        Get Started
      </button>
      </Link>
    </div>
  );
};

export default BeforeAfterSlider;
