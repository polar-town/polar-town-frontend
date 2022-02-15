import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMailOpen: false,
  isPostOpen: false,
  isNotificatoinOpen: false,
  isFriendListOpen: false,
  isFriendSearchOpen: false,
  isItemBoxOpen: false,
  isShopOpen: false,
  isPresentFriendsOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {},
});

const { reducer, actions } = modalSlice;

export const {} = actions;

export default reducer;
