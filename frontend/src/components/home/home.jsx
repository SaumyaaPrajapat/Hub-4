import React, { useState, useEffect } from "react";
import axios from "axios";
import SideNavbar from "../../sidenavbar/sidenavbar";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const [navVisible, showNavbar] = useState(false);

  useEffect(() => {
    axios
      .get("https://hub4-back.vercel.app/home", { withCredentials: true })
      .then((result) => {
        console.log(result);
        if (result.data !== "Success") {
          //navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <SideNavbar visible={navVisible} show={showNavbar} />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route
            path="/dashboard"
            element={
              <div className={!navVisible ? "page" : "page page-with-navbar"}>
                <h1>Dashboard</h1>
              </div>
            }
          />
          <Route
            path="/manage-emp"
            element={
              <div className={!navVisible ? "page" : "page page-with-navbar"}>
                <h1>Manage Employees</h1>
              </div>
            }
          />
          <Route
            path="/category"
            element={
              <div className={!navVisible ? "page" : "page page-with-navbar"}>
                <h1>Category</h1>
              </div>
            }
          />
          <Route
            path="/profile"
            element={
              <div className={!navVisible ? "page" : "page page-with-navbar"}>
                <h1>Profile</h1>
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
