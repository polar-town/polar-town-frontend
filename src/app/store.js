import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userReducer from "../features/user/userSlice";
import modalReducer from "../features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
  },
  middleware: [logger],
});
