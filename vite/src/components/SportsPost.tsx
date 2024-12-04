import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/Firebase";
import { IoIosHeartEmpty } from "react-icons/io";
import { sportsInterface } from "../interface/SportsInterface";

interface Blog {
  author:string;
  id: string;
  title: string;
  text: string;
  category: string;
  image:string;
}

const SportsPost: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBlog(null);
    setIsModalOpen(false);
  };


  useEffect(() => {
    const fetchSportsBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const blogsCollection = collection(db, "blogs");
        const q = query(blogsCollection, where("category", "==", "Sports"));
        const querySnapshot = await getDocs(q);

        const sportsBlogs: Blog[] = querySnapshot.docs.map((doc) => {
          const randomIndex=Math.floor(Math.random()* sportsInterface.length);
          return {
          id: doc.id,
          ...doc.data(),
          image:sportsInterface[randomIndex].img,
          }
        }) as Blog[];
        setBlogs(sportsBlogs);
      } catch (err) {
        console.error("Error fetching culture blogs:", err);
        setError("Failed to fetch blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchSportsBlogs();
  }, []);

  if (loading) return <div className="w-full h-[80vh] flex  items-center justify-center">
  <div>
  <h1 className="text-pink-600 font-bold text-4xl">Loading...</h1>
  </div>
</div>;
if (error) return <div>Error404: {error}</div>;
  return (
    <div className="p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="p-4 border rounded shadow-lg  flex flex-col items-center justify-center">
            <img src={blog.image} alt="" />
            <h2 className="text-2xl font-semibold text-pink-600 overflow-hidden text-ellipsis"
             style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              maxHeight: "4.5em",
            }}
            >{blog.title}</h2>
            <p  className="text-gray-500 text-xs mt-2 overflow-hidden text-ellipsis"
                 style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                  maxHeight: "4.5em",
                }}>{blog.text}</p>
            <button onClick={()=>openModal(blog)} className="bg-gray-300 text-black px-5 py-2 text-xs my-2">Show More</button>
            </div>
        ))}
      </div>
      {isModalOpen && selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-11/12 sm:w-2/3 lg:w-1/2 shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={closeModal}>✖</button>
            <h2 className="text-2xl font-bold text-pink-600 mb-4">
              {selectedBlog.title}
            </h2>
            <img src={selectedBlog.image}
              alt={selectedBlog.title}
              className="w-full h-48 object-cover rounded mb-4"/>
            <p className="text-gray-700 text-sm">{selectedBlog.text}</p>
            <div className="flex justify-between mt-4">
              <div className="w-1/2 p-auto flex justify-between">
                <span className="text-xs py-2 px-5 bg-pink-600 text-white rounded">
                  {selectedBlog.author}
                </span>
                <span className="p-auto cursor-pointer">
                  <IoIosHeartEmpty className="text-pink-600 text-3xl" />
                </span>
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