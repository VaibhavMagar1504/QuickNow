import axios from "axios";

const BASE_URL = "http://localhost:8071"; // your Spring Boot backend

// Get all products
export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/allProduct`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};


export const getProductById = async (id) => {
  const res = await axios.get(`${BASE_URL}/getProduct/${id}`);
  return res.data;
};


// Add other product APIs if needed (add/update/delete)
export const addProduct = async (product) => {
  try {
    const response = await axios.post(`${BASE_URL}/addProduct`, product, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const deleteProduct = async(id)=>{
  const res=await axios.delete(`${BASE_URL}/deleteProduct/${id}`);
  return res.data;
};

export const updateProduct=async(id,product)=>{
    const res =await axios.put(`${BASE_URL}/productUpdate/${id}`,product);
    return res.data;
};

export const  searchProducts = async (keyword) => {
  try {
    const response = await axios.get(`${BASE_URL}/searchProduct/${keyword}`);
    return response.data;
  } catch (error) {
    console.error("Error searching products", error);
    return [];
  }
};


export const OrderProduct=async (userId, productId)=>{
  try {
      const response=await axios.post(`${BASE_URL}/placeOrder`,{
        userId,
        productId
      });
      return response.data;
  } catch (error) {
      console.error("Erro placing order:",error);
      throw error;
  }
};



export const getAllOrders = async () => {
  const res = await axios.get(`${BASE_URL}/getallOrder`);
  return res.data;
};


export const updateOrderStatus = async (orderId, status) => {
  const res = await axios.put(`${BASE_URL}/updateStatus/${orderId}`, null, {
    params: { status: status },
  });
  return res.data;
};