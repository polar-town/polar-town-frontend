import axios from "axios";

export async function getMailList(inbox) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/users/${userId}/mails/${inbox}`,
    );

    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function moveEmailToTrash() {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/users/${userId}/mails/TRASH`,
    );
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function deleteTrashEmail() {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/users/${userId}/mails/TRASH`,
    );

    return response;
  } catch (err) {
    console.error(err);
  }
}
