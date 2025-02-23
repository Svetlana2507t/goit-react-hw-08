import s from './App.module.css';
import SearchBox from '../SearchBox/SearchBox';
import ContactList from '../ContactList/ContactList';
import ContactForm from '../ContactForm/ContactsForm';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectLoading } from '../../redux/contactsSlice';
import { useEffect } from 'react';
import { fetchContacts } from '../../redux/contactsOps';

function App() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  //const isFetching = useRef(false);

  useEffect(() => {
    //if (isFetching.current) return;
    //isFetching.current = true;
    const abortController = new AbortController();

    dispatch(fetchContacts({ signal: abortController.signal }));
    return () => {
      abortController.abort();
    };
  }, [dispatch]);
  return (
    <div className={s.container}>
      <h1 className={s.uppercase}>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {loading && !error && <b>Request in progress...</b>}
      <ContactList />
    </div>
  );
}

export default App;
