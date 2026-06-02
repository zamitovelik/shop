export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  stock: number;
  thumbnail: string;
  images: string[];
  category?: string;
  brand?: string;
  rating?: number;
  reviews?: Array<any>;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
