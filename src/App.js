import React from "react";
import GlobalStyle from "./GlobalStyle";
import Header from "./components/Header/header";
import Login from "./components/Login/Login";
import Mail from "./components/Mail/Mail";
import { selectUserToken } from "./features/user/userSlice";
import { useSelector } from "react-redux";

function App() {
  const currentUserAccessToken = useSelector(selectUserToken);

  return (
    <>
      <GlobalStyle />
      <Header />
      {!currentUserAccessToken && <Login />}
      <Mail />
    </>
  );
}

export default App;
