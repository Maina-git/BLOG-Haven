import React from 'react'
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';


const Navbar:React.FC = () => {
  return (
    <div className="w-full h-[80px] bg-gray-100 flex justify-between items-center">
      <div className="p-auto mx-10">
        <h1 className="text-pink-600 font-bold font-3 text-1xl">DOJO BLOG</h1>
      </div>

<div className="flex flex-row gap-10">
<Link  className="text-xs text-pink-600 hover-bg-gray-400" to="/">Popular</Link>
<Link  className="text-xs text-pink-600 hover-bg-gray-400" to="/g">Growth</Link>
<Link  className="text-xs text-pink-600 hover-bg-gray-400" to="/c">Culture</Link>
<Link  className="text-xs text-pink-600 hover-bg-gray-400" to="/p">Product</Link>

</div>


      <div className="p-auto mx-10">
        <CgProfile className="text-pink-600 font-bold text-3xl cursor-pointer"/>
      </div>
    </div>
  )
}

export default Navbar;
