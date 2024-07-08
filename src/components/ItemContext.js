import React, { createContext, useState } from 'react';

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState({});
  const [categories, setCategories] = useState([
    { name: 'laptop', fields: ['brand', 'model', 'ram', 'serialNumber', 'processor', 'hdd'] },
    { name: 'monitor', fields: ['brand', 'model', 'serialNumber', 'screenSize'] },
    { name: 'charger', fields: ['brand', 'voltage', 'adapter', 'serialNumber', 'port'] },
    { name: 'printer', fields: ['brand', 'ram', 'serialNumber', 'hdd'] },
    { name: 'cartridge', fields: ['brand', 'serialNumber', 'inkColor'] },
    { name: 'cable', fields: ['brand', 'cableType', 'port'] },
  ]);

  const addItem = (category, item) => {
    setItems((prevItems) => ({
      ...prevItems,
      [category]: [...(prevItems[category] || []), item],
    }));
  };

  const addCategory = (category) => {
    setCategories((prevCategories) => [...prevCategories, category]);
  };

  return (
    <ItemContext.Provider value={{ items, categories, addItem, addCategory }}>
      {children}
    </ItemContext.Provider>
  );
};
