import axios from "axios";

export async function getFriendList(userId) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/users/${userId}/friends`,
    );

    const friendList = response.data.result.map((res) => {
      const { _id, name, photo, iceCount, email } = res.userId;

      return {
        id: _id,
        name,
        photo,
        iceCount,
        email,
      };
    });

    return friendList;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteFriend(userId, email) {
  try {
    await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/users/${userId}/friends`,
      { data: { email } },
      { withCredentials: true },
    );
  } catch (error) {
    console.error(error);
  }
}

export async function getPendingFriendList(userId) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/users/${userId}/friends/pending`,
      { withCredentials: true },
    );

    const pendingFriendList = response.data.result.map((res) => {
      const { _id, name, photo, iceCount, email } = res.userId;

      return {
        id: _id,
        name,
        photo,
        iceCount,
        email,
      };
    });

    return pendingFriendList;
  } catch (error) {
    console.error(error);
  }
}

export async function addFriendList(userId, email) {
  try {
    await axios.post(
      `${process.env.REACT_APP_BASE_URL}/users/${userId}/friends`,
      { email },
      { withCredentials: true },
    );
  } catch (error) {
    console.error(error);
  }
}

export async function deletePendingFriend(userId, email) {
  try {
    await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/users/${userId}/friends/pending`,
      { data: { email } },
      { withCredentials: true },
    );
  } catch (error) {
    console.error(error);
  }
}
