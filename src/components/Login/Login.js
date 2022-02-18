import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import useGapi from "../../hooks/useGapi";
import { userLogin } from "../../api/auth";
import { saveLoginUser } from "../../features/user/userSlice";
import Header from "../Header/header";
// import { saveRefreshToken } from "../../db/token";

const background = keyframes`
  0% {
    background-position: 0 center;
  }
  100% {
    background-position: -1500px center;
  }
`;

const LoginOverlay = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  min-height: 100vh;

  &:after {
    width: 100%;
    height: 100%;
    background: url("/images/town-background-image.jpg") 0 center / 1500px
      repeat-x;
    animation: ${background} 25s linear infinite;
    top: 0;
    left: 0;
    position: absolute;
    background-size: 100%;
    opacity: 0.7;
    z-index: -1;
    filter: alpha(opacity=70);
    content: "";
  }
`;

const LoginContent = styled.div`
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 23%;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

const LogoImage = styled.img`
  image-rendering: pixelated;
  margin-bottom: 30px;
  margin-top: 10px;
  width: 150px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const FailureMessage = styled.span`
  color: #ff0000;
  font-weight: 700;
  margin-top: 10px;
`;

const REFRESH_TOKEN = "token";

function Login() {
  const [error, setError] = useState("");
  const gapi = useGapi();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;
  const hasLogoutHistory = useSelector((state) => state.user.hasLogoutHistory);

  useEffect(() => {
    if (!gapi) return;

    gapi.signin2.render("google-login-button", {
      width: 250,
      height: 50,
      theme: "dark",
      longtitle: true,
      onsuccess: responseGoogle,
      onfailure: (error) => {
        setError(error.message);
      },
    });
  }, [gapi]);

  async function responseGoogle(result) {
    const profile = result.getBasicProfile();
    const name = profile.getName();
    const email = profile.getEmail();
    const imageUrl = profile.getImageUrl();

    try {
      const isAuth = await userLogin({
        googleData: { name, email, photo: imageUrl },
      });

      dispatch(saveLoginUser(isAuth.result));
      localStorage.setItem(REFRESH_TOKEN, isAuth.result.refreshToken);
      navigate(hasLogoutHistory ? "/" : from, { replace: true });
    } catch (error) {
      if (!error?.response) {
        setError("No Server Response");
      } else if (error.response?.statue === 401) {
        setError("Unauthorized");
      } else {
        setError("Login Failed");
      }
    }
  }

  return (
    <>
      <Header />
      <LoginOverlay>
        <LoginContent>
          <LogoImage
            src="images/polar-town-logo.png"
            alt="game logo with bear paw"
          />
          <div id="google-login-button"></div>
          {error && <FailureMessage>{error}</FailureMessage>}
        </LoginContent>
      </LoginOverlay>
    </>
  );
}

export default Login;
