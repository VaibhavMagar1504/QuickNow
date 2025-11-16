import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/UserService";
import "../css/userAuth.css";

function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      const user = res.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", user.id);

      alert("✅ Login successful");
      navigate("/user/userdashboard");
    } catch (err) {
      alert("❌ Login failed: " + (err.response?.data?.message || "Try again"));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(formData);

      const user = res.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", user.id);

      alert("✅ Registered successfully");
      navigate("/user/userdashboard");
    } catch (err) {
      alert(
        "❌ Registration failed: " + (err.response?.data?.message || "Try again")
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {isLogin ? (
          <form className="auth-form" onSubmit={handleLogin}>
            <h2 className="auth-title">Login</h2>
            <input
              type="text"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="auth-btn">Login</button>
            <p>
              Don’t have an account?{" "}
              <span onClick={() => setIsLogin(false)} className="toggle-link">
                Register
              </span>
            </p>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleRegister}>
            <h2 className="auth-title">Register</h2>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="mobile"
              placeholder="Enter Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <button type="submit" className="auth-btn">Register</button>
            <p>
              Already have an account?{" "}
              <span onClick={() => setIsLogin(true)} className="toggle-link">
                Login
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginRegister;
