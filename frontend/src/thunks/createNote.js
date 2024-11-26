import { createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from '../store/csrf';

const createNote = createAsyncThunk(
  'notes/create',
  async (noteDetails, { rejectWithValue }) => {
    const { title, content } = noteDetails;
    try {
      const response = await csrfFetch('/api/notes', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
      });

      return await response.json();
    } catch (response) { // Catch the thrown response. (see csrfFetch).
      const errorData = await response.json();
      return rejectWithValue(errorData);
    }
  }
);

export default createNote;
