import React, { useState, useContext } from 'react';
import { CategoryContext } from '../Context/CategoryContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Categories.css';

const Categories = () => {
  const { categories, addCategory } = useContext(CategoryContext);
  const [categoryName, setCategoryName] = useState('');
  const [fields, setFields] = useState(['']);

  // Debugging: Check the type of categories
  console.log('Categories:', categories);
  console.log('Type of categories:', typeof categories);
  console.log('Is categories an array?', Array.isArray(categories));

  const handleFieldChange = (index, value) => {
    const newFields = [...fields];
    newFields[index] = value;
    setFields(newFields);
  };

  const addField = () => {
    setFields([...fields, '']);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = { name: categoryName, fields };
    addCategory(newCategory);
    toast.success("Category added successfully!");
    setCategoryName('');
    setFields(['']);
  };

  return (
    <div>
      <h1>Categories</h1>
      <form onSubmit={handleSubmit} className="category-form">
        <label>
          Category Name:
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </label>
        Fields:
        {fields.map((field, index) => (
          <div key={index} className="field-group">
            <label>
              Field {index + 1}:
              <input
                type="text"
                value={field}
                onChange={(e) => handleFieldChange(index, e.target.value)}
                required
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={addField}>
          Add Field
        </button>
        <button type="submit">Add Category</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Categories;
