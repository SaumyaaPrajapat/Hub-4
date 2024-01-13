import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./addemployee.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

let id = sessionStorage.getItem("id");
const AddEmployee = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

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
        "https://hub-4.vercel.app/employee/add_employee",
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

  return (
    <div>
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
                required
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
    </div>
  );
};

export default AddEmployee;
