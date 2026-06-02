import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useProductStore } from '../store/productStore';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { SortFilter } from '../components/Filter/SortFilter';
import { CategoryFilter } from '../components/Filter/CategoryFilter';
import { PaginationComponent } from '../components/Pagination/Pagination';
import '../styles/ProductsPage.scss';

export function ProductsPage() {
  const { t } = useTranslation();
  const { products, loading, error, fetchProducts, selectedCategory } = useProductStore();

  useEffect(() => {
    fetchProducts(0);
  }, []);

  return (
    <div className="products-page">
      <div className="products-layout">
        <aside className="products-sidebar">
          <CategoryFilter />
        </aside>
        <div className="products-main">
          <div className="products-toolbar">
            <div className="toolbar-left">
              <h1 className="page-title">
                {selectedCategory
                  ? selectedCategory.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
                  : t('products.page_title')}
              </h1>
            </div>
            <div className="toolbar-right">
              <SortFilter />
            </div>
          </div>

          {error && <div className="error-message">{t('products.error')}</div>}

          {loading ? (
            <div className="loading-state">
              <div className="spinner" />
              <p>{t('products.loading')}</p>
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
            <div className="empty-state">
              <span className="empty-icon">🔍</span>
              <p>{t('products.no_products')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
