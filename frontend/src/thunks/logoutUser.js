import { createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from '../store/csrf';

const logoutUser = createAsyncThunk(
  'session/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await csrfFetch('/api/session', {
        method: 'DELETE',
      });
      return await response.json();
    } catch (response) { // Catch the thrown response. (see csrfFetch).
      const errorData = await response.json();
      return rejectWithValue(errorData);
    }
  }
);

export default logoutUser;