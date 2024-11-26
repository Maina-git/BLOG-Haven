import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleSideBar = () => {
    setOpen(!open);
  };

  return (
    <div className="w-full h-[80px] bg-gray-100 flex justify-between items-center shadow-md">
      <div className="mx-10">
        <h1 className="text-pink-600 font-bold text-xl">DOJO BLOG</h1>
      </div>
      <div className="hidden md:flex flex-row gap-10">
        <Link className="text-xs text-pink-600 hover:text-pink-800" to="/">
          Popular
        </Link>
        <Link className="text-xs text-pink-600 hover:text-pink-800" to="/p">
          Growth
        </Link>
        <Link className="text-xs text-pink-600 hover:text-pink-800" to="/s">
          Sports
        </Link>
        <Link className="text-xs text-pink-600 hover:text-pink-800" to="/c">
          Culture
        </Link>
        <Link className="text-xs text-pink-600 hover:text-pink-800" to="/p">
          Product
        </Link>
      </div>

      <div className="hidden md:flex">
        <Link to="/ap">
          <button className="px-4 py-1 bg-pink-600 text-white outline-none rounded-full text-xs hover:bg-pink-700">
            Create Post
          </button>
        </Link>
      </div>
      <div className="hidden md:flex mx-10">
        <CgProfile className="text-pink-600 font-bold text-3xl cursor-pointer" />
      </div>

      <div className="md:hidden mx-5">
        <button onClick={toggleSideBar} className="text-pink-600 text-2xl">
          {open ? <IoMdClose /> : <GiHamburgerMenu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden fixed top-0 left-0 w-[70%] h-full bg-pink-600 text-white flex flex-col items-start px-5 py-10 shadow-lg z-50">

<div className="md:flex mx-10">
        <CgProfile className="absolute text-white top-2 right-5 font-bold text-3xl cursor-pointer" />
      </div>

          <Link
            className="text-sm py-2 hover:text-gray-200"
            to="/"
            onClick={toggleSideBar}>
            Popular
          </Link>
          <Link
            className="text-sm py-5 hover:text-gray-200"
            to="/p"
            onClick={toggleSideBar}>
            Growth
          </Link>
          <Link
            className="text-sm py-5 hover:text-gray-200"
            to="/s"
            onClick={toggleSideBar}>
            Sports
          </Link>
          <Link
            className="text-sm py-5 hover:text-gray-200"
            to="/c"
            onClick={toggleSideBar}>
            Culture
          </Link>
          <Link
            className="text-sm py-5 hover:text-gray-200"
            to="/p"
            onClick={toggleSideBar}>
            Product
          </Link>
          <Link
            to="/ap"
            onClick={toggleSideBar}
            className="mt-4 px-4 py-2 bg-white text-pink-600 rounded-full text-sm hover:bg-gray-100">
            Create Post
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
