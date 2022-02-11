import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cokeCount: 0,
  id: null,
  username: null,
  email: null,
  accessToken: null,
  googleLoginUser: null,
  friendList: [],
  pendingFriendList: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveLoginUser: (state, action) => {
      Object.assign(state, action.payload);
    },
    removeLogoutUser: () => {
      return initialState;
    },
    exchangeAccessToken: (state, action) => {
      const { accessToken } = action.payload;

      return {
        ...state,
        accessToken,
      };
    },
    increseCoke: (state, action) => {
      state.cokeCount += action.payload;
    },
    decreaseCoke: (state, action) => {
      state.cokeCount -= action.payload;
    },
    updateFriendList: (state, action) => {
      state.friendList = action.payload;
    },
    updatePendingFriendList: (state, action) => {
      state.PendingFriendList = action.payload;
    },
  },
});

export const {
  saveLoginUser,
  removeLogoutUser,
  exchangeAccessToken,
  increseCoke,
  decreaseCoke,
  updateFriendList,
  updatePendingFriendList,
} = userSlice.actions;

export const selectUser = (state) => state.user;
export const selectUserId = (state) => state.user.id;
export const selectUserToken = (state) => state.user.accessToken;
export const selectCokeCount = (state) => state.user.cokeCount;
export const selectFriendList = (state) => state.user.friendList;
export const selectPendingFriendList = (state) => state.user.pendingFriendList;

export default userSlice.reducer;
