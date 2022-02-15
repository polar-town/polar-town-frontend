import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
  // cokeCount: 0,
  // iceCount: 1,
  // id: null,
  // username: null,
  // email: null,
  // accessToken: null,
  // friendList: [],
  // pendingFriendList: [],
  // itemCount: {
  //   PolarBear: 0,
  //   Penguin: 0,
  //   Seal: 0,
  //   Igloo: 0,
  //   Flower: 0,
  //   photo: null,
  // },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveLoginUser: (state, { payload }) => {
      const {
        _id: id,
        name,
        email,
        cokeCount,
        iceCount,
        friendList,
        inItemBox,
        presentBox,
        photo,
      } = payload.user;

      state.user = {
        id,
        name,
        email,
        cokeCount,
        iceCount,
        friendList,
        inItemBox,
        presentBox,
        photo,
      };
      state.accessToken = payload.accessToken;
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
    currentCoke: (state, action) => {
      state.cokeCount = action.payload;
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
      state.pendingFriendList = action.payload;
    },
    updateItemCount: (state, action) => {
      const { PolarBear, Penguin, Seal, Igloo, Flower } = action.payload;

      return {
        ...state,
        itemCount: { PolarBear, Penguin, Seal, Igloo, Flower },
      };
    },
    updateIceCount: (state, action) => {
      state.iceCount = state.iceCount + 1;
    },
  },
});

export const {
  saveLoginUser,
  removeLogoutUser,
  exchangeAccessToken,
  currentCoke,
  increseCoke,
  decreaseCoke,
  updateFriendList,
  updatePendingFriendList,
  updateItemCount,
  updateIceCount,
} = userSlice.actions;

export const selectUser = (state) => state.user;
export const selectUserId = (state) => state.user.id;
export const selectUserToken = (state) => state.user.accessToken;
export const selectCokeCount = (state) => state.user.cokeCount;
export const selectIceCount = (state) => state.user.iceCount;
export const selectFriendList = (state) => state.user.friendList;
export const selectPendingFriendList = (state) => state.user.pendingFriendList;
export const selectItemCount = (state) => state.user.itemCount;

export default userSlice.reducer;
