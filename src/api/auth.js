import axios from "./axios";
// import useGapi from "../hooks/useGapi";
// import getAccessToken from "../utils/accessToken";

const LOGIN_URL = "/auth/login";
const LOGOUT_URL = "/auth/logout";

export async function userLogin({ googleData }) {
  const res = await axios.post(
    LOGIN_URL,
    { ...googleData },
    {
      headers: { "content-type": "application/json" },
      withCredentials: true,
    },
  );

  return res.data;
}

export async function userLogout(user) {
  try {
    await axios.post(LOGOUT_URL, { email: user.email });
  } catch (error) {
    console.error(error);
  }
}

// export async function checkUserLoginStatus() {
//   const gapi = useGapi();
//   const isLogedIn = gapi.auth2.getAuthInstance().isSignedIn.get();

//   if (isLogedIn) {
//     try {
//       return await getAccessToken();
//     } catch (err) {
//       console.error(err);
//     }
//   }
// }
