import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for uploading a file
export const uploadFile = createAsyncThunk(
  'files/uploadFile',
  async ({ file, apiKey, folder, folderId }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (folderId) formData.append('folderId', folderId);
      if (folder) formData.append('folder', folder);
      await axios.post('https://optixdb-backend.onrender.com/api/file/upload', formData, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      const url = folderId
        ? `https://optixdb-backend.onrender.com/api/folder/${folderId}/files`
        : 'https://optixdb-backend.onrender.com/api/file/files';
      const res = await axios.get(url, { withCredentials: true });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Upload failed');
    }
  }
);

// Async thunk for fetching files (with optional folderId)
export const fetchFiles = createAsyncThunk(
  'files/fetchFiles',
  async ( _, { rejectWithValue }) => {
    try {
      const url = 'https://optixdb-backend.onrender.com/api/file/files';
      const res = await axios.get(url, { withCredentials: true });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch files');
    }
  }
);

export const fetchFolderFiles = createAsyncThunk(
  'files/fetchFolderFiles',
  async ({ folderId } = {}, { rejectWithValue }) => {
    try {
      const url = `https://optixdb-backend.onrender.com/api/folder/${folderId}/files`
      const res = await axios.get(url, { withCredentials: true });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch files');
    }
  }
);

// Async thunk for deleting a file
export const deleteFile = createAsyncThunk(
  'files/deleteFile',
  async ({ fileId }, { rejectWithValue }) => {
    try {
      await axios.delete(`https://optixdb-backend.onrender.com/api/file/files/${fileId}`, {
        withCredentials: true,
      });
      return fileId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete file');
    }
  }
);

// Async thunk for fetching storage usage
export const fetchStorageUsage = createAsyncThunk(
  'files/fetchStorageUsage',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('https://optixdb-backend.onrender.com/api/storage/usage', {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch storage usage');
    }
  }
);

// Async thunk for fetching file type summary
export const fetchFileTypeSummary = createAsyncThunk(
  'files/fetchFileTypeSummary',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('https://optixdb-backend.onrender.com/api/storage/summary', {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch file type summary');
    }
  }
);

const fileSlice = createSlice({
  name: 'files',
  initialState: {
    files: [],
    folderFiles: [],
    storageUsage: {
      totalSize: 0,
      monthlyLimit: 100 * 1024 * 1024,
      percentageUsed: 0,
    },
    fileTypeSummary: {
      document: { size: 0, latestDate: null },
      image: { size: 0, latestDate: null },
      video: { size: 0, latestDate: null },
      audio: { size: 0, latestDate: null },
      other: { size: 0, latestDate: null },
    },
    refetch: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    setFiles: (state, action) => {
      state.files = action.payload;
    },
    setFolderFiles: (state, action) => {
      state.folderFiles = action.payload
    },
    toggleRefetch: (state) => {
      state.refetch = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.refetch = !state.refetch;
        state.status = 'succeeded';
        state.files = action.payload;
        state.error = null;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchFiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.files = action.payload;
        state.error = null;
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(fetchFolderFiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFolderFiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.folderFiles = action.payload.files;
        state.error = null;
      })
      .addCase(fetchFolderFiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteFile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.files = state.files.filter((f) => f._id !== action.payload);
        state.error = null;
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchStorageUsage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStorageUsage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.storageUsage = action.payload;
        state.error = null;
      })
      .addCase(fetchStorageUsage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchFileTypeSummary.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFileTypeSummary.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.fileTypeSummary = action.payload;
        state.error = null;
      })
      .addCase(fetchFileTypeSummary.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setFiles, setFolderFiles, toggleRefetch } = fileSlice.actions;
export default fileSlice.reducer;