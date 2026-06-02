import axios from 'axios';
import type { ProductsResponse, Product } from '../types/product';

const API_BASE = 'https://dummyjson.com';

const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export const productService = {
  getProducts: async (
    limit = 12,
    skip = 0,
    sortBy?: string,
    order: 'asc' | 'desc' = 'asc',
    category?: string
  ): Promise<ProductsResponse> => {
    try {
      let url: string;

      if (category) {
        url = `/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
      } else {
        url = `/products?limit=${limit}&skip=${skip}`;
      }

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

  getCategories: async (): Promise<string[]> => {
    try {
      const response = await apiClient.get<Array<{ slug: string; name: string; url: string }>>(
        '/products/categories'
      );
      // API returns array of objects with slug/name
      return response.data.map((c) => (typeof c === 'string' ? c : c.slug));
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  getProductById: async (id: number): Promise<Product> => {
    try {
      const response = await apiClient.get<Product>(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },

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
