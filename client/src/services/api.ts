import Product from '@/interface/product';
import axios from '@/lib/axios';

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const getProducts = async () => {
  const response = await axios.get('/api/products');
  
  return response.data;
};

export const getProductById = async (id: number) => {
  const response = await axios.get(`/api/products/${id}`);
  return response.data;
};

export const createProduct = async (data: Product) => {
  await csrf()

  const response = await axios.post('/api/products', data);
  return response.data;
};


export const updateProduct = async (data: Product) => {
  await csrf()

  const response = await axios.put(`/api/products/${data.id}`, data);
  return response.data;
};

export const deleteProduct = async (id: number) => {
  await csrf()

  const response = await axios.delete(`/api/products/${id}`);
  return response.data;
};