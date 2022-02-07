import React from "react";
import { Route, Routes } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Header from "./components/Header/header";
import Login from "./components/Login/Login";
import Mail from "./components/Mail/Mail";

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mail" element={<Mail />} />
      </Routes>
    </>
  );
}

export default App;
