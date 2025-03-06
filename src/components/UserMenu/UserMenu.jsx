import s from './UserMenu.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';
import { logoutThunk } from '../../redux/auth/authOperations';

const UserMenu = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  console.log('User:', user);

  return (
    <div className={s.usermenu_wrap}>
      <h2>Welcome </h2>
      <h3>{` ${user.email}`}</h3>

      {isLoggedIn && (
        <button
          onClick={() => {
            dispatch(logoutThunk());
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default UserMenu;
