import axios from "axios";

export async function getMessageList(townId) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/users/${townId}/guestbook`,
      { withCredentials: true },
    );

    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function leaveNewMessage(townId, message) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/users/${townId}/guestbook`,
      { message },
      { withCredentials: true },
    );

    return response.data.result;
  } catch (error) {
    console.error(error);
  }
}
