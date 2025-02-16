import { nanoid } from 'nanoid';
import { useEffect } from 'react';
//import initialContacts from '../../../contacts.json';
import s from './App.module.css';
import SearchBox from '../SearchBox/SearchBox';
import ContactList from '../ContactList/ContactList';
import ContactForm from '../ContactForm/ContactForm';
import { useDispatch, useSelector } from 'react-redux';
import { add, del } from '../../redux/contactsSlice';
import { filter } from '../../redux/filtersSlice';

function App() {
  const searchFilter = useSelector(state => state.filters.filters.name);
  //const contacts = useSelector(state => state.contacts.contacts.items);
  const contacts = useSelector(state => state.contacts.contacts.items);
  const contactsState = useSelector(state => state.contacts);

  const dispatch = useDispatch();

  const handleAddContact = newContact => {
    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${newContact.name} is already in contacts!`);
      return;
    }

    dispatch(add({ id: nanoid(), ...newContact }));
  };

  const handleSearch = value => {
    dispatch(filter(value));
  };

  const handleDeleteContact = contactId => {
    dispatch(del(contactId));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contactsState));
  }, [contactsState]);

  return (
    <div className={s.container}>
      <h1 className={s.uppercase}>Phonebook</h1>
      <ContactForm onAdd={handleAddContact} />
      <SearchBox value={searchFilter} onSearch={handleSearch} />
      {filteredContacts.length > 0 ? (
        <ContactList
          contacts={filteredContacts}
          onDelete={handleDeleteContact}
        />
      ) : (
        <p>Sorry, there are no contacts matching your search.</p>
      )}
    </div>
  );
}

export default App;
