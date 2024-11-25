import { createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from '../store/csrf';

const fetchNotes = createAsyncThunk(
  'notes/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await csrfFetch('/api/notes');
      return await response.json();
    } catch (response) { // Catch the thrown response. (see csrfFetch).
      const errorData = await response.json();
      return rejectWithValue(errorData);
    }
  }
);

export default fetchNotes;
