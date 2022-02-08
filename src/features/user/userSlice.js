import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
  },
});

export const { saveLoginUser, removeLogoutUser, exchangeAccessToken } =
  userSlice.actions;

export const selectUser = (state) => state.user;
export const selectUserToken = (state) => state.user.accessToken;

export default userSlice.reducer;
