const HowItStarted: React.FC = () => {
  return (
    <section id="how-it-started" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">How It Started</h2>
        <div className="flex flex-col md:flex-row items-center">
          {/* Image Container */}
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8 flex justify-center">
            <div className="w-3/4 h-auto max-w-xs overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://res.cloudinary.com/dtpcgqcrs/image/upload/v1730713121/how-it-started_xmm5cz.png"
                alt="How it started"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          {/* Text Content */}
          <div className="md:w-1/2 text-left">
            <p className="text-lg text-black-900 mb-4">
              It all started when a group of friends set out to design their dream homes. They quickly realized how
              fragmented the industry was and how difficult it was to coordinate with professionals.
            </p>
            <p className="text-lg text-black-900">
              Determined to change the landscape, they built a platform that has become the trusted name for complete home
              interior design and renovation since 2023.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItStarted;
