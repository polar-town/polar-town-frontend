import axios from "axios";

export async function getMessageList(townId) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/users/${townId}/guestbook`,
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
    );

    return response;
  } catch (error) {
    console.error(error);
  }
}