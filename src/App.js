import React from "react";
import { Route, Routes } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Header from "./components/Header/header";
import Login from "./components/Login/Login";
import Mail from "./components/Mail/Mail";
import CokeCount from "./components/CokeCount/CokeCount";

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <CokeCount />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mail" element={<Mail />} />
      </Routes>
    </>
  );
}

export default App;
