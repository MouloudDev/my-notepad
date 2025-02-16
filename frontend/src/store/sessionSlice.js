import { createSlice } from '@reduxjs/toolkit';
import loginUser from '../thunks/loginUser';
import restoreUser from '../thunks/restoreUser';
import signupUser from '../thunks/singupUser';
import logoutUser from '../thunks/logoutUser';

const initialState = {
  user: null,
  loginErrors: null,
  signupErrors: null,
}

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSignupErrors(state, action) {
      state.signupErrors = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload
      state.loginErrors = null;
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loginErrors = action.payload.errors
    })

    // Restore user
    builder.addCase(restoreUser.fulfilled, (state, action) => {
      // payload could be either a user obj or undefined.
      state.user = action.payload || null;
    })

    // Signup
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.user = action.payload
      state.signupErrors = null;
    })
    builder.addCase(signupUser.rejected, (state, action) => {
      state.signupErrors = action.payload.errors
    })

    // Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null
    })
  }
})

export const { setSignupErrors } = sessionSlice.actions;
export default sessionSlice.reducer;
