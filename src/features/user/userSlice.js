import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cokeCount: 0,
  id: null,
  username: null,
  email: null,
  accessToken: null,
  googleLoginUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveLoginUser: (state, action) => {
      const { id, username, email, accessToken, googleLoginUser } =
        action.payload;

      return {
        ...initialState,
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
    currentCoke: (state, action) => {
      state.cokeCount = action.payload;
    },
    increseCoke: (state, action) => {
      state.cokeCount += action.payload;
    },
    decreaseCoke: (state, action) => {
      state.cokeCount -= action.payload;
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
} = userSlice.actions;

export const selectUser = (state) => state.user;
export const selectUserId = (state) => state.user.id;
export const selectUserToken = (state) => state.user.accessToken;
export const selectCokeCount = (state) => state.user.cokeCount;

export default userSlice.reducer;
