import axios from "axios";
// import instance from "./interceptor";

export async function getMailList(userId, inboxId) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/users/${userId}/mails/${inboxId}`,
      {
        headers: {
          gapiauthorization: `Bearer "ya29.A0ARrdaM8_0QeLPATNN4O8wYMFqNrpN0gB-HnQiiR8r3O4ya6wmeyhexmK94RMzv7P0l3Y61c8_ioeKF1-f9LPp2csbgSvEDUZGuy46_FHT64SNf0G8Mi4zPxKcQBPlq41C22OtnUmhJ4k4Ch1fxTADUa-UJuh5g"`,
        },
        withCredentials: true,
      },
    );

    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function moveEmailToTrash(userId, mailId) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/users/${userId}/mails/trash`,
      {
        mailId,
      },
      {
        headers: {
          gapiauthorization: `Bearer "ya29.A0ARrdaM8_0QeLPATNN4O8wYMFqNrpN0gB-HnQiiR8r3O4ya6wmeyhexmK94RMzv7P0l3Y61c8_ioeKF1-f9LPp2csbgSvEDUZGuy46_FHT64SNf0G8Mi4zPxKcQBPlq41C22OtnUmhJ4k4Ch1fxTADUa-UJuh5g"`,
          withCredentials: true,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function deleteTrashEmail(userId, mailId, count) {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/users/${userId}/mails/trash`,
      {
        headers: {
          gapiauthorization: `Bearer "ya29.A0ARrdaM8_0QeLPATNN4O8wYMFqNrpN0gB-HnQiiR8r3O4ya6wmeyhexmK94RMzv7P0l3Y61c8_ioeKF1-f9LPp2csbgSvEDUZGuy46_FHT64SNf0G8Mi4zPxKcQBPlq41C22OtnUmhJ4k4Ch1fxTADUa-UJuh5g"`,
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
