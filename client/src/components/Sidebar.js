import { navItems } from "../constants";
import { cn } from "../lib/utils";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const location = useLocation(); 
  const pathname = location.pathname;
  const { user } = useSelector((state) => state.auth);

  return (
    <aside className="sidebar">
      <Link to="/">
        <img
          src="/assets/icons/logo-full-brand.svg"
          alt="logo"
          width={160}
          height={50}
          className="hidden h-auto lg:block"
        />

        <img
          src="/assets/icons/logo-brand.svg"
          alt="logo"
          width={52}
          height={52}
          className="lg:hidden"
        />
      </Link>

      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-3">
          {navItems.map(({ url, name, icon }) => (
            <Link key={name} to={url} className="lg:w-full">
              <li
                className={cn(
                  "sidebar-nav-item hover:bg-gray-200",
                  pathname.startsWith(url) && "shad-active",
                )}
              >
                <img
                  src={icon}
                  alt={name}
                  width={24}
                  height={24}
                  className={cn(
                    "nav-icon",
                    pathname.startsWith(url) && "nav-icon-active",
                  )}
                />
                <p className="hidden lg:block">{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>

      <img
        src="/assets/images/files-2.png"
        alt="logo"
        width={506}
        height={418}
        className="w-full"
      />

      <div className="sidebar-user-info">
        <img
          src={user?.avatar ? user?.avatar : "/assets/images/avatar.png"}
          alt="Avatar"
          width={44}
          height={44}
          className="sidebar-user-avatar"
        />
        <div className="hidden lg:block">
          <p className="subtitle-2 capitalize">{user?.name}</p>
          <p className="caption">{user?.email}</p>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;