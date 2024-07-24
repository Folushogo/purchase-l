import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Inventory.css";
import "./Global.css";
import ReactPaginate from 'react-paginate';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCategoriesAndItems = async () => {
      try {
        const categoryResponse = await axios.get(`http://localhost:5001/categories`);
        const categoriesData = categoryResponse.data;
        console.log('Fetched Categories:', categoriesData); // Debugging line
        setCategories(categoriesData);

        const requests = categoriesData.map((category) =>
          axios.get(`http://localhost:5001/${category.name}`)
            .then((response) => {
              console.log(`Fetched Items for ${category.name}:`, response.data); // Debugging line
              return response.data.map((item) => ({ ...item, category: category.name }));
            })
            .catch((error) => {
              if (error.response && error.response.status === 404) {
                console.warn(`Category ${category.name} not found`);
                return [];
              } else {
                console.error(`Error fetching ${category.name}:`, error);
                return [];
              }
            })
        );

        const responses = await Promise.all(requests);
        const allItems = responses.flat();
        console.log('All Items:', allItems); // Debugging line

        // Filter out duplicates based on unique ID
        const uniqueItems = Array.from(new Map(allItems.map(item => [item.id, item])).values());
        setItems(uniqueItems);
      } catch (error) {
        console.error("Error fetching categories and items:", error);
      }
    };

    fetchCategoriesAndItems();
  }, []);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageItems = items.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const allFields = Array.from(new Set(categories.flatMap(category => category.fields)));

  return (
    <div>
      <div className="inventory-container">
        <h1>Inventory</h1>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Category</th>
              {allFields.map((field, index) => (
                <th key={index}>{field}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentPageItems.map((item, index) => (
              <tr key={index}>
                <td>{offset + index + 1}</td>
                <td>{item.category}</td>
                {allFields.map((field, fieldIndex) => (
                  <td key={fieldIndex}>{item[field] || ""}</td>
                ))}
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
