import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

let id = sessionStorage.getItem("id");
const Users = () => {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState(null);

  //get users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `https://hub4-back.vercel.app/auth/users/${id}`
      );
      if (response.data.users && response.data.users.length > 0) {
        setAllUsers(response.data.users);
        setUsers(response.data.users);
      } else {
        console.log("No users found or empty response.");
      }
    } catch (error) {
      console.error("Error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [allUsers]);
  // Check if users is defined before mapping
  const usersList = users || [];

  return (
    <div>
      <div className="empcontainer">
        <div className="empheader">
          <h3>User List</h3>
        </div>
        <div className="empcenter">
          <div class="empcustom-content">
            <div className="emptask">
              <Link to="/home/user/add" className="emp-btn btn-9">
                <span>Add User</span>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <button className="btn btn-info btn-sm me-2">Access</button>
                    <button className="btn btn-warning btn-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
