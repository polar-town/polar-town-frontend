import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cokeCount: 0,
  id: null,
  username: null,
  email: null,
  accessToken: null,
  googleLoginUser: null,
  itemCount: {
    PolarBear: 0,
    Penguin: 0,
    Seal: 0,
    Igloo: 0,
    Flower: 0,
  },
  socket: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveLoginUser: (state, action) => {
      const { id, username, email, accessToken, googleLoginUser } =
        action.payload;

      return {
        ...state,
        id,
        username,
        email,
        accessToken,
        googleLoginUser,
      };
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
    updateItemCount: (state, action) => {
      const { PolarBear, Penguin, Seal, Igloo, Flower } = action.payload;

      return {
        ...state,
        itemCount: { PolarBear, Penguin, Seal, Igloo, Flower },
      };
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export const {
  saveLoginUser,
  removeLogoutUser,
  exchangeAccessToken,
  increseCoke,
  decreaseCoke,
  updateItemCount,
  setSocket,
} = userSlice.actions;

export const selectUser = (state) => state.user;
export const selectUserId = (state) => state.user.id;
export const selectUserToken = (state) => state.user.accessToken;
export const selectCokeCount = (state) => state.user.cokeCount;
export const selectItemCount = (state) => state.user.itemCount;

export default userSlice.reducer;
