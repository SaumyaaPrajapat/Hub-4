import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import "../sidenavbar/sidenavbar.css";
import "./profile.css";

const Profile = () => {
  const [name, setUserName] = useState("");
  const [email, setUserEmail] = useState("");

  useEffect(() => {
    const storedName = sessionStorage.getItem("name");
    const storedEmail = sessionStorage.getItem("email");

    if (storedName) {
      setUserName(capitalizeFirstLetter(storedName));
    }
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div>
      <div className="procontainer">
        <div className="procontent rounded border">
          <h3 className="text-center">Profile</h3>
          <form className="proform">
            <div className="circle-container">
              <div className="circle">
                <FaUserCircle className="profile" />
              </div>
            </div>
            <div className="progroup">
              <label htmlFor="name" className="form-label">
                <strong>Name:</strong>
              </label>
              <h3 className="pro">{name || "user"}</h3>
            </div>
            <div className="progroup">
              <label htmlFor="description" className="form-label">
                <strong>Email:</strong>
              </label>
              <h3 className="pro">{email || "userEmail"}</h3>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
