export function addFollowBackFunction(id, array) {
  if (array) {
    const getIndex = array.findIndex((item) => item._id === id);
    return getIndex === -1 ? false : true;
  }
}
