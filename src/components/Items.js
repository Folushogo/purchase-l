import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./Item.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Items() {
  const [category, setCategory] = useState("");
  const [formData, setFormData] = useState({});
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newFields, setNewFields] = useState([]);
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  const dataToSubmit = formData;

  try {
    await axios.post(`http://localhost:5000/add-item`, {
      category,
      newItem: dataToSubmit,
    });

    toast.success("Form submitted successfully!");
    setFormData({});
    // You may want to refresh categories here if needed
  } catch (error) {
    console.error("Error submitting form:", error);
    toast.error("Error submitting form!");
  }
};

  const handleAddNewCategory = () => {
    setShowNewCategoryModal(true);
  };

  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleNewFieldChange = (index, e) => {
    const newFieldsCopy = [...newFields];
    newFieldsCopy[index] = e.target.value;
    setNewFields(newFieldsCopy);
  };

  const handleAddField = () => {
    setNewFields([...newFields, ""]);
  };

  const handleNewCategorySubmit = async () => {
    if (newCategory && newFields.length) {
      try {
        const newCategoryObject = {
          name: newCategory,
          fields: [...new Set(newFields)], // Remove duplicate fields
        };
      
        setCategories([...categories, newCategoryObject]);
        setFormData({});
        
        toast.success("New category added successfully!");
        setShowNewCategoryModal(false);
        setNewCategory("");
        setNewFields([]);
      } catch (error) {
        console.error("Error adding new category:", error);
        toast.error("Error adding new category!");
      }
    } else {
      toast.error("Please provide category name and fields!");
    }
  };

  const renderInputs = () => {
    const selectedCategory = categories.find((cat) => cat.name === category);
    if (!selectedCategory) return null;

    return selectedCategory.fields.map((field, index) => (
      <div key={index}>
        <label htmlFor={field}>{field}*</label>
        <input
          type="text"
          id={field}
          name={field}
          placeholder={`Enter ${field}`}
          value={formData[field] || ""}
          required
          onChange={handleInputChange}
        />
      </div>
    ));
  };

  return (
    <div>
      <div className="App">
        <h1>ITEMS</h1>
        <h2>Inventory Log Book</h2>
        <fieldset>
          <form onSubmit={handleSubmit}>
            <select value={category} onChange={handleCategoryChange}>
              <option value="" disabled>Select a category</option>
              {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            {renderInputs()}
            <button type="submit">Submit</button>
          </form>
        </fieldset>
        <button onClick={handleAddNewCategory}>Add New Category</button>
        {showNewCategoryModal && (
          <>
    <div className="modal-background"></div>
          <div className="modal">
            <h2>Add New Category</h2>
            <div className="button-group">
              <button className="cancel-button" onClick={() => setShowNewCategoryModal(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <label>Category Name</label>
            <input
              type="text"
              id="newCategory"
              value={newCategory}
              onChange={handleNewCategoryChange}
            />
            <h3>Fields</h3>
            {newFields.map((field, index) => (
              <div key={index}>
                <label htmlFor={`field${index}`}>Field Name</label>
                <input
                  type="text"
                  id={`field${index}`}
                  value={field}
                  onChange={(e) => handleNewFieldChange(index, e)}
                />
              </div>
            ))}
            <button onClick={handleAddField}>Add Field</button>
            <button onClick={handleNewCategorySubmit}>Submit</button>
          </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Items;
