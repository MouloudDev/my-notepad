import { createSlice } from '@reduxjs/toolkit';
import formatDateTime from '../utils/formatDateTime';

const notes = Array.from({ length: 10 }, (_, i) => ({
  id: `note-${i + 1}`,
  title: `Sample Note ${i + 1}`,
  content: `This is the content of note ${i + 1}. It serves as sample data for testing.`,
  createdAt: formatDateTime(new Date(Date.now() - (i + 1) * 100000).toISOString()),
  updatedAt: formatDateTime(new Date(Date.now() - i * 50000).toISOString())
}));

const initialState = {
  notesArr: notes,
  notesToDisplay: notes,
  currNote: notes[0]
}

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setCurrNote(state, action) {
      state.currNote = state.notesArr.find(note => note.id === action.payload)
    },
    searchNotes(state, action) {
      const notes = state.notesArr;
      const searchTerm = action.payload.trim().toLowerCase();

      const matches = (str) => str.toLowerCase().includes(searchTerm);

      const titleMatches = notes.filter(({ title }) => matches(title));
      const contentMatches = notes.filter(
        ({ title, content }) => matches(content) && !matches(title) // Avoid duplicates
      );

      state.notesToDisplay = [...titleMatches, ...contentMatches];
    }
  }
})

export const { setCurrNote, searchNotes } = notesSlice.actions;
export default notesSlice.reducer;
