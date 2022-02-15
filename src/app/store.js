import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import loginReducer from "../features/login/loginSlice";
import userReducer from "../features/user/userSlice";
// import modalReducer from "../features/user/modalSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
    // modal: modalReducer,
  },
  middleware: [logger],
});
