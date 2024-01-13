import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import "./sidenavbar.css";
import noData from "../img/nodata.png";

let id = sessionStorage.getItem("id");
const SideNavbar = () => {
  const [userId, setUserId] = useState(null);
  const [employees, setEmployee] = useState([]);
  const [name, setUserName] = useState("");
  const [allEmployees, setAllEmployees] = useState(null);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const employeeCount = (id) => {
    axios
      .get(`https://hub-4.vercel.app/employee/employee_count/${id}`)
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
      .get(`https://hub-4.vercel.app/employee/total_salary/${id}`)
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

  useEffect(() => {
    employeeCount();
    fetchSalaryTotal();
  }, []);

  //get employee
  const fetchEmployee = async () => {
    try {
      const response = await axios.get(
        `https://hub-4.vercel.app/employee/employee/${id}`
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

  return (
    <div>
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
                  {employeesList.length > 0 ? (
                    employeesList.map((e) => (
                      <tr key={e._id}>
                        <td>{e.name}</td>
                        <td>{e.email}</td>
                        <td>{e.salary}</td>
                        <td>{e.address}</td>
                        <td>{e.categorys}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">
                        <div className="no-data-message">
                          <img src={noData} alt="" className="nodata" />
                          <p className="no-data-text">
                            No employees found. Add new employees from employees
                            page.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
