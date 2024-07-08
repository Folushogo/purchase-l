import React, { createContext, useState } from 'react';

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([
    { name: 'laptop', fields: ['brand', 'model', 'ram', 'serialNumber', 'processor', 'hdd'] },
    { name: 'monitor', fields: ['brand', 'model', 'serialNumber', 'screenSize'] },
    { name: 'charger', fields: ['brand', 'voltage', 'adapter', 'serialNumber', 'port'] },
    { name: 'printer', fields: ['brand', 'ram', 'serialNumber', 'hdd'] },
    { name: 'cartridge', fields: ['brand', 'serialNumber', 'inkColor'] },
    { name: 'cable', fields: ['brand', 'cableType', 'port'] },
  ]);

  const addCategory = (category) => {
    setCategories((prevCategories) => [...prevCategories, category]);
  };

  return (
    <CategoryContext.Provider value={{ categories, addCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
