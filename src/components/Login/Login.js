import React from "react";
import styled from "styled-components";
import { Button, Avatar } from "@mui/material";
import GoogleLogin from "react-google-login";
import axios from "axios";
import USER_INFO_SCOPE from "../../constants/userInfoScope";

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
  width: 30%;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

const StyledLogoImage = styled.img`
  image-rendering: pixelated;
  margin-bottom: 40px;
  margin-top: 10px;
  width: 150px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

function Login() {
  const responseGoogle = async (result) => {
    const { code } = result;
    const serverResponse = await axios(
      `${process.env.REACT_APP_BASE_URL}/auth/login`,
      { code },
    );

    // serverResponse handling needed
    // e.g. set user in store
  };

  const responseError = (error) => {
    // error handling needed
  };

  return (
    <StyledLoginOverlay>
      <StyledLoginContent>
        <StyledLogoImage
          src="images/polar-town-logo.png"
          alt="game logo with bear paw"
        />
        <GoogleLogin
          clientId={process.env.REACT_APP_CLIENT_ID}
          render={(renderProps) => (
            <Button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              variant="contained"
              color="primary"
              startIcon={<Avatar src="images/google-logo.png" />}
            >
              Login
            </Button>
          )}
          onSuccess={responseGoogle}
          onFailure={responseError}
          cookiePolicy="single_host_origin"
          responseType="code"
          accessType="offline"
          scope={USER_INFO_SCOPE}
          redirectUri={process.env.REACT_APP_REDIRECT_URI}
        />
      </StyledLoginContent>
    </StyledLoginOverlay>
  );
}

export default Login;
