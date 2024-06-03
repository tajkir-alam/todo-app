import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  modalFor: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.isOpen = true;
      state.modalFor = payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalFor = '';
      localStorage.removeItem('updateTaskInfo');
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
