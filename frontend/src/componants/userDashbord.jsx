import React from "react";
import { Link } from "react-router-dom";
import "../css/UserDashboard.css"; // optional CSS

function UserDashboard() {
  const handleLogout = () => {
    alert("✅ Logged out successfully");
    window.location.href = "/login"; // redirect to login
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">QuickNow</div>
        <ul className="navbar-links">
          <li><Link to="/dashboard">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/history">History</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="dashboard-content">
        <h2>Welcome to your Dashboard!</h2>
        <p>Select an option from the navbar to proceed.</p>
      </div>
    </div>
  );
}

export default UserDashboard;
