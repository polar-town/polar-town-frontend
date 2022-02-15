import axios from "axios";
import useGapi from "../hooks/useGapi";
import getAccessToken from "../utils/accessToken";

const loginUrl = `${process.env.REACT_APP_BASE_URL}/auth/login`;

export async function userLogin({ googleData }) {
  try {
    const res = await axios.post(loginUrl, { ...googleData });

    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export async function checkUserLoginStatus() {
  const gapi = useGapi();
  const isLogedIn = gapi.auth2.getAuthInstance().isSignedIn.get();

  if (isLogedIn) {
    try {
      return await getAccessToken();
    } catch (err) {
      console.error(err);
    }
  }
}
