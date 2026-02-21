import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user");

let parsedUser = null;

try {
  parsedUser = storedUser ? JSON.parse(storedUser) : null;
} catch {
  parsedUser = null;
}

const initialState = {
  user: parsedUser,
  allUsers: [],
  pendingInstructor: [], // separate state
};

const profileSlice = createSlice({
  name: "profile",
  initialState,

  reducers: {

    setUser(state, action) {
      state.user = action.payload;

      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    },

    setAllUsers(state, action) {
      state.allUsers = action.payload;
    },

    // store pending instructors from API
    setPendingInstructor(state, action) {
      state.pendingInstructor = action.payload;
    },

  },
});

export const {
  setUser,
  setAllUsers,
  setPendingInstructor,
} = profileSlice.actions;

export default profileSlice.reducer;