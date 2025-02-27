import Header from '../Header/Header';
import s from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import clsx from 'clsx';

const Layout = () => {
  return (
    <div className={clsx(s.layout_wrap)}>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
