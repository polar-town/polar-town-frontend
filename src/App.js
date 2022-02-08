import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Header from "./components/Header/header";
import Login from "./components/Login/Login";
import Mail from "./components/Mail/Mail";
import { selectUser, selectUserToken } from "./features/user/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Town from "./components/Town/Town";

function App() {
  const navigate = useNavigate();
  const currentUserAccessToken = useSelector(selectUserToken);
  const user = useSelector(selectUser);

  useEffect(() => {
    currentUserAccessToken ? navigate(`users/${user.id}`) : navigate("/login");
  }, [currentUserAccessToken]);

  return (
    <>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/users/:id" element={<Town />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mail" element={<Mail />} />
      </Routes>
    </>
  );
}

export default App;
