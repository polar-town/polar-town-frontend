export function sortMessages(messages) {
  return messages.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    if (a.date === b.date) return 0;
  });
}
