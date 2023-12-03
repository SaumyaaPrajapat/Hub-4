import React from "react";
import {
  FaAngleRight,
  FaAngleLeft,
  FaChartBar,
  FaThLarge,
  FaShoppingCart,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./sidenavbar.css";

const ICON_SIZE = 20;

const SideNavbar = ({ visible, show }) => {
  return (
    <>
      <div className="mobile-nav">
        <button className="mobile-nav-btn" onClick={() => show(!visible)}>
          <FaBars size={24} />
        </button>
      </div>
      <div className={!visible ? "snavbar" : ""}>
        <button
          type="button"
          className="snav-btn"
          onClick={() => show(!visible)}
        >
          {!visible ? <FaAngleRight size={30} /> : <FaAngleLeft size={30} />}
        </button>
        <div>
          <NavLink className="hub4bluelogo" to="/">
            <img src={require("../assets/Images/logo.png")} alt="logo" />
          </NavLink>
          <div className="links nav-top">
            <NavLink to="/dashboard" className="snav-link">
              <FaThLarge size={ICON_SIZE} />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/analytics" className="snav-link">
              <FaChartBar size={ICON_SIZE} />
              <span>Analytics </span>
            </NavLink>
            <NavLink to="/orders" className="snav-link">
              <FaShoppingCart size={ICON_SIZE} />
              <span>Orders</span>
            </NavLink>
          </div>
        </div>

        <div className="links">
          <NavLink to="/settings" className="snav-link">
            <FaCog size={ICON_SIZE} />
            <span>Settings</span>
          </NavLink>
          <NavLink to="/Sign-out" className="snav-link">
            <FaSignOutAlt size={ICON_SIZE} />
            <span>Logout</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default SideNavbar;
