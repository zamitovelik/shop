import type { ProductsResponse } from '../types/product';
import { productService } from './api';

export const searchService = {
  
  searchProducts: async (query: string): Promise<ProductsResponse> => {
    if (!query.trim()) {
      
      return { products: [], total: 0, skip: 0, limit: 12 };
    }

    return productService.searchProducts(query);
  },

  
  searchProductsWithPagination: async (
    query: string,
    limit = 12,
    skip = 0
  ): Promise<ProductsResponse> => {
    if (!query.trim()) {
      return { products: [], total: 0, skip: 0, limit: 12 };
    }

    try {
      const results = await productService.searchProducts(query);
      
      const paginatedProducts = results.products.slice(skip, skip + limit);
      
      return {
        ...results,
        products: paginatedProducts,
        skip,
        limit,
      };
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  },
};
