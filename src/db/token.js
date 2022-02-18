export function saveRefreshToken(token) {
  const REFRESH_TOKEN = "token";
  localStorage.setItem(REFRESH_TOKEN, token);
}

export function getRefreshToken() {
  const REFRESH_TOKEN = "token";
  return localStorage.getItem(REFRESH_TOKEN);
}

export function clearRefreshToken() {
  const REFRESH_TOKEN = "token";
  localStorage.clear(REFRESH_TOKEN);
}
