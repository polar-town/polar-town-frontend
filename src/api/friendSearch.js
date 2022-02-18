export async function getSearchedFriendList({
  query,
  pageIndex = 1,
  axiosInstance,
}) {
  const response = await axiosInstance.get(
    `/users/?size=4&page=${pageIndex}&keyword=${query}`,
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

  return { page: pageIndex++, users };
}

export async function updateTargetPendingFriendList({
  userId,
  targetEmail,
  axiosInstance,
}) {
  const response = await axiosInstance.post(
    `/users/${userId}/friends/pending`,
    { email: targetEmail },
    {
      withCredentials: true,
    },
  );
  return response;
}
