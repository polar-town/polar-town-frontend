import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMailOpen: false,
  isGuestBookOpen: false,
  isFriendListOpen: false,
  isNotificationOpen: false,
  NotificationType: "",
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
    openNotification: (state, action) => {
      state.isNotificationOpen = true;
      state.NotificationType = action.payload;
    },
    closeNotification: (state) => {
      state.isNotificationOpen = false;
      state.NotificationType = null;
    },
    openFriendList: (state) => {
      state.isFriendListOpen = true;
    },
    closeFriendList: (state) => {
      state.isFriendListOpen = false;
    },
    closeAll: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  closeAll,
  openMail,
  closeMail,
  openGuestBook,
  closeGuestBook,
  openFriendList,
  closeFriendList,
  openNotification,
  closeNotification,
} = modalSlice.actions;

export const selectMailIsOpen = (state) => state.modal.isMailOpen;
export const selectPostBoxIsOpen = (state) => state.modal.isGuestBookOpen;
export const selectFriendListIsOpen = (state) => state.modal.isFriendListOpen;
export const selectIsNotificationOpen = (state) =>
  state.modal.isNotificationOpen;
export const selectNotificationType = (state) => state.modal.NotificationType;

export default modalSlice.reducer;
