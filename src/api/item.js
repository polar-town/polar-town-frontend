import axios from "axios";

export async function getInItemBox(townId) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/users/${townId}/items`
    );

    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getPresentBox(townId) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/users/${townId}/items/present`
    );

    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function changeStorage(userId, itemId, from, to) {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/users/${userId}/items/${itemId}`,
      { from, to }
    );

    return response.data;
  } catch (err) {
    console.error(err);
  }
}
export async function addItem(userId, name, price) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/users/${userId}/items/present`,
      { name, price }
    );

    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function sendItem(townId, presentTo, name, price) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/users/${townId}/items/present`,
      { presentTo, name, price }
    );

    return response.data;
  } catch (err) {
    console.error(err);
  }
}
