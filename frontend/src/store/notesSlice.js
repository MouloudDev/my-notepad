import { createSlice } from '@reduxjs/toolkit';
import fetchNotes from '../thunks/fetchNotes';
import createNote from '../thunks/createNote';
import updateNote from '../thunks/updateNote';
import deleteNote from '../thunks/deleteNote';

const initialState = {
  notesArr: [],
  notesToDisplay: [],
  currNote: null,
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

    builder.addCase(updateNote.fulfilled, (state, action) => {
      const updatedNote = action.payload;
      const udpatedNotes = state.notesArr.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      )
      state.notesArr = udpatedNotes;
      state.notesToDisplay = udpatedNotes
    })

    builder.addCase(deleteNote.fulfilled, (state, action) => {
      const deletedNoteId = action.payload.id;
      const remainingNotes = state.notesArr.filter(
        (note) => note.id !== deletedNoteId
      )
      state.notesArr = remainingNotes;
      state.notesToDisplay = remainingNotes

      if (state.currNote.id === deletedNoteId) {
        state.currNote = null;
      }
    })
  }
})

export const {setCurrNote, searchNotes} = notesSlice.actions;
export default notesSlice.reducer;
