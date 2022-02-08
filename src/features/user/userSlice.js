import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cokeCount: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increseCoke: (state, action) => {
      state.cokeCount += action.payload;
    },
    decreaseCoke: (state, action) => {
      state.cokeCount -= action.payload;
    },
  },
});

export const { increseCoke, decreaseCoke } = userSlice.actions;

export const selectCokeCount = (state) => state.user.cokeCount;

export default userSlice.reducer;
