export async function getFriendList({ userId, axiosInstance }) {
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
}

export async function deleteFriend({ userId, email, axiosInstance }) {
  await axiosInstance.delete(
    `/users/${userId}/friends`,
    { data: { email } },
    { withCredentials: true },
  );
}

export async function getPendingFriendList({ userId, axiosInstance }) {
  const response = await axiosInstance.get(`/users/${userId}/friends/pending`);

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
}

export async function addFriendList({
  userId,
  email,
  isAlarm = false,
  axiosInstance,
}) {
  const response = await axiosInstance.post(
    `/users/${userId}/friends`,
    { email, isAlarm },
    { withCredentials: true },
  );

  return response.data;
}

export async function deletePendingFriend({ userId, email, axiosInstance }) {
  await axiosInstance.delete(
    `/users/${userId}/friends/pending`,
    { data: { email } },
    { withCredentials: true },
  );
}
