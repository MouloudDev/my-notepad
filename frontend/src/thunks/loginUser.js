import { createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from '../store/csrf';

const loginUser = createAsyncThunk(
  'session/loginUser',
  async (userDetails, { rejectWithValue }) => {
    const { credential, password } = userDetails;
    try {
      const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({ credential, password }),
      });

      const data = await response.json();
      return data.user;
    } catch (response) { // Catch the thrown response. (see csrfFetch).
      const errorData = await response.json();
      return rejectWithValue(errorData);
    }
  }
);

export default loginUser;
