//import s from './List.module.css';

import ContactList from '../ContactList/ContactList';
import SearchBox from '../SearchBox/SearchBox';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
//import { useRef } from 'react';
import { selectFilteredContacts } from '../../redux/contacts/contactsSlice';
import { selectLoading, selectError } from '../../redux/contacts/contactsSlice';
import { useDispatch } from 'react-redux';
import ContactsForm from '../ContactForm/ContactsForm';
import { fetchContacts } from '../../redux/contacts/operations';
import { addContacts } from '../../redux/contacts/operations';
import Modal from '../Modal/Modal';
// import { selectToken, selectIsLoggedIn } from '../../redux/auth/selectors';

function List() {
  // const [hasFetched, setHasFetched] = useState(false);
  //const isFetching = useRef(false);
  const dispatch = useDispatch();
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isOpen, setIsOpen] = useState(false);
  const contacts = useSelector(selectFilteredContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  // const token = useSelector(selectToken);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // useEffect(() => {
  //   // if (!token || hasFetched) return;
  //   setHasFetched(true);
  //   //if (!token || isFetching.current) return;
  //   // isFetching.current = true;

  //   const abortController = new AbortController();

  //   dispatch(fetchContacts({ signal: abortController.signal }));

  //   return () => {
  //     abortController.abort();
  //   };
  // }, [dispatch, isLoggedIn, token, hasFetched]);

  const handleSubmit = (values, options) => {
    dispatch(addContacts(values));
    setIsOpen(false);
    options.resetForm();
  };

  return (
    <div>
      <ContactsForm onSubmit={handleSubmit} />
      <SearchBox />
      {loading && !error && <b>Request in progress...</b>}
      {contacts.length > 0 ? <ContactList /> : <p>No contacts found.</p>}
      {isOpen && (
        <Modal>
          <ContactsForm
            handleSubmit={handleSubmit}
            initialValues={{ name: '', number: '' }}
          />
        </Modal>
      )}
    </div>
  );
}
export default List;
