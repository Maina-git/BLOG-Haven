import React from 'react';
import { CiHeart } from "react-icons/ci";

interface Blog {
  id: number;
  img: string;
  title: string;
  text: string;
}

const Blogs: React.FC = () => {
  const blogs: Blog[] = [
    {
      id: 1,
      img: "/images/blog-684748_1280.jpg",
      title: "MY FAV FUNDAY",
      text: "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet",
    },
    {
      id: 2,
      img: "/images/blog-2355684_1280.jpg",
      title: "ANOTHER FUN DAY",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.",
    },
    {
      id: 3,
      img: "/images/blog-3813603_1280.jpg",
      title: "EXPLORE ADVENTURES",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet",
    },
    {
      id: 4,
      img: "/images/blog-684748_1280.jpg",
      title: "MY FAV FUNDAY",
      text: "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet",
    },
    {
      id: 5,
      img: "/images/blog-2355684_1280.jpg",
      title: "ANOTHER FUN DAY",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.",
    },
    {
      id: 6,
      img: "/images/blog-3813603_1280.jpg",
      title: "EXPLORE ADVENTURES",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet",
    },
    {
      id: 7,
      img: "/images/blog-684748_1280.jpg",
      title: "MY FAV FUNDAY",
      text: "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet",
    },
    {
      id: 8,
      img: "/images/blog-2355684_1280.jpg",
      title: "ANOTHER FUN DAY",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.",
    },
    {
      id: 9,
      img: "/images/blog-3813603_1280.jpg",
      title: "EXPLORE ADVENTURES",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet",
    },
  ];
  return (
    <div className="min-h-[100vh] overflow-hidden bg-gray-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-pink-600 text-5xl py-10">Explore Other Blogs</h1>
      <div 
        className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-y-auto" 
        style={{
          maxHeight: "70vh",
          scrollbarWidth: "none", 
          msOverflowStyle: "none" 
        }}>
        <style>
          {`
            .grid::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        {blogs.map((blog) => (
          <div key={blog.id} className="p-4 bg-white rounded-lg shadow-lg">
            <span className="text-xs text-pink-600 font-bold p-2">Author</span>
            <img src={blog.img} className="w-full h-[200px] object-cover rounded-t-lg" alt={blog.title} />
            <h1 className="text-pink-600 p-2 text-lg font-semibold">{blog.title}</h1>
            
            <p className="text-black text-sm p-2 line-clamp-3 overflow-hidden text-ellipsis">
              {blog.text}
            </p>           
            <div className="flex justify-between items-center p-2">
              <CiHeart className="text-pink-600 text-3xl cursor-pointer" />
              <button className="bg-pink-600 text-white font-bold text-xs px-4 py-2 rounded hover:bg-pink-700">Save</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
