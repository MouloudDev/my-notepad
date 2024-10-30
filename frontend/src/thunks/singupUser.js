import { createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from '../store/csrf';

const signupUser = createAsyncThunk(
  'session/signupUser',
  async (userDetails, { rejectWithValue }) => {
    const { username, email, password } = userDetails;
    try {
      const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      return data.user;
    } catch (response) { // Catch the thrown response. (see csrfFetch).
      const errorData = await response.json();
      return rejectWithValue(errorData);
    }
  }
);

export default signupUser;
