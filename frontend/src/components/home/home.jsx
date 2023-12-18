import React, { useState, useEffect } from "react";
import axios from "axios";
import SideNavbar from "../sidenavbar/sidenavbar";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const [suc, setSuc] = useState();
  useEffect(() => {
    const token = sessionStorage.getItem("token"); // get token from sessionStorage
    if (token) {
      axios
        .get("https://hub4-back.vercel.app/home", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          console.log(result);
          if (result.data === "Success") {
            setSuc("Successded OK");
          } else {
            navigate("/login");
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Token not available");
    }
  }, []);

  return (
    <div>
      <SideNavbar />
    </div>
  );
};

export default App;
