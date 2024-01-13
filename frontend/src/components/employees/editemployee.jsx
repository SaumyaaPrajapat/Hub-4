import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../sidenavbar/sidenavbar.css";
import "./addemployee.css";
import "./editemployee.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

let id = sessionStorage.getItem("id");
const EditEmployee = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    salary: "",
    categorys: "",
  });

  const { employeeId } = useParams();

  const [categories, setCategories] = useState([]);
  const [allCategories, setAllCategories] = useState(null);
  //get categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `https://hub-4.vercel.app/category/category/${id}`
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

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `https://hub-4.vercel.app/employee/employee_s/${id}/${employeeId}`
        );
        setEmployeeData(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, [employeeId]);

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://hub-4.vercel.app/employee/update_employee/${employeeId}`,
        employeeData
      );
      navigate("/home/employee");
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div>
      <div className="addempcontainer">
        <div className="addempcontent rounded border">
          <h3 className="text-center">Edit Employee</h3>
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
                required
                value={employeeData.name}
                onChange={(e) => handleInputChange(e, "name")}
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
                value={employeeData.email}
                onChange={(e) => handleInputChange(e, "email")}
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
                value={employeeData.password}
                onChange={(e) => handleInputChange(e, "password")}
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
                required
                autoComplete="off"
                value={employeeData.salary}
                onChange={(e) => handleInputChange(e, "salary")}
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
                placeholder="ABC Apartments"
                required
                autoComplete="off"
                value={employeeData.address}
                onChange={(e) => handleInputChange(e, "address")}
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
                value={employeeData.categorys}
                onChange={(e) => handleInputChange(e, "categorys")}
              >
                {categoriesList.map((c) => {
                  return (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="editempgroup">
              <button type="submit" className="editemp-save">
                Save
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
    </div>
  );
};

export default EditEmployee;
