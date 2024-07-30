import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Inventory.css";
import "./Global.css";
import ReactPaginate from 'react-paginate';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [editItemId, setEditItemId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCategoriesAndItems = async () => {
      try {
        const categoryResponse = await axios.get(`http://localhost:5001/categories`);
        const categoriesData = categoryResponse.data;
        setCategories(categoriesData);

        const requests = categoriesData.map((category) =>
          axios.get(`http://localhost:5001/${category.name}`)
            .then((response) => {
              return response.data.map((item) => ({ ...item, category: category.name }));
            })
            .catch((error) => {
              if (error.response && error.response.status === 404) {
                return [];
              } else {
                console.error(`Error fetching ${category.name}:`, error);
                return [];
              }
            })
        );

        const responses = await Promise.all(requests);
        const allItems = responses.flat();
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

  const handleEditClick = (itemId) => {
    setEditItemId(itemId);
    const itemToEdit = items.find((item) => item.id === itemId);
    setEditFormData(itemToEdit);
  };

  const handleDeleteClick = async (itemId) => {
    try {
      const itemToDelete = items.find((item) => item.id === itemId);
      await axios.delete(`http://localhost:5001/${itemToDelete.category}/${itemId}`);
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`http://localhost:5001/${editFormData.category}/${editFormData.id}`, editFormData);
      setItems((prevItems) => prevItems.map((item) => (item.id === editFormData.id ? editFormData : item)));
      setEditItemId(null);
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="inventory-container">
      <h1>Inventory</h1>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Item Type</th>
            {allFields.map((field, index) => (
              <th key={index}>{field}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPageItems.map((item, index) => (
            <tr key={item.id}>
              <td>{offset + index + 1}</td>
              <td>{item.category}</td>
              {allFields.map((field, fieldIndex) => (
                <td key={fieldIndex}>
                  {editItemId === item.id ? (
                    <input
                      type="text"
                      name={field}
                      value={editFormData[field] || ""}
                      onChange={handleInputChange}
                    />
                  ) : (
                    item[field] || ""
                  )}
                </td>
              ))}
              <td>
                {editItemId === item.id ? (
                  <>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={() => handleDeleteClick(item.id)}>Delete</button>
                  </>
                ) : (
                  <button onClick={() => handleEditClick(item.id)}>Edit</button>
                )}
              </td>
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
  );
}

export default Inventory;
