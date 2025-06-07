import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import React, { useState } from "react";
import { Separator } from "./ui/separator";
import { navItems } from "../constants";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import FileUploader from "./FileUploader";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { logout } from '../redux/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { clearTokenCookie } from "../lib/cookies";
import { toast } from "sonner";

const MobileNavigation = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation(); 
    const pathname = location.pathname;
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
      clearTokenCookie(); // Clear the token cookie
          dispatch(logout()); // Clear Redux state
          toast.success('Logged out successfully');
          navigate('/login');
      };

  return (
    <header className="mobile-header">
      <img
        src="/assets/icons/logo-full-brand.svg"
        alt="logo"
        width={120}
        height={52}
        className="h-auto"
      />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <img
            src="/assets/icons/menu.svg"
            alt="Search"
            width={30}
            height={30}
          />
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
          <SheetTitle>
            <div className="header-user">
              <img
                src={user?.avatar}
                alt="avatar"
                width={44}
                height={44}
                className="header-user-avatar"
              />
              <div className="sm:hidden lg:block">
                <p className="subtitle-2 capitalize">{user?.name}</p>
                <p className="caption">{user?.email}</p>
              </div>
            </div>
            <Separator className="mb-4 bg-light-200/20" />
          </SheetTitle>

          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {navItems.map(({ url, name, icon }) => (
                <Link key={name} to={url} className="lg:w-full">
                  <li
                    className={cn(
                      "mobile-nav-item",
                      pathname === url && "shad-active",
                    )}
                  >
                    <img
                      src={icon}
                      alt={name}
                      width={24}
                      height={24}
                      className={cn(
                        "nav-icon",
                        pathname === url && "nav-icon-active",
                      )}
                    />
                    <p>{name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>

          <Separator className="my-5 bg-light-200/20" />

          <div className="flex flex-col justify-between gap-5 pb-5">
            <FileUploader/>
            <Button
              type="submit"
              className="mobile-sign-out-button"
              onClick={() => handleLogout()}
            >
              <img
                src="/assets/icons/logout.svg"
                alt="logo"
                width={24}
                height={24}
              />
              <p>Logout</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;