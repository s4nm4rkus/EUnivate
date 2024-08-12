import Blog from './view/components/LastSection/Blog';
import Navbar from './view/components/LandingPage/Navbar';
import Hero from './view/components/LandingPage/Hero';
import CTA from './view/components/LastSection/CTA';
import Footer from './view/components/LastSection/Footer';
import Feature_uni from './view/components/SecondSection/Feature_uni';
import Pmt from './view/components/SecondSection/Pmt';
import Products from './view/components/SecondSection/Products';
import HIW from './view/components/ThirdSection/HIW';
import Partnerships from './view/components/ThirdSection/Partnerships';
import './index.css'; 
import styles from './style';


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
          <Blog />
          <Feature_uni />
          <Pmt />
          <CTA />
          <Footer />
          <Products /> 
          <HIW />
          <Partnerships />
        </div>
      </div>
    </div>
  );
}

export default App;
