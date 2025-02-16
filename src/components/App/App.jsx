import s from './App.module.css';
import SearchBox from '../SearchBox/SearchBox';
import ContactList from '../ContactList/ContactList';
import ContactForm from '../ContactForm/ContactsForm';

function App() {
  return (
    <div className={s.container}>
      <h1 className={s.uppercase}>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
}

export default App;
