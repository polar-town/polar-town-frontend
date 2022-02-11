import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Login from "./components/Login/Login";
import Town from "./components/Town/Town";

function App() {
  const [townId, setTownId] = useState("");
  const [townIceCount, setTownIceCount] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    townId ? navigate(`users/${townId}`) : navigate("/login");
  }, [townId]);

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
          element={<Town onTownTransition={onTownTransition} />}
        />
        <Route path="/login" element={<Login goTown={onTownTransition} />} />
      </Routes>
    </>
  );
}

export default App;
