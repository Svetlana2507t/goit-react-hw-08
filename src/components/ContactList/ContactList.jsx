import Contact from '../Contact/Contact';
import s from './ContactList.module.css';
import { useSelector } from 'react-redux';

function ContactList() {
  const contacts = useSelector(state => state.contacts.items);
  const filterValue = useSelector(state => state.filters.name);

  // console.log('Filtering by:', filterValue);
  // console.log('Current contacts:', contacts);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <ul className={s.ul}>
      {filteredContacts.length > 0 ? (
        filteredContacts.map(contact => (
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
