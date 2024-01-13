import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import imageArt from "../img/back1.png";
import Logo from "../img/Logo.png";
import { Link } from "react-router-dom";
import "./login.css";
import { useDispatch } from "react-redux/es/exports";
import { authActions } from "../../store";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://hub-4.vercel.app/auth/login", {
        email,
        password,
      });
      const data = response.data;
      console.log("Login response:", data);
      if (data && data.others && data.others._id) {
        console.log("Logged in Successfully");
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("id", data.others._id);
        sessionStorage.setItem("name", data.others.name);
        sessionStorage.setItem("email", data.others.email);
        sessionStorage.setItem("role", data.others.role);
        dispatch(authActions.login());
        navigate("/home");
        window.location.reload();
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error);
      } else {
        setError("Login failed. Please try again.");
      }
      console.error(err);
    }
  };

  const [isHoveredSignUp, setIsHoveredSignUp] = useState(false);
  const [isHoveredLogin, setIsHoveredLogin] = useState(false);

  const buttonStyle = {
    marginRight: "10px",
    borderRadius: "12px",
    color: "#000000",
    border: "2px solid transparent",
    transition: "border 0.3s",
    fontWeight: "500",
    fontSize: "1rem",
  };
  const buttonHoverStyle = {
    border: "2px solid #000000",
  };
  const cardNew = {
    width: "75%",
    paddingTop: "7%",
  };

  return (
    <div className="cardStyle">
      <nav className="navbar navbar-expand-lg navbar-light" style={{ top: 0 }}>
        <div className="BAR">
          <Link to="/" className="navbar-brand">
            <img
              src={Logo}
              style={{ height: "150%", marginLeft: "15%" }}
              alt="Logo"
            />
          </Link>
          <div className="d-flex">
            <ul
              className="navbar-nav"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <li className="nav">
                <Link
                  to="/register"
                  className="nav-link btn btn-outline rounded-10"
                  style={{
                    ...buttonStyle,
                    ...(isHoveredSignUp ? buttonHoverStyle : {}),
                  }}
                  onMouseEnter={() => setIsHoveredSignUp(true)}
                  onMouseLeave={() => setIsHoveredSignUp(false)}
                >
                  Signup
                </Link>
              </li>
              <li className="nav">
                <Link
                  to="/login"
                  className="nav-link btn btn-size-10 rounded-10"
                  style={{
                    ...buttonStyle,
                    ...(isHoveredLogin ? buttonHoverStyle : {}),
                  }}
                  onMouseEnter={() => setIsHoveredLogin(true)}
                  onMouseLeave={() => setIsHoveredLogin(false)}
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="blurredCardStyle mx-auto p-2 rounded-4 px-4">
        <div>
          <img src={imageArt} alt="" className="art" />
        </div>
        <div style={cardNew}>
          <h2
            className="d-flex justify-content-center align-items-center"
            style={{ color: "#262626", fontWeight: "550" }}
          >
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <div
                className="mb-1"
                style={{ color: "#262626", fontWeight: "550" }}
              >
                <label className="formLabel" htmlFor="email">
                  Email
                </label>
              </div>
              <div>
                <input
                  type="email"
                  autoComplete="off"
                  name="email"
                  className="inputStyle form-control rounded-3"
                  required
                  style={{ fontWeight: "520" }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-3">
              <div
                className="mb-1"
                style={{
                  color: "#262626",
                  fontWeight: "550",
                  display: "flex",
                  gap: "60px",
                }}
              >
                <label className="formLabel" htmlFor="email">
                  Password
                </label>
                <div className="showpass">
                  <div className="eyeicon">
                    <button
                      className="passbut"
                      onClick={(event) => handleShowPassword(event)}
                    >
                      {showPassword ? <FiEye /> : <FiEyeOff />}
                    </button>
                  </div>
                </div>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                style={{ fontWeight: "520" }}
                className="inputStyle form-control rounded-3"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-white">{error}</p>}
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn w-50 rounded-pill"
                style={{
                  backgroundColor: "#007697",
                  color: "#FFF",
                  marginTop: "5%",
                }}
              >
                Login
              </button>
            </div>
          </form>
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
