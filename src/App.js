import React, { useRef } from "react";
import { Route, Routes } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Login from "./components/Login/Login";
import Town from "./components/Town/Town";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users/:id" element={<Town />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
