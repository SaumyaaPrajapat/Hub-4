import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import imageArt from "../img/back1.png";
import Logo from "../img/Logo.png";
import "./signup.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmp, setConfPass] = useState();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = (event) => {
    event.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Password validation rules
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?& _])[A-Za-z\d@$!%*#?& _]{8,}$/;

    if (password !== confirmp) {
      setError("Passwords do not match");
      return;
    }
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters and include at least one letter, one number, and one special character"
      );
      return;
    }
    setError("");
    axios
      .post("https://hub-4.vercel.app/auth/register", {
        name,
        email,
        password,
      })
      .then((result) => {
        setSuccessMessage("Registered successfully.");
        // Redirect to the login page
        navigate("/login");
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setError(err.response.data.error); // Set the error message from the server response
        } else {
          setError("Registration failed. Please try again.");
        }
        console.log(err);
      });
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
        <div className="signimg">
          <img src={imageArt} alt="" className="art" />
        </div>
        <div style={cardNew}>
          <h2
            className="d-flex justify-content-center align-items-center"
            style={{ color: "#262626", fontWeight: "550" }}
          >
            Create an account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <div
                className="mb-1"
                style={{ color: "#262626", fontWeight: "550" }}
              >
                <label className="formLabel" htmlFor="name">
                  Name
                </label>
              </div>
              <input
                type="text"
                //placeholder="Enter Name"
                autoComplete="off"
                name="name"
                className="inputStyle form-control rounded-3"
                required
                style={{ fontWeight: "520" }}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <div className="mb-1">
                <label
                  className="formLabel"
                  htmlFor="email"
                  style={{ color: "#262626", fontWeight: "550" }}
                >
                  Email
                </label>
              </div>
              <input
                type="email"
                //placeholder="Enter E-mail"
                autoComplete="off"
                name="email"
                className="inputStyle form-control rounded-3"
                required
                style={{ fontWeight: "520" }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <div className="mb-1" style={{ display: "flex", gap: "60px" }}>
                <label
                  className="formLabel"
                  htmlFor="password"
                  style={{ color: "#262626", fontWeight: "550" }}
                >
                  Password
                </label>
                <div className="showpass">
                  <button onClick={(event) => handleShowPassword(event)}>
                    {showPassword ? <FiEye /> : <FiEyeOff />}
                  </button>
                </div>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                //placeholder="Enter Password"
                name="password"
                className="inputStyle form-control rounded-3"
                style={{ fontWeight: "520" }}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <div className="mb-1" style={{ display: "flex", gap: "60px" }}>
                <label
                  className="formLabel"
                  htmlFor="confirmp"
                  style={{ color: "#262626", fontWeight: "550" }}
                >
                  Confirm Password
                </label>
                <div className="showpass">
                  <button onClick={(event) => handleShowConfirmPassword(event)}>
                    {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
                  </button>
                </div>
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                //placeholder="Confirm Password"
                name="confirmp"
                className="inputStyle form-control rounded-3"
                style={{ fontWeight: "520" }}
                required
                onChange={(e) => setConfPass(e.target.value)}
              />
            </div>
            <div className="mb-3">
              {error && (
                <p className="text-white fw-bold d-flex justify-content-center">
                  {error}
                </p>
              )}
              {successMessage && (
                <p className="text-white fw-bold d-flex justify-content-center">
                  {successMessage}
                </p>
              )}
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn rounded-pill"
                  style={{
                    width: "65%",
                    backgroundColor: "#007697",
                    color: "#FFF",
                  }}
                >
                  Register
                </button>
              </div>
            </div>
          </form>
          <p
            className="d-flex justify-content-center align-items-center mt-3"
            style={{ color: "#01648e" }}
          >
            Already have an account?&nbsp;
            <Link
              to="/login"
              style={{ color: " #FFF", textDecoration: "none" }}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
