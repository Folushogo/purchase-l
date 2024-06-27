import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const addCategory = async (name) => {
    try {
      const response = await axios.post("http://localhost:5000/categories", { name });
      setCategories((prevCategories) => [...prevCategories, response.data]);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <CategoryContext.Provider value={{ categories, addCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;
