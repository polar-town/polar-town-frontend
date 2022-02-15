import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import loginReducer from "../features/login/loginSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
  },
  middleware: [logger],
});
