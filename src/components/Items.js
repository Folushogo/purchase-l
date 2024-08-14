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
  const [otherFields, setOtherFields] = useState([]);
  const [allFields, setAllFields] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/categories`);
        const uniqueCategories = [...new Map(response.data.map(cat => [cat.name, cat])).values()];
        setCategories(uniqueCategories);

        const fieldsSet = new Set();
        response.data.forEach(cat => {
          cat.fields.forEach(field => fieldsSet.add(field));
        });
        setAllFields([...fieldsSet].map(field => ({ label: field, value: field })));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setFormData({}); // Clear form data when category changes
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

  if (!category) {
    toast.error("Please select a category!");
    return;
  }

  try {
    await axios.post(`http://localhost:5000/add-item`, {
      category,
      newItem: formData,
    });

    toast.success("Item added successfully!");
    setFormData({});
    setCategory("");
  } catch (error) {
    console.error("Error submitting form:", error);
    toast.error("Error adding item!");
  }
};



  const handleAddNewCategory = () => {
    setShowNewCategoryModal(true);
  };

  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleNewFieldChange = (selectedOptions) => {
    const newFieldsCopy = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setNewFields(newFieldsCopy);
  };

  const handleOtherFieldChange = (index, e) => {
    const newOtherFields = [...otherFields];
    newOtherFields[index] = e.target.value;
    setOtherFields(newOtherFields);
  };

  const addOtherField = () => {
    setOtherFields([...otherFields, ""]);
  };

  const handleNewCategorySubmit = async () => {
    if (newCategory && newFields.length) {
      try {
        const newCategoryObject = {
          name: newCategory,
          fields: [...new Set([...newFields, ...otherFields])],
        };
        await axios.post(`http://localhost:5001/categories`, newCategoryObject);

        setCategories([...categories, newCategoryObject]);
        setFormData({});
        
        toast.success("New category added successfully!");
        setShowNewCategoryModal(false);
        setNewCategory("");
        setNewFields([]);
        setOtherFields([]);
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
