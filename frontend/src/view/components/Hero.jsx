import React from 'react';
import { 
  thinkTogether, 
  indMeets, 
  futureSolution, 
  light, 
  fifty, 
  proj_man, 
  twenty,
  yellow_gradient,
  red_gradient,
  loop,
  cisco,
  oracle,
  sap,
  star_sea,
} from '../../constants/assets';

const Hero = () => {
  return (
    <>
      <section className="py-16 px-8 lg:px-24 flex flex-col lg:flex-row justify-between items-center relative">
        {/* Red Gradient */}
        <img 
          src={red_gradient} 
          alt="Red Gradient" 
          className="absolute bottom-2 lg:w-[400px] lg:h-[500px] w-[500px] h-[400px]" 
        />
        
        {/* Yellow Gradient */}
        <img 
          src={yellow_gradient} 
          alt="Yellow Gradient" 
          className="absolute top-2 right-[-100px] lg:w-[500px] lg:h-[500px] w-[400px] h-[400px] z-20" 
        />
        
        {/* Loop SVG (Top Left) */}
        <img 
          src={loop} 
          alt="Loop" 
          className="absolute top-2 left-2 lg:w-[400px] lg:h-[450px] w-[450px] h-[400px] z-30" 
        />

        <div className="lg:w-1/2 w-full relative z-10">
          <h1 className="text-red-800 lg:text-6xl text-4xl font-bold leading-tight relative z-30">
            Empower 
            <span className="text-black"> Your Business. </span>
            Unleash <span className="text-black">University Innovation</span>
          </h1>
          <p className="text-gray-700 text-lg lg:text-xl mt-4 lg:mt-8 relative z-30">
            EUnivate connects your business with the brightest minds from universities. Tap into cutting-edge solutions, reduce development costs, and gain a competitive edge through real-world innovation.
          </p>
          <button className="bg-yellow-500 text-white px-6 py-3 rounded-full mt-8 hover:bg-red-800 transition-all duration-300 relative z-30">
            Get Started
          </button>
          <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-12 space-y-4 sm:space-y-0 mt-8 sm:mt-24 relative z-30">
            <div className="flex items-center">
              <img src={thinkTogether} alt="Innovate Together" className="w-8 h-8" />
              <span className="text-sm ml-2">Innovate Together</span>
            </div>
            
            <div className="flex items-center">
              <img src={futureSolution} alt="Future Solutions" className="w-8 h-8" />
              <span className="text-sm ml-2">Future Solutions</span>
            </div>
            <div className="flex items-center">
              <img src={indMeets} alt="Industry Meets Minds" className="w-8 h-8" />
              <span className="text-sm ml-2">Industry Meets Minds</span>
            </div>
            
          </div>
          
        </div>

        <div className="lg:w-1/2 w-full mt-8 lg:mt-0 relative z-10">
          <img src={light} alt="Hero" className="w-[600px] h-[600px] object-cover rounded-full" /> 

          <div className="absolute top-[90px] p-1">
            <img src={fifty} alt="50+ Experts Icon" className="w-[180px] h-[120px]" />
          </div>
          <div className="absolute top-4 right-20">
            <img src={twenty} alt="20+ Solutions Icon" className="w-[170px] h-[280px]" />
          </div>
          <div className="absolute bottom-1 left-[200px]">
            <img src={proj_man} alt="Project Management Tool Icon" className="w-[400px] h-[130px]" />
            </div>
              {/* Additional Loop SVG (Below Light Image) */}
              <img 
                src={loop} 
                alt="Loop Below" 
                className="absolute bottom-[-250px] right-[-200px] lg:w-[500px] lg:h-[500px] w-[300px] h-[300px] z-[-1]" 
              />

        </div>
        
      </section>

      {/* Collaboration Section */}
      <section className="bg-white py-16 px-8 lg:px-24 mb-8 text-center">
        <div className="flex justify-center items-center space-x-28">
          <div className="text-left">
            <span className="text-red-700 font-bold text-5xl block">20+</span>  
            <span className="text-3xl">Collaboration</span>
          </div>
          <img src={star_sea} alt="Star of the Sea" className="w-28 h-28 object-contain filter grayscale" />
          <img src={sap} alt="SAP" className="w-28 h-28 object-contain filter grayscale" />
          <img src={cisco} alt="Cisco" className="w-28 h-28 object-contain filter grayscale" />
          <img src={oracle} alt="Oracle" className="w-28 h-28 object-contain filter grayscale" />
        </div>
      </section>
       
    </>
  );
};

export default Hero;
