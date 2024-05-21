import styles from './Nav.module.scss'
import { Link } from 'react-router-dom'
import { FiShoppingCart, FiUser, FiLogIn } from "react-icons/fi";
import {GoSignOut} from 'react-icons/go'
import { useAuth } from '../../../hooks/useAuth';
import { getAuth, signOut } from 'firebase/auth';
import app from '../../../firebase';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { removeUser } from '../../../store/user/user.slice';
import { removeUserId } from '../../../store/cart/cart.slice';
import NavCartBlock from './nav-cart-block/NavCartBlock';

function Nav() {
  const { isAuth } = useAuth();
  const auth = getAuth(app);
  const dispatch = useAppDispatch();
  const {products} = useAppSelector(state=>state.cartSlice)
  const handleSignOut = () => {
    signOut(auth).then(() => {
      dispatch(removeUser());
      dispatch(removeUserId());
    }).catch(error => {
      console.error(error)
    })
  }
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <div className={styles.counter}>
            <Link to={"/cart"}>
              {" "}
              <FiShoppingCart title='장바구니'/>
            </Link>
            {products.length > 0 && <b>{products.length}</b>}
            {products.length > 0 && 
              <div className={styles.nav_hover_cart}>
                <NavCartBlock/>
              </div>
            }
          </div>
        </li>
        {}
        <li>
          <div className={styles.counter}>
            <Link to={"/order"}>
              {" "}
              <FiUser title="주문" />
            </Link>
          </div>
        </li>
        <li>
          {isAuth ? (
            <GoSignOut className={styles.nav_sign_out} title='로그아웃' onClick={handleSignOut} />
          ): (
            <Link to={"/login"}>
              <FiLogIn title="로그인" />
            </Link>  
          )}
          
          
        </li>
      </ul>
    </nav>
  );
}

export default Nav