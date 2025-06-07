import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import FileUploader from './FileUploader';
import Search from './Search';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { clearTokenCookie } from '../lib/cookies';

function Header() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearTokenCookie(); // Clear the token cookie
    dispatch(logout()); // Clear Redux state
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        <FileUploader/>
        <form
          action={async () => {
            "use server";

            handleLogout();
          }}
        >
          <Button type="submit" className="sign-out-button">
            <img
              src="/assets/icons/logout.svg"
              alt="logo"
              width={24}
              height={24}
              className="w-6"
            />
          </Button>
        </form>
      </div>
    </header>
  );
}

export default Header;