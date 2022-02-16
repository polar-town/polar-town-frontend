import React, { useRef, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import GlobalStyle from "./GlobalStyle";
import Login from "./components/Login/Login";
import Town from "./components/Town/Town";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import Logout from "./components/Logout/Logout";

function App() {
  const socketRef = useRef(null);
  const { isAuth, user } = useSelector((state) => state.user);

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
        <Route
          path="/"
          element={
            <Navigate replace to={!isAuth ? "/login" : `/users/${user.id}`} />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        <Route element={<RequireAuth />}>
          <Route path="/users/:id" element={<Town socket={getSocketIO()} />} />
        </Route>

        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
    </>
  );
}

export default App;
