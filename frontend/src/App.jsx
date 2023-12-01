import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./components/signup/signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Forgot from "./components/login/forgotpass";
import FirstPage from "./components/firstpage/firstpage";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux/es/exports";
import { authActions } from "./store";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const id = sessionStorage.getItem("id");
    dispatch(authActions.login());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgotpass" element={<Forgot />}></Route>
        <Route path="/" element={<FirstPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
