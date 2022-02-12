import axios from "axios";
// import instance from "./interceptor";

export async function getMailList(userId, inboxId) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/users/${userId}/mails/${inboxId}`,
      {
        headers: {
          gapiauthorization: `Bearer "ya29.A0ARrdaM9E9p7vjKGGvSA69AiijiA_KrB_deWJo7rGw9eFC8VlkAtmSBIzNRrr1LheNfOFWLXL9rTESOAmPQOCLbGMp63BbDogDtww0xv9p7WbepsE2KrOG4IFjyWG03v6hs-Ib4YyNSursOTH5hRDBLTdHqgelg"`,
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
          gapiauthorization: `Bearer "ya29.A0ARrdaM9E9p7vjKGGvSA69AiijiA_KrB_deWJo7rGw9eFC8VlkAtmSBIzNRrr1LheNfOFWLXL9rTESOAmPQOCLbGMp63BbDogDtww0xv9p7WbepsE2KrOG4IFjyWG03v6hs-Ib4YyNSursOTH5hRDBLTdHqgelg"`,
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
          gapiauthorization: `Bearer "ya29.A0ARrdaM9E9p7vjKGGvSA69AiijiA_KrB_deWJo7rGw9eFC8VlkAtmSBIzNRrr1LheNfOFWLXL9rTESOAmPQOCLbGMp63BbDogDtww0xv9p7WbepsE2KrOG4IFjyWG03v6hs-Ib4YyNSursOTH5hRDBLTdHqgelg"`,
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
