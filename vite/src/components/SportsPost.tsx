import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/Firebase";
import { IoIosHeartEmpty } from "react-icons/io";
import { FcLike } from "react-icons/fc";
import { sportsInterface } from "../interface/SportsInterface";
import { useDatabase } from "../context/useDatabase";
import { MdDelete } from "react-icons/md";
import { auth } from "../config/Firebase";

interface Blog {
  author: string;
  id: string;
  title: string;
  text: string;
  category: string;
  image: string;
  createdAt: string;
  likedByMe: boolean;
  likes: number;
}
const SportsPost: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
const {deleteBlog}=useDatabase();
const character=auth.currentUser?.email?.charAt(0) || null;

  const openModal = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBlog(null);
    setIsModalOpen(false);
  };

  const handleLike = async (id: string, likes: number, likedByMe: boolean) => {
    const updatedBlogs = blogs.map((blog) =>
      blog.id === id
        ? {
            ...blog,
            likes: likedByMe ? Math.max(0, likes - 1) : likes + 1,
            likedByMe: !likedByMe,
          }
        : blog
    );
    setBlogs(updatedBlogs);
    try {
      const blogRef = doc(db, "blogs", id);
      await updateDoc(blogRef, {
        likes: likedByMe ? Math.max(0, likes - 1) : likes + 1,
      });
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };
  useEffect(() => {
    const fetchSportsBlogs = async () => {
      setLoading(true);
      setError(null);

      const timeout = setTimeout(() => {
        setError("Request timeout. Please try again later.");
        setLoading(false);
      }, 10000);
      try {
        const blogsCollection = collection(db, "blogs");
        const q = query(blogsCollection, where("category", "==", "Sports"));
        const querySnapshot = await getDocs(q);
        clearTimeout(timeout);
        
        const sportsBlogs: Blog[] = querySnapshot.docs.map((doc) => {
          const randomIndex = Math.floor(Math.random() * sportsInterface.length);
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt
              ? new Date(data.createdAt.seconds * 1000).toLocaleString()
              : "Unknown",
            image: sportsInterface[randomIndex]?.img || "",
            likes: Number(data.likes) || 0,
            likedByMe: false, 
          };
        }) as Blog[];
        setBlogs(sportsBlogs);
      } catch (err) {
        console.error("Error fetching sports blogs:", err);
        setError("Failed to fetch blogs.");
      } finally {
        setLoading(false);
      }
    };
    fetchSportsBlogs();
  }, []);
  if (loading)
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <div>
          <h1 className="text-pink-600 font-bold text-4xl">Loading...</h1>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="text-black text-6xl">Error 404!</h1>
        <p className="text-black text-xs">Site cannot be reached</p>
      </div>
    );

  return (
    <div className="p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id}
            className="p-4 border rounded shadow-lg flex flex-col items-center justify-center">
            <img src={blog.image}
              className="w-full h-40 object-cover rounded mb-3"
              alt={blog.title}/>
            <h2 className="text-2xl font-semibold text-pink-600 overflow-hidden text-ellipsis"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
                maxHeight: "4.5em",}}>
              {blog.title}
            </h2>
            <p className="text-gray-500 text-xs mt-2 overflow-hidden text-ellipsis"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                maxHeight: "4.5em",
              }}>
              {blog.text}
            </p>
            <button
              onClick={() => openModal(blog)}
              className="bg-gray-300 text-black px-5 py-2 text-xs my-2 rounded hover:bg-gray-400">
              Show More
            </button>
          </div>
        ))}
      </div>
      {isModalOpen && selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white overflow-y-auto rounded-lg p-6 w-11/12 sm:w-2/3 lg:w-1/2 shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={closeModal}>
                ✖
            </button>
            <h2 className="text-2xl font-bold text-pink-600 mb-4">
              {selectedBlog.title}
            </h2>
            <img
              src={selectedBlog.image}
              alt={selectedBlog.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <p className="text-gray-700 text-sm mb-4">{selectedBlog.text}</p>
            <p className="text-pink-600 text-xs mb-2">
              Created at: {selectedBlog.createdAt}
            </p>
            <div className="flex justify-between mt-4">
              <div className="w-1/2 flex items-center justify-between">
                <span className="text-xs py-2 px-5 bg-pink-600 text-white rounded">
                  {selectedBlog.author}
                </span>
                <div  className="flex flex-row gap-2" >
                  <span
                    onClick={() =>
                      handleLike(
                        selectedBlog.id,
                        selectedBlog.likes,
                        selectedBlog.likedByMe
                      )
                    }
                    className="cursor-pointer">
                 {  selectedBlog.likedByMe ? <FcLike/> : <IoIosHeartEmpty/>}
                  </span>
                  <span className="text-sm text-gray-600">
                    {selectedBlog.likes || 0} likes
                  </span>  
                  {character === selectedBlog.id && (
                    <span>
                      <MdDelete
                        onClick={() => deleteBlog(selectedBlog.id)}
                        className="cursor-pointer text-red-600"/>
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={closeModal}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SportsPost;






