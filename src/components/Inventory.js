import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "./Inventory.css";
import "./Global.css"; 

function Inventory() {
  const [items, setItems] = useState([]);

  const categories = [
    "laptop",
    "monitor",
    "charger",
    "printer",
    "cartridge",
    "cable",
  ];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const requests = categories.map((category) =>
          axios
            .get(`http://localhost:5000/${category}`)
            .then((response) =>
              response.data.map((item) => ({ ...item, category }))
            )
        );
        const responses = await Promise.all(requests);
        const allItems = responses.flat();
        setItems(allItems);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="inventory-container">
        <h1>Inventory</h1>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Model</th>
              <th>RAM</th>
              <th>Serial Number</th>
              <th>Processor</th>
              <th>HDD</th>
              <th>Screen Size</th>
              <th>Voltage</th>
              <th>Adapter</th>
              <th>Port</th>
              <th>Ink Color</th>
              <th>Cable Type</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.category}</td>
                <td>{item.brand}</td>
                <td>{item.model}</td>
                <td>{item.ram}</td>
                <td>{item.serialNumber}</td>
                <td>{item.processor}</td>
                <td>{item.hdd}</td>
                <td>{item.screenSize}</td>
                <td>{item.voltage}</td>
                <td>{item.adapter}</td>
                <td>{item.port}</td>
                <td>{item.inkColor}</td>
                <td>{item.cableType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;
