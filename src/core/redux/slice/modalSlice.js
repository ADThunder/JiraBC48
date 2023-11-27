import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalProps: {
    headerContent: null,
    open: false,
    modalContent: null,
    width: "auto",
    form: null,
    maskClosable: null,
  },
};

const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    setUpModal: (state, action) => {
      state.modalProps = action.payload;
      state.modalProps.open = true;
    },
    openModal: (state, action) => {
      state.modalProps.open = true;
      state.modalProps.modalContent = action.payload;
    },
    closeModal: (state) => {
      state.modalProps.open = false;
    },
  },
});

export const modalActions = modalSlice.actions;

const modalReducer = modalSlice.reducer;

export default modalReducer;
