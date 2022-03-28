import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isAuth: false,
  accessToken: null,
  hasLogoutHistory: false,
  itemCount: {
    PolarBear: 0,
    Penguin: 0,
    Seal: 0,
    Igloo: 0,
    Flower: 0,
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
      return { ...initialState, hasLogoutHistory: true };
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
    updateIceCount: (state) => {
      state.user.iceCount = state.user.iceCount + 1;
    },
  },
});

const { reducer, actions } = userSlice;

export const {
  saveLoginUser,
  resetLoginUser,
  increseCoke,
  decreaseCoke,
  updateFriendList,
  updatePendingFriendList,
  updateItemCount,
  updateIceCount,
} = actions;

export default reducer;
