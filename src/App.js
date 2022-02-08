import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import GlobalStyle from "./GlobalStyle";
import Header from "./components/Header/header";
import Login from "./components/Login/Login";
import Town from "./components/Town/Town";
import CokeCounter from "./components/CokeCounter/CokeCounter";
import { selectUser, selectUserToken } from "./features/user/userSlice";

function App() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const currentUserAccessToken = useSelector(selectUserToken);

  useEffect(() => {
    currentUserAccessToken ? navigate(`users/${user.id}`) : navigate("/login");
  }, [currentUserAccessToken]);

  return (
    <>
      <GlobalStyle />
      <Header />
      {currentUserAccessToken && <CokeCounter />}
      <Routes>
        <Route path="/users/:id" element={<Town />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
