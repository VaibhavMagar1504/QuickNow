import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts, OrderProduct } from "../services/productServices";
import "../css/UserDashboard.css";

function UserDashboard() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || null;

  useEffect(() => {
    if (!user) {
      navigate("/userLogin");
      return;
    }
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: product });
  };

  return (
    <div className="home-container">

      {/* Navbar */}
      <nav className="homeNavbar">
        <h1 className="logo"><span>Quick</span>Now</h1>

        <div className="homeNavLinks">
          <button
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("userToken");
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <h2 className="section-title">All Products</h2>

      <div className="products">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => handleProductClick(product)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={`http://localhost:8071${product.imageUrl}`}
              alt={product.name}
              className="product-image"
            />

            <h3>{product.name}</h3>
            <p><b>Price:</b> ₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDashboard;
