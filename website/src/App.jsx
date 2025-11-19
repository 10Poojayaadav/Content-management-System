// App.jsx
import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Body from "./components/Body";

function App() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 md:p-6 bg-gradient-to-b from-[#121212] to-[#0f0f0f] text-white ">
          <Body />
        </main>
      </div>
    </div>
  );
}

export default App;
