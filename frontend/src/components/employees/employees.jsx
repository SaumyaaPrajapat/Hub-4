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
import { Link, useNavigate } from "react-router-dom";
import Logo from "../img/Logo.png";
import "../sidenavbar/sidenavbar.css";
import "./employee.css";
import { useDispatch } from "react-redux/es/exports";
import { authActions } from "../../store";

let id = sessionStorage.getItem("id");
const Employees = () => {
  const [show, setShow] = useState(true);
  const [employees, setEmployee] = useState([]);
  const [name, setUserName] = useState("");
  const [allEmployees, setAllEmployees] = useState(null);

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

  //get employee
  const fetchEmployee = async () => {
    try {
      const response = await axios.get(
        `https://hub4-back.vercel.app/employee/${id}`
      );
      if (response.data.employees && response.data.employees.length > 0) {
        setAllEmployees(response.data.employees);
        setEmployee(response.data.employees);
      } else {
        console.log("No employees found or empty response.");
      }
    } catch (error) {
      console.error("Error");
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [allEmployees]);

  //delete employee
  const deleteEmployee = async (employeeId) => {
    try {
      // Send a delete request to the backend
      const response = await axios.delete(
        `https://hub4-back.vercel.app/delete_employee/${employeeId}`
      );

      if (response.data.Status) {
        // If the delete operation is successful, update the employee list
        const updatedEmployees = employees.filter((e) => e._id !== employeeId);
        setEmployee(updatedEmployees);
      } else {
        alert(response.data.Error);
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const dispatch = useDispatch();
  const logout = () => {
    sessionStorage.clear("id");
    dispatch(authActions.logout());
  };

  // Check if employees is defined before mapping
  const employeesList = employees || [];

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

      <div className="empcontainer">
        <div className="empheader">
          <h3>Employee List</h3>
        </div>
        <div className="empcenter">
          <div class="empcustom-content">
            <div className="emptask">
              <Link to="/home/employee/add" className="emp-btn btn-9">
                <span>Add Employee</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="emptable-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Salary</th>
                <th>Address</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employeesList.map((e) => (
                <tr key={e._id}>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.salary}</td>
                  <td>{e.address}</td>
                  <td>{e.category}</td>
                  <td>
                    <button className="btn btn-info btn-sm me-2">Edit</button>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => deleteEmployee(e._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Employees;
