import { Link } from 'react-router-dom';
import type { Product } from '../types/product';
import '../styles/ProductCard.scss';
import { useTranslation } from 'react-i18next';


interface ProductCardProps {  
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useTranslation()
  const discountedPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
      <div className="product-card">
        <div className="product-image-container">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="product-image"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://via.placeholder.com/200?text=No+Image';
            }}
          />
          {product.discountPercentage > 0 && (
            <div className="discount-badge">
              -{product.discountPercentage.toFixed(0)}%
            </div>
          )}
        </div>

        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>

          <p className="product-description">{product.description.substring(0, 80)}...</p>

          <div className="product-stock">
            Stock: <strong>{product.stock}</strong>
          </div>

          <div className="product-price-section">
            <div className="prices">
              <span className="original-price">
                ${product.price.toFixed(2)}
              </span>
              <span className="discounted-price">
                ${discountedPrice}
              </span>
            </div>
          </div>

          <button className="view-details-btn">{t("view_details")}</button>
        </div>
      </div>
    </Link>
  );
}
