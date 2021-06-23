export default function addLikeButton(id, array) {
  const index = array.findIndex((item) => item === id);
  return index === -1 ? false : true;
}
