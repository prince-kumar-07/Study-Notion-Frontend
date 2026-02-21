import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showOtp: false,
  success: false,
  submitted: false,
  passwordResetSuccess: false,
  showRevokeModal: false,
  deletionDate : "",
  blockedModal: false,
  blockedMessage: ""
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
    setShowRevokeModal(state, value){
      state.showRevokeModal = true
      state.deletionDate = value.payload
    },
    removeShowRevokeModal(state){
      state.showRevokeModal = false
      state.deletionDate = ""
    },
    showBlockedModal(state, value){
      state.blockedModal = true,
      state.blockedMessage = value.payload
    },
    removeBlockedModal(state){
      state.blockedModal = false,
      state.blockedMessage = ""
    }


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
  setShowRevokeModal,
  removeShowRevokeModal,
  showBlockedModal,
  removeBlockedModal

} = signupSlice.actions;
export default signupSlice.reducer;
