// src/components/Sidebar.jsx
import React, { useState } from "react";
import Logo from "../assets/logo.jpg";
import ServiceImage from "../assets/laptop.jpg";
import { FiMenu, FiX } from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-6 z-50 p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <FiX className="text-white text-2xl" />
        ) : (
          <FiMenu className="text-white text-2xl" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-[#111] text-white w-[250px] min-h-screen border-r-2 border-gray-600 flex flex-col justify-between p-4 z-40 fixed top-0 left-0 md:static md:transform-none transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          {/* Logo */}
          <div className="text-xl font-bold text-center text-white mb-6">
            <img
              src={Logo}
              alt="Flutter Showcase"
              className="w-32 mx-auto rounded shadow-lg object-cover"
            />
          </div>

          {/* Menu */}
          <ul className="space-y-6">
            <li>
              <button className="bg-gradient-to-r  from-green-500 to-pink-500 text-white px-4 py-2 rounded-full w-full text-center">
                CONTACT US
              </button>
            </li>
            <li className="cursor-pointer hover:drop-shadow-[0_0_5px_white]">
              Home
            </li>
            <li className="cursor-pointer hover:drop-shadow-[0_0_5px_white]">
              About
            </li>
            <li className="cursor-pointer hover:drop-shadow-[0_0_5px_white]">
              Service
            </li>
            <li className="cursor-pointer hover:drop-shadow-[0_0_5px_white]">
              Community
            </li>
          </ul>
        </div>

        {/* Image and text */}
        <div className="mt-10">
          <img src={ServiceImage} alt="sidebar" className="rounded-lg mb-2" />
          <p className="text-xs text-gray-300">
            Lorem ipsum dolor sit amet consectetur. Enim tempor posuere rutrum.
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
