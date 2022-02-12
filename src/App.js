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
  const [townIceCount, setTownIceCount] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    townId ? navigate(`users/${townId}`) : navigate("/login");
  }, [townId]);

  useEffect(() => {
    const connection = socketService.connect(process.env.REACT_APP_BASE_URL);
    dispatch(setSocket(connection));

    return () => {
      socketService.disconnect(connection);
    };
  }, []);

  function onTownTransition(id, iceCount) {
    setTownId(id);
    setTownIceCount(iceCount);
  }

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route
          path="/users/:id"
          element={
            <Town
              iceCount={`/images/ice-background/${townIceCount}.png`}
              onTownTransition={onTownTransition}
            />
          }
        />
        <Route path="/login" element={<Login goTown={onTownTransition} />} />
      </Routes>
    </>
  );
}

App.propTypes = {
  socketService: proptyoes.object,
};

export default App;
