import { create } from 'zustand';
import type { Product, ProductsResponse } from '../types/product';
import { searchService } from '../services/search';

interface SearchStore {
  
  searchQuery: string;
  searchResults: Product[];
  searchTotal: number;
  currentPage: number;
  itemsPerPage: number;
  loading: boolean;
  error: string | null;
  isSearchMode: boolean;

 
  setSearchQuery: (query: string) => void;
  performSearch: (page?: number) => Promise<void>;
  clearSearch: () => void;
  setCurrentPage: (page: number) => void;
}

export const useSearchStore = create<SearchStore>((set, get) => ({
  
  searchQuery: '',
  searchResults: [],
  searchTotal: 0,
  currentPage: 0,
  itemsPerPage: 12,
  loading: false,
  error: null,
  isSearchMode: false,

  
  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  
  performSearch: async (page = 0) => {
    set({ loading: true, error: null });
    try {
      const state = get();
      const skip = page * state.itemsPerPage;

      const data: ProductsResponse = await searchService.searchProductsWithPagination(
        state.searchQuery,
        state.itemsPerPage,
        skip
      );

      set({
        searchResults: data.products,
        searchTotal: data.total,
        currentPage: page,
        loading: false,
        isSearchMode: data.products.length > 0 || state.searchQuery !== '',
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Search failed';
      set({ error: errorMessage, loading: false });
    }
  },

  
  clearSearch: () => {
    set({
      searchQuery: '',
      searchResults: [],
      searchTotal: 0,
      currentPage: 0,
      isSearchMode: false,
      error: null,
    });
  },

  
  setCurrentPage: (page: number) => {
    const state = get();
    state.performSearch(page);
  },
}));
