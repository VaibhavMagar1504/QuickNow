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

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Create FormData with JSON + File
    const data = new FormData();
    const productJson = JSON.stringify(formData);
    data.append("product", new Blob([productJson], { type: "application/json" }));
    if (image) data.append("imageFile", image);

    try {
      await addProduct(data);
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
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert("❌ Error adding product!");
    }
  };

  return (
    <div className="addproduct-container">
      <h2>Add New Product</h2>
      <form
        onSubmit={handleSubmit}
        className="addproduct-form"
        encType="multipart/form-data"
      >
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="desc">Description</label>
          <textarea
            id="desc"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            placeholder="Enter product description"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Enter brand name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price (₹)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
          />
        </div>

        <div className="form-group">
          <label htmlFor="releaseDate">Release Date</label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="available"
            name="available"
            checked={formData.available}
            onChange={handleChange}
          />
          <label htmlFor="available">Available</label>
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
          />
          {preview && <img src={preview} alt="Preview" className="image-preview" />}
        </div>

        <button type="submit" className="submit-btn">
          ➕ Add Product
        </button>
      </form>
    </div>
  );
}
