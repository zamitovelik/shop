import { create } from 'zustand';
import type { Product } from '../types/product';
import { productService } from '../services/api';

interface ProductStore {
  
  products: Product[];
  total: number;
  currentPage: number;
  itemsPerPage: number;
  sortBy: string | null;
  sortOrder: 'asc' | 'desc';
  loading: boolean;
  error: string | null;
  selectedProduct: Product | null;
  selectedProductLoading: boolean;
  selectedProductError: string | null;

  
  fetchProducts: (page?: number) => Promise<void>;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  setCurrentPage: (page: number) => void;
  fetchProductById: (id: number) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
 
  products: [],
  total: 0,
  currentPage: 0,
  itemsPerPage: 12,
  sortBy: null,
  sortOrder: 'asc',
  loading: false,
  error: null,
  selectedProduct: null,
  selectedProductLoading: false,
  selectedProductError: null,

  
  fetchProducts: async (page = 0) => {
    set({ loading: true, error: null });
    try {
      const state = get();
      const skip = page * state.itemsPerPage;
      
      const data = await productService.getProducts(
        state.itemsPerPage,
        skip,
        state.sortBy || undefined,
        state.sortOrder
      );

      set({
        products: data.products,
        total: data.total,
        currentPage: page,
        loading: false,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch products';
      set({ error: errorMessage, loading: false });
    }
  },

  
  setSortBy: (sortBy: string) => {
    set({ sortBy: sortBy || null });
   
    const state = get();
    state.fetchProducts(0);
  },

  
  setSortOrder: (order: 'asc' | 'desc') => {
    set({ sortOrder: order });
   
    const state = get();
    state.fetchProducts(get().currentPage);
  },

  
  setCurrentPage: (page: number) => {
    const state = get();
    state.fetchProducts(page);
  },

 
  fetchProductById: async (id: number) => {
    set({ selectedProductLoading: true, selectedProductError: null });
    try {
      const data = await productService.getProductById(id);
      set({
        selectedProduct: data,
        selectedProductLoading: false,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch product';
      set({ selectedProductError: errorMessage, selectedProductLoading: false });
    }
  },

  
  setLoading: (loading: boolean) => set({ loading }),

  
  setError: (error: string | null) => set({ error }),
}));
