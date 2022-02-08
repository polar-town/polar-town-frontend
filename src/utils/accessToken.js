import axios from "axios";

async function getAccessToken() {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/auth/refresh`
  );

  return response.data;
}

export default getAccessToken;
