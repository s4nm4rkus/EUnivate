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
import './index.css'; 
import styles from './style';



const App = () => {
  return (
    <div className="bg-white w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar/>
        </div>
      </div>

      <div className={`${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero/>
        </div>
      </div>

      <div className={`${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
        <Products/> 
        </div>
        </div>

        <div className="bg-secondary w-full overflow-hidden shadow-md">
        <div className={`${styles.marginY} ${styles.paddingX} ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Howitworks/>
          </div>
        </div>
      </div>

      <div className="bg-white w-full overflow-hidden shadow-md" style={{ marginTop: "4rem", paddingBottom: "1rem" }}>
        <div className={`${styles.marginY} ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Partnerships/>
          </div>
        </div>
      </div>

      <div className="w-full overflow-hidden" style={{ marginTop: "10px", backgroundColor: "#FCFCFF" }}>
        <div className={`${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <LogoSlides/>
          </div>
        </div>
      </div>

      <div className="w-full overflow-hidden shadow-md" style={{ paddingTop: "4rem", paddingBottom: "4rem", backgroundColor: "#F8F9FA" }}>
        <div className={`${styles.marginY} ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <ProjectHoursSupport/>
          </div>
        </div>
      </div>

      {/* Moved Footer to before GetStarted */}
      <div className={`${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <CTA/>
          <Footer/>
        </div>
      </div>

      {/* GetStarted component placed after Footer */}
      <div className="w-full overflow-hidden" style={{ paddingTop: "4rem", paddingBottom: "4rem", backgroundColor: "#F8F9FA" }}>
        <div className={`${styles.marginY} ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <GetStarted />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
