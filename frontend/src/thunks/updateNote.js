import { createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from '../store/csrf';

const updateNote = createAsyncThunk(
  'notes/update',
  async (noteDetails, { rejectWithValue }) => {
    const { id, title, content } = noteDetails;
    const url = `/api/notes/${id}`;
    try {
      const response = await csrfFetch(url, {
        method: 'PATCH',
        body: JSON.stringify({ title, content }),
      });

      return await response.json();
    } catch (response) { // Catch the thrown response. (see csrfFetch).
      const errorData = await response.json();
      return rejectWithValue(errorData);
    }
  }
);

export default updateNote;
