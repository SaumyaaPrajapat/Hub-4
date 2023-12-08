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
  FaRegEdit,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../img/Logo.png";
import "../sidenavbar/sidenavbar.css";
import "./profile.css";
import { useDispatch } from "react-redux/es/exports";
import { authActions } from "../../store";

const Profile = () => {
  const [show, setShow] = useState(true);
  const [name, setUserName] = useState("");
  const [email, setUserEmail] = useState("");

  useEffect(() => {
    const storedName = sessionStorage.getItem("name");
    const storedEmail = sessionStorage.getItem("email");

    if (storedName) {
      setUserName(capitalizeFirstLetter(storedName));
    }
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Function to get the first letter of the name
  const getFirstLetter = (str) => {
    return str.charAt(0).toUpperCase();
  };

  const dispatch = useDispatch();
  const logout = () => {
    sessionStorage.clear("id");
    dispatch(authActions.logout());
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

        <div className="usercontainer">
          <h3 className="proname">{name || "user"}</h3>
          <div className="userc">
            <span>{getFirstLetter(name) || "."}</span>
          </div>
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
              <Link to="/home/employee" className="snav-link">
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
              <Link to="/" onClick={logout} className="snav-link">
                <FaHome className="react-icon" />
                <span className="nav-link-name">Homepage</span>
              </Link>
            </div>
          </div>
          <Link to="/login" onClick={logout} className="snav-link">
            <FaSignOutAlt className="react-icon" />
            <span className="nav-link-name">Logout</span>
          </Link>
        </nav>
      </aside>

      <div className="procontainer">
        <div className="procontent rounded border">
          <h3 className="text-center">Profile</h3>
          <form className="proform">
            <div className="circle-container">
              <div className="circle">
                <FaUserCircle className="profile" />
              </div>
            </div>
            <div className="progroup">
              <label htmlFor="name" className="form-label">
                <strong>Name:</strong>
              </label>
              <h3 className="pro">{name || "user"}</h3>
            </div>
            <div className="progroup">
              <label htmlFor="description" className="form-label">
                <strong>Email:</strong>
              </label>
              <h3 className="pro">{email || "userEmail"}</h3>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Profile;
