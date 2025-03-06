import AppBar from '../AppBar/AppBar';
import s from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import clsx from 'clsx';

const Layout = () => {
  return (
    <div className={clsx(s.layout_wrap)}>
      <AppBar />
      <Outlet />
    </div>
  );
};

export default Layout;
