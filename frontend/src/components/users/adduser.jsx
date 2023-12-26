import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

let id = sessionStorage.getItem("id");
const AddUsers = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="addempcontainer">
        <div className="addempcontent rounded border">
          <h3 className="text-center">User</h3>
          <form className="addempform">
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
              ></select>
            </div>
            <div className="addempgroup">
              <label htmlFor="category" className="form-label">
                Access
              </label>
              <select
                name="category"
                id="category"
                className="form-select"
              ></select>
            </div>
            <div className="editempgroup">
              <button type="submit" className="editemp-save">
                Add
              </button>
              <button
                type="submit"
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
