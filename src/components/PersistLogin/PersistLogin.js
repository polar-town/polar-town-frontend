import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../../hooks/useRefreshToken";
import Loading from "../Loading/Loading";

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { accessToken } = useSelector((state) => state.user);

  useEffect(() => {
    async function verifyRefreshToken() {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    !accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  useEffect(() => {}, [isLoading]);

  return <>{isLoading ? <Loading /> : <Outlet />}</>;
}

export default PersistLogin;
