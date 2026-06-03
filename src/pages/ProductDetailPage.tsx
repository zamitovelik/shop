import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';
import { useToastStore } from '../store/toastStore';
import '../styles/ProductDetailPage.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
 
export function ProductDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [quantity, setQuantity] = useState(1);
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
 
  const images = product.images && product.images.length > 0
    ? product.images
    : [product.thumbnail];
 
 const handleAddToCart = () => {
  addToCart(product, quantity);
  addToast(t('notifications.added_to_cart'), 'success');

  setQuantity(1);
}
 
  return (
    <div className="product-detail-page">
      <Link to="/" className="back-link">
        {t('product_detail.back')}
      </Link>
 
      <div className="product-detail-container">
        <div className="images-section">
          {images.length > 1 ? (
            <>
              <Swiper
                modules={[Navigation, Pagination, Thumbs]}
                navigation
                pagination={{ clickable: true }}
                thumbs={{ swiper: thumbsSwiper }}
                className="main-swiper"
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="main-image"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://via.placeholder.com/500?text=No+Image';
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
 
              <Swiper
                modules={[Thumbs]}
                onSwiper={setThumbsSwiper}
                slidesPerView={4}
                spaceBetween={10}
                watchSlidesProgress
                className="thumbs-swiper"
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="thumb-image"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://via.placeholder.com/100?text=No+Image';
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          ) : (
            <img
              src={images[0]}
              alt={product.title}
              className="single-image"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://via.placeholder.com/500?text=No+Image';
              }}
            />
          )}
        </div>
 
        <div className="details-section">
          <h1 className="detail-title">{product.title}</h1>
 
          {product.category && (
            <p className="detail-category">{t('product_detail.category')} {product.category}</p>
          )}
 
          {product.brand && (
            <p className="detail-brand">{t('product_detail.brand')} {product.brand}</p>
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
                  {t('products.discount', { percent: product.discountPercentage.toFixed(0) })}
                </span>
              )}
            </div>
          </div>
 
          <div className="stock-section">
            <div className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
              {product.stock > 0 ? (
                <>
                  <span className="stock-badge">{t('product_detail.in_stock')}</span>
                  <span className="stock-count">{product.stock} {t('products.available')}</span>
                </>
              ) : (
                <span className="stock-badge out">{t('product_detail.out_of_stock')}</span>
              )}
            </div>
          </div>
 
          {product.rating && (
            <div className="rating-section">
              <span className="rating">★ {product.rating.toFixed(1)}</span>
            </div>
          )}
 
          <div className="actions">
            <div className="quantity-selector">
              <button
                className="qty-decrease"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                −
              </button>
              <input
                type="number"
                className="qty-field"
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (val > 0) setQuantity(val);
                }}
                min="1"
                max={product.stock}
              />
              <button
                className="qty-increase"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
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
 
