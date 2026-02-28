import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCourse: [],
  courseDetail: "",
  entrolledCourse: [],
  entrolledCourseData: [],
  allInvoices: []
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setAllCourses(state, action) {
      state.allCourse = action.payload;
    },
    setCourseDetail(state, action){
      state.courseDetail = action.payload;
    },
     setEnrolledCourse(state, action){
      state.entrolledCourse = action.payload;
    },
    setEntrolledCourseData(state, action){
      state.entrolledCourseData = action.payload;
    },
     setAllInvoices(state, action){
      state.allInvoices = action.payload;
    }
  },
});

export const { setAllCourses, setCourseDetail, setEnrolledCourse, setEntrolledCourseData, setAllInvoices } = courseSlice.actions;

export default courseSlice.reducer;
