import axios from "axios";

export async function getFriendList(userId) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/users/${userId}/friends`,
    );

    const friendList = response.data.result.map((res) => {
      const { _id, name, photo, iceCount } = res.userId;

      return {
        id: _id,
        name,
        photo,
        iceCount,
      };
    });

    return friendList;
  } catch (error) {
    console.error(error);
  }
}
