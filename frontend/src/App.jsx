import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./componants/home";
import ProductDetail from "./componants/product";
import AdminLogin from "./componants/adminlogin";
import AdminDashboard from "./componants/AdminDashBord";
import AddProduct from "./componants/addProduct";
import ViewProducts from "./componants/ViewAllProduct";
import UpdateProduct from "./componants/updateProduct";
import LoginRegister from "./componants/userAutho";
import UserDashboard from "./componants/userDashbord";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<LoginPage />} /> */}

          <Route path="/product/:id" element={<ProductDetail/>} />
          <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/viewAllProduct" element={<ViewProducts />} />
            <Route path="/updateProduct/:id" element={<UpdateProduct />} />
             <Route path="/userLogin" element={<LoginRegister />} />
             <Route path="/user/userdashboard" element={<UserDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
