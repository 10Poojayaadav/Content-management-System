import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AppRouter from "./router";
import Header from "./component/Header";
import SideBar from "./component/SideBar";
import "@fontsource/roboto"; 
import "@fontsource/roboto/700.css";
import Login from "./pages/Login";


export default function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  return (
    <>
     {isLoginPage ? (
      <Routes>
        <Route path="login" element={<Login />} />
      </Routes>
    ) : (
    <div className="flex">
      <SideBar />
      <div className="flex-1 bg-gray-100">
        <header className="p-1 bg-white shadow">
          <h1 className="text-xl font-semibold"><Header/></h1>
        </header>
        <main className="">
          <AppRouter />
        </main>
      </div>
    </div>
      )}
    </>
   
  );
}
