import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../config/Firebase";
import { IoIosHeartEmpty } from "react-icons/io";
import { ItInterface } from "../interface/ITinterface";
import { doc } from "firebase/firestore/lite";

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

const ITPost: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal for detailed blog view
  const openModal = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setSelectedBlog(null);
    setIsModalOpen(false);
  };

  // Handle like functionality
  const handleLike = async (id: string, likes: number, likedByMe: boolean) => {
    const currentLikes = Number(likes) || 0; // Ensure likes is a valid number
    const updatedBlogs = blogs.map((blog) =>
      blog.id === id
        ? {
            ...blog,
            likes: likedByMe ? Math.max(0, currentLikes - 1) : currentLikes + 1,
            likedByMe: !likedByMe,
          }
        : blog
    );
    setBlogs(updatedBlogs);

    try {
      const blogRef = doc(db, "blogs", id);
      await updateDoc(blogRef, {
        likes: likedByMe ? Math.max(0, currentLikes - 1) : currentLikes + 1,
      });
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  // Fetch blogs on component mount
  useEffect(() => {
    const fetchITBlogs = async () => {
      setLoading(true);
      setError(null);

      const timeout = setTimeout(() => {
        setError("Request timeout. Please try again later.");
        setLoading(false);
      }, 10000);

      try {
        const blogsCollection = collection(db, "blogs");
        const q = query(blogsCollection, where("category", "==", "IT & Tech"));
        const querySnapshot = await getDocs(q);
        clearTimeout(timeout);

        const ITBlogs: Blog[] = querySnapshot.docs.map((doc) => {
          const randomIndex = Math.floor(Math.random() * ItInterface.length);
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt
              ? new Date(data.createdAt.seconds * 1000).toLocaleString()
              : "Unknown",
            image: ItInterface[randomIndex]?.img || "",
            likedByMe: false,
            likes: data.likes || 0, // Ensure likes defaults to 0
          };
        }) as Blog[];

        setBlogs(ITBlogs);
      } catch (err) {
        console.error("Error fetching IT blogs:", err);
        setError("Failed to fetch blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchITBlogs();
  }, []);

  // Loading and error states
  if (loading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <div>
          <h1 className="text-pink-600 font-bold text-4xl">Loading...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="text-black text-6xl">Error 404!</h1>
        <p className="text-black text-xs">Site cannot be reached</p>
      </div>
    );
  }

  return (
    <div className="p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="p-4 border rounded shadow-lg flex flex-col items-center justify-center"
          >
            <img
              src={blog.image}
              className="w-full h-40 object-cover rounded mb-3"
              alt={blog.title}
            />
            <h2
              className="text-2xl font-semibold text-pink-600 overflow-hidden text-ellipsis"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
                maxHeight: "4.5em",
              }}
            >
              {blog.title}
            </h2>
            <p
              className="text-gray-500 text-xs mt-2 overflow-hidden text-ellipsis"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                maxHeight: "4.5em",
              }}
            >
              {blog.text}
            </p>
            <button
              onClick={() => openModal(blog)}
              className="bg-gray-300 text-black px-5 py-2 text-xs my-2 rounded hover:bg-gray-400"
            >
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
              onClick={closeModal}
            >
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
              <div className="w-1/2 p-auto flex justify-between">
                <span className="text-xs py-2 px-5 bg-pink-600 text-white rounded">
                  {selectedBlog.author}
                </span>
                <div>
                  <span
                    onClick={() =>
                      handleLike(
                        selectedBlog.id,
                        selectedBlog.likes,
                        selectedBlog.likedByMe
                      )
                    }
                    className="cursor-pointer"
                  >
                    <IoIosHeartEmpty
                      className={`text-3xl ${
                        selectedBlog.likedByMe ? "text-red-600" : "text-pink-600"
                      }`}
                    />
                  </span>
                  <span className="text-sm text-gray-600">
                    {selectedBlog.likes} likes
                  </span>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ITPost;