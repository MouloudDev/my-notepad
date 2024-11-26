import { createSlice } from '@reduxjs/toolkit';
import fetchNotes from '../thunks/fetchNotes';
import createNote from '../thunks/createNote';

const initialState = {
  notesArr: [],
  notesToDisplay: [],
  currNote: null,
  noteCreationErrors: null,
  fetchingNotes: true
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
    },
    clearNoteCreationErrors(state) {
      state.noteCreationErrors = null;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      const notes = action.payload;
      state.notesArr = notes;
      state.notesToDisplay = notes;
      state.fetchingNotes = false
    })
    builder.addCase(fetchNotes.rejected, (state) => {
      state.fetchingNotes = false
    })

    builder.addCase(createNote.fulfilled, (state, action) => {
      const createdNote = action.payload;
      const notesArr = state.notesArr
      state.notesArr = [createdNote, ...notesArr];
      state.notesToDisplay = [createdNote, ...notesArr]
    })
    builder.addCase(createNote.rejected, (state, action) => {
      state.noteCreationErrors = action.payload.errors;
    })
  }
})

export const {
  setCurrNote,
  searchNotes,
  clearNoteCreationErrors
} = notesSlice.actions;
export default notesSlice.reducer;
