import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/home.css";
import { getAllProducts, searchProducts } from "../services/productServices";
import heroImage from "../assets/Shop.jpg";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(Array.isArray(data) ? data.slice(0, 4) : []);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (keyword.trim() === "") {
      fetchProducts();
      return;
    }
    try {
      const data = await searchProducts(keyword);
      setProducts(Array.isArray(data) ? data.slice(0, 4) : []);
    } catch (err) {
      console.error("Error searching products:", err);
    }
  };

  const handleBuyNow = () => navigate("/userLogin");
  const handleLogin = () => navigate("/userLogin");
  const handleAdmin = () => navigate("/adminlogin");

  return (
    <div className="home-container">

      {/* NAVBAR */}
      <nav className="homeNavbar">
        <h1 className="logo">
          Quick<span>Now</span>
        </h1>

        <button
          className="homeHamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <div className={`homeNavRight ${menuOpen ? "open" : ""}`}>
          <form className="homeNavSearch" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          <div className="homeNavLinks">
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleAdmin}>Admin</button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-left">
          <h1>
            Shop Smarter with <span>QuickNow</span>
          </h1>
          <p>
            Discover the latest products at unbeatable prices. Fast delivery,
            trusted sellers, and top deals every day.
          </p>
          <div className="hero-buttons">
            <button onClick={handleLogin}>Start Shopping</button>
            <button onClick={handleAdmin} className="secondary">
              Admin Login
            </button>
          </div>
        </div>

        <div className="hero-right">
          <img src={heroImage} alt="Shopping Illustration" />
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <h2 className="section-title">Featured Products</h2>

      <div className="products">
        {products.length === 0 ? (
          <p>No products found...</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">

              {product.imageUrl ? (
                <img
                  src={`http://localhost:8071${product.imageUrl}`}
                  alt={product.name}
                  className="product-image"
                />
              ) : (
                <img
                  src="https://via.placeholder.com/250x200?text=No+Image"
                  alt="No Image"
                  className="product-image"
                />
              )}

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

              <p><b>Price:</b> ₹{product.price}</p>

              {product.desc && <p>{product.desc}</p>}

              <button onClick={handleBuyNow}>Buy Now</button>
            </div>
          ))
        )}
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 QuickNow. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
