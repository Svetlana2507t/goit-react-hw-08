import Contact from '../Contact/Contact';
import s from './ContactList.module.css';
//import { useSelector } from 'react-redux';
//import { selectFilteredContacts } from '../../redux/contacts/contactsSlice';
//import { selectFilteredContacts } from '../../redux/contacts/contactsSlice';

function ContactList({ contacts, onEdit }) {
  //const contacts = useSelector(selectFilteredContacts);

  console.log('Contacts from Redux Selector:', contacts);
  console.log('contacts:', contacts);

  return (
    <ul className={s.ul}>
      {contacts.length > 0 ? (
        contacts.map(contact => (
          <li key={contact.id} className={s.li}>
            <Contact data={contact} onEdit={() => onEdit(contact)} />
          </li>
        ))
      ) : (
        <li>No contacts matching your search found.</li>
      )}
    </ul>
  );
}
export default ContactList;
