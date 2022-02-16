import axios from "./axios";

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
  await axios.post(
    LOGOUT_URL,
    { email: user.email },
    { withCredentials: true },
  );
}
