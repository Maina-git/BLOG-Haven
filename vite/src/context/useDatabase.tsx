import React, { createContext, useContext } from "react";
import { db } from "../config/Firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";


interface DatabaseContextProps {
  addBlog: (title: string, text: string, category: string) => Promise<void>;
  getBlogsByCategory: (category: string) => Promise<any[]>;
}


const DatabaseContext = createContext<DatabaseContextProps | undefined>(
  undefined
);


export const DatabaseProvider: React.FC = ({ children }) => {
  const addBlog = async (title: string, text: string, category: string) => {
    try {
      const docRef = await addDoc(collection(db, "blogs"), {
        title,
        text,
        category,
        createdAt: new Date(),
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

  return (
    <DatabaseContext.Provider value={{ addBlog, getBlogsByCategory }}>
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


