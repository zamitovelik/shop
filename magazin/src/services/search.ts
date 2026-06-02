import type { ProductsResponse } from '../types/product';
import { productService } from './api';

export const searchService = {
  // Search products by query
  searchProducts: async (query: string): Promise<ProductsResponse> => {
    if (!query.trim()) {
      // Return empty results for empty query
      return { products: [], total: 0, skip: 0, limit: 12 };
    }

    return productService.searchProducts(query);
  },

  // Get products with search and pagination
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
      // Manually paginate results since API doesn't support skip for search
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
