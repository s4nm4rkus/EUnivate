import { webinar } from './assets';

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
      { id: "showcases", title: "Showcases", href: "#showcases" },
      { id: "quotation", title: "Quotation", href: "#quotation" },
      { id: "eustore", title: "EU Store", href: "#eustore" },
    ],
    imageUrl: webinar,
    description: 'IT Solution',  
  },
  {
    id: "resources",
    title: "Resources",
    hasDropdown: true,
    subLinks: [
      { id: "webinars", title: "Webinars", href: "#webinars" },
      { id: "events", title: "Events", href: "#events" },
      { id: "challenges", title: "Challenges", href: "#challenges" },
      { id: "projectManagement", title: "Project Management", href: "#projectManagement" },
    ],
    imageUrl: webinar,
    description: 'WEBINAR',  
  },
  {
    id: "aboutus",
    title: "About Us",
    hasDropdown: true,
    subLinks: [
      { id: "mission", title: "Mission", href: "#mission" },
      { id: "advantage", title: "Advantage", href: "#advantage" },
      { id: "contactUs", title: "Contact Us", href: "#contactUs" },
      { id: "ourTeam", title: "Our Team", href: "#ourTeam" },
    ],
    imageUrl: webinar,
    description: 'EUNIVATE',  
  },
];
