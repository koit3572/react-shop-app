import { useEffect } from 'react'
import { useAppDispatch,useAppSelector } from '../../../hooks/redux'
import styles from './CardList.module.scss'
import CardItem from './card-item/CardItem'
import {fetchProducts} from '../../../store/products/products.slice'
import CardSkeleton from '../card-skeleton/CardSkeleton'
const CardList = () => {
  const dispatch = useAppDispatch();
  const { products,isLoading } = useAppSelector(state => state.productsSlice)
  const category = useAppSelector((state) => state.categoriesSlice);
  useEffect(() => {
    dispatch(fetchProducts(category?.toLowerCase()));
  }, [category])
  if (isLoading) {
    return <CardSkeleton/>
  }
  return (
    <ul className={styles.card_list}>
      {products.map((item) => <CardItem key={item.id} item={item}/>)}
    </ul>
  )
}

export default CardList