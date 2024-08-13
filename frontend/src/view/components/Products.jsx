import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import p1 from '../../assets/p1.jpg'; 
import p2 from '../../assets/p2.jpg';
import p3 from '../../assets/p3.jpg';

const Products = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0', // Remove padding around the center item
    focusOnSelect: true,
    variableWidth: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    beforeChange: () => {
      // Remove zoom effect from all images before the slide changes
      document.querySelectorAll('.slick-slide img').forEach(img => {
        img.classList.remove('zoomed', 'zoom-out');
      });
    },
    afterChange: () => {
      // Identify the slide to the right of the center slide and apply zoom effect
      const slides = document.querySelectorAll('.slick-slide');
      slides.forEach((slide, index) => {
        const img = slide.querySelector('img');
        if (index === Math.floor(slides.length / 2) + 1) {
          img.classList.add('zoomed'); // Zoom in for the right slide
        } else {
          img.classList.add('zoom-out'); // Zoom out for non-target slides
        }
      });
    },
  };

  return (
    <div>
      <div className="carousel-container">
        <div className="text-center font-sans">
          <span className="text-sm font-bold text-red-800 block mb-2">
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
          .carousel-container {
            display: flex;
            justify-content: center; /* Center the carousel container horizontally */
            align-items: center; /* Center the carousel container vertically if needed */
            width: 100%; /* Full width to ensure centering */
            height: auto; /* Adjust height if needed */
          }
          .carousel {
            width: 100%; /* Ensure carousel takes full width */
            max-width: 1300px; /* Set a max-width for the carousel */
            position: relative;
            margin-bottom: 80px;
          }
          .carousel-slide {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 10px; /* Adjust spacing between slides */
          }
          .carousel-img {
            width: 550px; /* Fixed width of images */
            height: 350px; /* Fixed height of images */
            object-fit: cover;
            transition: transform 0.5s ease-in-out; /* Smooth zoom effect */
            border-radius: 10px;
          }
          .zoomed {
            transform: scale(1.1); /* Zoom in effect */
          }
          .zoom-out {
            transform: scale(0.9); /* Zoom out effect */
          }
          .carousel-img:hover {
            transform: scale(1.1); /* Zoom in effect on hover */
          }
          .slick-slide img {
            transition: transform 0.5s ease-in-out; /* Smooth zoom effect */
          }
          .slick-dots {
            bottom: -30px; /* Adjust position of dots */
          }
          .slick-dots li button:before {
            color: red; /* Change color of dots */
          }
        `}</style>
      </div>

      {/* Second Section */}
      <div className="second-section">
        <span className="text-sm font-bold text-red-800 block mb-2">
          Products
        </span>
        <h2 className="section-title">Products</h2>
        <p className="text-sm">
          EUnivate is proud to feature innovative products developed by our talented student-professor teams.
        </p>

        <div className="testimonials">
          <div className="testimonial">
            <p className="testimonial-text">
              "The project management tool significantly improved our team's productivity and communication. Highly recommended!"
            </p>
            <p className="testimonial-author">- Jane Doe, Project Manager</p>
          </div>
          <div className="testimonial">
            <p className="testimonial-text">
              "An excellent tool that has transformed the way we manage projects. The interface is intuitive and easy to use."
            </p>
            <p className="testimonial-author">- John Smith, Software Developer</p>
          </div>
          <div className="testimonial">
            <p className="testimonial-text">
              "A game-changer for project management. It has helped us stay organized and meet deadlines more efficiently."
            </p>
            <p className="testimonial-author">- Emily Johnson, Team Lead</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .second-section {
          padding: 40px;
          background-color: #f9f9f9;
          text-align: left;
        }
        .section-title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .section-description {
          font-size: 1.25rem;
          margin-bottom: 20px;
        }
        .testimonials {
          display: flex;
          justify-content: center;
          gap: 10px; 
        }
        .testimonial {
          background-color: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 300px; /* Adjust width as needed */
          width: 100%;
          flex: 1;
          width: 385px;
          height: 360px;
          margin-top: 30px;
    
        }
        .testimonial-text {
          font-size: 1rem;
          margin-bottom: 10px;
        }
        .testimonial-author {
          font-size: 0.875rem;
          font-weight: bold;
          color: #333;
        }
      `}</style>
    </div>
  );
}

export default Products;
