import { Routes, Route } from 'react-router-dom';

import { MainLayout } from '../layouts/Mainlayout';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CartPage } from '../pages/CartPage';
import { SearchPage } from '../pages/SearchPage';
import { HomePage } from '../pages/HomePages';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
      <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Route>
    </Routes>
  );
};