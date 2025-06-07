import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import fileReducer from './fileSlice';
import folderReducer from './folderSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    files: fileReducer,
    folderFiles: fileReducer,
    folders: folderReducer,
  },
});