
import React, { useState } from "react";
import { useDatabase } from "../context/useDatabase";

const Mypost: React.FC = () => {
  const [author, setAuthor]=useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
 

  const { addBlog } = useDatabase();

  const handleAddPost = async () => {
    if (!author || !title || !text || !category) {
      setError("Please fill out all fields and select a category.");
      return;
    }

    try {
      await addBlog(author, title, text, category);
      setAuthor("");
      setTitle("");
      setText("");
      setCategory("");
      setError(null);
      console.log("Blog successfully added!");
    } catch (e) {
      console.error("Failed to add blog: ", e);
      setError("Failed to add blog. Please try again.");
    }
  };

  return (
    <div className="w-full p-6 md:p-10 flex flex-col md:flex-row justify-center items-center bg-gray-100 min-h-screen">
      <img className="w-full md:w-1/2 max-w-md rounded-md mb-6 shadow-lg md:mx-10"
        src="images/student-849821_1280.jpg"
        alt="Blog Post Placeholder"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "images/placeholder.jpg";
        }}/>

      <div className="flex flex-col w-full max-w-md justify-center items-center space-y-4">
        {error && (
          <div className="text-red-500 bg-red-100 border border-red-400 p-2 rounded-md w-full text-center">
            {error}
          </div>
        )}

        <div className="flex flex-wrap gap-5 my-5 justify-center">
          {["Culture", "Sports", "Growth"].map((cat) => (
            <span
              key={cat}
              className="flex gap-2 items-center text-blue-400 cursor-pointer">
              <input type="radio"
                id={cat.toLowerCase()}
                name="category"
                value={cat}
                checked={category === cat}
                onChange={(e) => setCategory(e.target.value)}
                className="cursor-pointer"/>
              <label htmlFor={cat.toLowerCase()}>{cat}</label>
            </span>
          ))}
        </div>
        <input type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="p-2 w-full border rounded-md outline-none text-xs md:text-2xl focus:ring-2 focus:ring-blue-400"/>

        <input type="text"
          placeholder="Blog Title Goes Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 w-full border rounded-md outline-none text-xl md:text-2xl focus:ring-2 focus:ring-blue-400"/>

        <textarea placeholder="Blog Text Goes Here"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="p-2 w-full border rounded-md text-base md:text-lg outline-none focus:ring-2 focus:ring-blue-400"
          rows={5}/>

        <button onClick={handleAddPost}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-auto">
          Add Post
        </button>
      </div>
    </div>
  );
};
export default Mypost;




















