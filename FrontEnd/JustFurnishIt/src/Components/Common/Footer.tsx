import React from 'react';
import {Link} from 'react-router-dom'; // Import Link from react-router-dom
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import logo from '../../assets/Logoo (1).png'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white w-full  py-10 px-6 md:px-12">
      <div className="flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0">
        {/* Logo and Description Section */}
        <div className="w-full lg:w-1/4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="JustFurnishIt Logo" className="w-10 h-10 mb-2" />
              <span className="text-3xl font-bold  text-white">JustFurnishIt</span>
            </div>
          </div>
          <p className=" text-white text-sm">
            It is a long established fact that a reader <br /> will be distracted lookings.
          </p>
          <div className="flex space-x-4 mt-4">
            <Link to="#" aria-label="Facebook" className="   text-white   hover:text-gray-300">
              <FaFacebookF size={24} />
            </Link>
            <Link to="#" aria-label="Instagram" className=" text-white   hover:text-gray-300">
              <FaInstagram size={24} />
            </Link>
            <Link to="#" aria-label="Twitter" className=" text-white   hover:text-gray-300">
              <FaTwitter size={24} />
            </Link>
            <Link to="#" aria-label="LinkedIn" className=" text-white   hover:text-gray-300">
              <FaLinkedinIn size={24} />
            </Link>
          </div>
        </div>

        {/* Pages Section */}
        <div className="w-full lg:w-1/4">
          <h3 className="font-bold text-lg mb-4 text-white">Pages</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about-us" className=" text-white   hover:text-gray-300">About Us</Link></li>
            <li><Link to="/how-its-work" className=" text-white   hover:text-gray-300">How it Works</Link></li>
            <li><Link to="/about-us" className=" text-white   hover:text-gray-300">Our Team</Link></li>
            <li><Link to="/contactus" className="text-white   hover:text-gray-300">Contact Us</Link></li>
            <li><Link to="/design-ideas" className="text-white   hover:text-gray-300">Designs</Link></li>
          </ul>
        </div>

        {/* Services Section */}
        <div className="w-full lg:w-1/4">
          <h3 className="font-bold text-lg mb-4 text-white ">Services</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/design-ideas/modular-kitchen-designs" className="text-white   hover:text-gray-300">Kitchen</Link></li>
            <li><Link to="/design-ideas/living-room-designs" className="text-white   hover:text-gray-300">Living Area</Link></li>
            <li><Link to="/design-ideas/bathroom-designs" className="text-white   hover:text-gray-300">Bathroom</Link></li>
            <li><Link to="/design-ideas/dining-room-designs" className="text-white   hover:text-gray-300">Dining Hall</Link></li>
            <li><Link to="/design-ideas/master-bedroom-designs" className="text-white   hover:text-gray-300">Bedroom</Link></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="w-full lg:w-1/4">
          <h3 className="font-bold text-lg mb-4 text-white ">Contact</h3>
          <p className="text-white  text-sm mb-2">55 East Malleshwaram. Bengaluru,Karnataka 560003</p>
          <p className="text-white  text-sm mb-2">contact@justfurnishit.com</p>
          <p className="text-white  text-sm">+91 6360914287</p>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="flex flex-col md:flex-col justify-between items-center mt-10 text-sm text-white  space-y-5 md:space-y-3">
        <div className="space-x-4">
          <Link to="/terms" className="hover:text-gray-300 ">Terms & Conditions</Link>
          <span className="text-white">•</span>
          <Link to="/privacy" className="hover:text-gray-300 ">Privacy Policy</Link>
          <span className="text-white">•</span>
          <Link to="/cookies" className="hover:text-gray-300 ">Cookies Policy</Link>
          <span className="text-white">•</span>
          <Link to="/faq" className="hover:text-gray-300 ">FAQ</Link>
        </div>
        <div className="mt-4 md:mt-0">
          Copyright © JustFurnishIt | Designed by JustFurnishIt
        </div>
      </div>
    </footer>
  );
};

export default Footer;
