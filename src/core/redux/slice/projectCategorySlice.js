import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectCategoryArr: [],
};

const projectCategorySlice = createSlice({
  name: "projectCategorySlice",
  initialState: initialState,
  reducers: {
    getAllProjectCategory: (state, action) => {
      state.projectCategoryArr = [...action.payload];
    },
  },
});

export const projectCategoryActions = projectCategorySlice.actions;

const projectCategoryReducer = projectCategorySlice.reducer;

export default projectCategoryReducer;
