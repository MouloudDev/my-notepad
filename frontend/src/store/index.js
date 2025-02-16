import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './sessionSlice';
import settingsSlice from './settingsSlice';
import notesSlice from './notesSlice';

const store = configureStore({
  reducer: {
    session: sessionReducer,
    settings: settingsSlice,
    notes: notesSlice
  }
});

export default store;
