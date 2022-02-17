import React, { useRef, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import GlobalStyle from "./GlobalStyle";
import Login from "./components/Login/Login";
import Town from "./components/Town/Town";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import PersistLogin from "./components/PersistLogin/PersistLogin";

function App() {
  const socketRef = useRef(null);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    return () => {
      getSocketIO().disconnect();
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
        <Route path="/login" element={<Login />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route
              path="/"
              element={<Navigate replace to={`/users/${user.id}`} />}
            />
            <Route
              path="/users/:id"
              element={<Town socketInit={getSocketIO} />}
            />
          </Route>
        </Route>
        <Route path="*" element={<div>Error</div>} />
      </Routes>
    </>
  );
}

export default App;
