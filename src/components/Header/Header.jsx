import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import clsx from 'clsx';

const Header = () => {
  return (
    <div className={s.header_wrap}>
      <NavLink
        className={({ isActive }) => clsx(s.link, isActive && s.active)}
        to="/"
      >
        Home
      </NavLink>

      <h2>Phone Contacts</h2>

      <NavLink className={clsx(s.link)} to="/contacts">
        Contacts
      </NavLink>
      <NavLink className={clsx(s.link)} to="/register">
        Register
      </NavLink>
      <NavLink className={clsx(s.link)} to="/login">
        Login
      </NavLink>
    </div>
  );
};

export default Header;
