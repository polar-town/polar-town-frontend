import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import proptyoes from "prop-types";
import GlobalStyle from "./GlobalStyle";
import Login from "./components/Login/Login";
import Town from "./components/Town/Town";
import { setSocket } from "./features/user/userSlice";

function App({ socketService }) {
  const [townId, setTownId] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const townIceCount = 10;

  useEffect(() => {
    const connection = socketService.connect(process.env.REACT_APP_BASE_URL);
    dispatch(setSocket(connection));

    return () => {
      socketService.disconnect(connection);
    };
  }, []);

  useEffect(() => {
    townId ? navigate(`users/${townId}`) : navigate("/login");
  }, [townId]);

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route
          path="/users/:id"
          element={
            <Town
              iceCount={`/images/ice-background/${townIceCount}.png`}
              onTownTransition={setTownId}
            />
          }
        />
        <Route path="/login" element={<Login goTown={setTownId} />} />
      </Routes>
    </>
  );
}

App.propTypes = {
  socketService: proptyoes.object,
};

export default App;
