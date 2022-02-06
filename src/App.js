import React from "react";
import GlobalStyle from "./GlobalStyle";
import Header from "./components/Header/header";
import Login from "./components/Login/Login";
import Mail from "./components/Mail/Mail";

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Login />
      <Mail />
    </>
  );
}

export default App;
