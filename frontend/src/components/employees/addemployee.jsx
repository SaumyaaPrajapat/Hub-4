import React, { useEffect, useState } from "react";
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
import "./addemployee.css";
import { useDispatch } from "react-redux/es/exports";
import { authActions } from "../../store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

let id = sessionStorage.getItem("id");
const AddEmployee = () => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const [name, setUserName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

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

  const [categories, setCategories] = useState([]);
  const [allCategories, setAllCategories] = useState(null);
  //get categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `https://hub4-back.vercel.app/category/${id}`
      );
      if (response.data.categories && response.data.categories.length > 0) {
        setAllCategories(response.data.categories);
        setCategories(response.data.categories);
      } else {
        console.log("No categories found or empty response.");
      }
    } catch (error) {
      console.error("Error");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [allCategories]);
  // Check if categories is defined before mapping
  const categoriesList = categories || [];

  //add employee
  const submitForm = async (e) => {
    e.preventDefault();
    const name = document.getElementById("inputName").value;
    const email = document.getElementById("inputEmail4").value;
    const password = document.getElementById("inputPassword4").value;
    const address = document.getElementById("inputAddress").value;
    const salary = document.getElementById("inputSalary").value;
    const categorys = document.getElementById("category").value;
    const formData = {
      name,
      email,
      password,
      address,
      salary,
      categorys,
      id: id,
    };

    try {
      const response = await axios.post(
        "https://hub4-back.vercel.app/add_employee",
        formData
      );
      console.log(response.data); // Log the response from the server
      toast.success("Added successfully!");
      // Optionally, you can navigate to a different page or update the UI based on the response.
      navigate("/home/employee");
    } catch (error) {
      console.error("Error");
      toast.error("Error in adding. Please try again.");
      navigate("/home/employee");
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

      <ToastContainer />
      <div className="addempcontainer">
        <div className="addempcontent rounded border">
          <h3 className="text-center">Add Employee</h3>
          <form className="addempform" onSubmit={submitForm}>
            <div className="addempgroup">
              <label htmlFor="inputName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="addemp form-control"
                id="inputName"
                placeholder="Enter Name"
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
              />
            </div>
            <div className="addempgroup">
              <label htmlFor="inputSalary" className="form-label">
                Salary
              </label>
              <input
                type="text"
                className="addemp form-control"
                id="inputSalary"
                placeholder="Enter Salary"
                autoComplete="off"
              />
            </div>
            <div className="addempgroup">
              <label htmlFor="inputAddress" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="addemp form-control"
                id="inputAddress"
                placeholder="1234 Main St"
                autoComplete="off"
              />
            </div>
            <div className="addempgroup">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select name="category" id="category" className="form-select">
                {categoriesList.map((c) => {
                  return <option value={c.id}>{c.name}</option>;
                })}
              </select>
            </div>
            <div className="editempgroup">
              <button type="submit" className="editemp-save">
                Add
              </button>
              <button
                type="submit"
                className="editemp-close"
                onClick={() => navigate("/home/employee")}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddEmployee;
