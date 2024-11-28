import React from 'react';
const ContactUsPage: React.FC = () => {
  // Placeholder handler for form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted');
  };
  return (
    <div className="flex flex-col md:flex-row items-center h-min-screen justify-center bg-gray-50 bg-[url('https://res.cloudinary.com/dtpcgqcrs/image/upload/v1730713121/hero-pattern_gr5xji.png')]">
    <div className="min-h-screen  flex items-center justify-center pt-[4.5rem] px-[8rem] ">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row">
          {/* Info Section */}
          <div className="md:w-1/3 p-5 border-r border-gray-300 bg-gray-200">
            <div className="mb-5">
              <h4 className="font-bold text-black">Talk to Us</h4>
              <p className="text-black">Our expert design team is here to assist you.</p>
              <p className="text-black">@justfurnish.it</p>
            </div>
            <div className="mb-5">
              <h4 className="font-bold text-black">Visit Our Showroom</h4>
              <p className="text-black">We welcome you to our modern showroom for design inspiration.</p>
              <p className="text-black">1234 Furniture Street, Design City</p>
            </div>
            <div>
              <h4 className="font-bold text-black">Give Us a Call</h4>
              <p className="text-black">Mon - Fri From 9am to 6pm</p>
              <p className="text-black">+123 456 7890</p>
            </div>
          </div>
          {/* Form Section */}
          <div className="md:w-2/3 p-5">
            <h2 className="text-2xl mb-5 font-bold text-black">
              Got a Vision? Let's Bring it to Life with JustFurnish It.
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap mb-4">
                {/* First and Last Name */}
                <div className="w-full md:w-1/2 mb-4 pr-2">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control bg-gray-100 text-black border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none w-full p-2 rounded"
                  />
                </div>
                <div className="w-full md:w-1/2 mb-4 pl-2">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control bg-gray-100 text-black border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none w-full p-2 rounded"
                  />
                </div>
              </div>
              {/* Email Address */}
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="form-control bg-gray-100 text-black border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none w-full p-2 rounded"
                />
              </div>
              {/* Phone Number */}
              <div className="flex flex-wrap mb-4">
                <div className="w-1/4 mb-4 pr-2">
                  <input
                    type="text"
                    placeholder="+91"
                    className="form-control bg-gray-100 text-black border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none w-full p-2 rounded"
                  />
                </div>
                <div className="w-3/4 mb-4 pl-2">
                  <input
                    type="text"
                    placeholder="12345 67890"
                    className="form-control bg-gray-100 text-black border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none w-full p-2 rounded"
                  />
                </div>
              </div>
              {/* Message */}
              <div className="mb-4">
                <textarea
                  placeholder="Tell us about your interior design needs..."
                  className="form-control bg-gray-100 text-black border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none w-full p-2 rounded"
                  rows={5}
                ></textarea>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="bg-gray-700 text-white font-bold py-3 rounded hover:bg-gray-500 hover:text-black transition duration-200 w-full"
              >
                Get in Touch
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
export default ContactUsPage;