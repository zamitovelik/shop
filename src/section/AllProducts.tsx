import { useEffect } from "react";
import { useProductStore } from "../store/productStore";
import { ProductCard } from "../components/ProductCard/ProductCard";
import { useTranslation } from 'react-i18next';


export const AllProducts = () => {

   const { t } = useTranslation();
  const { products, currentPage, hasMore, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts(0, false);
  }, []);

  const loadMore = () => {
    fetchProducts(currentPage + 1, true);
  };

  return (
    <div>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasMore && (
        <div className="load-more-wrapper">
          <button className="load-more-btn" onClick={loadMore}>
            {t('seemore.search')}
          </button>
        </div>
      )}
    </div>
  );
};

