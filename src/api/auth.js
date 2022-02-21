import axios from "./axios";

const LOGIN_URL = "/auth/login";

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
