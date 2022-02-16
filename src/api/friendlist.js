export async function getFriendList({ userId, axiosInstance }) {
  try {
    const response = await axiosInstance.get(`/users/${userId}/friends`);

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

export async function deleteFriend({ userId, email, axiosInstance }) {
  try {
    await axiosInstance.delete(
      `/users/${userId}/friends`,
      { data: { email } },
      { withCredentials: true },
    );
  } catch (error) {
    console.error(error);
  }
}

export async function getPendingFriendList({ userId, axiosInstance }) {
  console.log(userId, axiosInstance);
  try {
    const response = await axiosInstance.get(
      `/users/${userId}/friends/pending`,
    );

    const pendingFriendList = response.data.result.map((res) => {
      const { _id, name, photo, iceCount, email } = res.userId;

      return {
        id: _id,
        name,
        photo,
        iceCount,
        email,
        isChecked: res.isChecked,
      };
    });

    return pendingFriendList;
  } catch (error) {
    console.error(error);
  }
}

export async function addFriendList({
  userId,
  email,
  isAlarm = false,
  axiosInstance,
}) {
  try {
    const response = await axiosInstance.post(
      `/users/${userId}/friends`,
      { email, isAlarm },
      { withCredentials: true },
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function deletePendingFriend({ userId, email, axiosInstance }) {
  try {
    await axiosInstance.delete(
      `/users/${userId}/friends/pending`,
      { data: { email } },
      { withCredentials: true },
    );
  } catch (error) {
    console.error(error);
  }
}
