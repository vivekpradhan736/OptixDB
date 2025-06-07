import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to get logged-in user
export const getLoginUser = createAsyncThunk(
  'auth/getLoginUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('https://optixdb-backend.onrender.com/api/auth/me', {
        withCredentials: true,
      });
      console.log("res.data",res.data)
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch user');
    }
  }
);

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        'https://optixdb-backend.onrender.com/api/auth/login',
        { email, password },
        { withCredentials: true }
      );
      return res.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post('https://optixdb-backend.onrender.com/api/auth/logout', {}, {
        withCredentials: true });
      return null;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Logout failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
  isAuthenticated: false,
  user: null,
  token: null,
  status: 'idle',
  error: null,
},
reducers: {
  login: (state, action) => {
    state.isAuthenticated = true;
    state.user = action.payload.user;
    state.token = action.payload.token;
  },
  me: (state, action) => {
    state.isAuthenticated = true;
    state.user = action.payload.user;
    state.token = action.payload.token;
  },
  logout: (state) => {
    state.isAuthenticated = false;
    state.user = null;
    state.token = null;
  },
},
extraReducers: (builder) => {
    builder
      // Get logged-in user
      .addCase(getLoginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getLoginUser.fulfilled, (state, action) => {
        console.log("action",action)
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(getLoginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload.error;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;