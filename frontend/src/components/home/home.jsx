import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://hub4-back.vercel.app/home")
      .then((result) => {
        console.log(result);
        if (result.data !== "Success") {
          //navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return <div>Dashboard</div>;
};

export default App;
