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

const AddEmployee = () => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    salary: "",
    category_id: "",
  });
  useEffect(() => {
    axios
      .get("https://hub4-back.vercel.app/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        name: employee.name,
        email: employee.email,
        password: employee.password,
        address: employee.address,
        salary: employee.salary,
        category_id: employee.category_id,
      };

      const response = await axios.post(
        "https://hub4-back.vercel.app/add_employee",
        formData
      );

      if (response.data.Status) {
        navigate("/home/employees");
      } else {
        alert(response.data.Error);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while processing your request.");
    }
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

      <div className="addempcontainer">
        <div className="addempcontent rounded border">
          <h3 className="text-center">Add Employee</h3>
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
                value={employee.name}
                onChange={(e) =>
                  setEmployee({ ...employee, name: e.target.value })
                }
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
                value={employee.email}
                onChange={(e) =>
                  setEmployee({ ...employee, email: e.target.value })
                }
              />
            </div>
            <div className="addempgroup">
              <label htmlFor="inputPassword4" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="addemp form-control"
                id="inputPassword4"
                placeholder="Enter Password"
                value={employee.password}
                onChange={(e) =>
                  setEmployee({ ...employee, password: e.target.value })
                }
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
                value={employee.salary}
                onChange={(e) =>
                  setEmployee({ ...employee, salary: e.target.value })
                }
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
                value={employee.address}
                onChange={(e) =>
                  setEmployee({ ...employee, address: e.target.value })
                }
              />
            </div>
            <div className="addempgroup">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                name="category"
                id="category"
                className="form-select"
                value={employee.category_id}
                onChange={(e) =>
                  setEmployee({ ...employee, category_id: e.target.value })
                }
              >
                {category.map((c) => {
                  return <option value={c.id}>{c.name}</option>;
                })}
              </select>
            </div>
            <div className="addempgroup">
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
