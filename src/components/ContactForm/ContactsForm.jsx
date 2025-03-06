import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import s from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { selectContactsState } from '../../redux/contacts/contactsSlice';
import { addContacts } from '../../redux/contacts/operations';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Name is required'),
  number: Yup.string()
    .matches(/^\+?[0-9\s\-()]*$/, 'Invalid phone number')
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Phone number is required'),
});

function ContactsForm({ onSubmit, initialValues = { name: '', number: '' } }) {
  const contacts = useSelector(
    state => selectContactsState(state)?.items || []
  );

  const dispatch = useDispatch();

  //const handleSubmit = (values, actions) => {
  const defaultHandleSubmit = useCallback(
    (values, options) => {
      const isDuplicate = contacts.some(
        contact =>
          contact.name.toLowerCase() === values.name.trim().toLowerCase()
      );
      if (isDuplicate) {
        alert(`${values.name} is already in contacts!`);
        options.resetForm();
        return;
      }
      dispatch(addContacts(values));

      options.resetForm();
    },
    [contacts, dispatch]
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit || defaultHandleSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className={s.formWrapper}>
          <div>
            <label htmlFor="name">Name:</label>
            <Field
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              required
              className={s.input}
            />
            <ErrorMessage name="name" component="div" className={s.error} />
          </div>

          <div>
            <label htmlFor="number" aria-label="Enter contact number">
              Number:
            </label>
            <Field
              type="tel"
              id="number"
              name="number"
              autoComplete="tel"
              required
              className={s.input}
            />
            <ErrorMessage name="number" component="div" className={s.error} />
          </div>

          <button type="submit" className={s.button}>
            {isSubmitting ? 'Adding...' : 'Add Contact'}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default ContactsForm;
