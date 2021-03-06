export async function getInItemBox({ townId, axiosInstance }) {
  const response = await axiosInstance.get(`/users/${townId}/items`);

  return response.data;
}

export async function getPresentBox({ townId, axiosInstance }) {
  const response = await axiosInstance.get(`/users/${townId}/items/present`);

  return response.data;
}

export async function changeStorage({
  userId,
  itemId,
  from,
  to,
  axiosInstance,
}) {
  const response = await axiosInstance.put(`/users/${userId}/items/${itemId}`, {
    from,
    to,
  });

  return response.data;
}

export async function changeLocation({
  userId,
  itemId,
  newLocation,
  axiosInstance,
}) {
  const response = await axiosInstance.put(
    `/users/${userId}/items/${itemId}/location`,
    { newLocation },
  );

  return response.data;
}

export async function addItem({ userId, name, price, axiosInstance }) {
  const response = await axiosInstance.post(`/users/${userId}/items`, {
    name,
    price,
  });

  return response.data;
}

export async function sendItem({
  townId,
  presentTo,
  name,
  price,
  axiosInstance,
}) {
  const response = await axiosInstance.post(`/users/${townId}/items/present`, {
    presentTo,
    name,
    price,
  });

  return response.data;
}
