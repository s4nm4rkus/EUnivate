import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faInstagram, faDiscord } from "@fortawesome/free-brands-svg-icons";

const Contact = () => {
  const [selectedSubject, setSelectedSubject] = useState('demo_request');

  const handleChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  return (
    <section className="py-16 px-1 lg:px-24">
      <div className="max-w-1xl mx-auto">
        <div className="bg-white lg:shadow-lg rounded-lg p-8">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 w-full">
              <h2 className="text-3xl font-bold text-left mb-1 text-red-800">
                Contact EUnivate
              </h2>
              <p className="text-gray-600 text-left mb-8">
                Let's discuss how innovation can benefit you.
              </p>

              <div className="mb-8 mt-30 lg:mt-20 md:mt-12 sm:mt-8"> {/* Adjust top margin for different screen sizes */}
        <p className="text-gray-800 text-left mb-9 flex items-center">
            <FontAwesomeIcon icon={faPhone} className="mr-6" />
          +639 12 345 6789
          </p>
          <p className="text-gray-800 text-left mb-9 flex items-center">
            <FontAwesomeIcon icon={faEnvelope} className="mr-6" />
          eunivate@gmail.com
        </p>
          <p className="text-gray-800 text-left mb-0 flex items-start">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-6" />
    <span>
      University Site, Ibabang Dupay <br />
      Lucena City, Quezon Province
    </span>
  </p>
</div>

              
            </div>

            <div className="lg:w-1/2 w-full">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
                <div className="flex flex-col text-left">
                  <label htmlFor="first_name" className="block text-gray-400 text-sm font-bold mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className="appearance-none border-b-2 border-gray-400 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex flex-col text-left">
                  <label htmlFor="last_name" className="block text-gray-700 text-sm font-bold mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    className="appearance-none border-b-2 border-gray-400 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex flex-col text-left">
                <label htmlFor="company_email" className="block text-gray-400 text-sm font-bold mb-2">
                    Company Email
                  </label>
                  <input
                    type="email"
                    id="company_email"
                    className="appearance-none border-b-2 border-gray-400 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex flex-col text-left">
                <label htmlFor="phone_number" className="block text-gray-700 text-sm font-bold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone_number"
                    className="appearance-none border-b-2 border-gray-400 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  />
                </div>
              </form>
              <div className="flex flex-col text-left">
  <label className="block text-gray-700 text-sm font-bold mb-2 mt-7">
    Select Subject
  </label>
  <div className="flex flex-row space-x-4 mb-4"> {/* Added mb-4 for spacing */}
    <div className="flex items-center">
      <input
        type="radio"
        id="demo_request"
        name="subject"
        value="demo_request"
        className="hidden"
        checked={selectedSubject === 'demo_request'}
        onChange={handleChange}
      />
      <div
        className={`w-5 h-5 rounded-full border-2 border-black flex items-center justify-center cursor-pointer ${selectedSubject === 'demo_request' ? 'bg-black' : ''}`}
        onClick={() => setSelectedSubject('demo_request')}
      >
        {selectedSubject === 'demo_request' && <span className="text-white">✓</span>}
      </div>
      <label htmlFor="demo_request" className="ml-2 text-gray-700">
        Demo Request
      </label>
    </div>
    <div className="flex items-center">
      <input
        type="radio"
        id="general_inquiry"
        name="subject"
        value="general_inquiry"
        className="hidden"
        checked={selectedSubject === 'general_inquiry'}
        onChange={handleChange}
      />
      <div
        className={`w-5 h-5 rounded-full border-2 border-black flex items-center justify-center cursor-pointer ${selectedSubject === 'general_inquiry' ? 'bg-black' : ''}`}
        onClick={() => setSelectedSubject('general_inquiry')}
      >
        {selectedSubject === 'general_inquiry' && <span className="text-white">✓</span>}
      </div>
      <label htmlFor="general_inquiry" className="ml-2 text-gray-700">
        General Inquiry
      </label>
    </div>
  </div>

  <label htmlFor="message" className="block text-gray-400 text-sm font-bold mb-2 mt-7">
    Message
  </label>
  <textarea
    id="message"
    rows="2" // Adjusted rows for better visibility
    placeholder="Write your message"
    className="border-b border-gray-400 w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 resize-none"
  ></textarea>

<div className="flex justify-center mt-4 md:justify-end"> {/* Center on mobile, right align on desktop */}
  <button
    type="submit"
    className="bg-yellow-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full md:w-auto" // Full width on mobile, auto on larger screens
  >
    Send Message
  </button>
</div>

</div>

            </div>
          </div>

         {/* Social Media Icons */}
<div className="hidden lg:flex justify-start mt-8 space-x-4">
  <div className="w-9 h-9 flex items-center justify-center bg-black rounded-full hover:bg-gray-800 transition-colors">
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faTwitter} className="text-white" />
    </a>
  </div>
  <div className="w-9 h-9 flex items-center justify-center bg-white rounded-full hover:bg-gray-800 transition-colors">
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faInstagram} className="text-black" />
    </a>
  </div>
  <div className="w-9 h-9 flex items-center justify-center bg-black rounded-full hover:bg-gray-800 transition-colors">
    <a href="https://discord.com" target="_blank" rel="noopener noreferrer">``
      <FontAwesomeIcon icon={faDiscord} className="text-white" />
    </a>
  </div>
</div>


        </div>
      </div>
    </section>
  );
};

export default Contact;
