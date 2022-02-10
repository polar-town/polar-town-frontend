import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import useGapi from "../../hooks/useGapi";
import { useDispatch } from "react-redux";
import { saveLoginUser } from "../../features/user/userSlice";

const StyledLoginOverlay = styled.div`
  background: linear-gradient(to top, #03bcf6, #89fff1);
  display: grid;
  place-items: center;
  min-height: 100vh;
`;

const StyledLoginContent = styled.div`
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

const StyledLogoImage = styled.img`
  image-rendering: pixelated;
  margin-bottom: 30px;
  margin-top: 10px;
  width: 150px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const StyledFailureMessage = styled.span`
  color: #ff0000;
  font-weight: 700;
  margin-top: 10px;
`;

function Login() {
  const [error, setError] = useState("");
  const gapi = useGapi();
  const dispatch = useDispatch();

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
    const googleLoginUser = result;
    const profile = googleLoginUser.getBasicProfile();
    const name = profile.getName();
    const userEmail = profile.getEmail();
    const photoUrl = profile.getImageUrl();

    const serverResponse = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/auth/login`,
      { name, email: userEmail, photoUrl },
      { withCredentials: true },
    );

    const { id, username, email, accessToken } = serverResponse.data.result;

    const currentUser = {
      id,
      username,
      email,
      accessToken,
      googleLoginUser,
    };

    dispatch(saveLoginUser(currentUser));
  }

  function responseError() {
    setError("Login Failed");

    setTimeout(() => {
      setError("");
    }, 3000);
  }

  return (
    <StyledLoginOverlay>
      <StyledLoginContent>
        <StyledLogoImage
          src="images/polar-town-logo.png"
          alt="game logo with bear paw"
        />
        <div id="google-login-button"></div>
        {error && <StyledFailureMessage>{error}</StyledFailureMessage>}
      </StyledLoginContent>
    </StyledLoginOverlay>
  );
}

export default Login;
