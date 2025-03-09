import s from './UserMenu.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';
import { logoutThunk } from '../../redux/auth/authOperations';
import { resetContacts } from '../../redux/contacts/contactsSlice';

const UserMenu = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  console.log('User:', user);

  return (
    <div className={s.usermenu_wrap}>
      <h3 className={s.header_heading}>Welcome, {` ${user.email}!`}</h3>

      {isLoggedIn && (
        <button
          className={s._button}
          onClick={() => {
            dispatch(logoutThunk());
            dispatch(resetContacts());
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default UserMenu;
