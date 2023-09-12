import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

function HomeLayout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Outlet />
    </div>
  );
}

export default HomeLayout;
