import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/Firebase";
//import { FcLike } from "react-icons/fc";
//import { IoIosHeartEmpty } from "react-icons/io";


interface Blog {
  id: string;
  title: string;
  text: string;
  category: string;
}

const CulturePost: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCultureBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const blogsCollection = collection(db, "blogs");
        const q = query(blogsCollection, where("category", "==", "Culture"));
        const querySnapshot = await getDocs(q);

        const cultureBlogs: Blog[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Blog[];

        setBlogs(cultureBlogs);
      } catch (err) {
        console.error("Error fetching culture blogs:", err);
        setError("Failed to fetch blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchCultureBlogs();
  }, []);

  if (loading) return <div>Loading Culture Blogs...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="p-4 border rounded shadow-lg  flex flex-col items-center justify-center">
            <img src="/images/blog-2355684_1280.jpg" alt="" />
            <h2 className="text-2xl font-semibold text-pink-600">{blog.title}</h2>
            <p className="text-gray-500 text-xs mt-2">{blog.text}</p>
            <button className="bg-gray-300 text-black px-5 py-2 text-xs my-2">Show More</button>
            </div>
        ))}
      </div>
    </div>
  );
};

export default CulturePost;































//import React from "react"
//import { useState } from "react";
//import { useEffect } from "react";
//import { collection, query, where, getDocs } from "firebase/firestore";
//import { db } from "../config/Firebase";
/*

interface Blog {
  id: number;
  img: string;
  title: string;
  text: string;
  category:string;
}

const CulturePost: React.FC = () => {


const [blogs, setBlogs]=useState<Blog[]>([]);
const [loading, setLoading]=useState<boolean>(true);
const [error, setError]=useState<String | null>(null);

useEffect(()=>{


const  fetchCulture=async()=>{
  setLoading(true);
  setError(null);


try{
const blogsCollection=collection(db, 'blogs');
const q=query(blogsCollection, where("category", "==", "Cultrue"));
const querySnapshot=await getDocs(q);

const cultureBlogs: Blog[] = querySnapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
})) as Blog[];

setBlogs(cultureBlogs);
}catch (err){
  console.error("Error fetching  culture blogs", err);
  setError("Failed to  fetch Blogs");
}finally{
  setLoading(false);
}
};
fetchCulture();
}, []);
*/

/*
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
  */
/*
  return (
    <div style={{
        scrollbarWidth:"none"
    }} className="p-4 bg-none h-screen overflow-scroll grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {blogs.map((blog) => (
        <div className="p-5 bg-white rounded shadow-lg flex flex-col items-center m-3"
          key={blog.id}>
          <h1 className="my-3 text-lg font-bold text-pink-600 text-center">
            {blog.title}
          </h1>
          <img className="w-full max-w-xs object-cover rounded my-4 h-60"
            src=""
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
          <button className="bg-gray-200 rounded text-sm my-1 py-2 px-4 hover:bg-gray-300">
            Show More
          </button>
        </div>
      ))}
    </div>
  );
};

export default CulturePost;

*/












