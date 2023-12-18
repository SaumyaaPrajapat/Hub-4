import React, { useState, useEffect } from "react";
import axios from "axios";
import SideNavbar from "../sidenavbar/sidenavbar";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://hub4-back.vercel.app/home")
      .then((result) => {
        console.log(result.data);
        if (result.data !== "Success") {
          setSuc("Successded OK");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <SideNavbar />
    </div>
  );
};

export default App;
