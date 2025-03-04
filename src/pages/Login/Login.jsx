import { Formik, Form, Field } from 'formik';
import s from './Login.module.css';
import { loginThunk } from '../../redux/auth/authOperations';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

//name: 'Sonic the Hedgehog', email: 'sonichedge@mail.com', number: '', password: 'sonichedge007'

const Login = () => {
  //const notify = () => toast('Here is your toast.');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    email: '',
    password: '',
  };
  const handleSubmit = (values, options) => {
    console.log('values:', values);
    dispatch(loginThunk(values))
      .unwrap()
      .then(res => {
        console.log('Res:', res);

        toast.success(`Welcome, ${res.user.email}`);
        navigate(`/contacts`, { replace: true });
      })
      .catch(() => toast.error('Invalid data'));
    options.resetForm();
  };
  return (
    <div className={s.formWrapper}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <label className={s.label}>
            <span>E-mail</span>
            <Field name="email" type="email" autoComplete="email" required />
          </label>
          <label className={s.label}>
            <span>Password</span>
            <Field name="password" type="password" autoComplete="off" />
          </label>
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
