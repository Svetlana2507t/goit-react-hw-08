import Contact from '../Contact/Contact';
import s from './ContactList.module.css';
import { useSelector } from 'react-redux';
//import { selectContacts } from '../../redux/contactsSlice';
import { selectFilteredContacts } from '../../redux/contactsSlice';

function ContactList() {
  const contacts = useSelector(selectFilteredContacts);

  return (
    <ul className={s.ul}>
      {contacts.length > 0 ? (
        contacts.map(contact => (
          <li key={contact.id} className={s.li}>
            <Contact data={contact} />
          </li>
        ))
      ) : (
        <li>No contacts matching your search found.</li>
      )}
    </ul>
  );
}
export default ContactList;
