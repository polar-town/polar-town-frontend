import axios from "axios";

export async function getSearchedFriendList(userId, query, page = 1) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/users/?size=4&page=${page}&keyword=${query}`,
    );

    const users = response.data.result.users.map((user) => {
      const { _id, name, photo, iceCount, email, pendingFriendList } = user;

      return {
        id: _id,
        name,
        photo,
        iceCount,
        email,
        pendingFriendList,
      };
    });

    return { page: page++, users };
  } catch (error) {
    console.error(error);
  }
}

export async function updateTargetPendingFriendList(userId, targetEmail) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/users/${userId}/friends/pending`,
      { email: targetEmail },
      {
        withCredentials: true,
      },
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}
