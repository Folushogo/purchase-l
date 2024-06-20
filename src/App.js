

import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";

import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Inventory from "./components/Inventory";
import Items from "./components/Items";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Routes>
                        <Route
                            path="/"
                            element={<Home />}
                        ></Route>
                        <Route
                            path="/items"
                            element={<Items />}
                        ></Route>
                        <Route
                            path="/about"
                            element={<About />}
                        ></Route>
                        <Route
                            path="/Inventory"
                            element={<Inventory />}
                        ></Route>
                    </Routes>
                </div>
            </Router>       
  )
    }
}

export default App;
