import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { addToCart } from '../../../../store/cart/cart.slice';
import { IProduct } from '../../../../store/products/products.type';
import styles from './CardItem.module.scss'
import { Link } from 'react-router-dom'
import {FC} from 'react'
type CardItemProps = {
  item:IProduct
}
const CardItem:FC<CardItemProps> = ({ item }) => {
  const { products } = useAppSelector(state => state.cartSlice);
  // some() : 배열안의 어떤 요소라도 주어진 판별 함수를 적어도 하나라도 통과하는지 테스트 
  const productMatching = products.some(product => product.id === item.id);
  const dispatch = useAppDispatch();
  const addItemToCart = () => {
    dispatch(addToCart(item))
  }
  return (
    <li className={styles.card_item}>
      <Link to={`product/${item.id}`}>
        <img
          src={item.image}
          alt="product card"
          width={"80%"}
          height={"200px"}
        />
      </Link>
      <h5>{item.title.substring(0, 15)}...</h5>
      <div>
        <button disabled={productMatching} onClick={()=>!productMatching && addItemToCart()}>
          {productMatching ? "장바구니에 이미 있는 상품" : "장바구니에 담기"}
        </button>
        <p>$ {item.price}</p>
      </div>
    </li>
  );
}

export default CardItem