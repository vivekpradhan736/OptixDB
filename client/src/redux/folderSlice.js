import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to create a new folder
export const createFolder = createAsyncThunk(
  'folders/createFolder',
  async ({ name }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        'https://optixdb-backend.onrender.com/api/folder',
        { name },
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create folder');
    }
  }
);

// Async thunk to fetch all folders
export const fetchFolders = createAsyncThunk(
  'folders/fetchFolders',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('https://optixdb-backend.onrender.com/api/folder', {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch folders');
    }
  }
);

// Async thunk to delete a folder
export const deleteFolder = createAsyncThunk(
  'folders/deleteFolder',
  async ({ folderId }, { rejectWithValue }) => {
    try {
      await axios.delete(`https://optixdb-backend.onrender.com/api/folder/${folderId}`, {
        withCredentials: true,
      });
      return folderId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete folder');
    }
  }
);

const folderSlice = createSlice({
  name: 'folders',
  initialState: {
    folders: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create folder
      .addCase(createFolder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createFolder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.folders.push(action.payload);
        state.error = null;
      })
      .addCase(createFolder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Fetch folders
      .addCase(fetchFolders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFolders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.folders = action.payload;
        state.error = null;
      })
      .addCase(fetchFolders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Delete folder
      .addCase(deleteFolder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteFolder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.folders = state.folders.filter((f) => f._id !== action.payload);
        state.error = null;
      })
      .addCase(deleteFolder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default folderSlice.reducer;