
  import webinar from '../assets/webinar.png';

  export const navLinks = [
    {
      id: "home", path: "/",
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
        { id: "projectManagement", title: "Project Management", path: "/login" },
      ],
      imageUrl: webinar,
      description: 'WEBINAR',  
    },
    {
      id: "aboutus" ,path: "/about",
      title: "About Us",
    },
  ];
