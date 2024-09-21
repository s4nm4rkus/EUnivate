import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {
  p1,
  p2,
  p3,
  dev2,
  dev1,
  dev3,
  link1,
  link2,
  link3,
  arrowIcon,
  twitterIcon,
  linkedinIcon,
  prof1,
  prof2,
  prof3,
  prof4
} from '../../../../constants/assets';


const Products = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '100px', // Adds space between the slides for desktop
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    beforeChange: (current, next) => setActiveIndex(next),
    responsive: [
      {
        breakpoint: 768, // Mobile breakpoint
        settings: {
          slidesToShow: 1,
          centerPadding: '30px', // Adjust padding for mobile
        },
      },
    ],
  };

  return (
    <div className="space-y-16">
      {/* Carousel Section */}
      <div className="flex flex-col items-center text-center font-sans">
        <span className="text-red-800 font-bold text-lg mb-2">
          Project Management Tool
        </span>
        <span className="text-3xl font-semibold mb-10">
          Streamlining Project Success with Project Management Tool
        </span>

        <Slider {...settings} className="w-full max-w-screen-xl mb-20">
          {[p1, p2, p3].map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-lg transition-transform duration-500 ${
                activeIndex === index ? 'scale-105 z-10' : 'scale-90' 
              }`}
              style={{
                padding: '0 15px', // Adds a bit of padding around each slide
              }}
            >
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Products Section */}
      <div className="space-y-8">
        <div className="text-left">
          <span className="text-red-800 font-bold block mb-2">
            Explore Programs
          </span>
          <h2 className="text-2xl font-bold mb-4">Our Featured Products</h2>
          <p className="text-sm">
            EUnivate is proud to feature innovative products developed by our talented student-professor teams.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 justify-center">
          {/* Product 1 */}
          <div className="bg-white p-5 rounded-lg shadow-lg w-[337px] cursor-pointer transform transition-transform hover:scale-105">
            <img src={link1} alt="Product 1" className="w-full h-auto rounded-md mb-4" />
            <h3 className="text-lg font-bold flex items-center">
              OptiWaste Management...
              <img src={arrowIcon} alt="Arrow Icon" className="ml-2 w-5 h-5" />
            </h3>
            <p className="text-sm mt-2">
              OptiWaste utilizes AI and machine learning to analyze waste streams and optimize collection routes.
            </p>
            <div className="mt-4">
              <span className="font-semibold text-xs block mb-2">Developed by: Team Phoenix</span>
              <div className="flex items-center">
                <img src={dev1} alt="Developer 1" className="w-10 h-10 rounded-full mr-3" />
                <div className="text-sm">
                  <span className="font-bold">Engr. Cheeky Tanaka</span>
                  <br />
                  <span className="text-gray-500">Lead Professor</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product 2 */}
          <div className="bg-white p-5 rounded-lg shadow-lg w-[337px] cursor-pointer transform transition-transform hover:scale-105">
            <img src={link2} alt="Product 2" className="w-full h-auto rounded-md mb-4" />
            <h3 className="text-lg font-bold flex items-center">
              Interactive Language L...
              <img src={arrowIcon} alt="Arrow Icon" className="ml-2 w-5 h-5" />
            </h3>
            <p className="text-sm mt-2">
              Utilizes gamification techniques and immersive storytelling to make language learning fun and interactive.
            </p>
            <div className="mt-4">
              <span className="font-semibold text-xs block mb-2">Developed by: Team LingoMasters</span>
              <div className="flex items-center">
                <img src={dev2} alt="Developer 2" className="w-10 h-10 rounded-full mr-3" />
                <div className="text-sm">
                  <span className="font-bold">David Hernandez</span>
                  <br />
                  <span className="text-gray-500">Lead Professor</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product 3 */}
          <div className="bg-white p-5 rounded-lg shadow-lg w-[337px] cursor-pointer transform transition-transform hover:scale-105">
            <img src={link3} alt="Product 3" className="w-full h-auto rounded-md mb-4" />
            <h3 className="text-lg font-bold flex items-center">
              AI-Powered Disaster Re...
              <img src={arrowIcon} alt="Arrow Icon" className="ml-2 w-5 h-5" />
            </h3>
            <p className="text-sm mt-2">
              PhiloSAFE uses AI to analyze historical data and predict potential disaster scenarios.
            </p>
            <div className="mt-4">
              <span className="font-semibold text-xs block mb-2">Developed by: Team Phoenix</span>
              <div className="flex items-center">
                <img src={dev3} alt="Developer 3" className="w-10 h-10 rounded-full mr-3" />
                <div className="text-sm">
                  <span className="font-bold">Peter Domingo</span>
                  <br />
                  <span className="text-gray-500">Lead Professor</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slider navigation and "Explore All Products" button */}
        <div className="flex justify-center mt-12">
          <button className="bg-gray-200 rounded-full w-4 h-4 mx-1 focus:outline-none"></button>
          <button className="bg-gray-400 rounded-full w-4 h-4 mx-1 focus:outline-none"></button>
          <button className="bg-gray-200 rounded-full w-4 h-4 mx-1 focus:outline-none"></button>
        </div>
        <div className="flex justify-center mt-8">
        <button className="bg-white border border-black px-6 py-3 rounded-xl hover:bg-yellow-500 transition-all duration-300 mb-10">
            Explore All Products
          </button>
        </div>

        

      {/* Professors Section */}
<div className="professors-section-products text-2xl">
  <span className="professors-products font-bold text-red-800 block mb-2">
    Professors
  </span>
  
  <h2 className="section-title-products font-bold mb-4">Featured University Experts</h2>
  <p className="prof-products text-gray-800 text-sm">
    EUnivate connects you with a vast network of top university minds across diverse disciplines. Here are just a few of our featured experts ready to tackle your toughest challenges:
  </p>

  <div className="professor-cards-products">
    {/* Professor 1 */}
    <div className="professor-card-products">
      <img src={prof1} alt="Professor 1" className="professor-image-products" />
      <h3 className="professor-name-products">Theresa Webb</h3>
      <p className="professor-profession-products">Application Support Analyst Lead</p>
      <p className="professor-bio-products">Former co-founder of Opendoor. Early staff at Spotify and Clearbit.</p>
      <div className="social-icons-products">
        <a href="#" className="social-link-products">
          <img src={twitterIcon} alt="Twitter" className="social-icon-products" />
        </a>
        <a href="#" className="social-link-products">
          <img src={linkedinIcon} alt="LinkedIn" className="social-icon-products" />
        </a>
      </div>
    </div>

    {/* Professor 2 */}
    <div className="professor-card-products">
      <img src={prof2} alt="Professor 2" className="professor-image-products" />
      <h3 className="professor-name-products">Courtney Henry</h3>
      <p className="professor-profession-products">Director, Undergraduate Analytics and Planning</p>
      <p className="professor-bio-products">Lead engineering teams at Figma, Pitch, and Protocol Labs.</p>
      <div className="social-icons-products">
        <a href="#" className="social-link-products">
          <img src={twitterIcon} alt="Twitter" className="social-icon-products" />
        </a>
        <a href="#" className="social-link">
          <img src={linkedinIcon} alt="LinkedIn" className="social-icon-products" />
        </a>
      </div>
    </div>

    {/* Professor 3 */}
    <div className="professor-card-products">
      <img src={prof3} alt="Professor 3" className="professor-image-products" />
      <h3 className="professor-name-products">Albert Flores</h3>
      <p className="professor-profession-products">Career Educator</p>
      <p className="professor-bio-products">Former PM for Linear, Lambda School, and On Deck.</p>
      <br></br>
      <div className="social-icons-products">
        <a href="#" className="social-link-products">
          <img src={twitterIcon} alt="Twitter" className="social-icon-products" />
        </a>
        <a href="#" className="social-link-products">
          <img src={linkedinIcon} alt="LinkedIn" className="social-icon-products" />
        </a>
      </div>
    </div>

    {/* Professor 4 */}
    <div className="professor-card-products">
      <img src={prof4} alt="Professor 4" className="professor-image-products" />
      <h3 className="professor-name-products">Marvin McKinney</h3>
      <p className="professor-profession-products">Co-op & Internships Program & Operations Manager</p>
      <p className="professor-bio-products">Former frontend dev for Linear, Coinbase, and Postscript.</p>
      <div className="social-icons-products">
        <a href="#" className="social-link-products">
          <img src={twitterIcon} alt="Twitter" className="social-icon-products" />
        </a>
        <a href="#" className="social-link-products">
          <img src={linkedinIcon} alt="LinkedIn" className="social-icon-products" />
        </a>
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default Products;
