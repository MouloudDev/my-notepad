import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fontFamily: "",
  fontSize: 16
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    zoomIn(state) {
      if (state.fontSize === 52) return
      state.fontSize = state.fontSize + 4;
    },
    zoomOut(state) {
      if (state.fontSize === 12) return
      state.fontSize = state.fontSize - 4;
    },
    setFont(state, action) {
      state.fontFamily = action.payload
    }
  }
})

export const { zoomIn, zoomOut, setFont } = settingsSlice.actions;
export default settingsSlice.reducer;
