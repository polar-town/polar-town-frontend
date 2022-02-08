import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import GlobalStyle from "./GlobalStyle";
import Header from "./components/Header/header";
import Login from "./components/Login/Login";
import Mail from "./components/Mail/Mail";
import CokeCounter from "./components/CokeCounter/CokeCounter";
import { selectUserToken } from "./features/user/userSlice";

function App() {
  const currentUserAccessToken = useSelector(selectUserToken);

  return (
    <>
      <GlobalStyle />
      <Header />
      {currentUserAccessToken && <CokeCounter />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mail" element={<Mail />} />
      </Routes>
    </>
  );
}

export default App;
