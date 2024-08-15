import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import p1 from '../../assets/p1.jpg'; 
import p2 from '../../assets/p2.jpg';
import p3 from '../../assets/p3.jpg';
import dev1 from '../../assets/dev1.jpg'; 
import dev2 from '../../assets/dev2.jpg';
import dev3 from '../../assets/dev3.jpg';
import link1 from '../../assets/link1.jpg';
import link2 from '../../assets/link2.jpg';
import link3 from '../../assets/link3.jpg';
import arrowIcon from '../../assets/arrowIcon.jpg'; 
import twitterIcon from '../../assets/twitterIcon.jpg'; 
import linkedinIcon from '../../assets/linkedinIcon.jpg';
import prof1 from '../../assets/prof1.jpg';
import prof2 from '../../assets/prof2.jpg';
import prof3 from '../../assets/prof3.jpg';
import prof4 from '../../assets/prof4.jpg';



const Products = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    focusOnSelect: true,
    variableWidth: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    beforeChange: () => {
      document.querySelectorAll('.slick-slide img').forEach(img => {
        img.classList.remove('zoomed', 'zoom-out');
      });
    },
    afterChange: () => {
      const slides = document.querySelectorAll('.slick-slide');
      slides.forEach((slide, index) => {
        const img = slide.querySelector('img');
        if (index === Math.floor(slides.length / 2) + 1) {
          img.classList.add('zoomed');
        } else {
          img.classList.add('zoom-out');
        }
      });
    },
  };

  return (
    <div>
      {/* Carousel Section */}
      <div className="PMT-carousel">
        <div className="text-center font-sans">
          <span className="pmt font-bold text-red-800 block mb-2">
            Project Management Tool
          </span>
          <span className="text-3xl font-bold block" style={{ marginBottom: '40px' }}>
            Streamlining Project Success with Project Management Tool
          </span>

          <Slider {...settings} className="carousel">
            <div className="carousel-slide">
              <img src={p1} alt="Image 1" className="carousel-img" />
            </div>
            <div className="carousel-slide">
              <img src={p2} alt="Image 2" className="carousel-img" />
            </div>
            <div className="carousel-slide">
              <img src={p3} alt="Image 3" className="carousel-img" />
            </div>
          </Slider>
        </div>

        <style jsx>{`
          .PMT-carousel {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: auto;
          }
          .carousel {
            width: 100%;
            max-width: 1300px;
            position: relative;
            margin-bottom: 80px;
          }
          .carousel-slide {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 10px;
          }
          .carousel-img {
            width: 550px;
            height: 350px;
            object-fit: cover;
            transition: transform 0.5s ease-in-out;
            border-radius: 15px;
          }
          .zoomed {
            transform: scale(1.1);
            border-radius: 15px;
          }
          .zoom-out {
            transform: scale(0.9);
            border-radius: 15px;
          }
          .carousel-img:hover {
            transform: scale(1.1);
          }
          .slick-slide img {
            transition: transform 0.5s ease-in-out;
          }
          .slick-dots {
            bottom: -30px;
          }
          .slick-dots li button:before {
            color: red;
          }

        /* Responsive Adjustments */
          @media (max-width: 576px) {
          .PMT-carousel{
          margin-bottom: -20px;
          }
      
          .carousel-img {
          width: 400px;
          height: 250px;
          object-fit: cover;
          transition: transform 0.5s ease-in-out;
          border-radius: 15px;
          display: block; 
          padding: 0 auto;
          margin: 0 auto; 
          }
          .text-3xl {
          font-size: 1.70rem;
          margin-bottom: 6vh;
          margin-left: 450px;
          margin-right: 450px;
          text-align: center;
          }
        }
      `}</style>
    </div>

      {/* Products Section */}
<div className="products">
  <span className="programs font-bold text-red-800 block mb-2">
    Explore Programs
  </span>
  <h2 className="section-title">Our Featured Products</h2>
  <p className="EU text-sm">
    EUnivate is proud to feature innovative products developed by our talented student-professor teams.
  </p>

  <div className="product-cards">
    {/* Product 1 */}
    <div className="product-card">
      <img src={link1} alt="Product 1" className="product-image" />
      <h3 className="product-title">
        OptiWaste Management... <img src={arrowIcon} alt="Arrow Icon" className="arrow-icon" />
      </h3>
      <p className="product-description">
        OptiWaste utilizes AI and machine learning to analyze waste streams and optimize collection routes.
      </p>
      <div className="developer-info">
        <span className="developed-by">Developed by: Team Phoenix</span>
        <div className="developer">
          <img src={dev1} alt="Developer 1" className="developer-image" />
          <div className="developer-details">
            <span className="developer-name">Engr. Cheeky Tanaka</span>
            <span className="developer-profession">Lead Professor</span>
          </div>
        </div>
      </div>
    </div>

    {/* Product 2 */}
    <div className="product-card">
      <img src={link2} alt="Product 2" className="product-image" />
      <h3 className="product-title">
        Interactive Language L... <img src={arrowIcon} alt="Arrow Icon" className="arrow-icon" />
      </h3>
      <p className="product-description">
        Utilizes gamification techniques and immersive storytelling to make language learning fun and interactive.
      </p>
      <div className="developer-info">
        <span className="developed-by">Developed by: Team LingoMasters</span>
        <div className="developer">
          <img src={dev2} alt="Developer 2" className="developer-image" />
          <div className="developer-details">
            <span className="developer-name">David Hernandez</span>
            <span className="developer-profession">Lead Professor</span>
          </div>
        </div>
      </div>
    </div>

    {/* Product 3 */}
    <div className="product-card">
      <img src={link3} alt="Product 3" className="product-image" />
      <h3 className="product-title">
        AI-Powered Disaster Re... <img src={arrowIcon} alt="Arrow Icon" className="arrow-icon" />
      </h3>
      <p className="product-description">
        PhiloSAFE uses AI to analyze historical data and predict potential disaster scenarios.
      </p>
      <div className="developer-info">
        <br></br>
        <span className="developed-by">Developed by: Team Phoenix</span>
        <div className="developer">
          <img src={dev3} alt="Developer 3" className="developer-image" />
          <div className="developer-details">
            <span className="developer-name">Peter Domingo</span>
            <span className="developer-profession">Lead Professor</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style jsx>{`
  .products {
    padding: 40px;
    text-align: left;
    margin-bottom: 80px;
  }
  .EU {
    margin-bottom: 30px;
  }
  .section-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .product-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }
  .product-card {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 10px 12px rgba(0, 0, 0, 0.2);
    width: 337px;
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  .product-card:hover {
    transform: scale(1.05);
  }
  .product-image {
    width: 100%;
    height: auto;
    border-radius: 5px;
    object-fit: cover;
  }
  .product-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-top: 15px;
    display: flex;
    align-items: center;
  }
  .arrow-icon {
    width: 20px;
    height: auto;
    margin-left: 22px;
  }
  .product-description {
    font-size: 0.875rem;
    margin-top: 10px;
  }
  .developer-info {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
  }
  .developed-by {
    font-weight: 600;
    display: block;
    margin-bottom: 20px;
    font-size: 12px;
  }
  .developer {
    display: flex;
    align-items: center;
  }
  .developer-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }
  .developer-details {
    display: flex;
    flex-direction: column;
    font-size: 0.875rem;
  }
  .developer-name {
    font-weight: bold;
    margin-bottom: 5px;
  }
  .developer-profession {
    font-size: 0.75rem;
    color: #777;
    margin-top: -3px;
  }
    /* Responsive Adjustments */
          @media (max-width: 576px) {
          .programs{
          text-allign: left;
          }
          .products {
          padding: 0px;
          text-align: left;
          margin-bottom: 60px;
        }
      }
`}</style>



      {/* Professors Section */}
<div className="professors-section">
  <span className="professors font-bold text-red-800 block mb-2">
    Professors
  </span>
  <h2 className="section-title">Featured University Experts</h2>
  <p className="prof text-sm">
    EUnivate connects you with a vast network of top university minds across diverse disciplines. Here are just a few of our featured experts ready to tackle your toughest challenges:
  </p>

  <div className="professor-cards">
    {/* Professor 1 */}
    <div className="professor-card">
      <img src={prof1} alt="Professor 1" className="professor-image" />
      <h3 className="professor-name">Theresa Webb</h3>
      <p className="professor-profession">Application Support Analyst Lead</p>
      <p className="professor-bio">Former co-founder of Opendoor. Early staff at Spotify and Clearbit.</p>
      <div className="social-icons">
        <a href="#" className="social-link">
          <img src={twitterIcon} alt="Twitter" className="social-icon" />
        </a>
        <a href="#" className="social-link">
          <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
        </a>
      </div>
    </div>

    {/* Professor 2 */}
    <div className="professor-card">
      <img src={prof2} alt="Professor 2" className="professor-image" />
      <h3 className="professor-name">Courtney Henry</h3>
      <p className="professor-profession">Director, Undergraduate Analytics and Planning</p>
      <p className="professor-bio">Lead engineering teams at Figma, Pitch, and Protocol Labs.</p>
      <div className="social-icons">
        <a href="#" className="social-link">
          <img src={twitterIcon} alt="Twitter" className="social-icon" />
        </a>
        <a href="#" className="social-link">
          <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
        </a>
      </div>
    </div>

    {/* Professor 3 */}
    <div className="professor-card">
      <img src={prof3} alt="Professor 3" className="professor-image" />
      <h3 className="professor-name">Albert Flores</h3>
      <p className="professor-profession">Career Educator</p>
      <p className="professor-bio">Former PM for Linear, Lambda School, and On Deck.</p>
      <br></br>
      <div className="social-icons">
        <a href="#" className="social-link">
          <img src={twitterIcon} alt="Twitter" className="social-icon" />
        </a>
        <a href="#" className="social-link">
          <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
        </a>
      </div>
    </div>

    {/* Professor 4 */}
    <div className="professor-card">
      <img src={prof4} alt="Professor 4" className="professor-image" />
      <h3 className="professor-name">Marvin McKinney</h3>
      <p className="professor-profession">Co-op & Internships Program & Operations Manager</p>
      <p className="professor-bio">Former frontend dev for Linear, Coinbase, and Postscript.</p>
      <div className="social-icons">
        <a href="#" className="social-link">
          <img src={twitterIcon} alt="Twitter" className="social-icon" />
        </a>
        <a href="#" className="social-link">
          <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
        </a>
      </div>
    </div>
  </div>
</div>

<style jsx>{`
  .professors-section {
    padding: 10px;
    text-align: center;
    margin-bottom: 80px;
  }
  .professor-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }
  .prof {
    width: 550px;
    margin: 0 auto; /* Centers the element horizontally */
    margin-bottom: 30px; /* Adds a bottom margin of 30px */
  }
  .professor-card {
    background-color: #fff;
    padding: 20px;
    width: 250px;
    text-align: center;
  }
  .professor-image {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    margin: 0 auto; /* Center the image */
  }
  .professor-name {
    font-size: 0.9rem;
    font-weight: bold;
    margin-top: 10px;
  }
  .professor-profession {
    color: red;
    font-size: 1rem;
    margin-top: 5px;
  }
  .professor-bio {
    font-size: 0.875rem;
    margin-top: 10px;
  }
  .social-icons {
    margin-top: 10px;
    display: flex;
    gap: 10px;
    justify-content: center;
  }
  .social-link {
    transition: color 0.3s ease;
  }
  .social-icon {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
    /* Responsive Adjustments */
          @media (max-width: 576px) {
          .professors{
          text-align: left;
          }
          .prof {
          font-size: 1rem;
          padding-right: 100px;
          text-align: left;
          line-height: 1.6;
          }
          .professors-section{
          margin-bottom: -15 0px;
          }
        }
`}</style>


    </div>
  );
};

export default Products;
