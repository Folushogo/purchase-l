import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./Categories.css";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

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

  const handleInputChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newCategory.trim() === "") {
      toast.error("Category name cannot be empty");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/categories", { name: newCategory });
      setCategories([...categories, response.data]);
      setNewCategory("");
      toast.success("Category added successfully!");
    } catch (error) {
     
    }
  };

  return (
    <div>
      <Navbar />
      <div className="App">
        <h1>Categories</h1>
        <h2>Add New Categories</h2>
        <ul className="categories-list">
          {categories.map((category, index) => (
            <li key={index} className="category-item">
              {category.name}
            </li>
          ))}
        </ul>
        <fieldset>
          <form onSubmit={handleSubmit}>
            <label htmlFor="newCategory">New Category</label>
            <input
              type="text"
              id="newCategory"
              name="newCategory"
              placeholder="Enter new category"
              value={newCategory}
              onChange={handleInputChange}
            />
            <button type="submit">Add Category</button>
          </form>
        </fieldset>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Categories;
