import styles from './CategoryTab.module.scss'
import { setActiveCategory} from '../../../../store/categories/categories.slice'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import {FC} from 'react'
import { CategoriesName } from '../../../../store/categories/categories.type';
type  CategoryTabProps = {
  text: string;
  categoryName: CategoriesName;
}
const CategoryTab:FC<CategoryTabProps> = ({ text, categoryName }) => {
  const category = useAppSelector((state) => state.categoriesSlice);
  const dispatch = useAppDispatch();
  const getActiveCategory = () => {
    dispatch(setActiveCategory(categoryName))
  }
  return (
    <button
      className={
        categoryName === category
          ? styles.active_category
          : styles.category_button
      }
      onClick={getActiveCategory}
    >
      {text}
    </button>
  )
}

export default CategoryTab