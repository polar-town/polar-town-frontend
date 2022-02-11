import axios from "axios";

export async function getTownHostInfo(townId) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/users/${townId}`,
    );

    return response.data.result;
  } catch (err) {
    console.error(err);
  }
}
