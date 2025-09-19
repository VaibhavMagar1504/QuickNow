import React, { useState } from "react";
import { addProduct } from "../services/productServices";
import "../css/addProduct.css";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    brand: "",
    price: "",
    category: "",
    releaseDate: "",
    available: true,
    quantity: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct(formData);
      alert("✅ Product added successfully!");
      setFormData({
        name: "",
        desc: "",
        brand: "",
        price: "",
        category: "",
        releaseDate: "",
        available: true,
        quantity: "",
      });
    } catch (error) {
      alert("❌ Error adding product!");
    }
  };

  return (
    <div className="addproduct-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="addproduct-form">
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Release Date</label>
          <input
            type="date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
            id="available"
          />
          <label htmlFor="available">Available</label>
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          ➕ Add Product
        </button>
      </form>
    </div>
  );
}
