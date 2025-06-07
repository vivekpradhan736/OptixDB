import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import MobileNavigation from "./MobileNavigation";
import Header from "./Header";
import { hasTokenCookie } from "../lib/cookies";
import store from "../redux/store";
import { getLoginUser } from "../redux/authSlice";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user, token } = useSelector((state) => state.auth); 


  useEffect(() => {
    dispatch(getLoginUser());
    if(token == null){
      navigate('/login');
    }
    setIsAuthenticated(true)
  }, [dispatch, navigate, token]);

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
