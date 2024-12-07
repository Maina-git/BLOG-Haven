import React, { useState, useEffect } from "react";
import { useDatabase } from "../context/useDatabase";

const Mypost: React.FC = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { addBlog } = useDatabase();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(timer); 
    }
  }, [success]);

  const handleAddPost = async () => {
    if (!author || !title || !text || !category) {
      setError("Please fill out all fields and select a category.");
      setLoading(false); 
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await addBlog(author, title, text, category);
      setAuthor("");
      setTitle("");
      setText("");
      setCategory("");
      setSuccess(true);
    } catch (e) {
      console.error("Failed to add blog: ", e);
      setError("Failed to add blog. Please try again.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="w-full min-h-screen p-5 md:p-10 bg-gray-100 flex flex-col items-center">
      {success && (
        <div className="fixed top-10 px-5 py-2 bg-green-500 rounded-md text-white text-center shadow-lg z-50">
          Blog added successfully!
        </div>
      )}
      <div style={{scrollbarWidth:"none", overflowY:"scroll"}} className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10 w-full max-w-4xl">
        <img
          className="w-full md:w-1/2 max-w-md rounded-md shadow-lg"
          src="images/student-849821_1280.jpg"
          alt="Blog Post Placeholder"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "images/placeholder.jpg";}}/>
          <div className="flex flex-col w-full max-w-md space-y-4">
          {error && (
            <div className="text-red-600 bg-red-100 border border-red-400 p-2 rounded-md text-center">
              {error}
            </div>
            )}
          <div className="flex flex-wrap gap-5 justify-center">
            {["Culture", "Sports", "Growth", "IT & Tech"].map((cat) => (
              <label
                key={cat}
                className="flex gap-2 items-center text-blue-600 cursor-pointer">
                <input type="radio"
                  name="category"
                  value={cat}
                  checked={category === cat}
                  onChange={(e) => setCategory(e.target.value)}
                  className="cursor-pointer"/>
                {cat}
              </label>
            ))}
          </div>
          <input type="text"
            placeholder="Add your name or nickname as the Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="p-2 w-full border rounded-md outline-none text-sm md:text-base focus:ring-2 focus:ring-blue-400"/>
          <input type="text"
            placeholder="Blog Title Goes Here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 w-full border rounded-md outline-none text-base md:text-lg focus:ring-2 focus:ring-blue-400"/>

          <textarea placeholder="Blog Text Goes Here"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="p-2 w-full border rounded-md text-sm md:text-base outline-none focus:ring-2 focus:ring-blue-400"
            rows={5}/>

          <button onClick={handleAddPost}
            className={`px-4 py-2 rounded-md text-white w-full md:w-auto ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
            disabled={loading}>
            {loading ? "Posting..." : "Post Blog"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Mypost;















