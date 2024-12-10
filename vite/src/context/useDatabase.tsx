import React, { createContext, useContext } from "react";
import { db } from "../config/Firebase";
import { auth } from "../config/Firebase";
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";

interface DatabaseContextProps {
  addBlog: (author: string, title: string, text: string, category: string) => Promise<void>;
  getBlogsByCategory: (category: string) => Promise<any[]>;
  deleteBlog: (blogId: string) => Promise<void>;
}

const DatabaseContext = createContext<DatabaseContextProps | undefined>(undefined);

export const DatabaseProvider: React.FC = ({ children }) => {
  const addBlog = async (author: string, title: string, text: string, category: string) => {
    try {
      const docRef = await addDoc(collection(db, "blogs"), {
        author,
        title,
        text,
        category,
        createdAt: new Date(),
        id:auth.currentUser?.email.charAt(0)
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getBlogsByCategory = async (category: string) => {
    try {
      const q = query(
        collection(db, "blogs"),
        where("category", "==", category)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (e) {
      console.error("Error fetching blogs: ", e);
      return [];
    }
  };

  const deleteBlog = async (blogId: string) => {
    try {
      const blogDoc = doc(db, "blogs", blogId);
      await deleteDoc(blogDoc);
      console.log("Document deleted with ID: ", blogId);
      alert("Blog will be deleted Soon");
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  return (
    <DatabaseContext.Provider value={{ addBlog, getBlogsByCategory, deleteBlog }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error("useDatabase must be used within a DatabaseProvider");
  }
  return context;
};

