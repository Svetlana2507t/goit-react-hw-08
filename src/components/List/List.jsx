//import s from './List.module.css';
//import Contact from '../Contact/Contact';

import ContactList from '../ContactList/ContactList';
import SearchBox from '../SearchBox/SearchBox';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { selectFilteredContacts } from '../../redux/contacts/contactsSlice';
import { selectLoading, selectError } from '../../redux/contacts/contactsSlice';
import { useDispatch } from 'react-redux';
import ContactsForm from '../ContactForm/ContactsForm';
import { fetchContacts } from '../../redux/contacts/operations';

function List() {
  const isFetching = useRef(false);
  const dispatch = useDispatch();

  const contacts = useSelector(selectFilteredContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    if (isFetching.current) return;
    isFetching.current = true;
    const abortController = new AbortController();

    dispatch(fetchContacts({ signal: abortController.signal }));
    // .then(response => {
    //   console.log('✅ FetchContacts dispatched successfully:', response);
    // })
    // .catch(error => {
    //   console.error('❌ Error in dispatching fetchContacts:', error);
    // });

    return () => {
      abortController.abort();
    };
  }, [dispatch]);

  return (
    <div>
      <ContactsForm />
      <SearchBox />
      {loading && !error && <b>Request in progress...</b>}
      {contacts.length > 0 ? <ContactList /> : <p>No contacts found.</p>}
    </div>
  );
}
export default List;
