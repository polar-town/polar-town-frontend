import axios from "axios";
import useGapi from "../hooks/useGapi";
import getAccessToken from "../utils/accessToken";

const baseUrl = process.env.REACT_APP_BASE_URL;
const loginUrl = `${baseUrl}/auth/login`;
const logoutUrl = `${baseUrl}/auth/logout`;

export async function userLogin({ googleData }) {
  try {
    const res = await axios.post(loginUrl, { ...googleData });

    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export async function userLogout(user) {
  try {
    await axios.post(logoutUrl, { email: user.email });
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
