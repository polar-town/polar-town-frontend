import axios from "axios";
import { useNavigate } from "react-router-dom";
import useGapi from "../hooks/useGapi";

async function verifyRefreshToken(email) {
  const navigate = useNavigate();
  const gapi = useGapi();
  const GoogleAuth = gapi.auth2.getAuthInstance();

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/auth/refresh`
    );

    return response;
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
