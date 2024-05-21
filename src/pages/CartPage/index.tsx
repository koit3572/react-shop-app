import { useAppSelector } from '../../hooks/redux'
import CartEmpty from '../../components/cart-empty/CartEmpty';
import CartList from './cart-list/CartList';
import CheckOut from './checkout/CheckOut';
function CartPage() {
  const { products } = useAppSelector(state => state.cartSlice);

  return (
    <div className='page'>
      {!products.length ? (
        <CartEmpty title='Cart'/>
      ) : (
        <div className='container'>
          <h1>장바구니</h1>
            <CartList />
            <CheckOut/>
        </div>
      )}
    </div>
  )
}

export default CartPage