import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  project: undefined,
  projectList: undefined,
};

const projectSlice = createSlice({
  name: "projectSlice",
  initialState: initialState,
  reducers: {
    putProjectDetail: (state, action) => {
      state.project = action.payload;
    },
    updateProjectList: (state, action) => {
      state.projectList = action.payload;
    },
  },
});

export const projectActions = projectSlice.actions;

const projectReducer = projectSlice.reducer;

export default projectReducer;
