import axios from "axios";
import { useNavigate } from "react-router-dom";
import useGapi from "../hooks/useGapi";
import getAccessToken from "../utils/accessToken";

async function verifyRefreshToken(email) {
  const navigate = useNavigate();
  const gapi = useGapi();
  const GoogleAuth = gapi.auth2.getAuthInstance();

  try {
    return await getAccessToken();
  } catch (err) {
    if (err.responce.status === 403) {
      try {
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/logout`, {
          email,
        });

        GoogleAuth.signOut().then(function () {
          GoogleAuth.disconnect();
        });

        navigate("/login");
      } catch (err) {
        console.error(err);
      }
    }
  }
}

export default verifyRefreshToken;
