export async function getMailList({
  at,
  userId,
  inboxId,
  pageToken = null,
  axiosInstance,
}) {
  const response = await axiosInstance.get(
    `/users/${userId}/mails/${inboxId}/${pageToken}`,
    {
      headers: {
        gapiauthorization: `Bearer ${at}`,
      },
    },
  );

  return response.data;
}

export async function moveEmailToTrash({ at, userId, mailId, axiosInstance }) {
  const response = await axiosInstance.post(
    `/users/${userId}/mails/trash`,
    {
      mailId,
    },
    {
      headers: {
        gapiauthorization: `Bearer ${at}`,
      },
    },
  );

  return response.data;
}

export async function deleteTrashEmail({
  at,
  userId,
  mailId,
  count,
  axiosInstance,
}) {
  const response = await axiosInstance.delete(`/users/${userId}/mails/trash`, {
    headers: {
      gapiauthorization: `Bearer ${at}`,
    },
    data: { mail: mailId, cokeCount: count },
  });

  return response.data;
}
