import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
import "./category.css";
import "./addcategory.css";
import { useDispatch } from "react-redux/es/exports";
import { authActions } from "../../store";

let id = sessionStorage.getItem("id");
const AddCategory = () => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [name, setUserName] = useState("");

  useEffect(() => {
    const storedName = sessionStorage.getItem("name");

    if (storedName) {
      setUserName(capitalizeFirstLetter(storedName));
    }
  }, []);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  // Function to get the first letter of the name
  const getFirstLetter = (str) => {
    return str.charAt(0).toUpperCase();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://hub4-back.vercel.app/add_category",
        {
          name: categoryName,
          description: categoryDescription,
          id: id,
        }
      );
      console.log(response.data);
      navigate("/home/category");
    } catch (error) {
      console.error(error);
      navigate("/home/category");
    }
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

      <div className="addcatcontainer">
        <div className="addcatcontent rounded border">
          <h3 className="text-center">Add Category</h3>
          <form className="addcatform" onSubmit={handleSubmit}>
            <div className="addcatgroup">
              <label htmlFor="name" className="form-label">
                <strong>Name:</strong>
              </label>
              <input
                type="text"
                className="addcat form-control"
                id="name"
                placeholder="Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <div className="addcatgroup">
              <label htmlFor="description" className="form-label">
                <strong>Description:</strong>
              </label>
              <textarea
                id="description"
                className="addcat form-control"
                placeholder="Category Description"
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
                style={{ resize: "none" }}
              />
            </div>
            <div className="addcatgroup">
              <button type="submit" className="addcat-btn">
                Add Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddCategory;
