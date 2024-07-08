import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Inventory from "./components/Inventory";
import Items from "./components/Items";
import Categories from "./components/Categories";
import Navbar from "./components/Navbar"; // Import the Navbar component
import { CategoryProvider } from "./Context/CategoryContext";

class App extends Component {
  render() {
    return (
      <CategoryProvider>
        <Router>
          <div className="App">
            <Navbar /> {/* Place Navbar here */}
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/items" element={<Items />} />
                <Route path="/about" element={<About />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/categories" element={<Categories />} />
              </Routes>
            </div>
          </div>
        </Router>
      </CategoryProvider>
    );
  }
}

export default App;
