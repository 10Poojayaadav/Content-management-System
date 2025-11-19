import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import Swal from "sweetalert2";


const SideBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOrganizationOpen, setIsOrganizationOpen] = useState(false);

  const toggleOrganization = () => {
    setIsOrganizationOpen((prevState) => !prevState);
  };
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Logged out!", "You have been logged out.", "success");
        navigate("/login"); 
      }
    });
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex">
      <div
        className={`${
          isOpen ? "w-64" : "w-16"
        } h-auto bg-gray-300 text-black flex flex-col transition-all duration-300 ease-in-out relative dark:bg-gray-900 dark:text-gray-100 `}
      >
        <button
          onClick={toggleSidebar}
          className={`p-1 text-white rounded-md absolute top-4 transition-all duration-300 z-50`}
          style={{
            left: isOpen ? "223px" : "55px",
          }}
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
        <div className="flex items-center p-4 border-b border-gray-700">
          <span
            className={`text-lg font-bold transition-opacity ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            Content Management System
          </span>
        </div>
        <nav className="flex-1 p-4 space-y-4">
          <Link
            to="/"
            className="flex items-center  gap-3 px-4 py-2 rounded hover:bg-gray-700 focus:bg-gray-700 dark:hover:bg-gray-600"
          >
            {isOpen && <span>Dashboard</span>}
          </Link>
          <Link
            to="/user-list"
            className="flex items-center  gap-3 px-4 py-2 rounded hover:bg-gray-700 focus:bg-gray-700 dark:hover:bg-gray-600"
          >
            {isOpen && <span>Post</span>}
          </Link>
          <Link
            to="/student-list"
            className="flex items-center  gap-3 px-4 py-2 rounded hover:bg-gray-700 focus:bg-gray-700 dark:hover:bg-gray-600"
          >
            {isOpen && <span>Page</span>}
          </Link>
          <div
            className="flex flex-col items-start gap-3 px-4 py-2 rounded cursor-pointer hover:bg-gray-700 focus:bg-gray-700 dark:hover:bg-gray-600"
            onClick={toggleOrganization}
          >
            {isOpen && <span></span>}
          </div>

          {isOrganizationOpen && (
            <div className="ml-4 space-y-2">
              <Link
                to="/org-list"
                className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 focus:bg-gray-700 dark:hover:bg-gray-600"
              >
                <span></span>
              </Link>
              <Link
                to="/group-list"
                className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 focus:bg-gray-700 dark:hover:bg-gray-600"
              >
                <span>Group</span>
              </Link>
              <Link
                to="/department-list"
                className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 focus:bg-gray-700 dark:hover:bg-gray-600"
              >
                <span></span>
              </Link>
              <Link
                to="/role-list"
                className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 focus:bg-gray-700 dark:hover:bg-gray-600"
              >
                <span></span>
              </Link>
            </div>
          )}

          <Link
          onClick={handleLogout}
            className="flex items-center  gap-3 px-4 py-2 rounded hover:bg-gray-700 focus:bg-gray-700 dark:hover:bg-gray-600"
          >
            {isOpen && <span>Logout</span>}
          </Link>
        </nav>

        <button
          onClick={toggleTheme}
          className="p-4 bg-gray-600 text-white rounded-md fixed bottom-4 left-4"
        >
          {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </div>
    </div>
  );
};

export default SideBar;
