import React from "react";
import GlobalStyle from "./GlobalStyle";
import Header from "./components/Header/header";
import Login from "./components/Login/Login";

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Login />
    </>
  );
}

export default App;
