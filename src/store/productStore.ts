import { create } from 'zustand';
import type { Product } from '../types/product';
import { productService } from '../services/api';

interface ProductStore {
  
  products: Product[];
  total: number;
  currentPage: number;
  itemsPerPage: number;
  hasMore: boolean;
  sortBy: string | null;
  sortOrder: 'asc' | 'desc';
  selectedCategory: string | null;
  categories: string[];
  loading: boolean;
  error: string | null;
  selectedProduct: Product | null;
  selectedProductLoading: boolean;
  selectedProductError: string | null;

  fetchProducts: (page?: number,append?: boolean,limitOverride?: number
) => Promise<void>;
 
  fetchCategories: () => Promise<void>;
  setCategory: (category: string | null) => void;
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
  selectedCategory: null,
  categories: [],
  loading: false,
  hasMore: true,
  error: null,
  selectedProduct: null,
  selectedProductLoading: false,
  selectedProductError: null,

 fetchProducts: async (page = 0, append = false) => {
  set({ loading: true, error: null });

  try {
    const state = get();

    const skip = page * state.itemsPerPage;

    const data = await productService.getProducts(
      state.itemsPerPage,
      skip,
      state.sortBy || undefined,
      state.sortOrder,
      state.selectedCategory || undefined
    );

    set({
      products: append
        ? [...state.products, ...data.products]
        : data.products,

      total: data.total,
      currentPage: page,
      hasMore: skip + data.products.length < data.total,
      loading: false,
    });

  } catch (error) {
    const msg =
      error instanceof Error ? error.message : "Failed to fetch products";

    set({ error: msg, loading: false });
  }
},

  fetchCategories: async () => {
    try {
      const cats = await productService.getCategories();
      set({ categories: cats });
    } catch {
      // silently fail
    }
  },

  setCategory: (category) => {
    set({ selectedCategory: category });
    get().fetchProducts(0);
  },

  setSortBy: (sortBy) => {
    set({ sortBy: sortBy || null });
    get().fetchProducts(0);
  },

  setSortOrder: (order) => {
    set({ sortOrder: order });
    get().fetchProducts(get().currentPage);
  },

  setCurrentPage: (page) => {
    get().fetchProducts(page);
  },

  fetchProductById: async (id) => {
    set({ selectedProductLoading: true, selectedProductError: null });
    try {
      const data = await productService.getProductById(id);
      set({ selectedProduct: data, selectedProductLoading: false });
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Failed to fetch product';
      set({ selectedProductError: msg, selectedProductLoading: false });
    }
  },

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
}));
