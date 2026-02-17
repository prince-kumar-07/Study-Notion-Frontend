import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showOtp: false,
  success: false,
  submitted: false,
  passwordResetSuccess: false,
};

const signupSlice = createSlice({
  name: "signup",
  initialState: initialState,
  reducers: {
    setShowOTP(state) {
      state.showOtp = true;
    },
    setCloseOTP(state) {
      state.showOtp = false;
    },
    setSuccess(state) {
      state.success = true;
    },
    removeSuccess(state) {
      state.success = false;
    },
    setSubmmited(state) {
      state.submitted = true;
    },
    removeSubmited(state) {
      state.submitted = false;
    },
    setPasswordResetSuccess(state) {
      state.passwordResetSuccess = true;
    },
    removePasswordResetSuccess(state) {
      state.passwordResetSuccess = false;
    },
  },
});

export const {
  setShowOTP,
  setCloseOTP,
  setSuccess,
  removeSuccess,
  setSubmmited,
  removeSubmited,
  setPasswordResetSuccess,

} = signupSlice.actions;
export default signupSlice.reducer;
