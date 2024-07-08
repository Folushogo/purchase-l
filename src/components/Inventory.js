import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Inventory.css";
import "./Global.css";
import ReactPaginate from 'react-paginate';

function Inventory() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

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

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageItems = items.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  return (
    <div>
      
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
            {currentPageItems.map((item, index) => (
              <tr key={index}>
                <td>{offset + index + 1}</td>
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
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}

export default Inventory;
