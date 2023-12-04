import React, { useState } from "react";
import {
  MdPeople,
  MdDashboard,
  MdOutlineFormatListBulleted,
} from "react-icons/md";
import {
  FaAngleRight,
  FaAngleLeft,
  FaBars,
  FaUserCircle,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../img/Logo.png";
import "../sidenavbar/sidenavbar.css";
import "./addemployee.css";

const AddEmployee = () => {
  const [show, setShow] = useState(true);

  return (
    <main className={show ? "space-toggle" : null}>
      <header className={`header ${show ? "space-toggle" : null}`}>
        <div className="header-toggle" onClick={() => setShow(!show)}>
          {show ? (
            <FaAngleLeft className="react-icon" />
          ) : (
            <FaAngleRight className="react-icon" />
          )}
        </div>
      </header>
      <aside className={`sidebar ${show ? "show" : null}`}>
        <nav className="nav">
          <div>
            <Link to="/" className="snav-brand">
              <img
                src={Logo}
                style={{ height: "3rem" }}
                alt="Logo"
                className="react-icon"
              />
            </Link>
            <div className="nav-list">
              <Link to="/home" className="snav-link">
                <MdDashboard className="react-icon" />
                <span className="nav-link-name">Dashboard</span>
              </Link>
              <Link to="/home/employees" className="snav-link">
                <MdPeople className="react-icon" />
                <span className="nav-link-name">Employees</span>
              </Link>
              <Link to="/home/category" className="snav-link">
                <MdOutlineFormatListBulleted className="react-icon" />
                <span className="nav-link-name">Category</span>
              </Link>
              <Link to="/home/profile" className="snav-link">
                <FaUserCircle className="react-icon" />
                <span className="nav-link-name">Profile</span>
              </Link>
              <Link to="/" className="snav-link">
                <FaHome className="react-icon" />
                <span className="nav-link-name">Homepage</span>
              </Link>
            </div>
          </div>
          <Link to="/login" className="snav-link">
            <FaSignOutAlt className="react-icon" />
            <span className="nav-link-name">Logout</span>
          </Link>
        </nav>
      </aside>

      <div className="form-container">
        <div className="form-content rounded border">
          <h3 className="text-center">Add Employee</h3>
          <form className="form">
            <div className="form-group">
              <label htmlFor="inputName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                placeholder="Enter Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputEmail4" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                placeholder="Enter Email"
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword4" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword4"
                placeholder="Enter Password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputSalary" className="form-label">
                Salary
              </label>
              <input
                type="text"
                className="form-control"
                id="inputSalary"
                placeholder="Enter Salary"
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputAddress" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select name="category" id="category" className="form-select">
                <option>name</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <label className="form-label" htmlFor="inputGroupFile01">
                Select Image
              </label>
              <input
                type="file"
                className="form-control"
                id="inputGroupFile01"
                name="image"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="addemp-btn">
                Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddEmployee;
