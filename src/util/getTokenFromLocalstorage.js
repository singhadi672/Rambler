export function getTokenFromLocalstorage() {
  const localStorageData = JSON.parse(localStorage?.getItem("Rambler_ls"));
  return localStorageData ? localStorageData.token : null;
}
