export function setTokenToLocalStorage(token) {
  localStorage?.setItem("Rambler_ls", JSON.stringify({ token }));
}
