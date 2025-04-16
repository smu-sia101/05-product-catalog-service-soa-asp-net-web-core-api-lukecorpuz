
import axios from 'axios';

const API_BASE_URL = 'https://localhost:7192/api/products'; 


export const fetchProducts = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const addProduct = async (product) => {
  const response = await axios.post(API_BASE_URL, product);
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};
