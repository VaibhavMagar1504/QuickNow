import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/productServices";
import "../css/product.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  // 🔐 If you have authentication, you can track it here
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!loggedIn) {
      navigate("/login"); // redirect to login if not logged in
    } else {
      alert(`${product.name} added to cart`);
    }
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="product-detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="product-detail-card">
        <h2>{product.name}</h2>
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
        {product.desc && (
          <p>
            <b>Description:</b> {product.desc}
          </p>
        )}
        <p>
          <b>Available:</b> {product.available ? "Yes" : "No"}
        </p>
        <p>
          <b>Quantity:</b> {product.quantity}
        </p>

        {/* 🛒 Add to Cart button */}
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
