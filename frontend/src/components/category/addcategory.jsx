import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../sidenavbar/sidenavbar.css";
import "./category.css";
import "./addcategory.css";

let id = sessionStorage.getItem("id");
const AddCategory = () => {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://hub-4.vercel.app/category/add_category",
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

  return (
    <div>
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
                required
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
                className="addcat form-control custom-scrollbar"
                placeholder="Category Description"
                required
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
                style={{ resize: "none" }}
              />
            </div>
            <div className="addcatbtngroup">
              <button type="submit" className="cat-save">
                Add
              </button>
              <button
                type="submit"
                className="cat-close"
                onClick={() => navigate("/home/category")}
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

export default AddCategory;
