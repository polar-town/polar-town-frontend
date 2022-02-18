import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import useRefreshToken from "../../hooks/useRefreshToken";
import Loading from "../Loading/Loading";

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { accessToken } = useSelector((state) => state.user);
  const logout = useLogout();

  useEffect(() => {
    async function verifyRefreshToken() {
      try {
        await refresh();
      } catch (error) {
        console.error(error.response?.status);
        if (error.response?.status === 401) {
          logout();
        }
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
