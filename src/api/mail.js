import axios from "axios";
// import instance from "./interceptor";

export async function getMailList(at, userId, inboxId, pageToken = null) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/users/${userId}/mails/${inboxId}/${pageToken}`,
      {
        headers: {
          gapiauthorization: `Bearer ${at}`,
        },
        withCredentials: true,
      },
    );

    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function moveEmailToTrash(at, userId, mailId) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/users/${userId}/mails/trash`,
      {
        mailId,
      },
      {
        headers: {
          gapiauthorization: `Bearer ${at}`,
          withCredentials: true,
        },
      },
    );

    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function deleteTrashEmail(at, userId, mailId, count) {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/users/${userId}/mails/trash`,
      {
        headers: {
          gapiauthorization: `Bearer ${at}`,
          withCredentials: true,
        },
        data: { mail: mailId, cokeCount: count },
      },
    );

    return response.data;
  } catch (err) {
    console.error(err);
  }
}
