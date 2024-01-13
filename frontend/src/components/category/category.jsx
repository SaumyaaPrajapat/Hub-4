import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import noData from "../img/nodata.png";
import "../sidenavbar/sidenavbar.css";
import "./category.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./update.jsx";

let id = sessionStorage.getItem("id");
const Category = () => {
  const [categories, setCategories] = useState([]);
  const [allCategories, setAllCategories] = useState(null);
  const navigate = useNavigate();
  // Add editingIndex state
  const [cname, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setSelectedId] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

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

  const handleDelete = async (categoryId) => {
    try {
      const response = await axios.delete(
        `https://hub-4.vercel.app/category/delete_category/${categoryId}`
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
  const handleUpdate = async (
    categoryId,
    updatedCatName,
    updatedDescription
  ) => {
    try {
      const response = await axios.put(
        `https://hub-4.vercel.app/category/update_category/${categoryId}`,
        {
          name: updatedCatName,
          description: updatedDescription,
        }
      );
      if (response.data.updatedCategory) {
        const updatedCategories = categories.map((category) =>
          category._id === categoryId
            ? {
                ...category,
                name: response.data.updatedCategory.name,
                description: response.data.updatedCategory.description,
              }
            : category
        );
        setCategories(updatedCategories);
        toast.success("Updated successfully!");
        handleCloseUpdateModal(); // Close the update modal
      } else {
        toast.success("Updated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error in updating. Please try again.");
    }
  };

  return (
    <div>
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
            </div>
          </div>
          {categoriesList.length > 0 ? (
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
          ) : (
            <div className="no-data-message">
              <img src={noData} alt="" className="nodata" />
              <p className="no-data-text">
                No categories found. Add new categories to display in the list.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
