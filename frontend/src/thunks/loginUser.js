import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUser } from '../store/sessionSlice';

const loginUser = createAsyncThunk(
  'session/loginUser',
  async (user, { dispatch }) => {
    try {
      const { credential, password } = user;
      const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
          credential,
          password,
        }),
      });
      const data = await response.json();
      dispatch(setUser(data.user));
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export default loginUser;
