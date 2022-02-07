import axios from "axios";

export async function getPromotionMailList() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/users/${userId}/mails/CATEGORY_PROMOTIONS`,
    );

    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

export async function getSpamMailList() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/users/${userId}/mails/SPAM`,
    );

    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

export async function getTrashMailList() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/users/${userId}/mails/TRASH`,
    );

    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

export async function moveEmailToTrash() {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/users/${userId}/mails/TRASH`,
    );

    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteTrashEmail() {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/users/${userId}/mails/TRASH`,
    );

    console.log(response);
  } catch (err) {
    console.log(err);
  }
}
