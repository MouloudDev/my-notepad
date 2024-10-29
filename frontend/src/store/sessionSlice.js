import { createSlice } from '@reduxjs/toolkit';
import loginUser from '../thunks/loginUser';
import restoreUser from '../thunks/restoreUser';

const initialState = {
  user: null,
  loginErrors: null,
  signupErrors: null,
}

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  extraReducers: builder => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loginErrors = action.payload.errors
    })

    // Restore user
    builder.addCase(restoreUser.fulfilled, (state, action) => {
      // payload could be either a user obj or undefined.
      state.user = action.payload || null;
    })
  }
})

export default sessionSlice.reducer;
