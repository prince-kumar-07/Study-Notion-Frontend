import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCourse: [],
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setAllCourses(state, action) {
      state.allCourse = action.payload;
    },
  },
});

export const { setAllCourses } = courseSlice.actions;

export default courseSlice.reducer;
