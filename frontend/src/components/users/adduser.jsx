import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";

let id = sessionStorage.getItem("id");
const AddUsers = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Password validation rules
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?& _])[A-Za-z\d@$!%*#?& _]{8,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters and include at least one letter, one number, and one special character"
      );
      return;
    }
    setError("");
    axios
      .post("https://hub4-back.vercel.app/auth/register", {
        name,
        email,
        password,
        role,
      })
      .then((result) => {
        setSuccessMessage("Registered successfully.");
        // Redirect to the login page
        navigate("/home/user");
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

  return (
    <div>
      <div className="addempcontainer">
        <div className="addempcontent rounded border">
          <h3 className="text-center">User</h3>
          <form className="addempform" onSubmit={handleSubmit}>
            <div className="addempgroup">
              <label htmlFor="inputName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="addemp form-control"
                id="inputName"
                placeholder="Enter Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="addempgroup">
              <label htmlFor="inputEmail4" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="addemp form-control"
                id="inputEmail4"
                placeholder="Enter Email"
                required
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="addempgroup">
              <div className="passwords">
                <label htmlFor="inputPassword4" className="form-label">
                  Password
                </label>
                <div className="showpassword">
                  <button onClick={(event) => handleShowPassword(event)}>
                    {showPassword ? <FiEye /> : <FiEyeOff />}
                  </button>
                </div>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="addemp form-control"
                id="inputPassword4"
                placeholder="Enter Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="addempgroup">
              <label htmlFor="category" className="form-label">
                Role
              </label>
              <select
                name="category"
                id="category"
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            {error && (
              <p className="text-danger fw-bold d-flex justify-content-center">
                {error}
              </p>
            )}
            {successMessage && (
              <p className="text-success fw-bold d-flex justify-content-center">
                {successMessage}
              </p>
            )}
            <div className="editempgroup">
              <button type="submit" className="editemp-save">
                Add
              </button>
              <button
                type="button"
                className="editemp-close"
                onClick={() => navigate("/home/user")}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUsers;
