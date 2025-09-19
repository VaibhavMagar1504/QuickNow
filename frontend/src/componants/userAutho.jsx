import React, { useState } from "react";
import { useNavigate } from "react-router-dom";   // ✅ import navigate
import { loginUser, registerUser } from "../services/UserService";
import "../css/userAuth.css"; // css file

function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();  // ✅ define navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({
        name: formData.name,
        password: formData.password,
      });

      // store user in localStorage (optional)
      localStorage.setItem("user", JSON.stringify(res.data));

      alert("✅ Login successful");
      navigate("/user/userdashboard");   // ✅ redirect to dashboard
    } catch (err) {
      alert("❌ Login failed: " + (err.response?.data?.message || "Try again"));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(formData);

      alert("✅ " + res.data.name + " registered successfully");

      // store user in localStorage (optional)
      localStorage.setItem("user", JSON.stringify(res.data));

      navigate("/user/userdashboard");   // ✅ redirect to dashboard
    } catch (err) {
      alert("❌ Registration failed: " + (err.response?.data?.message || "Try again"));
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
              name="name"
              placeholder="Enter name"
              value={formData.name}
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
