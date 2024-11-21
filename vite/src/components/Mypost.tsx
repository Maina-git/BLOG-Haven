import React, { useState } from 'react';

const Mypost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleAddPost = () => {
    console.log({ title, text });
  };

  return (
    <div className="p-10 flex flex-col justify-center items-center bg-gray-100 min-h-screen">
      <img
        className="w-1/2 rounded-md mb-6 shadow-lg"
        src="images/student-849821_1280.jpg"
        alt="Blog Post Placeholder"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "images/placeholder.jpg";
        }}/>
      <div className="flex flex-col w-full max-w-md justify-center items-center space-y-4">
        <input
          type="text"
          placeholder="Blog Title Goes Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 w-full border rounded-md outline-none text-5xl"
          aria-label="Blog Title"/>
        <textarea
          placeholder="Blog Text Goes Here"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="p-10 w-full border rounded-md text-2xl outline-none"
          rows={5}
          aria-label="Blog Content"/>
        <button
          onClick={handleAddPost}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add Post
        </button>
      </div>
    </div>
  );
};

export default Mypost;
