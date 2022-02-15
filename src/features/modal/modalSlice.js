import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMailOpen: false,
  isPostBoxOpen: false,
  isFriendListOpen: false,
  isFriendSearchOpen: false,
  isItemBoxOpen: false,
  isShopOpen: false,
  isPresentFriendsOpen: false,
  isNotificatoinOpen: false,
  notificationType: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleMail: (state) => {
      state.isMailOpen = !state.isMailOpen;
    },
    togglePostBox: (state) => {
      state.isPostBoxOpen = !state.isPostBoxOpen;
    },
    toggleFriendList: (state) => {
      state.isFriendListOpen = !state.isFriendListOpen;
    },
    toggleFriendSearch: (state) => {
      state.isFriendSearchOpen = !state.isFriendSearchOpen;
    },
    toggleItemBox: (state) => {
      state.isItemBoxOpen = !state.isItemBoxOpen;
    },
    toggleShop: (state) => {
      state.isShopOpen = !state.isShopOpen;
    },
    togglePresentFriends: (state) => {
      state.isPresentFriendsOpen = !state.isPresentFriendsOpen;
    },
    openNotification: (state) => {
      state.isNotificatoinOpen = true;
    },
    closeNotification: (state) => {
      state.isNotificatoinOpen = false;
    },
    setNotificationType: (state, { payload }) => {
      state.notificationType = payload;
    },
  },
});

const { reducer, actions } = modalSlice;

export const {
  toggleMail,
  togglePostBox,
  toggleFriendList,
  toggleFriendSearch,
  toggleItemBox,
  toggleShop,
  togglePresentFriends,
  openNotification,
  closeNotification,
  setNotificationType,
} = actions;

export default reducer;
