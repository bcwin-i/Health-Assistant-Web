import React, { useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

//Local imports
import "./App.css";
import Welcome from "./pages/Welcome";
import Homepage from "./pages/Homepage";
import { useAuthState } from "./firebase";

function App() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthState();

  useEffect(() => {
    try {
      console.info("Registered user is : ", isAuthenticated?.email);
      isAuthenticated ? navigate("/homepage") : navigate("/");
    } catch (e) {
      console.error(e);
    }
  }, [isAuthenticated]);

  return (
    <div className="App">
      {isAuthenticated ? (
        <Routes>
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Welcome />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
