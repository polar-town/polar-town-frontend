function organizeDate(data, isHandleDate) {
  const newDate = new Date(data);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();
  const hour = newDate.getHours();
  const minute = newDate.getMinutes();

  if (isHandleDate) {
    return `${year}.${month}.${date} ${hour} : ${
      minute < 10 ? `0${minute}` : minute
    }`;
  }

  return `${year}.${month}.${date}`;
}

export default organizeDate;
