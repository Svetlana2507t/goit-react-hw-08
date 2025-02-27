//import s from './App.module.css';
import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Home from '../../pages/Home/Home';
import Contacts from '../../pages/Contacts/Contacts';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import NotFound from '../../pages/NotFound/NotFound';

// import SearchBox from '../SearchBox/SearchBox';
// import ContactList from '../ContactList/ContactList';
// import ContactForm from '../ContactForm/ContactsForm';
import { useDispatch } from 'react-redux';
// import { selectError, selectLoading } from '../../redux/contactsSlice';
import { useEffect, useRef } from 'react';
import { fetchContacts } from '../../redux/contactsOps';

function App() {
  const dispatch = useDispatch();
  // const loading = useSelector(selectLoading);
  // const error = useSelector(selectError);
  const isFetching = useRef(false);

  useEffect(() => {
    if (isFetching.current) return;
    isFetching.current = true;
    const abortController = new AbortController();

    dispatch(fetchContacts({ signal: abortController.signal }));
    return () => {
      abortController.abort();
    };
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* index means path="/" for inline route (Home)  */}
        <Route index element={<Home />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
    // <div className={s.container}>
    // {/* <h1 className={s.uppercase}>Phonebook</h1> */}
    // {/* <ContactForm />
    // <SearchBox />
    // {loading && !error && <b>Request in progress...</b>}
    // <ContactList /> */}
    // </div>
  );
}

export default App;
