import { useForm } from 'react-hook-form';
import {FC} from 'react'
import styles from './Form.module.scss'
import {SubmitHandler, FieldValues} from 'react-hook-form'
type FormProps = {
  title: string;
  getDataForm: (email: string, password: string) => void;
  firebaseError: string
}
type Input = {
  email: string;
  password: string;
}
const Form: FC<FormProps> = ({ title, getDataForm, firebaseError }) => {
  const { register, handleSubmit, formState, reset } = useForm<Input>({
    mode: "onChange",
  });
  const onSubmit:SubmitHandler<FieldValues> = ({ email, password }) => {
    getDataForm(email, password);
    reset();
  };
  const userEmail = {
    required: "필수 필드입니다.",
  };
  const userPassword = {
    required: "필수 필드입니다.",
    minLength: {
      value: 6,
      message: "최소 6자 입니다.",
    },
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="email"
          placeholder="E-mail"
          {...register("email", userEmail)}
        />
        {formState.errors?.email && (
          <div>
            <span className={styles.form_error}>
              {formState.errors.email.message}
            </span>
          </div>
        )}
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          {...register("password", userPassword)}
        />
        {formState.errors?.password && (
          <div>
            <span className={styles.form_error}>
              {formState.errors.password.message}
            </span>
          </div>
        )}
      </div>
      <button type="submit">{title}</button>
      {firebaseError && (
        <span className={styles.form_error}>{firebaseError}</span>
      )}
    </form>
  );
}

export default Form