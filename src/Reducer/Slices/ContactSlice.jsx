import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allMessage: [],
  messageSubmiitedSuccess: false
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {

    setAllContactMessage(state, action) {
      state.allMessage = action.payload;
    },

    // setMessageSubmiitedSuccess(state, action) {
    //   state.user = action.payload;
    // },
  },
});

export const {
  setAllContactMessage,
  // setMessageSubmiitedSuccess
} = contactSlice.actions;

export default contactSlice.reducer;