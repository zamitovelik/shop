import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import './CartIcon.scss'
import korzina from '../../assets/korzina.png'

export function CartIcon() {
  const { totalItems } = useCartStore();

  return (
    <Link to="/cart" className="cart-icon-link">
      <div className="cart-icon">
        <img src={korzina} alt="" className='cart-icon-img'/>
        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
      </div>
    </Link>
  );
}
