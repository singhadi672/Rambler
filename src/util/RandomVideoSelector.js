export function RandomVideoSelector(array, length) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, length);
  return selected;
}
