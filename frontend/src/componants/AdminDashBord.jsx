import React, { useState } from "react";
import "../css/admindashboard.css";

import AddProduct from "../componants/addProduct";
import ViewAllProducts from "../componants/ViewAllProduct";
// import ViewOrders from "./ViewOrders";
// import ViewUsers from "./ViewUsers";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "addProduct":
        return  <AddProduct />; // Replace with <AddProduct />
      case "viewProducts":
        return <ViewAllProducts/>; // Replace with <ViewProducts />
      case "viewOrders":
        return <h2>View Orders Page</h2>; // Replace with <ViewOrders />
      case "viewUsers":
        return <h2>View Users Page</h2>; // Replace with <ViewUsers />
      default:
        return <h2>Welcome to Admin Dashboard 👋</h2>;
    }
  };

  const handleLogout = () => {
    alert("Logged out ✅");
    window.location.href = "/home"; // redirect to login page
  };

  return (
    <div className="admindashboard-container">
      {/* Top Navbar */}
      <nav className="admindashboard-navbar">
        <div className="admindashboard-logo">Admin</div>

        <div className="admindashboard-links">
          <span
            className={activePage === "addProduct" ? "active" : ""}
            onClick={() => setActivePage("addProduct")}
          >
            ➕ Add Product
          </span>
          <span
            className={activePage === "viewProducts" ? "active" : ""}
            onClick={() => setActivePage("viewProducts")}
          >
            📦 View Products
          </span>
          <span
            className={activePage === "viewOrders" ? "active" : ""}
            onClick={() => setActivePage("viewOrders")}
          >
            🛒 View Orders
          </span>
          <span
            className={activePage === "viewUsers" ? "active" : ""}
            onClick={() => setActivePage("viewUsers")}
          >
            👤 View Users
          </span>
        </div>

        <button className="admindashboard-logout" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <main className="admindashboard-content">{renderPage()}</main>
    </div>
  );
}
