export async function getMessageList({ townId, axiosInstance }) {
  try {
    const response = await axiosInstance.get(`/users/${townId}/guestbook`);

    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function leaveNewMessage({ townId, message, axiosInstance }) {
  try {
    const response = await axiosInstance.post(`/users/${townId}/guestbook`, {
      message,
    });

    return response.data.result;
  } catch (error) {
    console.error(error);
  }
}

export async function changeCheckMessage({ userId, axiosInstance }) {
  const response = await axiosInstance.put(`/users/${userId}/guestbook`);

  return response.data.result;
}
