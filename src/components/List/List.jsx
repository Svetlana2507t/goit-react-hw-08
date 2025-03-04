//import s from './List.module.css';
//import Contact from '../Contact/Contact';

import ContactList from '../ContactList/ContactList';
import SearchBox from '../SearchBox/SearchBox';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { selectFilteredContacts } from '../../redux/contacts/contactsSlice';
import { selectLoading, selectError } from '../../redux/contacts/contactsSlice';
import { useDispatch } from 'react-redux';
import ContactsForm from '../ContactForm/ContactsForm';
import { fetchContacts } from '../../redux/contacts/operations';
import { addContacts } from '../../redux/contacts/operations';
import Modal from '../Modal/Modal';
import { selectToken } from '../../redux/auth/selectors';
import { setAuthHeader } from '../../redux/auth/authOperations';

function List() {
  const isFetching = useRef(false);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const contacts = useSelector(selectFilteredContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      setAuthHeader(token);
    }
  }, [token]);

  useEffect(() => {
    if (!token || isFetching.current) return;
    isFetching.current = true;

    const abortController = new AbortController();

    dispatch(fetchContacts({ signal: abortController.signal }));

    return () => {
      abortController.abort();
    };
  }, [dispatch, token]);

  const handleSubmit = (values, options) => {
    dispatch(addContacts(values));
    setIsOpen(false);
    options.resetForm();
  };

  return (
    <div>
      <ContactsForm />
      <SearchBox />
      {loading && !error && <b>Request in progress...</b>}
      {contacts.length > 0 ? <ContactList /> : <p>No contacts found.</p>}
      {isOpen && (
        <Modal>
          <ContactsForm
            handleSubmit={handleSubmit}
            initialValues={{ contacts: '' }}
          />
        </Modal>
      )}
    </div>
  );
}
export default List;
