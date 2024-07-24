import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Items from "./components/Items";
import Navbar from "./components/Navbar"; // Import the Navbar component
import Inventory from "./components/Inventory";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar /> {/* Place Navbar here */}
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/items" element={<Items />} />
              <Route path="/about" element={<About />} />
              <Route path="/inventory" element={<Inventory />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
