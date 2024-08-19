import React from 'react';
import Navbar from '../../components/Client/LandingPage/Navbar.jsx';  // Adjust the path as necessary
import Showcase from '../../components/Client/Dropdowns/Showcase.jsx';  // Adjust the path as necessary
import styles from '../../../style';  // Import your global styles

import { prof1, prof2, prof3, OksYun } from '../../../constants/assets.js';

const showcasesData = [
  {
    id: 1,
    title: "OKsyon: Livestock Auction",
    description: "Web and Mobile Application",
    projectType: "Capstone Project",
    course: "BSIT",
    imageUrl: OksYun, // Replace with actual image URL
    teamMembers: [prof1, prof2, prof3], // Replace with actual image URLs
  },
  // Add more showcase data as needed
];

const ShowcasesPage = () => {
  return (
    <div className="bg-white w-full overflow-hidden">
      {/* Navbar with consistent spacing */}
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      {/* Showcases Section */}
      <div className={`${styles.paddingX} ${styles.flexCenter} py-16`}>
        <div className={`${styles.boxWidth}`}>
          <h2 className="text-red-800 text-4xl font-bold mb-8">Showcases</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {showcasesData.map((showcase) => (
              <Showcase key={showcase.id} showcase={showcase} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowcasesPage;
