import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUser, FaBook } from 'react-icons/fa';
import { FaBasketShopping } from "react-icons/fa6";

const Sidebar = () => {

  const links = [
    { name: 'Dashboard', path: '/', icon: <FaHome className="mr-2" /> },
    { name: 'Profile', path: '/profile', icon: <FaUser className="mr-2" /> },
    { name: 'Publications', path: '/publications', icon: <FaBook className="mr-2" /> },
    { name: 'Shop', path: '/shop', icon: <FaBasketShopping className="mr-2" /> },
  ];

  return (
    <div className="w-2/12 h-screen bg-base-200 p-4 shadow-lg">
      <nav>
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-md transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-content'
                        : 'hover:bg-error'
                    }`
                  }
                >
                  {link.icon}
                  {link.name}
                </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;