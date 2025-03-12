//import s from './List.module.css';
import { useState, useEffect } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFilteredContacts,
  selectLoading,
  selectError,
} from '../../redux/contacts/contactsSlice';
import ContactsForm from '../ContactForm/ContactsForm';
import ContactList from '../ContactList/ContactList';
import {
  fetchContacts,
  addContacts,
  editContact,
} from '../../redux/contacts/operations';

function List() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [currentContact, setCurrentContact] = useState(null);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleEdit = contact => {
    setCurrentContact(contact);
  };

  const handleSubmit = (values, options) => {
    if (currentContact) {
      dispatch(editContact({ id: currentContact.id, updatedData: values }));
    } else {
      dispatch(addContacts(values));
    }
    options.resetForm();
    setCurrentContact(null);
  };

  return (
    <div>
      <ContactsForm
        onSubmit={handleSubmit}
        currentContact={currentContact}
        initialValues={{
          name: currentContact?.name || '',
          number: currentContact?.number || '',
        }}
      />
      <SearchBox />
      {loading && !error && <b>Request in progress...</b>}
      {contacts.length > 0 ? (
        <ContactList contacts={contacts} onEdit={handleEdit} />
      ) : (
        <p>No contacts found.</p>
      )}
    </div>
  );
}
export default List;
