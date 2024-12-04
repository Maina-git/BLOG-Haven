
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/Firebase";
import { blogInterface } from "../interface/Blog";

interface Blog {
  id: string;
  title: string;
  text: string;
  image:string;
  category: string;
}
const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const blogsCollection = collection(db, "blogs");
        const querySnapshot = await getDocs(blogsCollection);
        const allBlogs: Blog[] = querySnapshot.docs.map((doc) => {
        const randomIndex=Math.floor(Math.random()*blogInterface.length);
        return {
          id: doc.id,
          ...doc.data(),
          image:blogInterface[randomIndex].img,
          };
        }) as Blog[];
        setBlogs(allBlogs);
      } catch (err) {
        console.error("Error fetching culture blogs:", err);
        setError("Failed to fetch blogs.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);
  if (loading)
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <div>
          <h1 className="text-pink-600 font-bold text-4xl">Loading...</h1>
        </div>
      </div>
    );
  if (error) return <div>Error404: {error}</div>;
  return (
    <div className="p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="p-4 border rounded shadow-lg flex flex-col items-center justify-center">
           <h1 className="text-2xl p-5 text-pink-600">{blog.category}</h1>
            <img src={blog.image}
              alt={blog.title}
              className="w-full h-40 object-cover rounded mb-3"/>
            <h2 className="text-2xl font-semibold text-pink-600 line-clamp-1"
            >{blog.title}</h2>
            <p className="text-gray-500 text-xs mt-2 line-clamp-3"
           >{blog.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Blogs;






