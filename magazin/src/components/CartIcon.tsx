import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import '../styles/CartIcon.scss';

export function CartIcon() {
  const { totalItems } = useCartStore();

  return (
    <Link to="/cart" className="cart-icon-link">
      <div className="cart-icon">
        🛒
        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
      </div>
    </Link>
  );
}
