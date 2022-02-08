import useGapi from "../hooks/useGapi";
import instance from "./interceptor";

export async function checkUserLoginStatus() {
  const gapi = useGapi();
  const GoogleAuth = gapi.auth2.getAuthInstance();
  const isLogedIn = GoogleAuth.isSignedIn.get();

  if (isLogedIn) {
    try {
      const response = await instance.get(
        `${process.env.REACT_APP_SERVER_URL}/auth/refresh`
      );

      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
}
