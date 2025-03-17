//import s from './App.module.css';
import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Home from '../../pages/Home/Home';
import Contacts from '../../pages/Contacts/Contacts';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import NotFound from '../../pages/NotFound/NotFound';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { refreshUser } from '../../redux/auth/authOperations';

//import { fetchContacts } from '../../redux/contactsOps';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUser());
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
    // <div />
  );
}

export default App;
