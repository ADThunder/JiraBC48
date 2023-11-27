import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDrawerOpen: false,
  DrawerContent: null,
  sidebarCollapse: false,
};

const generalSlice = createSlice({
  name: "generalSlice",
  initialState,
  reducers: {
    handleDrawerOpen: (state, action) => {
      state.DrawerContent = action.payload;
      state.isDrawerOpen = true;
    },
    closeDrawer: (state) => {
      state.isDrawerOpen = false;
    },
    toggleCollapseSidebar: (state) => {
      state.sidebarCollapse = !state.sidebarCollapse;
    },
    collapseSidebar: (state) => {
      state.sidebarCollapse = true;
    },
  },
});

export const generalActions = generalSlice.actions;

const generalReducer = generalSlice.reducer;

export default generalReducer;
