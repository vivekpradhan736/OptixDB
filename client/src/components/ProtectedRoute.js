import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import MobileNavigation from "./MobileNavigation";
import Header from "./Header";
import { hasTokenCookie } from "../lib/cookies";
import store from "../redux/store";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    const isAuth = store.getState().auth.isAuthenticated || hasTokenCookie();
    setIsAuthenticated(isAuth)
    if (!isAuth) {
      console.log("test 2")
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      {isAuthenticated ? (
        <>
          <Sidebar />
          <section className="flex h-full flex-1 flex-col">
            <MobileNavigation />
            <Header />
            {children}
          </section>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default ProtectedRoute;
