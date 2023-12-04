import React, { useState, useEffect } from "react";
import axios from "axios";
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
import "./sidenavbar.css";

const SideNavbar = () => {
  const [show, setShow] = useState(true);

  const [adminTotal, setAdminTotal] = useState(0);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    adminCount();
  }, []);

  const adminCount = () => {
    axios.get("https://hub4-back.vercel.app/admin_count").then((result) => {
      if (result.data.Status) {
        setAdminTotal(result.data.Result[0].admin);
      }
    });
  };

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

      <div>
        <div className="container">
          <div className="flex-container">
            <div className="custom-box">
              <div className="custom-heading">
                <h4>Admin</h4>
              </div>
              <hr />
              <div className="flex-row">
                <h5>Total:</h5>
                <h5>{adminTotal}</h5>
              </div>
            </div>

            <div className="custom-box">
              <div className="custom-heading">
                <h4>Employee</h4>
              </div>
              <hr />
              <div className="flex-row">
                <h5>Total:</h5>
                <h5>employee total</h5>
              </div>
            </div>

            <div className="custom-box">
              <div className="custom-heading">
                <h4>Salary</h4>
              </div>
              <hr />
              <div className="flex-row">
                <h5>Total:</h5>
                <h5>$ salary total</h5>
              </div>
            </div>
          </div>

          <div className="mt-4 custom-section">
            <h3>List of Admins</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>name</td>
                  <td>email</td>
                  <td>
                    <button className="btn btn-info btn-sm me-2">Edit</button>
                    <button className="btn btn-warning btn-sm">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SideNavbar;
