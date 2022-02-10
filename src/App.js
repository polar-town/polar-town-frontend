import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Login from "./components/Login/Login";
import Town from "./components/Town/Town";

function App() {
  const [townId, setTownId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    townId ? navigate(`users/${townId}`) : navigate("/login");
  }, [townId]);

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route
          path="/users/:id"
          element={<Town onTownTransition={setTownId} />}
        />
        <Route path="/login" element={<Login goTown={setTownId} />} />
      </Routes>
    </>
  );
}

export default App;
