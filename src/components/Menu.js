import React, { useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = (index) => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Notify landing page about logout
    try {
      if (window.opener && !window.opener.closed) {
        window.opener.postMessage({ type: "LOGOUT" }, "https://zerodh-frontend.netlify.app");
      }
    } catch (e) {}
    // Redirect back to landing
    window.location.href = "https://zerodh-frontend.netlify.app";
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";
  const user = localStorage.getItem("user");
  const username = user ? JSON.parse(user).username : "USERID";

  return (
    <div className="menu-container">
  <img src="logo.png" alt="Dashboard logo" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(6)}
            >
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile">
          <div className="profile-info" onClick={handleProfileClick}>
            <div className="avatar">ZU</div>
            <p className="username">{username}</p>
          </div>
          {isProfileDropdownOpen && (
            <div className="profile-dropdown">
              <button 
                className="btn btn-sm btn-outline-danger logout-btn" 
                onClick={handleLogout}
                style={{
                  marginTop: "8px",
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
              >
                <i className="fas fa-sign-out-alt" style={{ marginRight: "8px" }} />
                Logout
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary"
                style={{
                  marginTop: "8px",
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onClick={() => {
                  const landingUrl = "https://zerodh-frontend.netlify.app";
                  const newWin = window.open(landingUrl, "_blank", "noopener,noreferrer");
                  if (!newWin) {
                    // popup blocked; navigate current tab
                    window.location.assign(landingUrl);
                  }
                }}
              >
                <i className="fas fa-home" style={{ marginRight: "8px" }} />
                Landing Page
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;