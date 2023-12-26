import React from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

let id = sessionStorage.getItem("id");
const Users = () => {
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
      </div>
    </div>
  );
};

export default Users;
