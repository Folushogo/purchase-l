import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { CategoryContext } from "../Context/CategoryContext";
import 'react-toastify/dist/ReactToastify.css';
import "./Item.css";

function Items() {
  const { categories } = useContext(CategoryContext);
  const [category, setCategory] = useState(categories[0].name);
  const [formData, setFormData] = useState({});

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/${category}`);
        setData((prevData) => ({
          ...prevData,
          [category]: response.data,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [category]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = formData[category];

    const config = {
      method: "POST",
      url: `http://localhost:5000/${category}`,
      data: JSON.stringify(dataToSubmit),
      headers: { "Content-Type": "text/plain" },
    };
    try {
      const response = await axios(config);
      console.log(response.data);

      toast.success("Form submitted successfully!");

      setFormData((prevData) => ({
        ...prevData,
        [category]: {},
      }));

      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/${category}`);
          setData((prevData) => ({
            ...prevData,
            [category]: response.data,
          }));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();

    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form!");
    }
  };

  const renderInputs = () => {
    const currentCategory = categories.find(cat => cat.name === category);
    return currentCategory?.fields.map((field, index) => (
      <label key={index} htmlFor={field}>
        {field.charAt(0).toUpperCase() + field.slice(1)}*
        <input
          type="text"
          id={field}
          name={field}
          placeholder={`Enter ${field}`}
          value={formData[category]?.[field] || ""}
          required
          onChange={handleInputChange}
        />
      </label>
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
              {categories.map((cat, index) => (
                <option key={index} value={cat.name}>
                  {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                </option>
              ))}
            </select>
            {renderInputs()}
            <button type="submit">Submit</button>
          </form>
        </fieldset> 
      </div>
      <ToastContainer />
    </div>
  );
}

export default Items;
