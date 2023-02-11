import React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import { logo } from "./assets";
import { Home, CreatePost } from "./Pages";
const App = () => {
  return (
    <BrowserRouter>
      {/* <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]"> */}
      <header className="w-full flex justify-between items-center bg-[#00000e] sm:px-8 px-4 py-4 border-b border-b-[#fff]">
        <Link className="flex items-center gap-2" to="/">
          <img src={logo} alt="logo" className="w-14 object-contain" />
          <p className="text-white font-bold text-md">CanvasAI</p>
        </Link>
        <Link
          to="/create-post"
          className="font-montserrat font-medium bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 hover:delay-100"
          // className="font-montserrat font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
        >
          Create
        </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#000] min-h-[calc(100vh-73px)]">
        {/* <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]"> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
