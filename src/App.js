import React from "react";
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
      <Login />
      <CokeCount />
      <Mail />
    </>
  );
}

export default App;
