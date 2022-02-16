import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isAuth: false,
  accessToken: null,
  itemCount: {
    PolarBear: 0,
    Penguin: 0,
    Seal: 0,
    Igloo: 0,
    Flower: 0,
    photo: null,
  },
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
        photo,
        cokeCount,
        friendList,
        pendingFriendList,
        iceCount,
      } = payload.user;

      state.user = {
        id,
        name,
        email,
        photo,
        cokeCount,
        friendList,
        pendingFriendList,
        iceCount,
      };
      state.accessToken = payload.accessToken;
      state.isAuth = true;
    },
    resetLoginUser: () => {
      return initialState;
    },
    exchangeAccessToken: (state, { payload }) => {
      state.accessToken = payload;
    },
    currentCoke: (state, action) => {
      state.user.cokeCount = action.payload;
    },
    increseCoke: (state, action) => {
      state.user.cokeCount += action.payload;
    },
    decreaseCoke: (state, action) => {
      state.user.cokeCount -= action.payload;
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
      state.user.iceCount = state.user.iceCount + 1;
    },
  },
});

const { reducer, actions } = userSlice;

export const {
  getUserPending,
  getUserSuccess,
  getUserFail,
  saveLoginUser,
  resetLoginUser,
  exchangeAccessToken,
  currentCoke,
  increseCoke,
  decreaseCoke,
  updateFriendList,
  updatePendingFriendList,
  updateItemCount,
  updateIceCount,
} = actions;

export const selectUser = (state) => state.user;
export const selectUserId = (state) => state.user.id;
export const selectUserToken = (state) => state.user.accessToken;
export const selectCokeCount = (state) => state.user.cokeCount;
export const selectIceCount = (state) => state.user.iceCount;
export const selectFriendList = (state) => state.user.friendList;
export const selectPendingFriendList = (state) => state.user.pendingFriendList;
export const selectItemCount = (state) => state.user.itemCount;

export default reducer;
