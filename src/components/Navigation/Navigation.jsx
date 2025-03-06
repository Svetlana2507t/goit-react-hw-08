import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import clsx from 'clsx';
import s from './Navigation.module.css';

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  console.log('isLoggedIn', isLoggedIn);

  return (
    <div>
      <nav className={s.nav_wrap}>
        <NavLink
          className={({ isActive }) => clsx(s.link, isActive && s.active)}
          to="/"
        >
          Home
        </NavLink>
        {isLoggedIn && (
          <NavLink
            className={({ isActive }) => clsx(s.link, isActive && s.active)}
            to="/contacts"
          >
            Contacts
          </NavLink>
        )}
      </nav>
      <h2>Contacts Book</h2>
    </div>
  );
};

export default Navigation;
