import { NavLink } from 'react-router-dom';
import s from './AuthNav.module.css';
import clsx from 'clsx';

const AuthNav = () => {
  return (
    <div>
      <nav className={s.auth_wrap}>
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
      </nav>
      ;
    </div>
  );
};

export default AuthNav;
