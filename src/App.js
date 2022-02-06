import React from "react";
import { Routes, Route/*, Link*/ } from "react-router-dom";

//Local imports
import "./App.css";
import Welcome from "./pages/Welcome";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
