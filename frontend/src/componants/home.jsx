import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/home.css";
import { getAllProducts, searchProducts } from "../services/productServices";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  // 🔹 Load all products on first render
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  // 🔹 Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (keyword.trim() === "") {
      fetchProducts(); // if empty, show all products again
      return;
    }
    try {
      const data = await searchProducts(keyword);
      setProducts(data);
    } catch (err) {
      console.error("Error searching products:", err);
    }
  };

  const handleAddToCart = (product) => {
    if (!loggedIn) {
      navigate("/userLogin");
    } else {
      alert(`${product.name} added to cart`);
    }
  };

  return (
    <div className="home-container">
      {/* 🔹 Navbar */}
      <nav className="navbar">
        <h1>
          <span>Quick</span>Now
        </h1>
        <div className="nav-links">
          <button onClick={() => navigate("/userLogin")}>Login</button>
          <button onClick={() => navigate("/adminlogin")}>Admin</button>
        </div>
      </nav>

      {/* 🔎 Search Box */}
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by name, brand or category..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {/* 📦 Products */}
      <div className="products">
        {products.length === 0 ? (
          <p>No products found...</p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <h3>{product.name}</h3>
              {product.brand && (
                <p>
                  <b>Brand:</b> {product.brand}
                </p>
              )}
              {product.category && (
                <p>
                  <b>Category:</b> {product.category}
                </p>
              )}
              <p>
                <b>Price:</b> ₹{product.price}
              </p>
              {product.desc && <p>{product.desc}</p>}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent navigation on button click
                  handleAddToCart(product);
                }}
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;
