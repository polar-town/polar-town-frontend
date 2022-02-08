import axios from "axios";
import useGapi from "../hooks/useGapi";

export async function checkUserLoginStatus() {
  const gapi = useGapi();
  const GoogleAuth = gapi.auth2.getAuthInstance();
  const isLogedIn = GoogleAuth.isSignedIn.get();

  if (isLogedIn) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/auth/refresh`
      );

      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
}
