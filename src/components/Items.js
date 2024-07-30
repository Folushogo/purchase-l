import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
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
  const [allFields, setAllFields] = useState([]);
  const [otherFields, setOtherFields] = useState([]);

  // Fetch categories when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  // Function to fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/categories`);
      setCategories(response.data);
      const fields = new Set();
      response.data.forEach(category => {
        category.fields.forEach(field => fields.add(field));
      });
      setAllFields(Array.from(fields).map(field => ({ value: field, label: field })));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

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

    const dataToSubmit = { ...formData, id: Date.now().toString() };

    try {
      await axios.post(`http://localhost:5000/add-item`, {
        category,
        newItem: dataToSubmit,
      });

      toast.success("Form submitted successfully!");
      setFormData({});
      fetchCategories(); // Refresh categories to avoid stale dropdown data
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

  const handleNewFieldChange = (selectedOptions) => {
    setNewFields(selectedOptions.map(option => option.value));
  };

  const handleOtherFieldChange = (index, e) => {
    const value = e.target.value;
    setOtherFields((prevFields) => {
      const newFields = [...prevFields];
      newFields[index] = value;
      return newFields;
    });
  };

  const addOtherField = () => {
    setOtherFields((prevFields) => [...prevFields, ""]);
  };

  const handleNewCategorySubmit = async () => {
    if (newCategory && (newFields.length || otherFields.some(field => field.trim()))) {
      try {
        const existingCategory = categories.find(cat => cat.name === newCategory);
        if (!existingCategory) {
          const combinedFields = [...new Set([...newFields, ...otherFields.filter(field => field.trim())])];
          const newCategoryObject = {
            name: newCategory,
            fields: combinedFields, // Remove duplicate fields
          };
          await axios.post(`http://localhost:5001/categories`, newCategoryObject);

          fetchCategories(); // Re-fetch categories to include the new one

          toast.success("New category added successfully!");
          setShowNewCategoryModal(false);
          setNewCategory("");
          setNewFields([]);
          setOtherFields([]);
        } else {
          toast.error("Category already exists!");
        }
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
      <div key={`${category}-${field}-${index}`}>
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

  // Custom styles for react-select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: '2px solid #333',
      boxShadow: 'none',
      borderRadius: '4px',
      padding: '5px',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#e1e1e1',
      borderRadius: '4px',
      padding: '2px 6px',
      margin: '2px',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#333',
      fontWeight: 'bold',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#d9534f',
      cursor: 'pointer',
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '4px',
      marginTop: '5px',
      zIndex: 9999,
    }),
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
              <Select
                isMulti
                name="fields"
                options={allFields}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleNewFieldChange}
                styles={customStyles}
              />
              <button onClick={addOtherField}>Add Other Field</button>
              {otherFields.length > 0 && otherFields.map((field, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={field}
                    onChange={(e) => handleOtherFieldChange(index, e)}
                    placeholder="Enter new field"
                  />
                </div>
              ))}
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
