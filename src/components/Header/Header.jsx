import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  console.log('User:', user);
  return (
    <>
      <h2>Welcome </h2>
      <h3>{` ${user.email}`}</h3>

      <nav className={s.header_wrap}>
        <NavLink
          className={({ isActive }) => clsx(s.link, isActive && s.active)}
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className={({ isActive }) => clsx(s.link, isActive && s.active)}
          to="/contacts"
        >
          Contacts
        </NavLink>
        <h2>Contacts Book</h2>

        {!isLoggedIn && (
          <div>
            <NavLink
              className={({ isActive }) => clsx(s.link, isActive && s.active)}
              to="/register"
            >
              Register
            </NavLink>
            <NavLink
              className={({ isActive }) => clsx(s.link, isActive && s.active)}
              to="/login"
            >
              Login
            </NavLink>
          </div>
        )}
        {isLoggedIn && <button>Logout</button>}
      </nav>
    </>
  );
};

export default Header;
