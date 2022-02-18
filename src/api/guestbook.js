export async function getMessageList({ townId, axiosInstance }) {
  const response = await axiosInstance.get(`/users/${townId}/guestbook`);

  return response;
}

export async function leaveNewMessage({ townId, message, axiosInstance }) {
  const response = await axiosInstance.post(`/users/${townId}/guestbook`, {
    message,
  });

  return response.data.result;
}

export async function changeCheckMessage({ userId, axiosInstance }) {
  const response = await axiosInstance.put(`/users/${userId}/guestbook`);

  return response.data.result;
}
