
import downArrow from '../assets/down-arrow.png';

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
      { id: "product1", title: "Product 1", href: "#product1" },
      { id: "product2", title: "Product 2", href: "#product2" },
    ],
  },
  {
    id: "resources",
    title: "Resources",
    hasDropdown: true,
    subLinks: [
      { id: "resource1", title: "Resource 1", href: "#resource1" },
      { id: "resource2", title: "Resource 2", href: "#resource2" },
    ],
  },
  {
    id: "aboutus",
    title: "About Us",
    hasDropdown: true,
    subLinks: [
      { id: "team", title: "Our Team", href: "#team" },
      { id: "contact", title: "Contact Us", href: "#contact" },
    ],
  },
];


export { downArrow };
