import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import userIcon from "../assets/icons/user.svg";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStats } from "../store/slices/dashboardSlice";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.dashboard);
  console.log(stats, "helllllllllllll");
  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const studentStrengthData = {
    labels: [
      "Computer Science",
      "Mechanical",
      "Electrical",
      "Civil",
      "Biotech",
    ],
    datasets: [
      {
        label: "Student Strength",
        data: [120, 90, 150, 80, 60],
        backgroundColor: "#F8A601",
        borderColor: "#F8A601",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Student Strength by Department",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <section className="min-h-screen p-6 bg-[#f0efef] dark:bg-gray-800 dark:text-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-4 gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {/* Total Post */}
          <Link
            to="/posts"
            className="min-h-[175px] bg-white dark:bg-gray-700 dark:border-gray-600 dark:hover:border-[#F8A601] p-5 rounded-md border-b-4 border-b-transparent hover:border-b-[#F8A601] shadow-md flex flex-col justify-between transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="min-h-[40px] w-[40px] rounded-full bg-[#F8A60126] flex justify-center items-center">
                <img src={userIcon} alt="Posts" />
              </div>
            </div>
            <p className="text-[#00000099] dark:text-gray-300 text-[16px] mt-4">
              Total Post:{" "}
              <span className="font-bold">{stats?.posts_count || 0}</span>
            </p>
          </Link>

          {/* Total Page */}
          <Link
            to="/pages"
            className="min-h-[175px] bg-white dark:bg-gray-700 dark:border-gray-600 dark:hover:border-rose-600 p-5 rounded-md border-b-4 border-b-transparent hover:border-b-rose-600 shadow-md flex flex-col justify-between transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="min-h-[40px] w-[40px] rounded-full bg-[#F8A60126] flex justify-center items-center">
                <img src={userIcon} alt="Pages" />
              </div>
            </div>
            <p className="text-[#00000099] dark:text-gray-300 text-[16px] mt-4">
              Total Page:{" "}
              <span className="font-bold">{stats?.pages_count || 0}</span>
            </p>
          </Link>

          {/* Total Active User */}
          <Link
            to="/users"
            className="min-h-[175px] bg-white dark:bg-gray-700 dark:border-gray-600 dark:hover:border-blue-600 p-5 rounded-md border-b-4 border-b-transparent hover:border-b-blue-600 shadow-md flex flex-col justify-between transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="min-h-[40px] w-[40px] rounded-full bg-[#F8A60126] flex justify-center items-center">
                <img src={userIcon} alt="Users" />
              </div>
            </div>
            <p className="text-[#00000099] dark:text-gray-300 text-[16px] mt-4">
              Total Active User:{" "}
              <span className="font-bold">{stats?.users_count || 0}</span>
            </p>
          </Link>
        </div>

        {/* Optional Chart Section */}
        <div
          className="mt-10 bg-white dark:bg-gray-700 dark:text-white p-6 rounded-md shadow-md"
          style={{ minHeight: "400px" }}
        >
          {/* Insert your chart component here */}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
