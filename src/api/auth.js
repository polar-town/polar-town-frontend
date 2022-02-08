import useGapi from "../hooks/useGapi";
import getAccessToken from "../utils/accessToken";

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
