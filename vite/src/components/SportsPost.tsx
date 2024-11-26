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

const SportsPost: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSportsBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const blogsCollection = collection(db, "blogs");
        const q = query(blogsCollection, where("category", "==", "Sports"));
        const querySnapshot = await getDocs(q);

        const sportsBlogs: Blog[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Blog[];

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

export default SportsPost;


