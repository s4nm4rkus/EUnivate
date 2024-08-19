import React from 'react';
import Navbar from '../../components/Client/LandingPage/Navbar.jsx';
import Hero from '../../components/Client/LandingPage/Hero.jsx';
import CTA from '../../components/Client/LastSection/CTA.jsx';
import Footer from '../../components/Client/LastSection/Footer.jsx';
import GetStarted from '../../components/Client/LastSection/GetStarted.jsx';
import ProjectHoursSupport from '../../components/Client/LastSection/ProjectHoursSupport.jsx';
import Products from '../../components/Client/SecondSection/Products.jsx';
import Partnerships from '../../components/Client/ThirdSection/Partnerships.jsx';
import Howitworks from '../../components/Client/ThirdSection/Howitworks.jsx';
import LogoSlides from '../../components/Client/ThirdSection/LogoSlides.jsx';
import styles from '../../../style';

const LandingPage = () => {
  return (
    <div className="bg-white w-full overflow-hidden">
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

      <div className="w-full overflow-hidden">
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

      <div id="cta" className={`${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <CTA />
          <Footer />
        </div>
      </div>

      <div className="w-full overflow-hidden">
        <div className={`${styles.marginY} ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <GetStarted />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
