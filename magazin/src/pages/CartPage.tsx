import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import '../styles/CartPage.scss';

export function CartPage() {
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
        </div>

        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Start adding some products!</p>
          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p className="item-count">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
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
                  <p className="item-description">{item.product.description.substring(0, 60)}...</p>

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
                  >
                    −
                  </button>
                  <input
                    type="number"
                    className="qty-input"
                    value={item.quantity}
                    onChange={(e) => {
                      const newQty = parseInt(e.target.value, 10);
                      if (newQty > 0) {
                        updateQuantity(item.product.id, newQty);
                      }
                    }}
                    min="1"
                  />
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <div className="item-total">
                  <div className="total-amount">${itemTotal.toFixed(2)}</div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.product.id)}
                    title="Remove from cart"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items ({totalItems}):</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <div className="summary-row shipping">
            <span>Shipping:</span>
            <span className="free">FREE</span>
          </div>

          <div className="summary-row tax">
            <span>Tax (estimated):</span>
            <span>${(totalPrice * 0.1).toFixed(2)}</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row total">
            <span>Total:</span>
            <span className="total-price">
              ${(totalPrice + totalPrice * 0.1).toFixed(2)}
            </span>
          </div>

          <button className="checkout-btn">Proceed to Checkout</button>

          <button className="continue-shopping-link" onClick={() => (window.location.href = '/')}>
            ← Continue Shopping
          </button>

          <button className="clear-cart-btn" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
