import styles from './style';
import { Navbar, Hero, Stats, GetStarted, CardDeal, FeedBackCard, Business, Billing, Testimonials, Clients, CTA, Footer } from './view/components';
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
          <Stats />
          <Business />
          <Billing />
          <Testimonials />
          <Clients />
          <CTA />
          <Footer />
          <GetStarted /> 
          <CardDeal />
          <FeedBackCard />
        </div>
      </div>
    </div>
  );
}

export default App;
