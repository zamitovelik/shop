import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';
import { useToastStore } from '../store/toastStore';

import '../styles/ProductDetailPage.scss';

export function ProductDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string>('');

  const {
    selectedProduct: product,
    selectedProductLoading: loading,
    selectedProductError: error,
    fetchProductById,
  } = useProductStore();

  const { addToCart } = useCartStore();
  const { addToast } = useToastStore();

  useEffect(() => {
    if (id) {
      fetchProductById(parseInt(id));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [id, fetchProductById]);

  const images =
    product?.images?.length
      ? product.images
      : product?.thumbnail
        ? [product.thumbnail]
        : [];

  useEffect(() => {
    if (product?.thumbnail) {
      setActiveImage(product.thumbnail);
    }
  }, [product]);

  if (error) {
    return (
      <div className="error-page">
        <p>{error}</p>
        <Link to="/">{t('product_detail.back')}</Link>
      </div>
    );
  }

  if (loading || !product) {
    return <div className="loading-detail">{t('product_detail.loading')}</div>;
  }

  const discountedPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    addToast(t('notifications.added_to_cart'), 'success');
    setQuantity(1);
  };

  return (
    <div className="product-detail-page">
      <Link to="/" className="back-link">
        {t('product_detail.back')}
      </Link>

      <div className="product-detail-container">

        {/* IMAGES */}
        <div className="images-section">
          <img
            src={activeImage || images[0]}
            alt={product.title}
            className="main-image"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://via.placeholder.com/500?text=No+Image';
            }}
          />

          {images.length > 1 && (
            <div className="thumbs-row">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className={`thumb ${activeImage === img ? 'active' : ''}`}
                  onClick={() => setActiveImage(img)}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://via.placeholder.com/100?text=No+Image';
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* DETAILS */}
        <div className="details-section">
          <h1 className="detail-title">{product.title}</h1>

          {product.category && (
            <p className="detail-category">
              {t('product_detail.category')} {product.category}
            </p>
          )}

          {product.brand && (
            <p className="detail-brand">
              {t('product_detail.brand')} {product.brand}
            </p>
          )}

          <p className="detail-description">{product.description}</p>

          <div className="price-section">
            <div className="prices">
              <span className="original-price">
                ${product.price.toFixed(2)}
              </span>

              <span className="discounted-price">
                ${discountedPrice}
              </span>

              {product.discountPercentage > 0 && (
                <span className="discount-info">
                  {t('products.discount', {
                    percent: product.discountPercentage.toFixed(0),
                  })}
                </span>
              )}
            </div>
          </div>

          <div className="stock-section">
            <div
              className={`stock-status ${
                product.stock > 0 ? 'in-stock' : 'out-of-stock'
              }`}
            >
              {product.stock > 0 ? (
                <>
                  <span className="stock-badge">
                    {t('product_detail.in_stock')}
                  </span>
                  <span className="stock-count">
                    {product.stock} {t('products.available')}
                  </span>
                </>
              ) : (
                <span className="stock-badge out">
                  {t('product_detail.out_of_stock')}
                </span>
              )}
            </div>
          </div>

          {product.rating && (
            <div className="rating-section">
              <span className="rating">★ {product.rating.toFixed(1)}</span>
            </div>
          )}

          {/* ACTIONS */}
          <div className="actions">
            <div className="quantity-selector">
              <button
                className="qty-decrease"
                onClick={() =>
                  setQuantity((q) => Math.max(1, q - 1))
                }
                disabled={quantity <= 1}
              >
                −
              </button>

              <input
                type="number"
                className="qty-field"
                value={quantity}
                min="1"
                max={product.stock}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val > 0) setQuantity(val);
                }}
              />

              <button
                className="qty-increase"
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>

            <button
              className="add-to-cart-btn"
              disabled={product.stock === 0}
              onClick={handleAddToCart}
            >
              {t('product_detail.add_to_cart')}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

