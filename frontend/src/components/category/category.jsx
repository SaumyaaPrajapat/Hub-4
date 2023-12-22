import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MdPeople,
  MdDashboard,
  MdOutlineFormatListBulleted,
} from "react-icons/md";
import {
  FaAngleRight,
  FaRegEdit,
  FaAngleLeft,
  FaBars,
  FaUserCircle,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import Logo from "../img/Logo.png";
import "../sidenavbar/sidenavbar.css";
import "./category.css";
import { useDispatch } from "react-redux/es/exports";
import { authActions } from "../../store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./update.jsx";

let id = sessionStorage.getItem("id");
const Category = () => {
  const [show, setShow] = useState(true);
  const [userId, setUserId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [allCategories, setAllCategories] = useState(null);
  const [name, setUserName] = useState("");
  // Add editingIndex state
  const [cname, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setSelectedId] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

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

  const handleDelete = async (categoryId) => {
    try {
      const response = await axios.delete(
        `https://hub4-back.vercel.app/delete_category/${categoryId}`
      );

      if (response.data.Status) {
        const updatedCategories = categories.filter(
          (category) => category._id !== categoryId
        );
        setCategories(updatedCategories);
        toast.success("Deleted successfully!");
      } else {
        console.error("Failed to delete category");
        toast.error("Error in deleting. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error in deleting. Please try again.");
    }
  };

  //for update
  const handleOpenUpdateModal = (categoryId, cname, description) => {
    setSelectedId(categoryId);
    setName(cname);
    setDescription(description);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedId(null);
    setName("");
    setDescription("");
    setIsUpdateModalOpen(false);
  };

  //update
  const handleUpdate = async () => {
    console.log(categoryId);
    try {
      const response = await axios.put(
        `https://hub4-back.vercel.app/update_category/${categoryId}`,
        {
          name: cname,
          description: description,
        }
      );
      if (response.data._id) {
        const updatedCategories = categories.map((category) =>
          category._id === categoryId
            ? { ...category, name: cname, description: description }
            : category
        );
        setCategories(updatedCategories);
        toast.success("Updated successfully!");
        handleCloseUpdateModal(); // Close the update modal
      } else {
        console.error("Failed to update category");
        toast.error("Error in updating. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error in updating. Please try again.");
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

      <div>
        <div class="custom-container">
          <ToastContainer />
          <div className="catheader">
            <h3>Category List</h3>
          </div>
          <div className="catcenter">
            <div class="custom-content">
              <div className="categorytask">
                <Link to="/home/category/add" className="custom-btn btn-9">
                  Add Category
                </Link>
              </div>
              <div className="task-cards-container">
                <div className="task-cards">
                  {categoriesList.map((category) => (
                    <div className="task-card" key={category._id}>
                      <h3>{category.name}</h3>
                      <p>{category.description}</p>
                      <div className="button-container">
                        <button
                          title="Update"
                          onClick={() =>
                            handleOpenUpdateModal(
                              category._id,
                              category.name,
                              category.description
                            )
                          }
                        >
                          <FaRegEdit />
                        </button>
                        <button
                          title="Delete"
                          onClick={() => handleDelete(category._id)}
                        >
                          <MdDeleteForever />
                        </button>
                      </div>
                    </div>
                  ))}
                  {isUpdateModalOpen && (
                    <Update
                      categoryId={categoryId}
                      onClose={handleCloseUpdateModal}
                      onUpdate={handleUpdate}
                      cname={cname}
                      description={description}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Category;
