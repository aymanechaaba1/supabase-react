import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import User from './User';
import { redirect } from 'react-router-dom';

function Header() {
  // @ts-ignore
  const { user, login, logout } = useContext(AuthContext);

  return (
    <div className="header flex items-center justify-between p-4">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png"
        className="w-20"
        alt=""
      />
      <div className="flex items-center gap-3">
        <button
          onClick={(e) => {
            if (user) logout();
            else {
              login();
              redirect('/chat-rooms');
            }
          }}
          className={`${
            user ? 'bg-red-500' : 'bg-blue-500 '
          } rounded-lg hover:shadow-lg text-center text-white font-medium px-4 py-1`}
        >
          {user ? 'Logout' : 'Login'}
        </button>
        {/* User */}
        {user && <User user={user} />}
      </div>
    </div>
  );
}

export default Header;
