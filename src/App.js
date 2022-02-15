import React, { useRef, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import GlobalStyle from "./GlobalStyle";
import Login from "./components/Login/Login";
import Town from "./components/Town/Town";

function App() {
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = getSocketIO();

    return () => {
      socket.disconnect();
    };
  }, []);

  function getSocketIO() {
    if (socketRef.current === null) {
      socketRef.current = io.connect(process.env.REACT_APP_BASE_URL);
    }

    return socketRef.current;
  }

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users/:id" element={<Town socket={getSocketIO()} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
