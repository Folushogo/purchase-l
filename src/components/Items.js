import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./Item.css";

function Items() {
  const [category, setCategory] = useState("laptop");
  const [formData, setFormData] = useState({
    laptop: {},
    monitor: {},
    charger: {},
    printer: {},
    cartridge: {},
    cable: {},
  });

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
    console.log(dataToSubmit);

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
      // Show error toast notification
      toast.error("Error submitting form!");
    }
  };

  const renderInputs = () => {
    switch (category) {
      case "laptop":
        return (
          <>
            <label htmlFor="brand">Brand*</label>
            <input
              type="text"
              id="brand"
              name="brand"
              placeholder="Enter Brand"
              value={formData.laptop.brand || ""}
              required
              onChange={handleInputChange}
            />
            <label htmlFor="model">Model*</label>
            <input
              type="text"
              id="model"
              name="model"
              placeholder="Enter Model"
              value={formData.laptop.model || ""}
              required
              onChange={handleInputChange}
            />
            <label htmlFor="ram">RAM*</label>
            <input
              type="text"
              id="ram"
              name="ram"
              placeholder="Enter RAM"
              value={formData.laptop.ram || ""}
              required
              onChange={handleInputChange}
            />
            <label htmlFor="serialNumber">Serial Number*</label>
            <input
              type="text"
              id="serialNumber"
              name="serialNumber"
              placeholder="Enter Serial Number"
              value={formData.laptop.serialNumber || ""}
              required
              onChange={handleInputChange}
            />
            <label htmlFor="processor">Processor*</label>
            <input
              type="text"
              id="processor"
              name="processor"
              placeholder="Enter Processor"
              value={formData.laptop.processor || ""}
              required
              onChange={handleInputChange}
            />
            <label htmlFor="hdd">HDD*</label>
            <input
              type="text"
              id="hdd"
              name="hdd"
              placeholder="Enter HDD"
              value={formData.laptop.hdd || ""}
              required
              onChange={handleInputChange}
            />
          </>
        );
      case "monitor":
        return (
          <>
            <label htmlFor="brand">Brand*</label>
            <input
              type="text"
              id="brand"
              name="brand"
              placeholder="Enter Brand"
              value={formData.monitor.brand || ""}
              required
              onChange={handleInputChange}
            />
            <label htmlFor="model">Model*</label>
            <input
              type="text"
              id="model"
              name="model"
              placeholder="Enter Model"
              value={formData.monitor.model || ""}
              required
              onChange={handleInputChange}
            />
            <label htmlFor="serialNumber">Serial Number*</label>
            <input
              type="text"
              id="serialNumber"
              name="serialNumber"
              placeholder="Enter Serial Number"
              value={formData.monitor.serialNumber || ""}
              required
              onChange={handleInputChange}
            />
            <label htmlFor="screenSize">Screen Size*</label>
            <input
              type="text"
              id="screenSize"
              name="screenSize"
              placeholder="Enter Screen Size"
              value={formData.monitor.screenSize || ""}
              required
              onChange={handleInputChange}
            />
          </>
        );
      case "charger":
        return (
          <>
            <label htmlFor="brand">Brand*</label>
            <input
              type="text"
              id="brand"
              name="brand"
              placeholder="Enter Brand"
              value={formData.charger.brand || ""}
              required
              onChange={handleInputChange}
            />
            <label htmlFor="voltage">Voltage*</label>
            <input
              type="text"
              id="voltage"
              name="voltage"
              placeholder="Enter Voltage"
              value={formData.charger.voltage || ""}
              required
              onChange={handleInputChange}
            />
            <label htmlFor="adapter">Adapter*</label>
            <input
              type="text"
              id="adapter"
              name="adapter"
              placeholder="Enter Adapter"
              value={formData.charger.adapter || ""}
              required
              onChange={handleInputChange}
            />
            <label htmlFor="serialNumber">Serial Number*</label>
            <input
              type="text"
              id="serialNumber"
              name="serialNumber"
              placeholder="Enter Serial Number"
              value={formData.charger.serialNumber || ""}
              required
              onChange={handleInputChange}
            />
            <label htmlFor="port">Port*</label>
            <input
              type="text"
              id="port"
              name="port"
              placeholder="Enter Port"
              value={formData.charger.port || ""}
              required
              onChange={handleInputChange}
            />
          </>
        );
      case "printer":
        return (
          <>
            <label htmlFor="brand">Brand*</label>
            <input
              type="text"
              id="brand"
              name="brand"
              placeholder="Enter Brand"
              value={formData.printer.brand || ""}
              required
              onChange={handleInputChange}
            />
            <label htmlFor="ram">RAM*</label>
            <input
              type="text"
              id="ram"
              name="ram"
              placeholder="Enter RAM"
              value={formData.printer.ram || ""}
              required
              onChange={handleInputChange}
            />
            <label htmlFor="serialNumber">Serial Number*</label>
            <input
              type="text"
              id="serialNumber"
              name="serialNumber"
              placeholder="Enter Serial Number"
              value={formData.printer.serialNumber || ""}
              required
              onChange={handleInputChange}
            />
            <label htmlFor="hdd">HDD*</label>
            <input
              type="text"
              id="hdd"
              name="hdd"
              placeholder="Enter HDD"
              value={formData.printer.hdd || ""}
              required
              onChange={handleInputChange}
            />
          </>
        );
      case "cartridge":
        return (
          <>
            <label htmlFor="brand">Brand*</label>
            <input
              type="text"
              id="brand"
              name="brand"
              placeholder="Enter Brand"
              value={formData.cartridge.brand || ""}
              required
              onChange={handleInputChange}
            />
            <label htmlFor="serialNumber">Serial Number*</label>
            <input
              type="text"
              id="serialNumber"
              name="serialNumber"
              placeholder="Enter Serial Number"
              value={formData.cartridge.serialNumber || ""}
              required
              onChange={handleInputChange}
            />
            <label htmlFor="inkColor">Ink Color*</label>
            <input
              type="text"
              id="inkColor"
              name="inkColor"
              placeholder="Enter Ink Color"
              value={formData.cartridge.inkColor || ""}
              required
              onChange={handleInputChange}
            />
          </>
        );
      case "cable":
        return (
          <>
            <label htmlFor="brand">Brand*</label>
            <input
              type="text"
              id="brand"
              name="brand"
              placeholder="Enter Brand"
              value={formData.cable.brand || ""}
              required
              onChange={handleInputChange}
            />
            <label htmlFor="cableType">Cable Type*</label>
            <input
              type="text"
              id="cableType"
              name="cableType"
              placeholder="Enter Cable Type"
              value={formData.cable.cableType || ""}
              required
              onChange={handleInputChange}
            />
            <label htmlFor="port">Port*</label>
            <input
              type="text"
              id="port"
              name="port"
              placeholder="Enter Port"
              value={formData.cable.port || ""}
              required
              onChange={handleInputChange}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="App">
        <h1>ITEMS</h1>
        <h2>Inventory Log Book</h2>
        <fieldset>
          <form onSubmit={handleSubmit}>
            <select value={category} onChange={handleCategoryChange}>
              <option value="laptop">Laptop</option>
              <option value="monitor">Monitor</option>
              <option value="charger">Laptop Charger</option>
              <option value="printer">Printer</option>
              <option value="cartridge">Printer Cartridge</option>
              <option value="cable">Cable</option>
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
