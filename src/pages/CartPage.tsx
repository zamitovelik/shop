import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCartStore } from '../store/cartStore';
import { useToastStore } from '../store/toastStore';
import '../styles/CartPage.scss'
import korzina from "../assets/korzina.png";

export function CartPage() {
  const { t } = useTranslation();
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const { addToast } = useToastStore();

  const handleRemove = (id: number) => {
    removeFromCart(id);
    addToast(t('notifications.removed_from_cart'), 'error');
  };
  
const handleCheckout = () => {
  addToast(t('notifications.processing_order'), 'info');

  setTimeout(() => {
    clearCart();
    addToast(t('notifications.order_success'), 'success');
  }, 800);
};

  const handleClear = () => {
    clearCart();
    addToast(t('notifications.cart_cleared'), 'info');
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-header">
          <h1>{t('cart.page_title')}</h1>
        </div>
        <div className="empty-cart">
          <div className="empty-cart-icon"><img src={korzina} alt="" className='korzina-img' /></div>
          <h2>{t('cart.empty_title')}</h2>
          <p>{t('cart.empty_message')}</p>
          <Link to="/" className="continue-shopping-btn">
            {t('cart.continue_shopping')}
          </Link>
        </div>
      </div>
    );
  }

  const tax = totalPrice * 0.1;
  const grandTotal = totalPrice + tax;

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>{t('cart.page_title')}</h1>
        <p className="item-count">
          {totalItems === 1
            ? t('cart.item_singular', { count: totalItems })
            : t('cart.items', { count: totalItems })}
        </p>
      </div>
      

      <div className="cart-container">
        <div className="cart-items">
          {items.map((item) => {
            const discountedPrice =
              item.product.price * (1 - item.product.discountPercentage / 100);
            const itemTotal = discountedPrice * item.quantity;

            return (
              <div key={item.product.id} className="cart-item">
                <div className="item-image">
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://via.placeholder.com/100?text=No+Image';
                    }}
                  />
                </div>

                <div className="item-details">
                  <h3>
                    <Link to={`/product/${item.product.id}`}>
                      {item.product.title}
                    </Link>
                  </h3>
                  <p className="item-description">
                    {item.product.description.substring(0, 60)}...
                  </p>
                  <div className="item-pricing">
                    {item.product.discountPercentage > 0 && (
                      <span className="original-price">
                        ${item.product.price.toFixed(2)}
                      </span>
                    )}
                    <span className="discounted-price">
                      ${discountedPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="item-quantity">
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >−</button>
                  <input
                    type="number"
                    className="qty-input"
                    value={item.quantity}
                    onChange={(e) => {
                      const newQty = parseInt(e.target.value, 10);
                      if (newQty > 0) updateQuantity(item.product.id, newQty);
                    }}
                    min="1"
                  />
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >+</button>
                </div>

                <div className="item-total">
                  <div className="total-amount">${itemTotal.toFixed(2)}</div>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(item.product.id)}
                    title={t('cart.remove')}
                  ><img src={korzina} alt="" className='korzina-for' /></button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="cart-summary">
          <h2>{t('cart.order_summary')}</h2>

          <div className="summary-row">
            <span>{t('cart.items_count', { count: totalItems })}</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <div className="summary-row shipping">
            <span>{t('cart.shipping')}</span>
            <span className="free">{t('cart.free')}</span>
          </div>

          <div className="summary-row tax">
            <span>{t('cart.tax')}</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="summary-divider" />

          <div className="summary-row total">
            <span>{t('cart.total')}</span>
            <span className="total-price">${grandTotal.toFixed(2)}</span>
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>{t('cart.checkout')}</button>

          <Link to="/" className="continue-shopping-link">
            ← {t('cart.continue_shopping')}
          </Link>

          <button className="clear-cart-btn" onClick={handleClear}>
            {t('cart.clear_cart')}
          </button>
        </div>
      </div>
    </div>
  );
}
