import { useAppSelector } from '../../../hooks/redux'
import styles from './CartList.module.scss'
import CartItem from './cart-item/CartItem'
const CartList = () => {
  const {products} = useAppSelector(state=>state.cartSlice)
  return (
    <div className={styles.cart_list}>
      {products.map(item => {
        return <CartItem key={item.id} item={item} />
      })}
    </div>
  )
}

export default CartList