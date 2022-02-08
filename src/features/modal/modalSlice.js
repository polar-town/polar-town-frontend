import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMailOpen: false,
  isGuestBookOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openMail: (state) => {
      state.isMailOpen = true;
    },
    closeMail: (state) => {
      state.isMailOpen = false;
    },
    openGuestBook: (state) => {
      state.isGuestBookOpen = true;
    },
    closeGuestBook: (state) => {
      state.isGuestBookOpen = false;
    },
  },
});

export const { openMail, closeMail, openGuestBook, closeGuestBook } =
  modalSlice.actions;

export const selectMailIsOpen = (state) => state.modal.isMailOpen;
export const selectPostBoxIsOpen = (state) => state.modal.isGuestBookOpen;

export default modalSlice.reducer;
