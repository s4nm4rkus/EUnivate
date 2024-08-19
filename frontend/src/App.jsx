import React from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

/* Client Components */
import Navbar from './view/components/Client/LandingPage/Navbar.jsx';
import Hero from './view/components/Client/LandingPage/Hero.jsx';
import CTA from './view/components/Client/LastSection/CTA.jsx';
import Footer from './view/components/Client/LastSection/Footer.jsx';
import GetStarted from './view/components/Client/LastSection/GetStarted.jsx';
import ProjectHoursSupport from './view/components/Client/LastSection/ProjectHoursSupport.jsx';
import Products from './view/components/Client/SecondSection/Products.jsx';
import Partnerships from './view/components/Client/ThirdSection/Partnerships.jsx';
import Howitworks from './view/components/Client/ThirdSection/Howitworks.jsx';
import LogoSlides from './view/components/Client/ThirdSection/LogoSlides.jsx';

/* Client Pages */
import About from './view/pages/Client/AboutUs/About.jsx';
import Advantage from './view/pages/Client/AboutUs/Advantage.jsx';
import Contact from './view/pages/Client/AboutUs/Contact.jsx';
import OurTeam from './view/pages/Client/AboutUs/OurTeam.jsx';
import EuStore from './view/pages/Client/Products/EuStore.jsx';
import Mission from './view/pages/Client/Products/Mission.jsx';
import Events from './view/pages/Client/Resources/Events.jsx';
import Quotation from './view/pages/Client/Products/Quotation.jsx';
import Showcases from './view/pages/Client/Products/Showcases.jsx';
import Challenges from './view/pages/Client/Resources/Challenges.jsx';
import ProjectManagement from './view/pages/Client/Resources/ProjectManagement.jsx';
import Webinars from './view/pages/Client/Resources/Webinars.jsx';

/* Global CSS */
import './index.css'; 
import styles from './style';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<div className="bg-white w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>

      <div className="bg-white w-full overflow-hidden">
        <div className={`${styles.marginY} ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Products />
          </div>
        </div>
      </div>

      <div className=" w-full overflow-hidden">
        <div className={`${styles.marginY} ${styles.paddingX} ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Howitworks />
          </div>
        </div>
      </div>

      <div className="bg-white w-full overflow-hidden">
        <div className={`${styles.marginY} ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Partnerships />
          </div>
        </div>
      </div>

      <div className="w-full overflow-hidden">
        <div className={`${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <LogoSlides />
          </div>
        </div>
      </div>

      <div className="w-full overflow-hidden mb-16">
        <div className={`${styles.marginY} ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <ProjectHoursSupport />
          </div>
        </div>
      </div>

      {/* Moved Footer to before GetStarted */}
      <div className={`${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <CTA />
          <Footer />
        </div>
      </div>

      {/* GetStarted component placed after Footer */}
      <div className="w-full overflow-hidden">
        <div className={`${styles.marginY} ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <GetStarted />
          </div>
        </div>
      </div>
    </div>}>
      {/* Define the routes for your pages */}
      <Route path="/about" element={<About />} />
      <Route path="/advantage" element={<Advantage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/our-team" element={<OurTeam />} />
      <Route path="/eu-store" element={<EuStore />} />
      <Route path="/mission" element={<Mission />} />
      <Route path="/events" element={<Events />} />
      <Route path="/quotation" element={<Quotation />} />
      <Route path="/showcases" element={<Showcases />} />
      <Route path="/challenges" element={<Challenges />} />
      <Route path="/project" element={<ProjectManagement />} />
      <Route path="/webinar" element={<Webinars />} />
    </Route>
  )
);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
