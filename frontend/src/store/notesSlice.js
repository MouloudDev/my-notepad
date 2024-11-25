import { createSlice } from '@reduxjs/toolkit';
import fetchNotes from '../thunks/fetchNotes';

const initialState = {
  notesArr: [],
  notesToDisplay: [],
  currNote: null
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
  },
  extraReducers: builder => {
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      const notes = action.payload;
      state.notesArr = notes;
      state.notesToDisplay = notes;
      state.currNote = notes[0] || null;
    })
  }
})

export const { setCurrNote, searchNotes } = notesSlice.actions;
export default notesSlice.reducer;
