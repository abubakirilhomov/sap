import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUser, FaBook } from 'react-icons/fa';
import { FaBasketShopping } from "react-icons/fa6";

const MobileNav = () => {
  const links = [
    { name: 'Home', path: '/', icon: <FaHome className="mr-2" /> },
    { name: 'Posts', path: '/posts', icon: <FaBook className="mr-2" /> },
    { name: 'Shop', path: '/shop', icon: <FaBasketShopping className="mr-2" /> },
    { name: 'Profile', path: '/profile', icon: <FaUser className="mr-2" /> },
  ];

  return (
    <div className="dock fixed bottom-0 left-0 right-0 bg-base-100 shadow-lg p-2 flex justify-around md:hidden">
      {links.map((link) => (
        <NavLink
          key={link.name}
          to={link.path}
          className={({ isActive }) =>
            `flex flex-col items-center p-2 ${isActive ? 'dock-active text-secondary' : 'text-base-content/70 hover:text-secondary'}`
          }
        >
          {link.icon}
          <span className="dock-label text-sm">{link.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default MobileNav;