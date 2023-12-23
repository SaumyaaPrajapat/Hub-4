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
import "./sidenavbar.css";
import { useDispatch } from "react-redux/es/exports";
import { authActions } from "../../store";

let id = sessionStorage.getItem("id");
const SideNavbar = () => {
  const [show, setShow] = useState(true);
  const [userId, setUserId] = useState(null);
  const [adminTotal, setAdminTotal] = useState(0);
  const [admins, setAdmins] = useState([]);
  const [employees, setEmployee] = useState([]);
  const [name, setUserName] = useState("");
  const [allEmployees, setAllEmployees] = useState(null);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const navigate = useNavigate();

  const employeeCount = (id) => {
    axios
      .get(`https://hub4-back.vercel.app/employee_count/${id}`)
      .then((response) => {
        if (response.data.Status) {
          setEmployeeTotal(response.data.Result);
        } else {
          console.error("Failed to fetch employee count:", response.data.Error);
        }
      })
      .catch((error) => {
        console.error("Error");
      });
  };

  const fetchSalaryTotal = (id) => {
    axios
      .get(`https://hub4-back.vercel.app/total_salary/${id}`)
      .then((response) => {
        if (response.data.Status) {
          setSalaryTotal(Number(response.data.Result));
        } else {
          console.error("Failed to fetch salary total:", response.data.Error);
        }
      })
      .catch((error) => {
        console.error("Error fetching salary total:", error);
      });
  };

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("id");
    const storedName = sessionStorage.getItem("name");

    if (storedName) {
      setUserName(capitalizeFirstLetter(storedName));
    }
    if (storedUserId) {
      setUserId(storedUserId);
      employeeCount(storedUserId);
      fetchSalaryTotal(storedUserId);
    }
  }, []);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Function to get the first letter of the name
  const getFirstLetter = (str) => {
    return str.charAt(0).toUpperCase();
  };

  useEffect(() => {
    adminCount();
    employeeCount();
    AdminRecords();
    fetchSalaryTotal();
  }, []);

  const AdminRecords = () => {
    axios.get("https://hub4-back.vercel.app/admin_records").then((result) => {
      if (result.data.Status) {
        setAdmins(result.data.Result);
      } else {
        alert(result.data.Error);
      }
    });
  };

  function deleteAdmin(id) {
    fetch(`https://hub4-back.vercel.app/admin/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.Status) {
          // Remove the deleted admin from the state
          setAdmins(admins.filter((admin) => admin._id !== id));
          // Decrement the adminTotal by one
          setAdminTotal((prevTotal) => prevTotal - 1);
        } else {
          console.error("Failed to delete the admin:", data.Error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const adminCount = () => {
    axios.get("https://hub4-back.vercel.app/admin_count").then((result) => {
      if (result.data.Status) {
        setAdminTotal(result.data.Result);
      } else {
        console.error("Unexpected API response", result.data);
      }
    });
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
  // Check if employees is defined before mapping
  const employeesList = employees || [];

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
        <div
          className="usercontainer"
          onClick={() => navigate("/home/profile")}
        >
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

      <div>
        <div className="container">
          <div className="flex-container">
            <div className="custom-box">
              <div className="custom-headings">
                <div className="circles">
                  <FaUserCircle className="adminprofile" />
                </div>
                <h4>Admin</h4>
              </div>
              <hr />
              <div className="flex-row">
                <h5>Name:</h5>
                <h5>{name || "user"}</h5>
              </div>
            </div>

            <div className="custom-box">
              <div className="custom-heading">
                <h4>Employee</h4>
              </div>
              <hr />
              <div className="flex-row">
                <h5>Total:</h5>
                <h5>{employeeTotal}</h5>
              </div>
            </div>

            <div className="custom-box">
              <div className="custom-heading">
                <h4>Salary</h4>
              </div>
              <hr />
              <div className="flex-row">
                <h5>Total:</h5>
                <h5>${salaryTotal}</h5>
              </div>
            </div>
          </div>

          <div className="empcontainer">
            <div className="mt-4 custom-section">
              <h3>List of Employees</h3>
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
                  </tr>
                </thead>
                <tbody>
                  {employeesList.map((e) => (
                    <tr key={e._id}>
                      <td>{e.name}</td>
                      <td>{e.email}</td>
                      <td>{e.salary}</td>
                      <td>{e.address}</td>
                      <td>{e.categorys}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SideNavbar;
