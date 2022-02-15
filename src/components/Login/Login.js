import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGapi from "../../hooks/useGapi";
import { userLogin } from "../../api/auth";
import { saveLoginUser } from "../../features/user/userSlice";
import Header from "../Header/header";

const LoginOverlay = styled.div`
  background: linear-gradient(to top, #03bcf6, #89fff1);
  display: grid;
  place-items: center;
  min-height: 100vh;
`;

const LoginContent = styled.div`
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
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

function Login() {
  const [error, setError] = useState("");
  const gapi = useGapi();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!gapi) return;

    gapi.signin2.render("google-login-button", {
      width: 250,
      height: 50,
      theme: "dark",
      longtitle: true,
      onsuccess: responseGoogle,
      onfailure: responseError,
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

      if (isAuth.result === "error") {
        return setError(isAuth.error.message);
      }

      dispatch(saveLoginUser(isAuth.result));
      navigate(`users/${isAuth.result.user._id}`);
    } catch (error) {
      console.error(error);
    }
  }

  function responseError(error) {
    console.error(error);
    setError("Login Failed");
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
