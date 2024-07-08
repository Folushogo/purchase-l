// src/Components/ItemsDropdown.js
import React, { useContext } from 'react';
import { CategoryContext } from '../Context/CategoryContext';

const ItemsDropdown = () => {
  const { categories } = useContext(CategoryContext);

  return (
    <div>
      <label>
        Select Category:
        <select>
          {categories.map((category, index) => (
            <option key={index} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default ItemsDropdown;
