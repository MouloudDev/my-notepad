import { createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from '../store/csrf';

const deleteNote = createAsyncThunk(
  'notes/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await csrfFetch(`/api/notes/${id}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (response) { // Catch the thrown response. (see csrfFetch).
      const errorData = await response.json();
      return rejectWithValue(errorData);
    }
  }
);

export default deleteNote;
