import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { fetchOrder } from "../../../store/order/order.slice";
import styles from './OrdersList.module.scss'
import { useAuth } from "../../../hooks/useAuth";
import CartEmpty from '../../../components/cart-empty/CartEmpty'
import OrderItem from './order-item/OrderItem'
const OrderList = () => {
  const { order } = useAppSelector((state) => state.orderSlice)
  const { id } = useAuth();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchOrder(id))
  }, [id])
  if (!order.length) {
    return <CartEmpty title='주문 내역'/>
  }
  return (
    <div className={styles.orders}>
      {order.map((item) => (
        <div key={item.id}>
          <div className={styles.order_header}>
            <h3>주문 번호_{item.id}</h3>
            <p>합계 : $ {item.totalPrice.toFixed(2)}</p>
          </div>
          <ul className={styles.orders_list}>
            {item.products.map((item) => (
              <OrderItem key={item.id} order={item} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default OrderList