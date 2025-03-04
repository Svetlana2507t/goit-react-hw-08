import { Formik, Form, Field } from 'formik';
import s from './Register.module.css';
import { useDispatch } from 'react-redux';
import { registerThunk } from '../../redux/auth/authOperations';

const Register = () => {
  const dispatch = useDispatch();
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };
  const handleSubmit = (values, options) => {
    console.log('values:', values);
    dispatch(registerThunk(values));
    options.resetForm();
  };

  return (
    <div className={s.formWrapper}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <label className={s.label}>
            <span>Name</span>
            <Field name="name" type="text" autoComplete="off" required />
          </label>
          <label className={s.label}>
            <span>E-mail</span>
            <Field name="email" type="email" autoComplete="email" required />
          </label>

          <label className={s.label}>
            <span>Password</span>
            <Field
              name="password"
              type="password"
              autoComplete="new-password"
              required
            />
          </label>
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
