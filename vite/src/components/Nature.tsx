import React, { useState } from "react";

interface Blog {
  id: number;
  img: string;
  title: string;
  text: string;
}

const Nature: React.FC = () => {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  ];

  const openModal = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBlog(null);
    setIsModalOpen(false);
  };

  return (
    <div
      style={{
        scrollbarWidth: "none",
      }}
      className="p-4 bg-none h-screen overflow-scroll grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {blogs.map((blog) => (
        <div
          className="p-5 bg-white rounded shadow-lg flex flex-col items-center m-3"
          key={blog.id}>
          <h1 className="my-3 text-lg font-bold text-pink-600 text-center">
            {blog.title}
          </h1>
          <img
            className="w-full max-w-xs object-cover rounded my-4 h-60"
            src={blog.img}
            alt={blog.title}/>
          <div className="w-full my-2 flex justify-between items-center">
            <span className="text-white py-1 px-3 bg-pink-600 text-xs rounded">
              Author: Francis
            </span>
            <span className="text-gray-500 text-sm">10:00pm</span>
          </div>
          <p className="text-sm text-black text-center my-4 line-clamp-3">
            {blog.text}
          </p>
          <button
            onClick={() => openModal(blog)}
            className="bg-gray-200 rounded text-sm my-1 py-2 px-4 hover:bg-gray-300">
            Show More
          </button>
        </div>
      ))}
      {isModalOpen && selectedBlog && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-11/12 sm:w-2/3 lg:w-1/2 shadow-lg">
            <button
              className="text-gray-500 hover:text-gray-700 absolute top-4 right-4"
              onClick={closeModal}>x</button>
            <h2 className="text-xl font-bold text-pink-600 mb-4">
              {selectedBlog.title}
            </h2>
            <img
              className="w-full max-h-64 object-cover rounded mb-4"
              src={selectedBlog.img}
              alt={selectedBlog.title}/>
            <p className="text-gray-700 mb-4">{selectedBlog.text}</p>
            <div className="flex items-center justify-between">
              <button
                className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
                onClick={() => alert("Liked!")}>
                Like
              </button>
              <button
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Nature;
