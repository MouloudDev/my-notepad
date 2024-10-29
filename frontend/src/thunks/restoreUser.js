import { createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from '../store/csrf';

const restoreUser = createAsyncThunk(
  'session/restoreUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await csrfFetch('/api/session');
      const data = await response.json();
      return data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default restoreUser;
