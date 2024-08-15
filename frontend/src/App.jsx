import styles from './style';
import { Navbar, 
         Hero, 
         Stats, 
         Products,
         CardDeal, 
         FeedBackCard, 
         Business, 
         Billing, 
         Testimonials, 
         Clients,
         Howitworks, 
         Partnerships,
         LogoSlides,
         ProjectHoursSupport,
         GetStarted, 
         CTA, Footer,  
       } from './view/components';

import './index.css'; 

const App = () => {
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

      <div className={`${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Products />
          <Stats />
          <Business />
          <Billing />
          <Testimonials />
          <Clients />
          <CardDeal />
          <FeedBackCard />
        </div>
      </div>

      <div className="bg-secondary w-full overflow-hidden shadow-md">
        <div className={`${styles.marginY} ${styles.paddingX} ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Howitworks />
          </div>
        </div>
      </div>

      <div className="bg-white w-full overflow-hidden shadow-md" style={{ marginTop: "4rem", paddingBottom: "1rem" }}>
        <div className={`${styles.marginY} ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Partnerships />
          </div>
        </div>
      </div>

      <div className="w-full overflow-hidden" style={{ marginTop: "10px", backgroundColor: "#FCFCFF" }}>
        <div className={`${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <LogoSlides />
          </div>
        </div>
      </div>

      <div className="w-full overflow-hidden shadow-md" style={{ paddingTop: "4rem", paddingBottom: "4rem", backgroundColor: "#F8F9FA" }}>
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
