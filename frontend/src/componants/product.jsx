import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, OrderProduct } from "../services/productServices";
import "../css/product.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

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

  if (!product) return <p>Loading product details...</p>;

  // BUY NOW → PLACE ORDER
  const handleBuyNow = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login to buy products");
      navigate("/userLogin");
      return;
    }

    try {
      await OrderProduct(userId, product.id);
      alert("✅ Order placed successfully!");
      navigate("/user/userdashboard"); // redirect to user dashboard
    } catch (error) {
      console.error("Error placing order:", error);
      alert("❌ Failed to place order");
    }
  };

  return (
    <div className="product-detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="product-detail-card">
        <img
          src={`http://localhost:8071${product.imageUrl}`}
          alt={product.name}
          className="product-detail-image"
        />

        <h2>{product.name}</h2>

        {product.brand && <p><b>Brand:</b> {product.brand}</p>}
        {product.category && <p><b>Category:</b> {product.category}</p>}
        <p><b>Price:</b> ₹{product.price}</p>
        {product.desc && <p><b>Description:</b> {product.desc}</p>}
        <p><b>Available:</b> {product.available ? "Yes" : "No"}</p>
        <p><b>Quantity:</b> {product.quantity}</p>

        <div className="product-buttons">
          <button className="buy-now-btn" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
