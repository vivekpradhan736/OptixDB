import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login.js';
import SignUp from './components/Auth/SignUp.js';
import Dashboard from './components/Dashboard.js';
import Profile from './components/Profile.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import Assets from './components/Assets.js';
import Folders from './components/Folders.js';
import SingleFolder from './components/SingleFolder.js';
import GettingStarted from './components/GettingStarted.js';
import ApiKey from './components/ApiKey.js';
import store from './redux/store.js';
import { hasTokenCookie } from './lib/cookies.js';
import { useDispatch } from 'react-redux';
import { getLoginUser } from './redux/authSlice.js';
import Home from './components/Home.js';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoginUser());
  }, [dispatch]);

  useEffect(() => {
    const isAuthenticated = store.getState().auth.isAuthenticated || hasTokenCookie();
    console.log("isAuthenticated", isAuthenticated);
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);
  
  return (
    <div className="flex h-screen bg-[#f2f4f8]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Routes>
        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute><Profile /></ProtectedRoute>}
        />
        <Route
          path="/assets"
          element={<ProtectedRoute><Assets /></ProtectedRoute>}
        />
        <Route
          path="/folders"
          element={<ProtectedRoute><Folders /></ProtectedRoute>}
        />
        <Route
          path="/folders/:id"
          element={<ProtectedRoute><SingleFolder /></ProtectedRoute>}
        />
        <Route
          path="/getting-started"
          element={<ProtectedRoute><GettingStarted /></ProtectedRoute>}
        />
        <Route
          path="/api-key"
          element={<ProtectedRoute><ApiKey /></ProtectedRoute>}
        />
      </Routes>
    </div>
  );
}

export default App;