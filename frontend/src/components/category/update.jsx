import React, { useState } from "react";
import "./update.css";

const Update = ({ onClose, onUpdate, categoryId, cname, description }) => {
  const [updatedName, setUpdatedName] = useState(cname);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const handleUpdate = () => {
    onUpdate(categoryId, updatedName, updatedDescription);
    // Close the modal
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="update-overlay">
      <div className="update-content">
        <h3 className="updatetext">Update Category</h3>
        <input
          type="text"
          className="todo-input"
          placeholder="Category"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
        />
        <textarea
          className="todo custom-scrollbar"
          placeholder="Description"
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
        />
        <div className="btns2">
          <button className="btnup " onClick={handleUpdate}>
            Update
          </button>
          <button className="btns " onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;
