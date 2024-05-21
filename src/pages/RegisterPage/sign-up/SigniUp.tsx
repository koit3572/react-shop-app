import { useState } from 'react'
import Form from "../../../components/form/Form";
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../../../firebase';
import { setUser } from '../../../store/user/user.slice';
import { useDispatch } from 'react-redux';
import { setUserId } from '../../../store/cart/cart.slice';
function SigniUp() {
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState("");
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const handleSignupAdnLogin = (email:string,password:string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // 리덕스 스토어에 담는 로직
        dispatch(setUser({
          email: userCredential.user.email as string,
          token: userCredential.user.refreshToken,
          id: userCredential.user.uid
        }))
        dispatch(setUserId(userCredential.user.uid));
        navigate("/");
      })
      .catch((error) => {
        return (
          error && setFirebaseError("이메일 또는 비밀번호가 잘못되었습니다.")
        );
      });
  }
  return (
    <Form
      title={'가입하기'}
      getDataForm={handleSignupAdnLogin}
      firebaseError={firebaseError}
    />
  )
}

export default SigniUp