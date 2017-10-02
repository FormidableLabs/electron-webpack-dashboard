export default (initialSize, modifier = 0, min = 5, max = 30) => {
  const modifiedSize = initialSize + modifier;
  return Math.min(max, Math.max(min, modifiedSize));
};
