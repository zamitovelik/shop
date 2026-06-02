import { useEffect } from 'react';
import { useProductStore } from '../store/productStore';
import { ProductCard } from '../components/ProductCard';
import { SortFilter } from '../components/SortFilter';
import { PaginationComponent } from '../components/Pagination';
import '../styles/ProductsPage.scss';

export function ProductsPage() {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts(0);
  }, []);

  return (
    <div className="products-page">
      <header className="page-header">
       
      </header>

      <div className="products-container">
        <aside className="filters-sidebar">
          <SortFilter />
        </aside>

        <main className="products-main">
          {error && <div className="error-message">{error}</div>}

          {loading ? (
            <div className="loading-spinner">
              <p>Loading products...</p>
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="products-grid">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <PaginationComponent />
            </>
          ) : (
            <div className="no-products">
              <p>No products found</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
