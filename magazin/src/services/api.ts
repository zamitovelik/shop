import axios from 'axios';
import type { ProductsResponse, Product } from '../types/product';

const API_BASE = 'https://dummyjson.com';

const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export const productService = {
  // Get products with pagination, sorting, and filtering
  getProducts: async (
    limit = 12,
    skip = 0,
    sortBy?: string,
    order: 'asc' | 'desc' = 'asc'
  ): Promise<ProductsResponse> => {
    try {
      let url = `/products?limit=${limit}&skip=${skip}`;
      
      if (sortBy) {
        url += `&sortBy=${sortBy}&order=${order}`;
      }
      
      const response = await apiClient.get<ProductsResponse>(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get single product by ID
  getProductById: async (id: number): Promise<Product> => {
    try {
      const response = await apiClient.get<Product>(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },

  // Search products
  searchProducts: async (query: string): Promise<ProductsResponse> => {
    try {
      const response = await apiClient.get<ProductsResponse>(
        `/products/search?q=${query}`
      );
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },
};
