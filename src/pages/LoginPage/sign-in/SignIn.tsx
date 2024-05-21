import { useState } from 'react'
import Form from '../../../components/form/Form'
import { useNavigate } from 'react-router-dom'
import app from '../../../firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/user/user.slice';
import { setUserId } from '../../../store/cart/cart.slice';

function SignIn() {
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState('');
  const dispatch = useDispatch();
  const auth = getAuth(app);
  const handleLogin = (email:string, password:string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        dispatch(setUser({
          email: userCredential.user.email as string,
          token: userCredential.user.refreshToken,
          id:userCredential.user.uid
        }))
        dispatch(setUserId(userCredential.user.uid))
        navigate('/')
      })
      .catch(error => {
        return error && setFirebaseError('이메일 또는 비밀번호가 잘못되었습니다.')
      })
  }
  return (
    <Form
      title={'로그인'}
      getDataForm={handleLogin}
      firebaseError={firebaseError}
    />
  )
}

export default SignIn