import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MdPeople,
  MdDashboard,
  MdOutlineFormatListBulleted,
} from "react-icons/md";
import {
  FaAngleRight,
  FaAngleLeft,
  FaUserPlus,
  FaUserCircle,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../img/Logo.png";
import "../ProtectRoute/ProtectedRoute.css";
import { useDispatch } from "react-redux/es/exports";
import { authActions } from "../../store";
import "react-toastify/dist/ReactToastify.css";

let id = sessionStorage.getItem("id");
const ProtectedRoute = ({ children }) => {
  const [show, setShow] = useState(true);
  const [name, setUserName] = useState("");
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get("https://hub4-back.vercel.app/auth/home")
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setUserData(res.data.user);
          } else {
            navigate("/login");
          }
        })
        .catch((err) => {
          //navigate("/login");
        });
    }
  }, [navigate]);

  useEffect(() => {
    const storedName = sessionStorage.getItem("name");
    const storedRole = sessionStorage.getItem("role");
    if (storedName) {
      setUserName(capitalizeFirstLetter(storedName));
    }
    if (storedRole === "admin") {
      setMenu(adminMenu);
    }
  }, []);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Function to get the first letter of the name
  const getFirstLetter = (str) => {
    return str.charAt(0).toUpperCase();
  };

  const dispatch = useDispatch();
  const logout = () => {
    sessionStorage.clear("id");
    dispatch(authActions.logout());
  };

  //admin menu
  const adminMenu = [
    {
      title: "Dashboard",
      path: "/home",
      icon: <MdDashboard className="react-icon" />,
      onClick: () => navigate("/home"),
    },
    {
      title: "Employees",
      path: "/home/employee",
      icon: <MdPeople className="react-icon" />,
      onClick: () => navigate("/home/employee"),
    },
    {
      title: "Category",
      path: "/home/category",
      icon: <MdOutlineFormatListBulleted className="react-icon" />,
      onClick: () => navigate("/home/category"),
    },
    {
      title: "Profile",
      path: "/home/profile",
      icon: <FaUserCircle className="react-icon" />,
      onClick: () => navigate("/home/profile"),
    },
    {
      title: "Homepage",
      path: "/",
      icon: <FaHome className="react-icon" />,
      onClick: logout,
    },
  ];

  const [menu, setMenu] = useState(adminMenu);

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
        <div
          className="usercontainer"
          onClick={() => navigate("/home/profile")}
        >
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
              {menu.map((item) => (
                <Link
                  to={item.path}
                  className="snav-link"
                  onClick={item.onClick}
                >
                  {item.icon}
                  <span className="nav-link-name">{item.title}</span>
                </Link>
              ))}
            </div>
          </div>
          <Link to="/login" onClick={logout} className="snav-link">
            <FaSignOutAlt className="react-icon" />
            <span className="nav-link-name">Logout</span>
          </Link>
        </nav>
      </aside>

      <div className="content">{children}</div>
    </main>
  );
};

export default ProtectedRoute;
