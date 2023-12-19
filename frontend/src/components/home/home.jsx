import React, { useState, useEffect } from "react";
import axios from "axios";
import SideNavbar from "../sidenavbar/sidenavbar";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("https://hub4-back.vercel.app/home")
      .then((res) => {
        console.log(res);
        if (res.data !== "Success") {
          //navigate("/login");
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
