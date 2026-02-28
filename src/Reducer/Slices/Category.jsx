import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCategory: [],
  categoryName: [],
  selectedCategory: [],
  diffrentCategory: []
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setAllCategory(state, action) {
      state.allCategory = action.payload;

      state.categoryName = action.payload.map(
        (cat) => cat.name
      );
    },
    setSeletedCategory(state, action){
      state.selectedCategory =  action.payload
    },
     setDiffrentCategory(state, action){
      state.diffrentCategory =  action.payload
    }
  },
});

export const { setAllCategory, setSeletedCategory, setDiffrentCategory } = categorySlice.actions;

export default categorySlice.reducer;
