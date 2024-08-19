
import webinar from '../assets/webinar.png';

export const navLinks = [
  {
    id: "home",
    title: "Home",
    hasDropdown: false,
  },
  {
    id: "products",
    title: "Products",
    hasDropdown: true,
    subLinks: [
      { id: "showcases", title: "Showcases", path: "/showcases" },
      { id: "quotation", title: "Quotation", path: "/quotation" },  
      { id: "eustore", title: "EU Store", path: "/eu-store" },
    ],
    imageUrl: webinar,
    description: 'IT Solution',  
  },
  {
    id: "resources",
    title: "Resources",
    hasDropdown: true,
    subLinks: [
      { id: "webinars", title: "Webinars", path: "/webinar" },
      { id: "events", title: "Events", path: "/events" },
      { id: "challenges", title: "Challenges", path: "/challenges" },
      { id: "projectManagement", title: "Project Management", path: "/project" },
    ],
    imageUrl: webinar,
    description: 'WEBINAR',  
  },
  {
    id: "aboutus",
    title: "About Us",
    hasDropdown: true,
    subLinks: [
      { id: "mission", title: "Mission", path: "/mission" },
      { id: "advantage", title: "Advantage", path: "/advantage" },
      { id: "contactUs", title: "Contact Us", path: "/contact" },
      { id: "ourTeam", title: "Our Team", path: "/our-team" },
    ],
    imageUrl: webinar,
    description: 'EUNIVATE',  
  },
];
